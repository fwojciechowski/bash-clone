/**
 * Created by vic on 1/3/14.
 */
var vote = {
    init : function() {
        $(".vote").on('click', function(e) {
            e.preventDefault();
            var count = $(this).siblings(".likes-count");
            $.ajax({
                url: $(this).attr("href"),
                dataType: "json",
                success: function(response) {
                    count.html(response.likes);
                }
            });
        });
    }
};

$(document).ready(function(){
    vote.init();
});