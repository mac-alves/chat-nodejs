const URL_LOCAL = 'http://localhost:3000';
const Socket = io(URL_LOCAL);

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
        this.$chatHistoryList = this.$chatHistory.find('ul');
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
        const userIdSession = localStorage.getItem('@userId');
        const template = Handlebars.compile($("#msg-template").html());
        const context = {
            createdAt: this.getTimeDiaMsg(message.created_at),
            messageOutput: message.body,
            userName: message.from_name,
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
Socket.on(CANAL_MSG_RECEBIDAS, function(message){
    if (!message.success) {
        console.log(message);
        return
    }

    socketFactory.render(message.post);
});

/**
 * Pega as mensagens do contato selecionado
 * 
 * @param idContact 
 */
function getMessages(idContact){
    $.get(paths.MESSAGES, { idContact })
        .done(messages =>{
            if (!messages.success) {
                console.log(messages);
                return
            }
            
            $('#to_user').val(idContact);

            for (const message of messages.posts) {
                socketFactory.render(message);
            }
        });
}