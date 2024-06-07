$(document).ready(function () {
    
    $('#selectedDate').on('change', function () {
        var selectedDate = $(this).val();
        var dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', {weekday: 'long'});
        $('#dayOfWeek').val(dayOfWeek);
    });
    
    $(document).on("click", ".add_past_session", function (e) {
        $("#manage_past_session_form").validate({
            ignore: [],
            debug: false,
            rules: {
                activity_name: {
                    required: true,
                },
                video_teaser_url: {
                    required: true,
                },
                activity_duration: {
                    required: true,
                },
                myFile: {
                    required: true,
                },
                date: {
                    required: true,
                },
                day: {
                    required: true,
                },
            },
            messages: {
                activity_name: {
                    required: "Please enter this filed",
                },
                video_teaser_url: {
                    required: "Please enter this filed",
                },
                activity_duration: {
                    required: "Please enter this filed",
                },
                myFile: {
                    required: "Please enter this filed",
                },
                date: {
                    required: "Please enter this filed",
                },
                day: {
                    required: "Please enter this filed",
                },
            },
            submitHandler: function (form) {
                // $("#add_past_session").html("saving....");
                // $("#add_past_session").prop("disabled", true);
                var formData = new FormData(form);
                // console(formData);
                e.preventDefault(),
                    $.ajax({
                        url: '/admin/insert_past_session',
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            // let response = $.parseJSON(result);
                            // console.log(response);
                            let id = result.id;
                            if (result.status == 200) {
                                toastr.success('Past Session Added successfully');
                                setTimeout(function () {
                                    window.location.href = "/admin/past_activity_day/"+id;
                                }, 1000);
                            } else if(result.status == 422){
                                toastr.error('The File Must Not Be Greater Than 400 KB.');
                            }else if(result.status == 400){
                                toastr.error(result.error_msg);
                            }else {
                                toastr.error("Something went wrong");
                            }
                        },
                    });
            }
        });
    });
    
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
                },
                activity_duration: {
                    required: true,
                },

                date: {
                    required: true,
                },
                day: {
                    required: true,
                },
            },
            messages: {
                activity_name: {
                    required: "Please enter this filed",
                },
                video_teaser_url: {
                    required: "Please enter this filed",
                },
                activity_duration: {
                    required: "Please enter this filed",
                },

                date: {
                    required: "Please enter this filed",
                },
                day: {
                    required: "Please enter this filed",
                },
            },
            submitHandler: function (form) {
                $("#edit_past_session").html("saving....");
                $("#edit_past_session").prop("disabled", true);
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
                            // let result = $.parseJSON(result);
                            // console.log(result);
                            let id = result.id;
                            if (result.status == 200) {
//                                var url = "/past_activity_day/" + result.id;
                                toastr.success('Past Session Added successfully');
                                setTimeout(function () {
                                    window.location.href = "/admin/past_activity_day/"+id;
                                }, 1000);
                            }else if(result.status == 422){
                                toastr.error('The File Must Not Be Greater Than 400 KB.');
                            }else if(result.status == 400){
                                toastr.error(result.error_msg);
                            } else {
                                toastr.error("Something went wrong");
                            }
                        },
                    });
            }
        });
    });
    
      // delete main activity start here
    $(document).on("click", ".delete_past_activity_day", function () {
       
        var delete_id = $(this).data('id');
//         alert(delete_id);
// alert(delete_id);
        $('#delete_past_activity_days_id').val(delete_id);
        $('#delete_past_opt').modal('show');
    });

    $(document).on("click", ".delete_past_activity_days_button", function (e) {
        //        alert();
        e.preventDefault();
        var delete_id = $('#delete_past_activity_days_id').val();
                // alert(delete_id);
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
                window.location.reload();
            }
        });
    });
    // delete main activity end here
});