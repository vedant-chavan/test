$(document).ready(function() {
    $(document).on("click", ".register", function(e) {
        $('#sign_up').validate({
            rules: {
                full_name: {
                    required: true
                },
                email: {
                    required: true
                },
                contact_number: {
                    required: true
                },
                password: {
                    required: true
                },
                address: {
                    required: true
                },
                fitness_goal: {
                    required: true
                },
                hear_about_us: {
                    required: true
                }
            },
            messages: {
                full_name: {
                    required: "Please enter this field"
                },
                email: {
                    required: "Please enter this field"
                },
                contact_number: {
                    required: "Please enter this field"
                },
                password: {
                    required: "Please enter this field"
                },
                address: {
                    required: "Please enter this field"
                },
                fitness_goal: {
                    required: "Please enter this field"
                },
                hear_about_us: {
                    required: "Please enter this field"
                }
            },
            submitHandler: function(form) {
                var formData = new FormData(form);
                e.preventDefault();
                $.ajax({
                    url: '/add_users',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(result) {
//                  console.log(result.errors);
                      let response = $.parseJSON(result);
                        if (response.status == 200) {
                            $('#sign_up').trigger("reset");
                            toastr.success('Users Registered Successfully !!');
                            setTimeout(function() {
                                window.location.href = "/payment";
                            }, 1000);
                        } else {
                            $('#sign_up').trigger("reset");
                            toastr.error(result.errors);
                        }
                    },
                });
            }
        });
    });
});
