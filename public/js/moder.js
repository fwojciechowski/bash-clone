/**
 * Created by vic on 1/9/14.
 */
var moder = {
    init : function() {
        $('.moder').on('click', function(e){
            e.preventDefault();
            var entryBlock = $(this).closest(".entry");
            $.ajax({
                url: $(this).attr("href"),
                dataType: "json",
                timeout: 5000,
                success: function(response) {
                    switch (response.entryStatus) {
                        case "accepted":
                            entryBlock.fadeToggle();
                            break;
                        case "deleted":
                            entryBlock.fadeToggle();
                            break;
                        default:
                            break;
                    }
                }
            });
        });
    }
};

$(document).ready(function() {
    moder.init();
});