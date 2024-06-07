$(document).ready(function(){
    $('#import_users').validate({
        rules: {
            csv_file: {
                required: true,
                // extension: "csv|txt|xlsx",
            },
             
        },
        messages: {
            csv_file: {
                required: "Please Select Excel File",
                // extension: "Please select a valid file type (csv, txt, xlsx).",
            },

        },
        submitHandler: function (form) {
            // $(".import").html("Importing....");
            // $(".import").prop("disabled", true);
            var formData = new FormData(form);
            $.ajax({
                url: '/admin/import-csv',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (result) {
                    
                     toastr.success('CSV file imported successfully');
                     window.location.reload();
                },
                error: function(xhr, status, error) {
                    if (xhr.status === 422) { // Unprocessable Entity
                        var errors = xhr.responseJSON.errors;
                        // console.log(errors);
                        // Display validation errors using Toastr
                        for (var error in errors) {
                            toastr.error(errors[error][0]);
                        }
                    } else {
                        toastr.error('Error importing data');
                        // console.log("hiii");
                    }
                },
            });
        }
    });
    
    $('.update_points').on("click",function(){
        
        let points = $('#total_score').val();
        let user_id = $('#user_id').val();
        // alert(points);
        // alert(user_id);
        
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: '/admin/update_points',
            type: 'POST',
            data: {points:points , user_id:user_id},
            // processData: false,
            // contentType: false,
            success: function (result) {
                
                if (result.status == 200) {
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                    toastr.success(result.message);
                }
            },
            
        });
        
    });
});