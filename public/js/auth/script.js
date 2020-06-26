const USER_LOGGED = JSON.parse(localStorage.getItem('@user'));
const URL_LOCAL = window.location.origin;
const Socket = io(URL_LOCAL);
const DEBOUNCE_TIME = 1000;

/**
 * Factory do painel de chat
 */
const chatFactory = {
    init: function() {
        this.cacheDOM();
        this.scrollToBottom();
    },
    cacheDOM: function() {
        this.$chatHistory = $('.chat-history');
    },
    scrollToBottom: function() {
        this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
    },
}

/**
 * Inicialica a factory realizano do scroll das mgs
 */
chatFactory.init();

/**
 * Realiza o Logout
 */
$('#logout').click(event => {
    $.post(paths.AUTH.LOGOUT, {}, (data, status, xhr) => {
        localStorage.clear();
        responseSuccess();
    }, error => {
        console.log("Erro: ", error);
        responseError(error.responseJSON.error)
    });
});

/**
 * Factory de usuario
 */
const usersFactory = {
    listUsers: [],
    userSelected: {},

    init: function() {
        this.cacheDOM();
        this.getListContacts();
    },
    cacheDOM: function() {
        this.$contacts = $('#contacts');
    },
    render: function(user) {
        const template = Handlebars.compile($("#contact-template").html());
        const context = {
            idUser: user.id,
            userName: user.name,
            token: user.token,
            status: 'online'
        }

        this.$contacts.append(template(context));
    },
    getListContacts: function(){
        $.get(paths.USERS.SHOW)
            .done(usersResponse =>{
                if (!usersResponse.success) {
                    console.log(usersResponse);
                    return
                }
                
                $('#contacts').html('');
                this.listUsers = usersResponse.users;

                for (const user of usersResponse.users) {
                    this.render(user);
                }
            });
    }
}

/**
 * Inicializa a factory
 */
usersFactory.init();

/**
 * Requisita a lista de usuarios
 */
function getUsers(){
    const nameUser = $('#search').val();
    
    if (nameUser.length === 0) {
        $('#clear-search').click();
    } else {
        $('#clear-search').html('<i class="far fa-trash-alt"></i>');
    }

    $.get(paths.USERS.SEARCH, { nameUser })
        .done(usersResponse =>{
            if (!usersResponse.success) {
                console.log(usersResponse);
                return
            }

            $('#contacts').html('');
 
            if (usersResponse.users.length === 0) {
                $('#contacts').html(
                    '<p class="not-users">Nenhum usuário encontrado.</p>'
                );
                return
            }

            usersFactory.listUsers = usersResponse.users;

            for (const user of usersResponse.users) {
                usersFactory.render(user);
            }
        });
}

/**
 * Debounce search
 */
$('#search').keydown(_.debounce(getUsers, DEBOUNCE_TIME));

/**
 * Troca o icone caso search esteja vazio e descelecionado
 */
$('#search').focusout(function() {
    const val = $(this).val();
    
    if (val.length === 0) {
        $('#clear-search').html('<i class="fas fa-search"></i>');
    }
});

/**
 * Limpa a pesquisa de usuarios
 */
$('#clear-search').click(function(){
    $(this).html('<i class="fas fa-search"></i>');
    $('#search').val('');
    
    usersFactory.getListContacts();
})

/* -------------------------------- Socket --------------------------------- */

/**
 * Factory para o socket.io
 */
const socketFactory = {

    init: function() {
        this.cacheDOM();
        this.scrollToBottom();
    },

    cacheDOM: function() {
        this.$chatHistory = $('.chat-history');
        this.$chatHistoryList = $('#chat-history-list');
    },

    scrollToBottom: function() {
        this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
    },

    diaMsg: function(date){
        const [dia, mes, ano] = date.split('/');
        const [diaCurr, mesCurr, anoCurr] = new Date()
            .toLocaleString()
            .split(' ')[0]
            .split('/');

        if (anoCurr !== ano || mesCurr !== mes) {
            return date;
        } 
        
        if ((Number(diaCurr) - 1) === dia) {
            return 'Ontem';
        }

        return 'Hoje'
    },

    getTimeDiaMsg: function(dateCreatedMsg) {
        const [date, time] = new Date(dateCreatedMsg).toLocaleString().split(' ');

        const timeMsg = time.replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        const statusMsg = this.diaMsg(date);

        return `${timeMsg}, ${statusMsg}`;
    },

    render: function(message) {
        this.scrollToBottom();
        const userIdSession = USER_LOGGED.id;
        const template = Handlebars.compile($("#msg-template").html());
        const context = {
            createdAt: this.getTimeDiaMsg(message.created_at),
            messageOutput: message.body,
            userName: (message.from_name) ? message.from_name : USER_LOGGED.name,
            className: ''
        }
        
        if (Number(userIdSession) === Number(message.to_user)) {
            context.className = 'clearfix';
        }

        this.$chatHistoryList.append(template(context));
        this.scrollToBottom();
    }
}

/**
 * Inicializa a factory
 */
socketFactory.init();

/**
 * Observa o canal e recebimento das mensagens cridas
 */
Socket.on(`receive-message-${USER_LOGGED.token}`, function(message){
    console.log(message);
    if (!message.success) {
        console.log(message);
        return
    }
    
    const post = message.post;

    if (post.from_user === usersFactory.userSelected.id) {
        socketFactory.render(post);
    } else {
        usersFactory.getListContacts();
    }

});

/**
 * Pega as mensagens do contato selecionado
 * 
 * @param tokenCont 
 * @param idContact 
 */
function getMessages(idContact){
    $.get(paths.MESSAGES, { idContact })
        .done(messages =>{
            if (!messages.success) {
                console.log(messages);
                return
            }
            
            selectUserChat(idContact);
            $('#chat-history-list').html("");

            for (const message of messages.posts) {
                socketFactory.render(message);
            }
        });
}

/**
 * Seleciona um usuario para o chat
 * 
 * @param idUser 
 */
function selectUserChat(idUser){
    usersFactory.userSelected = usersFactory.listUsers
        .find(user => Number(user.id) === Number(idUser));

    $('#name-user-selected').html(usersFactory.userSelected.name);
    $('#chat-container').children().removeClass('inicial');
    $('#baner').addClass('active');
}

/* ----------------------------------Form msg ------------------------------- */

$('#body').keydown(function(event){
    var char = event.which || event.keyCode;

    if(char === ENTER_KEY){
        event.preventDefault();
        if(event.shiftKey){
            // shift + enter = Quebra linha
            $(this).val($(this).val() + '\n');
            return;
        }
        
        $('#chat').submit();
    }
});

$('#chat').submit(event => {
    event.preventDefault();
    
    const from_user = USER_LOGGED.id;
    const to_user = usersFactory.userSelected.id;
    const token = usersFactory.userSelected.token;
    const body = $('#body').val();
    const created_at = new Date();

    if (from_user && to_user && body.length) {
        const msgObj = {from_user, to_user, body, token, created_at};
        
        Socket.emit('send-message', msgObj);
        socketFactory.render(msgObj);
        $('#body').val("");
    }
});