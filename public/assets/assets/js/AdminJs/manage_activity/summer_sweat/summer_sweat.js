$(document).ready(function () {
//=============================================add form js start=====================================================================

    //    add benifits js start
    $("#add_schedul_befs_btn").click(function (e) {
        e.preventDefault(),
                $("#itemstwo").append(
                '<div class="next-referral "><input id="textinput" name="benefits[]" type="text" placeholder="" class="form-control input-md"><a class="remove_input">-</a></div>'
                );
    });

    $(document).on("click", ".remove_input", function () {
        var x = $(this).closest(".next-referral").remove();
        console.log("hello");
    });

    //    add benifits js end

    //    add prerequisition js start
    $("#add_schedul_preq_btn").click(function (e) {
        e.preventDefault(),
                $("#items").append(
                '<div class="next-referral "><input id="textinput" name="pre_requisites[]" type="text" placeholder="" class="form-control input-md"><a class="remove_input">-</a></div>'
                );
    });

    $(document).on("click", ".remove_input", function () {
        var x = $(this).closest(".next-referral").remove();
        console.log("hello");
    });
    //    add prerequisition js end

    //============================================= add form js end =====================================================================

    //============================================= edit form js end =====================================================================

//  $(document).ready(function () {
    $("#edit_schedul_befs_btn").click(function (e) {
        e.preventDefault(),
                $("#form_group_edit_benifits").append(
                '<div class="next-referral "><input id="textinput_ben_edit" name="benefits[]" type="text" placeholder="" class="form-control input-md"><a class="remove_input">-</a></div>'
                );
    });

    $(document).on('click', '.remove_input', function () {
        var x = $(this).closest('.next-referral').remove();
    });
//    });


//    $(document).ready(function () {
    $("#edit_schedul_preq_btn").click(function (e) {
        e.preventDefault(),
                $("#form_group_edit_prequs").append(
                '<div class="next-referral "><input id="textinput_preqs_edit" name="pre_requisites[]" type="text" placeholder="" class="form-control input-md"><a class="remove_input">-</a></div>'
                );
    });

    $(document).on('click', '.remove_input', function () {
        var x = $(this).closest('.next-referral').remove();
    });
//    });

//============================================= edit form js end=====================================================================

    //add summer sweat
    $(document).on("click", ".add_new_schedule", function (e) {
//        e.preventDefault();
        var submit_val = $(this).val();
        $("#add_new_schedule_form").validate({
            ignore: [],
            debug: false,
            rules: {
                main_activity_name: {
                    required: true,
                },
                myFile: {
                    required: true,
                },
                activity_level: {
                    required: true,
                },
                description: {
                    required: true,
                },
                start_date: {
                    required: true,
                },
                end_date: {
                    required: true,
                },
            },
            messages: {
                main_activity_name: {
                    required: "Please enter this filed",
                },
                myFile: {
                    required: "Please enter this filed",
                },
                activity_level: {
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
            },
            submitHandler: function (form) {
                // $(".add_main_activity").html("saving....");
                // $(".add_main_activity").prop("disabled", true);
                var formData = new FormData(form);
                // console(formData);
//            e.preventDefault();
                $.ajax({
                    url: "/admin/insert_summer_sweat",
                    type: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (result) {
                        // let response = $.parseJSON(result);
                        if (result.status == 200) {
                            setTimeout(function () {
                                if (submit_val == "save") {
                                    var url = "/admin/summer_sweat/" + result.schedule_data;
                                    toastr.success("Schedule added successfully");
                                    window.location.replace(url);
                                } else {
                                    setTimeout(function () {
//                                    window.location.href = "/add_summer_sweat/" + response.schedule_data;
                                        window.location.reload();
                                    }, 1000);
                                    toastr.success("Schedule added successfully");
                                }
                            }, 1000);
                        } else if(result.status == 422){
                            toastr.error('The File Must Not Be Greater Than 400 KB.');
                        }else if (result.status == 400) {
                            setTimeout(function () {
                            }, 1000);
                            toastr.error(result.error_msg);
                        } else {
                            toastr.error("Something went wrong");
                        }
                    },
                });
            },
        });
    });
    // add summer sweat end here

    //add summer sweat start
    $(document).on("click", ".add_upcoming_schedule", function (e) {
//        e.preventDefault();
        var submit_val = $(this).val();
        $("#add_upcoming_schedule_form").validate({
            ignore: [],
            debug: false,
            rules: {
                main_activity_name: {
                    required: true,
                },
                myFile: {
                    required: true,
                },
                activity_level: {
                    required: true,
                },
                description: {
                    required: true,
                },
                start_date: {
                    required: true,
                },
                end_date: {
                    required: true,
                },
            },
            messages: {
                main_activity_name: {
                    required: "Please enter this filed",
                },
                myFile: {
                    required: "Please enter this filed",
                },
                activity_level: {
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
            },
            submitHandler: function (form) {
                // $(".add_upcoming_schedule").html("saving....");
                // $(".add_upcoming_schedule").prop("disabled", true);
                var formData = new FormData(form);
                // console(formData);
//            e.preventDefault();
                $.ajax({
                    url: "/admin/insert_upcoming_summer_sweat",
                    type: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (result) {
                        // let response = $.parseJSON(result);
                        if (result.status == 200) {
                            setTimeout(function () {
                                if (submit_val == "save") {
                                    var url = "/admin/summer_sweat_upcoming/" + result.schedule_data;
                                    toastr.success("Schedule added successfully");
                                    window.location.replace(url);
                                } else {
                                    setTimeout(function () {
//                                    window.location.href = "/add_summer_sweat/" + result.schedule_data;
                                        window.location.reload();
                                    }, 1000);
                                    toastr.success("Schedule added successfully");
                                }
                            }, 1000);
                        } else if(result.status == 422){
                            toastr.error('The File Must Not Be Greater Than 400 KB.');
                        }else if (result.status == 400) {
                            setTimeout(function () {
                            }, 1000);
                            toastr.error(result.error_msg);
                        } else {
                            toastr.error("Something went wrong");
                        }
                    },
                });
            },
        });
    });
    //add summer sweat end
    // edit main activity start here
    $(document).on("click", "#edit_main_activity_schedule", function (e) {
        $("#manage_activity_schedule_form").validate({
            ignore: [],
            debug: false,
            rules: {
                activity_name: {
                    required: true,
                },
                activity_title: {
                    required: true,
                },
                description: {
                    required: true,
                },
                subscription_id:{
                    required: true,
                },
                start_date: {
                    required: true,
                },
                end_date: {
                    required: true,
                },
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
                subscription_id:{
                    required: "Please select this filed",
                },
                start_date: {
                    required: "Please enter this filed",
                },
                end_date: {
                    required: "Please enter this filed",
                },
            },
            submitHandler: function (form) {
                // $("#edit_main_activity").html("saving....");
                // $("#edit_main_activity").prop("disabled", true);
                var formData = new FormData(form);
                // console(formData);
                e.preventDefault(),
                        $.ajax({
                            url: "/admin/update_summer_sweat",
                            type: "POST",
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (result) {
                                // let response = $.parseJSON(result);
                                if (result.status == 200) {
                                    toastr.success(
                                            "Activity Schedule Updated successfully"
                                            );
                                    setTimeout(function () {
                                        window.location.href = "/admin/summer_sweat/" + result.schedule_data;
                                    }, 1000);
                                }else if(result.status == 422){
                                    toastr.error('The File Must Not Be Greater Than 400 KB.');
                                }else if (result.status == 400) {
                                    setTimeout(function () {
                                    }, 1000);
                                    toastr.error(result.error_msg);
                                } else {
                                    $("#add_new_schedule_form").trigger("reset");
                                    toastr.error("Something went wrong");
                                }
                            },
                        });
            },
        });
    });
    // edit main activity end here

    //edit upcoming activity start
    $(document).on("click", "#edit_main_activity_upcoming_schedule", function (e) {
        $("#manage_activity_upcoming_schedule_form").validate({
            rules: {
                activity_name: {
                    required: true,
                },
                activity_level: {
                    required: true,
                },
                description: {
                    required: true,
                },
                start_date: {
                    required: true,
                },
                end_date: {
                    required: true,
                },
            },
            messages: {
                activity_name: {
                    required: "Please enter this filed",
                },
                activity_level: {
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
            },
            submitHandler: function (form) {
                // $("#edit_main_activity_upcoming_schedule").html("saving....");
                // $("#edit_main_activity_upcoming_schedule").prop("disabled", true);
                var formData = new FormData(form);
                // console(formData);
                e.preventDefault(),
                        $.ajax({
                            url: "/admin/update_upcoming_summer_sweat",
                            type: "POST",
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (result) {
                                // let response = $.parseJSON(result);
                                if (result.status == 200) {
                                    toastr.success(
                                            "Activity Schedule Updated successfully"
                                            );
                                    setTimeout(function () {
                                        window.location.href = "/admin/summer_sweat_upcoming/" + result.schedule_data;
                                    }, 1000);
                                }else if(result.status == 422){
                                    toastr.error('The File Must Not Be Greater Than 400 KB.');
                                }else if (result.status == 400) {
                                    setTimeout(function () {
                                    }, 1000);
                                    toastr.error(result.error_msg);
                                } else {
                                    $("#add_new_schedule_form").trigger("reset");
                                    toastr.error("Something went wrong");
                                }
                            },
                        });
            },
        });
    });
    //edit upcoming activity end
    // delete main activity start here
    $(document).on("click", ".delete_main_schedule", function () {
        var delete_id = $(this).data('id');
        $('#delete_manage_schedule_id').val(delete_id);
        $('#delete_opt').modal('show');
    });

    $(document).on("click", ".delete_activity_schedule_button", function (e) {
        //        alert();
        e.preventDefault();
        var delete_id = $('#delete_manage_schedule_id').val();
        //         alert(delete_id);
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $.ajax({
            type: "DELETE",
            url: "/admin/delete_schedule/" + delete_id,
            // url:"/delete_short_clips/"+delete_id,
            success: function (response) {
//                console.log(response);
                toastr.info("Schedule Deleted successfully");
                $('#delete_opt').modal('hide');
                window.location.reload();
            }
        });
    });
    // delete main activity end here
    
    $(document).ready(function () {
        $('.log-close').on('click', function () {
            $('#delete_opt').modal('hide');
        });
    });
});
