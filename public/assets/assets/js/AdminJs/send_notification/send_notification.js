$(document).ready(function(){
   $('#send_notification_form').validate({
        rules:{
            title:{
                required:true,
            },
            message:{
                required:true,
            },
        },
        messages:{
            title:{
                required:'Title Is Required',
            },
            message:{
                required:'Message Is Required',
            },
        }, 
        submitHandler : function(form){
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            var formData = new FormData(form);
            $.ajax({
                url:"/admin/send_notification",
                type:"POST",
                data: formData,
                async: true,
                cache: false,
                contentType: false,
                processData: false,
                success: function (result) {
                    // let response = $.parseJSON(result);
                    if (result.status == 200) {
                        toastr.success("Notification Send successfully");
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                    } else {
                        $("#manage_activity_form").trigger("reset");
                        toastr.error("Something went wrong");
                    }
                }
            });
        }
   });
});
