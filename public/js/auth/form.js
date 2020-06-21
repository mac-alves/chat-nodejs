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
    
    const from_user = localStorage.getItem('@userId');
    const to_user = $('#to_user').val();
    const body = $('#body').val();
    const created_at = new Date();

    if (from_user.length && to_user.length && body.length) {
        const msgObj = {from_user, to_user, body, created_at};

        Socket.emit('sendMessage', msgObj);
        $('#body').val("");
    }
});
