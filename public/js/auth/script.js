const DEBOUNCE_TIME = 1000;

/**
 * Factory do painel de chat
 */
const chat = {
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
chat.init();

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
const users = {
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

                for (const user of usersResponse.users) {
                    this.render(user);
                }
            });
    }
}

/**
 * Inicializa a factory
 */
users.init();

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

            for (const user of usersResponse.users) {
                users.render(user);
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
    
    users.getListContacts();
})