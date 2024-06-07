$(document).ready(function () {

// update about us value
    $(document).on("click", "#edit_about_us", function (e) {
        // alert();
        // $('#edit_categories').on("click", function (e) {
        $('#edit_about_us_form').validate({
            ignore: [],
            debug: false,
            rules: {
                about_us_title: {
                    required: true,
                    maxlength: 50,
                },
                about_us_video_url: {
                    required: true,
                    url: true,
                },
                about_us_desc: {
                    required: true,
                    minlength: 30,
                },
                
                about_us_footer_first_image_title: {
                    required: true,
                    maxlength: 50,
                },
                about_us_footer_second_image_title: {
                    required: true,
                    maxlength: 50,
                },
            },
            messages: {
                about_us_title: {
                    required: "Please Enter Video Title",
                    maxlength: "Title should not be more than 50 characters",
                },
                about_us_video_url: {
                    required: "Please enter url",
                    url: "Please enter valid url",
                },
                about_us_desc: {
                    required: "Please enter description",
                    minlength: "Description should be atleast 30 characters",
                },
                
                about_us_footer_first_image_title: {
                    required: "Please select about us footer first image title",
                },
                about_us_footer_second_image_title: {
                    required: "Please select about us footer second image title",
                },
            },
            submitHandler: function (form) {
                var formData = new FormData(form);
                // console(formData);
                e.preventDefault(),
                        $.ajax({
                            url: '/admin/update_about_us',
                            type: 'POST',
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (result) {
                                // let response = $.parseJSON(result);
                                // console.log(response);
                                if (result.status == 200) {
                                    toastr.success('About Us Content Updated successfully');
                                    setTimeout(function () {
                                        window.location.href = "/admin/about_us";
                                    }, 1000);
                                } else if(result.status == 422){
                                    toastr.error('The File Must Not Be Greater Than 400 KB.');
                                }
                                else {
                                    toastr.error("Something went wrong");
                                }
                            },
                        });
            }
        });
    });
    // edit Faq categories end here
});