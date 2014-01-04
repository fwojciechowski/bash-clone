/**
 * Created by vic on 12/28/13.
 */
var add = {
    init: function(){
        $('.add form').on('submit', function(event){
            event.preventDefault();
            var form = $(this);
            $.ajax({
                url: '/add',
                type: 'POST',
                data: JSON.stringify(
                    form.serializeArray()
                ),
                dataType: 'json',
                contentType: 'application/json',
                timeout: 3000,
                success: function(){
                    console.log("Success!");
                    form.remove();
                    $('.add').hide().append('<p>Thank you.</p>').fadeIn();
                },
                error: function() {
                    console.log("Error!");
                }

            });
        });
}};

$(document).ready(function(){
   add.init();//
});