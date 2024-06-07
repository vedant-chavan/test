$(document).ready(function () {
    $("#addtwo").click(function () {
        $("#itemstwo").append(
            '<div class="next-referral "><input id="textinput" name="textinput" type="text" placeholder="" class="form-control input-md"><a class="remove_input">-</a></div>'
        );
    });

    $(document).on('click', '.remove_input', function () {
        var x = $(this).closest('.next-referral').remove();
//        console.log('hello');
    });

    $("#add").click(function () {
        $("#items").append(
            '<div class="next-referral "><input id="textinput" name="textinput" type="text" placeholder="" class="form-control input-md"><a class="remove_input">-</a></div>'
        );
    });

    $(document).on('click', '.remove_input', function () {
        var x = $(this).closest('.next-referral').remove();
        console.log('hello');
    });

});


