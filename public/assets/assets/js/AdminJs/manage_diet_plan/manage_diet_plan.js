$(document).ready(function () {
    $(document).on("click", ".add_diet_plan", function (e) {
//        alert(hii);
        $("#manage_diet_plan_form").validate({
            ignore: [],
            debug: false,
            rules: {
                myFile:{
                    required: true,
                },
                diet_categories: {
                    required: true,
                },
                 bmr_range_from: {
                    required: true,
                },
                 bmr_range_to: {
                    required: true,
                }
            },
            messages: {
                myFile:{
                    required: "Please select the Image",
                },
                diet_categories: {
                    required: "Please select the option",
                },
                 bmr_range_from: {
                    required: "Please enter range from",
                },
                 bmr_range_to: {
                    required: "Please enter range to",
                }
            },
            submitHandler: function (form) {
                var formData = new FormData(form);
                // console(formData);
                e.preventDefault(),
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
                            } else if(result.status == 422){
                                toastr.error('The File Must Not Be Greater Than 1 MB.');
                                setTimeout(function () {
                                    window.location.href = "/admin/manage_diet_plan";
                                }, 1000);
                            }
                            else {
                                toastr.error("Something went wrong");
                            }
                        },
                    });
            }
        });
    });
    
     // Edit main diet plan start here
    $(document).on("click", ".edit_diet_plan", function (e) {
        $("#edit_manage_diet_plan_form").validate({
            ignore: [],
            debug: false,
            rules: {
                 diet_categories: {
                    required: true,
                },
                 bmr_range_from: {
                    required: true,
                },
                 bmr_range_to: {
                    required: true,
                }
            },
            messages: {
                 diet_categories: {
                    required: "Please select the option",
                },
                 bmr_range_from: {
                    required: "Please enter range from",
                },
                 bmr_range_to: {
                    required: "Please enter range to",
                }
            },
            submitHandler: function (form) {
                var formData = new FormData(form);
                // console(formData);
                e.preventDefault(),
                    $.ajax({
                        url: '/admin/update_diet_plan',
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            // console.log(response);
                            if (result.status == 200) {
                                toastr.success('Diet plan Updated successfully');
                                setTimeout(function () {
                                    window.location.href = "/admin/manage_diet_plan";
                                }, 1000);
                            } else if(result.status == 422){
                                toastr.error('The File Must Not Be Greater Than 1 MB.');
                                setTimeout(function () {
                                    window.location.href = "/admin/manage_diet_plan";
                                }, 1000);
                            }
                            else {
                                toastr.error("Something went wrong");
                            }
                        },
                    });
            }
        });
    });
     // Edit main diet plan end here

    
      // delete main diet plan start here
    $(document).on("click", ".delete_diet_plan", function () {
       
        var delete_id = $(this).data('id');
//         alert(delete_id);
        $('#delete_manage_diet_plan_id').val(delete_id);
        $('#delete_opt_diet_plan').modal('show');
    });

    $(document).on("click", ".delete_diet_button", function (e) {
        //        alert();
        e.preventDefault();
        var delete_id = $('#delete_manage_diet_plan_id').val();
//                 alert(delete_id);
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $.ajax({
            type: "DELETE",
            url: "/admin/delete_diet_plan/" + delete_id,
            success: function (response) {
//                console.log(response);
                toastr.info("Diet Plan Deleted successfully");
                $('#delete_opt_diet_plan').modal('hide');
                window.location.href = "/admin/manage_diet_plan";
            }
        });
    });
    // delete main diet plan end here
});