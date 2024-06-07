//  Add theme code
 
 $(document).ready(function () {
        $("#add").click(function () {
            $("#items").append(
                    '<div class="next-referral "><input id="textinput" name="textinput" type="" class="form-control input-md"><a class="remove_input">-</a></div>'
                    );
        });

        $(document).on('click', '.remove_input', function () {
            var x = $(this).closest('.next-referral').remove();
            console.log('hello');
        });
    });
//  Add theme code end