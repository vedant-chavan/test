$("#manage_settings").validate({
    // rules:{
    //     facebook_url:{
    //         required:true
    //     },
    //     instagram_url:{
    //         required:true
    //     },
    // },
    // messages:{
    //     facebook_url:{
    //         required:"FaceBook URL Is Required"
    //     },
    //     instagram_url:{
    //         required:"Instagram URL Is Required"
    //     },
    // },
    submitHandler:function(form){
        var formData = new FormData(form);
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: "/admin/update_url",
            type: "POST",
            data: formData,
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            success: function (result) {
                if (result.status == 200) {
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                    toastr.success(result.message);
                }
            }
        });
    }
});