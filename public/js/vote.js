var vote = {
    init : function() {
        $(".vote").on('click', function(e) {
            e.preventDefault();
            var count = $(this).siblings(".likes-count");
            var info = $(this).siblings(".vote-info");
            $.ajax({
                url: $(this).attr("href"),
                dataType: "json",
                timeout: 5000,
                success: function(response) {
                    if (response.likes) {
                        count.html(response.likes);
                    } else {
                        info.hide().html("Already voted!").fadeIn();
                    }
                }
            });
        });
    }
};

$(document).ready(function(){
    vote.init();
});