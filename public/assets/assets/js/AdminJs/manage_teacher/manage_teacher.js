$(document).ready(function () {
// add Teacher start here
    $(document).on("click", ".add_teacher_button", function (e) {
//        alert();
        $('#add_teacher_form').validate({
            ignore: [],
            debug: false,
            rules: {
                teacher_title: {
                    required: true
                },
                teacher_sub_title: {
                    required: true
                },
                teacher_description: {
                    required: true
                },
                teacher_address: {
                    required: true
                },
                teacher_contact_number: {
                    required: true
                },
                teacher_image: {
                    required: true
                }
            },
            messages: {
                teacher_title: {
                    required: "Please enter this filed",
                },
                teacher_sub_title: {
                    required: "Please enter this filed",
                },
                teacher_description: {
                    required: "Please enter this filed",
                },
                teacher_address: {
                    required: "Please enter this filed",
                },
                teacher_contact_number: {
                    required: "Please enter this filed",
                },
                teacher_image: {
                    required: "Please enter this filed",
                }
            },
            submitHandler: function (form) {
                var formData = new FormData(form);
                // console(formData);
                e.preventDefault(),
                        $.ajax({
                            url: '/admin/insert_teacher',
                            type: 'POST',
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (result) {
                                let response = $.parseJSON(result);
                                // console.log(response);
                                if (response.status == 200) {
                                    $('#add_teacher_form').trigger("reset");
                                    toastr.success('Teacher added successfully');
                                    setTimeout(function () {
                                        window.location.href = "/admin/manage_teacher";
                                    }, 1000);
                                } else {
                                    $('#add_teacher_form').trigger("reset");
                                    toastr.error("Something went wrong");
                                }
                            },
                        });
            }
        });
    });
// add Teacher end here

// Delete Teacher start here
    $(document).on("click", ".delete_teacher", function () {
//        alert();
        var delete_id = $(this).data('id');
        $('#delete_teacher_id').val(delete_id);
        $('#delete_opt').modal('show');
    });
    $(document).on("click", ".delete_teacher_button", function (e) {
//                alert();
//        e.preventDefault();
        var delete_id = $('#delete_teacher_id').val();
//                 alert(delete_id);
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $.ajax({
            type: "DELETE",
            url: "/admin/delete_teacher/" + delete_id,
            // url:"/delete_short_clips/"+delete_id,
            success: function (response) {
//                console.log(response);
                toastr.info("Teacher Deleted successfully");
                $('#delete_opt').modal('hide');
                window.location.href = "/admin/manage_teacher";
            }
        });
    });
// delete teacher end here

// edit Teacher start here
    $(document).on("click", ".edit_teacher_button", function (e) {
        $('#edit_teacher_form').validate({
            ignore: [],
            debug: false,
            rules: {
                teacher_title: {
                    required: true
                },
                teacher_sub_title: {
                    required: true
                },
                teacher_description: {
                    required: true
                },
                teacher_address: {
                    required: true
                },
                teacher_contact_number: {
                    required: true
                }
            },
            messages: {
                teacher_title: {
                    required: "Please enter this filed",
                },
                teacher_sub_title: {
                    required: "Please enter this filed",
                },
                teacher_description: {
                    required: "Please enter this filed",
                },
                teacher_address: {
                    required: "Please enter this filed",
                },
                teacher_contact_number: {
                    required: "Please enter this filed",
                }
            },
            submitHandler: function (form) {
                var formData = new FormData(form);
                // console(formData);
                e.preventDefault(),
                        $.ajax({
                            url: '/admin/update_teacher',
                            type: 'POST',
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (result) {
                                let response = $.parseJSON(result);
                                // console.log(response);
                                if (response.status == 200) {
                                    $('#edit_teacher_form').trigger("reset");
                                    toastr.success('Teacher Updated successfully');
                                    setTimeout(function () {
                                        window.location.href = "/admin/manage_teacher";
                                    }, 1000);
                                } else {
                                    $('#edit_teacher_form').trigger("reset");
                                    toastr.error("Something went wrong");
                                }
                            },
                        });
            }
        });
    });
// edit Teacher end here

 //for view discription
 $(document).on("click", ".view_teacher_desc", function (e) {
    // $(".view_teacher_desc").click(function () {
        var desc = $(this).data("desc");
        $("#show_desc").html(desc);
    });
    //for view discription end

});