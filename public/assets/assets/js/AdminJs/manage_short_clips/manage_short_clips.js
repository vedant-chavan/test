$(document).ready(function () {
    $(document).on("click", ".submit", function (e) {
        var submit_val = $(this).val();
        $("#short_clips_form").validate({
            rules: {
                video_title: {
                    required: true,
                    maxlength: 80,
                },
                description: {
                    required: true,
                    minlength: 30,
                },
                video_url: {
                    required: true,
                    url: true,
                },
                thumbnail:{
                    required: true,
                },
            },
            messages: {
                video_title: {
                    required: "Please enter short clip title",
                    maxlength: "Title should not be more than 80 characters",
                },
                description: {
                    required: "Please enter description",
                    minlength: "Description should be atleast 30 characters",
                },
                video_url: {
                    required: "Please enter url",
                    url: "Please enter valid url",
                },
                thumbnail:{
                    required: "Please Select Image",
                },
            },

            submitHandler: function (form) {
                // // print_r(form);exit;
                var formData = new FormData(form);
                $.ajax({
                    url: "/admin/insert_short_clips",
                    type: "POST",
                    data: formData,
                    async: true,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        // let response = $.parseJSON(result);
                        // console.log(response);
                        if (result.status == 200) {
                            if (submit_val == "save") {
                                var url = "/admin/manage_short_clips";
                                toastr.options = {
                                    timeOut: 1000,
                                };
                                toastr.success("short clips added successfully");
                                window.location.replace(url);
                            } else {
                                setTimeout(function () {
                                    window.location.reload();
                                }, 1000);
                                toastr.success("short clips added successfully");
                            }
                        } else if(result.status == 422){
                            toastr.error('The File Must Not Be Greater Than 400 KB.');
                        }else {
                            $("#short_clips_form").trigger("reset");
                            toastr.error("Something went wrong");
                        }
                    },
                });
            },
        });
    });
    

    // //for table reload
    function reloadTable() {
        $.ajax({
            url: "/admin/manage_short_clips",
            type: "POST",
            success: function (data) {
                $("#load_table").html(data);
            },
        });
    }
    reloadTable();
    // //for table reload

    //for insert data
    // $("#short_clips_form").validate({
    //   rules: {
    //     video_title: {
    //       required: true,
    //       maxlength: 80,
    //     },
    //     description: {
    //       required: true,
    //       minlength: 30,
    //     },
    //     video_url: {
    //       required: true,
    //       url: true,
    //     },
    //   },
    //   messages: {
    //     video_title: {
    //       required: "Please enter short clip title",
    //       maxlength: "Title should not be more than 80 characters",
    //     },
    //     description: {
    //       required: "Please enter description",
    //       minlength: "Description should be atleast 30 characters",
    //     },
    //     video_url: {
    //       required: "Please enter url",
    //       url: "Please enter valid url",
    //     },
    //   },
    //   submitHandler: function (form) {
    //     // print_r(form);exit;
    //     $("#submit").html("Please Wait...");
    //     $("#submit").prop("disabled", true);

    //     $("#submit_create").html("Please Wait...");
    //     $("#submit_create").prop("disabled", true);

    //     var formData = new FormData(form);
    //     var submit_val = $('#submit').val();
    //     // var submit_val = $('#submit_create').val();
    //     // console.log(formData);
    //     // https://www.youtube.com/watch?v=aCHv-N6vYV4
    //     $.ajax({
    //       url: "/insert_short_clips",
    //       type: "POST",
    //       data: formData,
    //       async: true,
    //       cache: false,
    //       contentType: false,
    //       processData: false,
    //       success: function (response) {
    //         console.log(response);
    //         if (response.status == 200) {
    //           // $("#short_clips_form").trigger("reset");
    //           // $("#submit").html("Submited");
    //           // $("#submit").prop("disabled", false);
    //           // toastr.success("short clips added successfully");
    //           setTimeout(function () {
    //           //   if (submit_val == 'save_create') {
    //           //     window.location.href = "/add_short_clips";
    //           //     toastr.success("short clips added successfully");
    //           //   } else {
    //           //     window.location.href = "/manage_short_clips";
    //           //     toastr.success("short clips added successfully");
    //           //   }
    //             // window.location.href = "/add_short_clips";

    //           if (submit_val == 'save') {
    //             alert(submit_val);
    //             var url = '/manage_short_clips';
    //             url = url.replace();
    //             setTimeout(function () {
    //               window.location.replace(url);
    //             }, 1000);
    //           }
    //           else {
    //             setTimeout(function () {
    //               window.location.reload();
    //             }, 1000);
    //           }
    //           }, 1000);
    //         } else {
    //           $("#short_clips_form").trigger("reset");
    //           $("#submit").html("Submited");
    //           $("#submit").prop("disabled", false);
    //           toastr.error("Something went wrong");
    //         }
    //       },
    //     });
    //   },
    // });
    //for insert data end

    //for view discription
    $(".view_desc").click(function () {
        var desc = $(this).data("desc");
        $("#show_desc").html(desc);
    });
    //for view discription end

    // for delete new code
    $(document).on("click", ".delete_short_clips", function () {
        var delete_id = $(this).data('id');
        // alert(delete_id);
        $('#delete_short_clips_id').val(delete_id);
        $('#delete_opt').modal('show');
    });

    $(document).on("click", ".delete_short_clips_button", function (e) {
        e.preventDefault();
        var delete_id = $('#delete_short_clips_id').val();
        // alert(delete_id);
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $.ajax({
            type: "DELETE",
            url: "/admin/delete_short_clips/" + delete_id,
            // url:"/delete_short_clips/"+delete_id,
            success: function (response) {
                console.log(response);
                toastr.info("short clips Deleted successfully");
                $('#delete_opt').modal('hide');
                window.location.href = "/admin/manage_short_clips";
            }
        });
    });

    // for delete new code

    // for edit
    $("#edit_short_clips_form").validate({
        rules: {
            video_title: {
                required: true,
                maxlength: 80,
            },
            description: {
                required: true,
                minlength: 30,
            },
            video_url: {
                required: true,
                url: true,
            },
        },
        messages: {
            video_title: {
                required: "Please enter short clip title",
                maxlength: "Title should not be more than 80 characters",
            },
            description: {
                required: "Please enter description",
                minlength: "Description should be atleast 30 characters",
            },
            video_url: {
                required: "Please enter url",
                url: "Please enter valid url",
            },
        },
        // submitHandler: function (form) {
        //     // print_r(form);exit;
        //     // $("#edit_submit").html("Please Wait...");
        //     // $("#edit_submit").prop("disabled", true);

        //     var formData = new FormData(form);
        //     // alert(formData);
        //     // var id= $("#edit_id").val();
        //     // alert(id);
        //     // console.log(formData);
        //     $.ajax({
        //         url: "/admin/update_short_clips",
        //         type: "POST",
        //         data: formData,
        //         async: true,
        //         cache: false,
        //         contentType: false,
        //         processData: false,
        //         success: function (result) {
        //             let response = $.parseJSON(result);
        //             // console.log(response);
        //             if (response.status == 200) {
        //                 $("#edit_short_clips_form").trigger("reset");
        //                 // $("#submit").html("Submited");
        //                 // $("#submit").prop("disabled", false);
        //                 toastr.success("short clips updated successfully");
        //                 setTimeout(function () {
        //                     window.location.href = "/admin/manage_short_clips";
        //                 }, 1000);
        //             } else {
        //                 $("#edit_short_clips_form").trigger("reset");
        //                 // $("#submit").html("Submited");
        //                 // $("#submit").prop("disabled", false);
        //                 toastr.error("Something went wrong");
        //             }
        //         },
        //     });
        // },
         submitHandler: function (form) {
                var formData = new FormData(form);
                // console(formData);
                // e.preventDefault(),
                    $.ajax({
                        url: '/admin/update_short_clips',
                        type: 'POST',
                        data: formData,
                        async: true,
                        cache: false,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            // let response = $.parseJSON(result);
                            // console.log(response);
                            if (result.status == 200) {
                                toastr.success('short clips updated successfully');
                                setTimeout(function () {
                                    window.location.href = "/admin/manage_short_clips";
                                }, 2000);
                            } else if(result.status == 422){
                                toastr.error('The File Must Not Be Greater Than 400 KB.');
                            }else {
                                    toastr.error("Something went wrong");
                            }
                        },
                    });
            }
        });
    ;
    //for edit end

    // for status change 
    $("#mng-sings").on("change", ".active_blog", function () {
        // $('.active_blog').on('change',function() {
        console.log("Handler");
        var status = $(this).prop("checked") == true ? 1 : 0;
        var user_id = $(this).data("id");
        //    alert(user_id);
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/admin/changeStatus",
            data: {
                status: status,
                user_id: user_id,
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
    // for status change end
 
});
