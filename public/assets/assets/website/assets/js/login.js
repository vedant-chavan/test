$(document).ready(function(){
    $('#login_submit').on('click',function(){
//        toastr.success("hii");
//        alert("hii");
        $("#login_form_id").validate({
            rules:{
                email:{
                    required:true,
                },
                password:{
                    required:true,
                },
            },
            messages:{
                email:{
                   required:"Please Enter Email",
                },
                password:{
                    required:"Please Enter Password",
                },
            },
            submitHandler: function (form) {
//                $("#login_submit").html("Logging....");
//                $("#login_submit").prop("disabled", true);
                var formData = new FormData(form);
                $.ajax({
                    
                    url: "/login",
                    type: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (result) {
                        var loginurl = '/your_activity';
                        // let response = $.parseJSON(result);
                        if (result.status == 200){
                            setTimeout(function () {
                                window.location.replace(loginurl);
                            }, 1000);
                            toastr.success(result.message);
                        }else{
                            toastr.error(result.message);
                        }
                    }
                });
            }
        });
    })
});