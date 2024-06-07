$(document).ready(function () {

    $(".view_faq_qus_ans").click(function () {
        // alert();
        var faq_question = $(this).data("question");
        var faq_answers = $(this).data("answer");
        $("#show_question").html(faq_question);
        $("#show_answers").html(faq_answers);
    });

    // add faq start here
    
    $(document).on("click", "#add_faq", function (e) {
        $('#add_faq_form').validate({
            rules: {
                category_name: {
                    required: true,
                },
                question: {
                    required: true,
                    minlength: 10,
                    maxlength: 250,
                },
                answer: {
                    required: true,
                    minlength: 10,
                    maxlength: 250,
                },
                // video_url: {
                //     required: true,
                //     url: true,
                // },
            },
            messages: {
                category_name: {
                    required: "Please select a category",
                },
                question: {
                    required: "Please enter the question.",
                    minlength: "Please enter at least 10 characters.",
                    maxlength: "Please enter no more than 250 characters.",
                },
                answer: {
                    required: "Please enter the answer.",
                    minlength: "Please enter at least 10 characters.",
                    maxlength: "Please enter no more than 250 characters.",
                },
                // video_url: {
                //     required: "Please enter url",
                //     url: "Please enter valid url",
                // },
            },
      
          submitHandler: function (form) {
                var formData = new FormData(form);
                // console(formData);
                e.preventDefault(),
                    $.ajax({
                        url: '/admin/add_faq',
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            // let response = $.parseJSON(result);
                            // console.log(response);
                            if (result.status == 200) {
                                toastr.success('Faq added successfully');
                                setTimeout(function () {
                                    window.location.href = "/admin/manage_faq";
                                }, 2000);
                            } else {
                                toastr.error("Something went wrong");
                            }
                        },
                    });
            }
        });
    });
    
    // add faq end here

    // Delete Faq start here
    
    $(document).on("click", ".delete_faq", function () {
        var delete_id = $(this).data('id');
        // alert(delete_id);
        $('#delete_faq_id').val(delete_id);
        $('#delete_opt_faq').modal('show');
    });

    $(document).on("click", ".delete_faq_button", function (e) {
        e.preventDefault();
        var delete_id = $('#delete_faq_id').val();
        // alert(delete_id);
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $.ajax({
            type: "DELETE",
            url: "/admin/delete_faq/" + delete_id,
            // url:"/delete_short_clips/"+delete_id,
            success: function (response) {
                console.log(response);
                toastr.info("Faq Deleted successfully");
                $('#delete_opt_faq').modal('hide');
                window.location.href = "/admin/manage_faq";
            }
        });
    });
    
    // Delete Faq end here


    // Update Faq end here
    
    $(document).on("click", "#edit_faq_value", function (e) {

        var edit_faq_id = $(this).data('id');
        var edit_category_id = $(this).data('category_id');
        var edit_question = $(this).data('question');
        var edit_answer = $(this).data('answer');
        var edit_video_url = $(this).data('video_url');
        $('#edit_faq_id').val(edit_faq_id);
        // $('#edit_category_id').val(edit_category_id);
        $('#faq_question').val(edit_question);
        $('#faq_answer').val(edit_answer);
        $('#faq_video_url').val(edit_video_url);
        // alert(edit_category_id);
        $("#mydropdownlist").val(edit_category_id).prop('selected', true);
        // $("#mydropdownlist option[value='"+edit_category_id+"']").prop('selected', true);
        // alert(edit_category_id);
    });

    $(document).on("click", "#edit_faq", function (e) {
        // $('#edit_categories').on("click", function (e) {
        // alert();
        $('#edit_faq_form').validate({
            rules: {
                category_id: {
                    required: true,
                },
                question: {
                    required: true,
                    minlength: 10,
                    maxlength: 250,
                },
                answer: {
                    required: true,
                    minlength: 10,
                    maxlength: 250,
                },
                video_url: {
                    required: true,
                    url: true,
                },
            },
            messages: {
                category_id: {
                    required: "Please select a category",
                },
                question: {
                    required: "Please enter the question.",
                    minlength: "Please enter at least 10 characters.",
                    maxlength: "Please enter no more than 250 characters.",
                },
                answer: {
                    required: "Please enter the answer.",
                    minlength: "Please enter at least 10 characters.",
                    maxlength: "Please enter no more than 250 characters.",
                },
                video_url: {
                    required: "Please enter url",
                    url: "Please enter valid url",
                },
            },
              submitHandler: function (form) {
                var formData = new FormData(form);
                // console(formData);
                e.preventDefault(),
                    $.ajax({
                        url: '/admin/update_faq',
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            // let response = $.parseJSON(result);
                            // console.log(response);
                            if (result.status == 200) {
                                toastr.success('Faq updated successfully');
                                setTimeout(function () {
                                    window.location.href = "/admin/manage_faq";
                                }, 2000);
                            } else {
                                toastr.error("Something went wrong");
                            }
                        },
                    });
            }
        });
    });
    // Update Faq end here


    // Faq categories status change start here 
    // $(document).on("","", function(e){
    $("#mng-sings-two").on("change", ".active_faq", function () {
        console.log('handler');
        var status = $(this).prop("checked") == true ? 1 : 0;
        var faq_id = $(this).data("id");
        // alert(faq_id);
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/admin/change_faq_Status",
            data: {
                status: status,
                faq_id: faq_id,
            },
            success: function (data) {
                if (status == 1) {
                    toastr.options = {
                        "timeOut": 500
                    }
                    toastr.success("Status Activate successfully. !!");
                } else {
                    toastr.error("Status Deactivate successfully. !!");
                }

                //              location.reload();
                //              console.log(data);
            },
        });
    });
    // Faq categories status change end here 
});
