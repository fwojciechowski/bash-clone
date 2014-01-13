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
                timeout: 5000,
                success: function(response) {
                    if (response.likes) {
                        count.html(response.likes);
                    } else {
                        count.html("Already voted!");
                    }
                }
            });
        });
    }
};

$(document).ready(function(){
    vote.init();
});