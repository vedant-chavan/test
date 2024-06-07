$(document).ready(function () {
// Delete User start here
    $(document).on("click", ".delete_user", function () {
        var delete_id = $(this).data('id');
        $('#delete_user_id').val(delete_id);
        $('#delete_opt').modal('show');
    });

    $(document).on("click", ".delete_user_button", function (e) {
        e.preventDefault();
        var delete_id = $('#delete_user_id').val();
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $.ajax({
            type: "DELETE",
            url: "/admin/delete_manage_direct_users/" + delete_id,
            success: function (response) {
                console.log(response);
                toastr.info("User Deleted successfully");
                $('#delete_opt').modal('hide');
                window.location.href = "/admin/direct_users";
            }
        });
    });
    
    });
    // Delete User end here/* 



