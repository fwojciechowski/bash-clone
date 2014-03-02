function addLineBreak(text) {
    return text.replace(/\r\n/g, '<br />').replace(/[\r\n]/g, '<br />');
}

var lineBreak = {
    init : function() {
        $('.quote').each(function() {
            $(this).html(addLineBreak($(this).html()));
        });
    }
};

$(document).ready(function(){
    lineBreak.init();
});