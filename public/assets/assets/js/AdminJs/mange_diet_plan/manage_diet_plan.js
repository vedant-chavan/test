$(document).ready(function () {
    $(document).on("click", ".add_diet_plan", function (e) {
        // alert(hii);
        $("#manage_diet_plan_form").validate({
            ignore: [],
            debug: false,
            rules: {
                diet_categories: {
                    required: true,
                }
            },
            messages: {
                diet_categories: {
                    required: "Please select the option",
                } 
            },
            submitHandler: function (form) {
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                var formData = new FormData(form);
                    $.ajax({
                        url: '/admin/insert_diet_plan',
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            
                            if (result.status == 200) {
                                toastr.success('Diet plan Added successfully');
                                setTimeout(function () {
                                    window.location.href = "/admin/manage_diet_plan";
                                }, 1000);
                            } else {
                                toastr.error(result.message);
                            }
                        },
                        error: function () {
                            toastr.error("Something went wrong");
                        }
                    });
            }
        });
    });
    
     // Edit main diet plan start here
    $(document).on("click", ".edit_past_session", function (e) {
        $("#edit_manage_past_session_form").validate({
            ignore: [],
            debug: false,
            rules: {
                activity_name: {
                    required: true,
                },
                video_teaser_url: {
                    required: true,
                }
            },
            messages: {
                activity_name: {
                    required: "Please enter this filed",
                },
                video_teaser_url: {
                    required: "Please enter this filed",
                }
            },
            submitHandler: function (form) {
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                var formData = new FormData(form);
                // console(formData);
                e.preventDefault(),
                    $.ajax({
                        url: '/admin/update_past_session',
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            let response = $.parseJSON(result);
                            // console.log(response);
                            if (response.status == 200) {
                                toastr.success('Past Session Added successfully');
                                setTimeout(function () {
                                    window.location.href = "/admin/manage_activities";
                                }, 1000);
                            } else {
                                toastr.error("Something went wrong");
                            }
                        },
                    });
            }
        });
    });
     // Edit main diet plan end here

    
      // delete main diet plan start here
    $(document).on("click", ".delete_past_session", function () {
       
        var delete_id = $(this).data('id');
//         alert(delete_id);
        $('#delete_manage_session_id').val(delete_id);
        $('#delete_opt_session').modal('show');
    });

    $(document).on("click", ".delete_activity_button", function (e) {
        //        alert();
        e.preventDefault();
        var delete_id = $('#delete_manage_session_id').val();
//                 alert(delete_id);
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $.ajax({
            type: "DELETE",
            url: "/admin/delete_past_session/" + delete_id,
            success: function (response) {
//                console.log(response);
                toastr.info("Passed Session Deleted successfully");
                $('#delete_opt_session').modal('hide');
                window.location.href = "/admin/manage_activities";
            }
        });
    });
    // delete main diet plan end here
});