(function(){

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

    chat.init();

    /**
     * Logout
     */
    $('#logout').click(event => {
        $.post('/logout', {}, (data, status, xhr) => {
            localStorage.clear();
            responseSuccess();
        }, error => {
            console.log("Erro: ", error);
            responseError(error.responseJSON.error)
        });
    });
})();