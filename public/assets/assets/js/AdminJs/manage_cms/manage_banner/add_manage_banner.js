$(document).ready(function () {
    // alert();
    // for add image croping tool end here

    $(document).on("click", ".manage_cms_banner_button", function (e) {
//        console.log('sdfghjk');
        $('#manage_cms_banner_form').validate({
            rules: {
                banner_postion: {
                    required: true,
                }
            },
            messages: {
                banner_postion: {
                    required: "Please select the banner position",
                }
            },
        //     submitHandler: function (form) {
        //         var formData = new FormData(form);
        //         $.ajax({
        //             url: '/admin/insert_manage_bannner',
        //             type: 'POST',
        //             data: formData,
        //             processData: false,
        //             contentType: false,
        //             success: function (result) {
        //                 let response = $.parseJSON(result);
        //                 if (response.status == 200) {
        //                     toastr.success('Banner added successfully');
        //                     setTimeout(function () {
        //                         window.location.href = "/admin/manage_banner";
        //                     }, 1000);
        //                 } else {
        //                     toastr.error("Something went wrong");
        //                 }
        //             },
        //         });
        //     }
        // });
          submitHandler: function (form) {
                var formData = new FormData(form);
                // console(formData);
                e.preventDefault(),
                    $.ajax({
                        url: '/admin/insert_manage_bannner',
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            // let response = $.parseJSON(result);
                            // console.log(response);
                            if (result.status == 200) {
                                toastr.success('Banner added successfully');
                                setTimeout(function () {
                                    window.location.href = "/admin/manage_banner";
                                }, 2000);
                            }else if(result.status == 422){
                                toastr.error('The File Must Not Be Greater Than 400 KB.');
                            }else {
                                toastr.error("Something went wrong");
                            }
                        },
                    });
            }
        });
    });
});