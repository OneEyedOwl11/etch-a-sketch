$("#colour").change(function(event) {
    console.log($(this).val());
    $("#color_front").css('background-color',$(this).val());
});

$("#color_front").click(function(event) {
    $("#colour").click();
});