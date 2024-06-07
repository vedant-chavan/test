$(document).ready(function () {
    $('#selectedDate').on('change', function () {
        var selectedDate = $(this).val();
        var dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', {weekday: 'long'});
        $('#dayOfWeek').val(dayOfWeek);
    });

    $(document).on("click", ".add_new_schedule", function (e) {
//        e.preventDefault();
        var submit_val = $(this).val();
        $("#add_new_day_form").validate({
            ignore: [],
            debug: false,
            rules: {
                main_activity_name: {
                    required: true,
                },
                myFile: {
                    required: true,
                },
                activity_duration: {
                    required: true,
                },
                
                description: {
                    required: true,
                },
                date: {
                    required: true,
                },
                day: {
                    required: true,
                },
                time: {
                    required: true,
                },
                zoom_link: {
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
                activity_duration: {
                    required: "Please enter this filed",
                },
                description: {
                    required: "Please enter this filed",
                },
                date: {
                    required: "Please enter this filed",
                },
                day: {
                    required: "Please enter this filed",
                },
                time: {
                    required: "Please enter this filed",
                },
                zoom_link: {
                    required: "Please enter this filed",
                },
            },
            submitHandler: function (form) {
                // $("#edit_main_activity").html("saving....");
                // $("#edit_main_activity").prop("disabled", true);
                var formData = new FormData(form);
                // console(formData);
//            e.preventDefault();
                $.ajax({
                    url: "/admin/insert_activity_day_data",
                    type: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (result) {
                        // let response = $.parseJSON(result);
                        if (result.status == 200) {
                            setTimeout(function () {
                                if (submit_val == "save") {
                                    var url = "/admin/activity_day/" + result.schedule_data;
                                    setTimeout(function () {
                                        window.location.replace(url);
                                    }, 1000);
                                    toastr.success("Day added successfully");
                                } else {
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 1000);
                                    toastr.success("Day added successfully");
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

    $(document).on("click", ".add_upcoming_schedule", function (e) {
//        e.preventDefault();
        var submit_val = $(this).val();
        $("#add_upcoming_day_form").validate({
            ignore: [],
            debug: false,
            rules: {
                main_activity_name: {
                    required: true,
                },
                myFile: {
                    required: true,
                },
                activity_duration: {
                    required: true,
                },
                description: {
                    required: true,
                },
                date: {
                    required: true,
                },
                day: {
                    required: true,
                },
                time: {
                    required: true,
                },
                zoom_link: {
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
                activity_duration: {
                    required: "Please enter this filed",
                },
                description: {
                    required: "Please enter this filed",
                },
                date: {
                    required: "Please enter this filed",
                },
                day: {
                    required: "Please enter this filed",
                },
                time: {
                    required: "Please enter this filed",
                },
                zoom_link: {
                    required: "Please enter this filed",
                },
            },
            submitHandler: function (form) {
                // $("#add_upcoming_schedule").html("saving....");
                // $("#add_upcoming_schedule").prop("disabled", true);
                var formData = new FormData(form);
                // console(formData);
//            e.preventDefault();
                $.ajax({
                    url: "/admin/insert_upcoming_activity_day_data",
                    type: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (result) {
                        // let response = $.parseJSON(result);
                        if (result.status == 200) {
                                if (submit_val == "save") {
                                    var url = "/admin/upcomimg_activity_day/" + result.schedule_data;
                                    toastr.success("Day added successfully");
                                    window.location.replace(url);
                                } else {
                                    setTimeout(function () {
//                                    window.location.href = "/add_summer_sweat/" + result.schedule_data;
                                        window.location.reload();
                                    }, 1000);
                                    toastr.success("Day added successfully");
                                }
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
    
    // delete activity days start here
    $(document).on("click", ".delete_activity_days", function () {
        var delete_id = $(this).data('id');
        $('#delete_activity_days_id').val(delete_id);
        $('#delete_opt').modal('show');
    });

    $(document).on("click", ".delete_activity_days_button", function (e) {
        //        alert();
        e.preventDefault();
        var delete_id = $('#delete_activity_days_id').val();
        //         alert(delete_id);
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $.ajax({
            type: "DELETE",
            url: "/admin/delete_activity_days/" + delete_id,
            // url:"/delete_short_clips/"+delete_id,
            success: function (response) {
//                console.log(response);

                toastr.info("Activity Days Deleted successfully");
                $('#delete_opt').modal('hide');
                window.location.reload();
            }
        });
    });
    // delete activity days end here

    //update data start

    $(document).on("click", ".edit_day", function (e) {
//        e.preventDefault();
        var submit_val = $(this).val();
        $("#manage_activity_day_form").validate({
            ignore: [],
            debug: false,
            rules: {
                activity_name: {
                    required: true,
                },

                activity_duration: {
                    required: true,
                },
                
                description: {
                    required: true,
                },
                date: {
                    required: true,
                },
                day: {
                    required: true,
                },
                time: {
                    required: true,
                },
                zoom_link: {
                    required: true,
                },
            },
            messages: {
                activity_name: {
                    required: "Please enter this filed",
                },

                activity_duration: {
                    required: "Please enter this filed",
                },
                description: {
                    required: "Please enter this filed",
                },
                date: {
                    required: "Please enter this filed",
                },
                day: {
                    required: "Please enter this filed",
                },
                time: {
                    required: "Please enter this filed",
                },
                zoom_link: {
                    required: "Please enter this filed",
                },
            },
            submitHandler: function (form) {
                // $("#edit_main_activity").html("saving....");
                // $("#edit_main_activity").prop("disabled", true);
                var formData = new FormData(form);
                // console(formData);
//            e.preventDefault();
                $.ajax({
                    url: "/admin/update_activity_day",
                    type: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (result) {
                        // let response = $.parseJSON(result);
                        if (result.status == 200) {
                            $("#add_new_schedule_form").trigger("reset");
                            setTimeout(function () {
                                if (submit_val == "save") {
                                    var url = "/admin/activity_day/" + result.day_data;
                                    toastr.success("Day edited successfully");
                                    window.location.replace(url);
                                } else {
                                    setTimeout(function () {
//                                    window.location.href = "/add_summer_sweat/" + result.schedule_data;
                                        window.location.reload();
                                    }, 1000);
                                    toastr.success("Day added successfully");
                                }
                            }, 1000);
                        } else if(result.status == 422){
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
      //update data end
      
    //update upcoming activity day start
    $(document).on("click", ".edit_upcoming_day", function (e) {
//        e.preventDefault();
        var submit_val = $(this).val();
        $("#manage_upcoming_activity_day_form").validate({
            ignore: [],
            debug: false,
            rules: {
                activity_name: {
                    required: true,
                },

                activity_duration: {
                    required: true,
                },
                subscription_id: {
                    required: true,
                },
                description: {
                    required: true,
                },
                benefits: {
                    required: true,
                },
                date: {
                    required: true,
                },
                day: {
                    required: true,
                },
                time: {
                    required: true,
                },
                pre_requisites: {
                    required: true,
                },
                zoom_link: {
                    required: true,
                },
            },
            messages: {
                activity_name: {
                    required: "Please enter this filed",
                },

                activity_duration: {
                    required: "Please enter this filed",
                },
                subscription_id: {
                    required: "Please enter this filed",
                },
                description: {
                    required: "Please enter this filed",
                },
                benefits: {
                    required: "Please enter this filed",
                },
                date: {
                    required: "Please enter this filed",
                },
                day: {
                    required: "Please enter this filed",
                },
                time: {
                    required: "Please enter this filed",
                },
                pre_requisites: {
                    required: "Please enter this filed",
                },
                zoom_link: {
                    required: "Please enter this filed",
                },
            },
            submitHandler: function (form) {
                // $(".edit_upcoming_day").html("saving....");
                // $(".edit_upcoming_day").prop("disabled", true);
                var formData = new FormData(form);
                // console(formData);
//            e.preventDefault();
                $.ajax({
                    url: "/admin/edit_upcoming_activity_day",
                    type: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (result) {
                        // let response = $.parseJSON(result);
                        if (result.status == 200) {
                                if (submit_val == "save") {
                                    var url = "/admin/upcomimg_activity_day/" + result.day_data;
                                    toastr.success("Day edited successfully");
                                    window.location.replace(url);
                                } else {
                                    setTimeout(function () {
//                                    window.location.href = "/add_summer_sweat/" + result.schedule_data;
                                        window.location.reload();
                                    }, 1000);
                                    toastr.success("Day added successfully");
                                }
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
    //update upcoming activity day end
});