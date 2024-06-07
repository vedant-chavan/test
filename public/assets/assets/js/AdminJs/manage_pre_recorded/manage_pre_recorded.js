// view page custom theme code

    $(document).ready(function () {
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
    $(document).ready(function () {
        $("#addtwo").click(function () {
            $("#itemstwo").append(
                    '<div class="next-referral "><input id="textinput" name="textinput" type="text" placeholder="" class="form-control input-md"><a class="remove_input">-</a></div>'
                    );
        });

        $(document).on('click', '.remove_input', function () {
            var x = $(this).closest('.next-referral').remove();
            console.log('hello');
        });
    });
    
// view page custom theme code end

// edit page custom theme code

    $(document).ready(function () {
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
    $(document).ready(function () {
        $("#addtwo").click(function () {
            $("#itemstwo").append(
                    '<div class="next-referral "><input id="textinput" name="textinput" type="text" placeholder="" class="form-control input-md"><a class="remove_input">-</a></div>'
                    );
        });

        $(document).on('click', '.remove_input', function () {
            var x = $(this).closest('.next-referral').remove();
            console.log('hello');
        });
    });
    
// edit page custom theme code end

// add page custom theme code

    $(document).ready(function () {
        $("#add").click(function () {
            $("#items").append(
                    '<div class="next-referral nt-referral">\n\
                         <div class="mn-div">\n\
                        <div class="main-div">\n\
                        <div class="inp-div"> \n\
                          <label>Video Title :</label>\n\
                        <div class="inner-nt-refer">\n\
                            <input id="textinput" name="textinput" type="text" placeholder="" class="form-control input-md">\n\
                              \n\
                        </div> \n\
                         </div>\n\
                        <div class="inp-div">\n\
                        <label>Video Description :</label>\n\
                        <textarea></textarea>\n\
                        </div>\n\
                        <div class="inp-div">\n\
                        <label>Video URL :</label>\n\
                        <input type="url" value="">\n\
                        </div>\n\
                       </div>\n\
                         <a class="remove_input">-</a>\n\
                        </div>\n\
                     </div>'

                    );
        });

        $(document).on('click', '.remove_input', function () {
            var x = $(this).closest('.next-referral').remove();
            console.log('hello');
        });
    });
    $(document).ready(function () {
        $("#addtwo").click(function () {
            $("#itemstwo").append(
                    '<div class="next-referral "><input id="textinput" name="textinput" type="text" placeholder="" class="form-control input-md"><a class="remove_input">-</a></div>'
                    );
        });

        $(document).on('click', '.remove_input', function () {
            var x = $(this).closest('.next-referral').remove();
            console.log('hello');
        });
    });

// add page custom theme code end
