
// add activity theme script
$(document).ready(function () {
   $('.select2[multiple]').select2({
    width: '100%',
    closeOnSelect: false
});
    //===============================================================Theme Script===================================================

    //add main activity theme script for benefits start here
    $(document).ready(function () {
        $("#addnew").click(function (e) {
            e.preventDefault(),
                    $("#itemsnew").append(
                    '<div class="next-referral"><input id="textinput1" name="benefits[]" type="text" placeholder="" class="form-control input-md w-75"><a class="remove_input">-</a></div>'
                    );
        });

        $(document).on('click', '.remove_input', function () {
            var x = $(this).closest('.next-referral').remove();
            //            console.log('hello');
        });
    });
    //add main activity theme script for benefits end here

    //add main activity theme script for pre-requsetion start here
    $(document).ready(function () {
        $("#addonenew").click(function (e) {
            e.preventDefault(),
                    $("#itemsonenew").append(
                    '<div class="next-referral "><input id="textinput" name="pre_requisites[]" type="text" placeholder="" class="form-control input-md w-75"><a class="remove_input">-</a></div>'
                    );
        });

        $(document).on('click', '.remove_input', function () {
            var x = $(this).closest('.next-referral').remove();
        });
    });
    //add main activity theme script for pre-requsetion end here

    //edit main activity theme script for benefits start here
    $("#edit_two_benf").click(function (e) {
        e.preventDefault(),
                $("#edit_two_benf_group").append(
                '<div class="next-referral"><input id="textinput" name="benefits[]" type="text" placeholder="" class="form-control input-md"><a class="remove_input">-</a></div>'
                );
    });
    $(document).on('click', '.remove_input', function () {
        var x = $(this).closest('.next-referral').remove();
        //        console.log('hello');
    });
    //edit main activity theme script for benefits start here

    //edit main activity theme script for pre-requsetion start here
    $("#add_two").click(function (e) {
        e.preventDefault(),
                $("#items_two").append(
                '<div class="next-referral"><input id="textinput" name="pre_requisites[]" type="text" placeholder="" class="form-control input-md"><a class="remove_input">-</a></div>'
                );
    });

    $(document).on('click', '.remove_input', function () {
        var x = $(this).closest('.next-referral').remove();
    });
    //edit main activity theme script for pre-requsetion end here
   $(document).on('click', '#addnew', function(e) {
    e.preventDefault();
    // Add validation rule for the new input field
    $('#itemsnew input[name="benefits[]"]').last().rules('add', {
        required: true,
        messages: {
            required: "Please enter benefits"
        }
    });

    // Trigger validation
    $('#itemsnew input[name="benefits[]"]').last().valid();
});

    //===============================================================Theme Script End===================================================

    // add main activity start here
    $(document).on("click", ".add_main_activity", function (e) {
        var submit_val = $(this).val();
        $('#manage_activity_form').validate({
            ignore: [],
            debug: false,
            rules: {
                activity_name: {
                    required: true
                },
                activity_title: {
                    required: true
                },
                description: {
                    required: true
                },
                start_date: {
                    required: true
                },
                end_date: {
                    required: true
                },
                teacher_id: {
                    required: true
                },
                'faq_id[]':{
                  required: true  
                },
                // video_teaser_url: {
                //   required: true,
                //   url: true,
                // },
                "benefits[]": {
                    required: true
                },
                subscription_id: {
                    required: true
                },
                'pre_requisites[]': {
                    required: true
                }  
            },
            messages: {
                activity_name: {
                    required: "Please enter activity name",
                    maxlength: "Title should not be more than 80 characters",
                },
                activity_title: {
                    required: "Please enter activity title",
                    maxlength: "Title should not be more than 40 characters",
                },
                description: {
                    required: "Please enter description",
                },
                start_date: {
                    required: "Please enter start date",
                },
                end_date: {
                    required: "Please enter end date",
                },
                teacher_id: {
                    required: "Please select teacher",
                },
                'faq_id[]':{
                  required: "Please select faqs",
                },
                // video_teaser_url: {
                //     required: "Please enter url",
                //     url: "Please enter valid url",
                // },
                "benefits[]": {
                    required: "Please enter benifits",
                },
                subscription_id: {
                    required: "Please enter this filed",
                },
                'pre_requisites[]': {
                    required: "Please enter pre-requisites",
                }

            },
            submitHandler: function (form) {
                
            if(submit_val == "save"){
                $("#save").html("saving....");
                $("#save").prop("disabled", true);
            }else{
                $("#save_create").html("saving....");
                $("#save_create").prop("disabled", true);
            }
            // $(".add_main_activity").html("saving....");
            // $(".add_main_activity").prop("disabled", true);
                var formData = new FormData(form);
                // console(formData);
//                e.preventDefault(),
                        $.ajax({
                            url: '/admin/insert_main_activity',
                            type: 'POST',
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (result) {
                                // let response = $.parseJSON(result);
                                if (result.status == 200) {
                                    setTimeout(function () {
                                        if (submit_val == "save") {
                                            var url = "/admin/manage_activities";
                                            toastr.success("Activity added successfully");
                                            window.location.replace(url);
                                        } else {
                                            setTimeout(function () {
                                                window.location.href = "/admin/add_summer_sweat/" + response.activity_data;
                                            }, 1000);
                                            toastr.success("Activity added successfully");
                                        }
                                    }, 1000);
                                } else if(result.status == 422){
                                    toastr.error('The File Must Not Be Greater Than 400 KB.');
                                }else {
                                    toastr.error("Something went wrong");
                                }
                            },
                        });
            }
        });
    });
    // add main activity end here

    // edit main activity start here
    $(document).on("click", "#edit_main_activity", function (e) {
        $('#manage_activity_form').validate({
            ignore: [],
            debug: false,
            rules: {
                activity_name: {
                    required: true
                },
                activity_title: {
                    required: true
                },
                description: {
                    required: true
                },
                start_date: {
                    required: true
                },
                end_date: {
                    required: true
                },
                teacher_id: {
                    required: true
                },
                benifits: {
                    required: true
                },
                pre_requisites: {
                    required: true
                }
            },
            messages: {
                activity_name: {
                    required: "Please enter this filed",
                },
                activity_title: {
                    required: "Please enter this filed",
                },
                description: {
                    required: "Please enter this filed",
                },
                start_date: {
                    required: "Please enter this filed",
                },
                end_date: {
                    required: "Please enter this filed",
                },
                teacher_id: {
                    required: "Please enter this filed",
                },
                benifits: {
                    required: "Please enter this filed",
                },
                pre_requisites: {
                    required: "Please enter this filed",
                }

            },
            submitHandler: function (form) {
                // $("#edit_main_activity").html("saving....");
                // $("#edit_main_activity").prop("disabled", true);
                var formData = new FormData(form);
                // console(formData);
                e.preventDefault(),
                        $.ajax({
                            url: '/admin/update_main_activity',
                            type: 'POST',
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (result) {
                                // let response = $.parseJSON(result);
                                if (result.status == 200) {
                                    toastr.success('Activity Updated successfully');
                                    setTimeout(function () {
                                        window.location.href="/admin/manage_activities"
                                    }, 1000);
                                }else if(result.status == 422){
                                    toastr.error('The File Must Not Be Greater Than 400 KB.');
                                } else {
                                    toastr.error("Something went wrong");
                                }
                            },
                        });
            }
        });
    });
    // edit main activity end here
    
    //start edit upcoming activty form
    $(document).on("click", "#edit_main_upcoming_activity", function (e) {
        $('#manage_upcoming_activity_form').validate({
            ignore: [],
            debug: false,
            rules: {
                activity_name: {
                    required: true
                },
                activity_title: {
                    required: true
                },
                description: {
                    required: true
                },
                start_date: {
                    required: true
                },
                end_date: {
                    required: true
                },
                teacher_id: {
                    required: true
                },
                video_teaser_url: {
                    required: true
                },
                benifits: {
                    required: true
                },
                pre_requisites: {
                    required: true
                }
            },
            messages: {
                activity_name: {
                    required: "Please enter this filed",
                },
                activity_title: {
                    required: "Please enter this filed",
                },
                description: {
                    required: "Please enter this filed",
                },
                start_date: {
                    required: "Please enter this filed",
                },
                end_date: {
                    required: "Please enter this filed",
                },
                teacher_id: {
                    required: "Please enter this filed",
                },
                video_teaser_url: {
                    required: "Please enter this filed",
                },
                benifits: {
                    required: "Please enter this filed",
                },
                pre_requisites: {
                    required: "Please enter this filed",
                }

            },
            submitHandler: function (form) {
                $("#edit_main_upcoming_activity").html("saving....");
                $("#edit_main_upcoming_activity").prop("disabled", true);
                var formData = new FormData(form);
                // console(formData);
                e.preventDefault(),
                        $.ajax({
                            url: '/admin/update_upcoming_activity',
                            type: 'POST',
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (response) {
                                // let response = $.parseJSON(result);
                                if (response.status == 200) {
                                    toastr.success('Activity Updated successfully');
                                    setTimeout(function () {
                                        window.location.href="/admin/manage_activities"
                                    }, 1000);
                                } else {
                                    toastr.error("Something went wrong");
                                }
                            },
                        });
            }
        });
    });
    
    //end of edit upcoming activty form
    
    // delete main activity start here
    $(document).on("click", ".delete_main_activity", function () {
        var delete_id = $(this).data('id');
        $('#delete_manage_activity_id').val(delete_id);
        $('#delete_opt_main_session').modal('show');
    });

    $(document).on("click", ".delete_activity_button", function (e) {
        //        alert();
        e.preventDefault();
        var delete_id = $('#delete_manage_activity_id').val();
                // alert(delete_id);
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $.ajax({
            type: "DELETE",
            url: "/admin/delete_main_activity/" + delete_id,
            // url:"/delete_short_clips/"+delete_id,
            success: function (response) {
//                console.log(response);
                toastr.info("Activity Deleted successfully");
                $('#delete_opt').modal('hide');
                window.location.reload();
            }
        });
    });
    // delete main activity end here

    $(document).ready(function () {
        $('.log-close').on('click', function () {
            $('#delete_opt_main_session').modal('hide');
        });
    });
    //for view discription
    $(".view_desc").click(function () {
        var desc = $(this).data("desc");
        $("#show_desc").html(desc);
    });
    //for view discription end
    
     $('#Upcomingmng-sings').DataTable();
});
