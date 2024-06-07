$('#add_company_form').validate({
    ignore: [],
    debug: false, 
    rules:{
        company_logo: {
            required: true,
        },
        company_name: {
            required: true,
        },
        contact_no: {
            required: true,
        },
        email_id: {
            required: true,
        },
        bio: {
            required: true,
        },
        location: {
            required: true,
        },
        website_url: {
            required: true,
        },
        found_date: {
            required: true,
        },
    },
    messages:{
        company_logo: {
            required: "Please Select Comapny Logo",
        },
        company_name: {
            required: "Please Enter Comapny Name",
        },
        contact_no: {
            required: "Please Enter Contact Number",
        },
        email_id: {
            required: "Please Please Enter Email ID",
        },
        bio: {
            required: "Please Enter BIO",
        },
        location: {
            required: "Please Enter Location",
        },
        website_url: {
            required: "Please Enter Website URL",
        },
        found_date: {
            required: "Please Select Founded Date ",
        },
    },
    submitHandler:function(form){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $("#company_add_btn").html("saving....");
        $("#company_add_btn").prop("disabled", true);
        var formData = new FormData(form);
        $.ajax({
            url: '/admin/add_company_data',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                
                if (result.status == 200) {
                    toastr.success(result.message);
                    setTimeout(function () {
                        window.location.href = "/admin/manage_company_users";
                    }, 1000);
                } else {
                    $("#company_add_btn").html("save");
                    $("#company_add_btn").prop("disabled", false);
                    toastr.error(result.message);
                }
            },
            error: function () {
                $("#company_add_btn").html("save");
                $("#company_add_btn").prop("disabled", false);
                toastr.error("Something went wrong");
            }
        });
    }
});

$('.delete_company').on("click",function(){
    
    let company_id = $(this).data('company_id');
    $('.company_hidden_id').val(company_id);
    
});

$('.delete_company_btn').on("click",function(){
    let company_id = $('.company_hidden_id').val();
    // alert(company_id);
    
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: '/admin/delete_company',  // Replace with your actual route
        type: 'POST',
        data: {
            company_id: company_id,
        },
        success: function (result) {
            if (result.status == 200) {
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
                toastr.error(result.message);
            }else{
                toastr.error("Something Went Wrong");
            }
        }
    });
});

$('.delete_company_user').on("click",function(){
    
    let company_user_id = $(this).data('company_user_id');
    $('.company_user_hidden_id').val(company_user_id);
    
});

$('.delete_company_user_btn').on("click",function(){
    let company_user_id = $('.company_user_hidden_id').val();
    // alert(company_id);
    
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: '/admin/destroy_user_company',  // Replace with your actual route
        type: 'POST',
        data: {
            company_user_id: company_user_id,
        },
        success: function (result) {
            if (result.status == 200) {
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
                toastr.error(result.message);
            }else{
                toastr.error("Something Went Wrong");
            }
        }
    });
});

$('#addComapnyUserDataForm').validate({
    rules:{
        // company_logo: {
        //     required: true,
        // },
        // company_name: {
        //     required: true,
        // },
        // contact_no: {
        //     required: true,
        // },
        // email_id: {
        //     required: true,
        // },
        // bio: {
        //     required: true,
        // },
        // location: {
        //     required: true,
        // },
        // website_url: {
        //     required: true,
        // },
        // found_date: {
        //     required: true,
        // },
    },
    messages:{
        // company_logo: {
        //     required: "Please Select Comapny Logo",
        // },
        // company_name: {
        //     required: "Please Enter Comapny Name",
        // },
        // contact_no: {
        //     required: "Please Enter Contact Number",
        // },
        // email_id: {
        //     required: "Please Please Enter Email ID",
        // },
        // bio: {
        //     required: "Please Enter BIO",
        // },
        // location: {
        //     required: "Please Enter Location",
        // },
        // website_url: {
        //     required: "Please Enter Website URL",
        // },
        // found_date: {
        //     required: "Please Select Founded Date ",
        // },
    },
     submitHandler:function(form){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $("#users_add_btn").html("Saving...");
        $("#users_add_btn").prop("disabled", true);
        var formData = new FormData(form);
        // console.log(formData);
        // return false;
        $.ajax({
            url: '/admin/store_company_user',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                if (result.success) { // Check the correct property
                    toastr.success(result.message);
                    setTimeout(function () {
                        window.location.href = "/admin/manage_company_users";
                    }, 1000);
                } else {
                    $("#users_add_btn").html("Save");
                    $("#users_add_btn").prop("disabled", false);
                    toastr.error(result.message);
                }
            },
            error: function () {
                $("#users_add_btn").html("Save");
                $("#users_add_btn").prop("disabled", false);
                toastr.error("Something went wrong");
            }
        });
        return false; // Prevent default form submission
    }
});

$('.update_user_points').on("click", function(event) {
    event.preventDefault(); // Prevent default form submission

    let points = $('#total_score').val();
    let user_id = $('#user_id').val();

    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: '/admin/update_users_points',
        type: 'POST',
        data: { points: points, user_id: user_id },
        success: function(result) {
            if (result.status == 200) {
                toastr.success(result.message);
                setTimeout(function() {
                    window.location.reload();
                }, 1000);
            } else {
                toastr.error('Failed to update user points.');
            }
        },
        error: function(xhr, status, error) {
            toastr.error('An error occurred while updating user points.');
            console.error(xhr.responseText);
        }
    });
});
