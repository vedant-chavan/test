$(document).ready(function(){
   $('.contact_us_btn').on('click',function(){
        $("#contact_us_form").validate({
            rules:{
                full_name:{
                    required:true,
                },
                email:{
                    required:true,
                },
                subject:{
                    required:true,
                },
                message:{
                    required:true,
                },
            },
            messages:{
                full_name:{
                    required:"Please Enter Full Name",
                },
                email:{
                    required:"Please Enter Email ID",
                },
                subject:{
                    required:"Please Enter Subject",
                },
                message:{
                    required:"Please Enter Message",
                },
            },
            submitHandler: function (form) {
//                $("#login_submit").html("Logging....");
//                $("#login_submit").prop("disabled", true);
                var formData = new FormData(form);
                $.ajax({
                    url: "/submit_contact_us",
                    type: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (result) {
                        if (result.status == 200){
                            setTimeout(function () {
                                window.location.reload();
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