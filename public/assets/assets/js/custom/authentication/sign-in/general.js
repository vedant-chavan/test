/*
Created by : Pradyumn Dwivedi
Created at : 30 January 2023
Use : Validate login form and submit data to db
*/
$(document).on('click', '#login_form_btn', function(){
    $('#login_form').validate({
        rules: {
            email:{
                required:true,
                email: true,
            },
            password:{
                required: true,
                minlength: 6
            },
            // digit_pin:{
            //     required: true,
            //     digits: true,
            //     minlength: 4,
            //     maxlength: 4
            // }
        },
        messages: {
            email:{
                required: 'Please enter email'
            },
            password:{
                required: 'Please enter password',
                minlength: 'Password must contain 6 characters.'
            },
            // digit_pin:{
            //     required: 'Please enter pin',
            //     minlength: 'Please enter 4 digit pin',
            //     maxlength: 'Please enter 4 digit pin'
            // }
        },
        submitHandler: function (form) {
            let url = "/admin/admin-login";
            let afterLoginurl = "/admin/dashboard";
            let data = new FormData(form);
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                contentType: false,
                processData: false,
                success: function (result) {
                    console.log("result",result.success);
                    // let response = $.parseJSON(result);
                    // console.log("result",response.success);
                    
                    
                    if(result.success == true){
                      window.location.replace(afterLoginurl);
                        
                    }
                    else {
                        Swal.fire({ text: result.message, icon: "success", buttonsStyling: !1, confirmButtonText: "Proceed", customClass: { confirmButton: "btn btn-primary popup-button" } }).then(function (t) {
                            // if (t.isConfirmed) {
                            //     var url = "two_step"+"?d="+result.data.email_id;
                            //     window.location.replace(url);
                            // }
                        });
                    }
                }
            });
        }
    });
});