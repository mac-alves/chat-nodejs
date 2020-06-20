(function(){

    const socketFactory = {

        init: function() {
            this.cacheDOM();
            this.scrollToBottom();
        },

        cacheDOM: function() {
            this.$chatHistory = $('.chat-history');
            this.$chatHistoryList =  this.$chatHistory.find('ul');
        },

        scrollToBottom: function() {
            this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
        },

        render: function(message) {
            this.scrollToBottom();

            if (this.messageToSend.trim() !== '') {
                const template = Handlebars.compile($("#msg-template").html());
                const context = {
                    createdAt: '10:14, hoje',
                    userName: 'mac',
                    messageOutput: 'this.messageToSend',
                };
      
                this.$chatHistoryList.append(template(context));
                this.scrollToBottom();
              
                // responses
                var templateResponse = Handlebars.compile($("#msg-response-template").html());
                const contextResponse = {
                    createdAt: '10:14, hoje',
                    userName: 'keren',
                    messageOutput: 'this.messageToSend',
                };
              
                setTimeout(function() {
                    this.$chatHistoryList.append(templateResponse(contextResponse));
                    this.scrollToBottom();
                }.bind(this), 1500);
            }
        }
    }

    Socket.on('previousMessages', function(messages){
        console.log(messages);
        
        for (message of messages) {
            // menssageRender(message);
        }			
    });

    Socket.on('receiveMessage', function(messages){
        console.log(messages);
        // menssageRender(message);
        for (message of messages) {
            // menssageRender(message);
            console.log(getFormatedTime(message.created_at));
            
        }
    });
})();