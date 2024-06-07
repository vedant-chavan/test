
$(document).ready(function () {

    //Notification popup 
    $('.send_rply').click(function (e) {
        e.preventDefault();
        //    alert('testing');
        $('#reply_popup').modal('show');
        var id = $(this).attr("data-id");
        var email = $(this).attr("data-email");
        //    alert(email);
        $('#email_id').val(email);
        // $('#full_name').text(manage_user_name);
        $('#noti_user_id').val(id);
    });

    // send mail start here
    $(document).on("click", "#send_mail_btn1", function () {
        //    alert('testing');
        $('#send_reply_form').validate({
            rules: {
                message: {
                    required: true
                },
            },
            messages: {
                message: {
                    required: "Please enter the message",
                },
            },
            submitHandler: function (form) {
                var formData = new FormData(form);
                $.ajax({
                    url: '/admin/send_manage_contact',
                    type: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (result) {
                        let response= $.parseJSON(result);
//                        console.log(response);
                        if (response.status == 200) {
                            toastr.success("mail send successfully");
                            setTimeout(function () {
                                window.location.reload();
                            }, 1000);
                        } else {
                            toastr.error("Something went wrong");
                        }
                    },
                });
            },
        });
    });
    // send mail end here

    // for delete new code
    $(document).on("click", ".delete_contact", function () {
        var delete_id = $(this).data('id');
//         alert(delete_id);
        $('#delete_contact_id').val(delete_id);
        $('#delete_opt').modal('show');
    });

    $(document).on("click", ".delete_contact_button", function (e) {
        // e.preventDefault();
        var delete_id = $('#delete_contact_id').val();
//         alert(delete_id);
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $.ajax({
            type: "DELETE",
            url: "/admin/delete_contact/" + delete_id,
            // url:"/delete_short_clips/"+delete_id,
            success: function (response) {
                console.log(response);
                toastr.info("Contact us Deleted successfully");
                $('#delete_opt').modal('hide');
                window.location.href = "/admin/manage_contact/deleted";
            }
        });
    });

});
