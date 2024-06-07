
$(document).ready(function () {

    // insert Faq categories start here
    
    $('#add_categories').on("click", function (e) {
        // alert('categor');
        // e.preventDefault(),
        $('#add_faq_category_form').validate({
            rules: {
                category_name: {
                    required: true,
                    maxlength: 50,
                }
            },
            messages: {
                category_name: {
                    required: "Please Enter Faq Category",
                    maxlength: "Title should not be more than 50 characters",
                }
            },
            submitHandler: function (form) {
                var formData = new FormData(form);
                // console(formData);
                e.preventDefault(),
                    $.ajax({
                        url: '/admin/add_faq_category',
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            // let response = $.parseJSON(result);
                            // console.log(response);
                            if (result.status == 200) {
                                toastr.success('Faq Category added successfully');
                                setTimeout(function () {
                                    window.location.href = "/admin/manage_faq";
                                }, 2000);
                            } else {
                                toastr.error("Something went wrong");
                            }
                        },
                    });
            }
        });
    });
    
    // insert categories end here

    // Delete Faq categories start here
    
    $(document).on("click",".delete_faq_categories",function(){
        var delete_id = $(this).data('id'); 
        // alert(delete_id);
        $('#delete_faq_categories_id').val(delete_id);
        $('#delete_opt').modal('show');
    });
    
    $(document).on("click",".delete_faq_categories_button",function(e){
        e.preventDefault();
        var delete_id = $('#delete_faq_categories_id').val();
        // alert(delete_id);
        $.ajaxSetup({
            headers: {
              "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
          });
        $.ajax({
            type:"DELETE",
            url: "/admin/delete_faq_category/" + delete_id,
            // url:"/delete_short_clips/"+delete_id,
            success:function(response){
              console.log(response);
              toastr.info("Faq Categories Deleted successfully");
              $('#delete_opt').modal('hide');
            window.location.href = "/admin/manage_faq";
            }
        });
    });

    // Delete Faq categories end here

    // edit Faq categories start here
    
    $(document).on("click", "#edit_categories_value", function (e) {
        
        var edit_categ_id = $(this).data('id');
        var edit_categ_name = $(this).data('category_name');
        $('#edit_category_id').val(edit_categ_id);
        $('#edit_category_name').val(edit_categ_name);
        // alert(edit_categ_id);
    });
    
    $(document).on("click", "#edit_categories", function (e){
    // $('#edit_categories').on("click", function (e) {
        $('#edit_faq_category_form').validate({
            rules: {
                category_name: {
                    required: true,
                    maxlength: 50,
                }
            },
            messages: {
                category_name: {
                    required: "Please Enter Faq Category",
                    maxlength: "Title should not be more than 50 characters",
                }
            },
              submitHandler: function (form) {
                var formData = new FormData(form);
                // console(formData);
                e.preventDefault(),
                    $.ajax({
                        url: '/admin/update_faq_category',
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            // let response = $.parseJSON(result);
                            // console.log(response);
                            if (result.status == 200) {
                                toastr.success('Faq Category updated successfully');
                                setTimeout(function () {
                                    window.location.href = "/admin/manage_faq";
                                }, 1000);
                            } else {
                                toastr.error("Something went wrong");
                            }
                        },
                    });
            }
        });
    });
    
    // edit Faq categories end here

    // Faq categories status change start here 
    
    $("#mng-sings").on("change", ".active_faq_categ", function () {
        // console.log('handler');
        var status = $(this).prop("checked") == true ? 1 : 0;
        var faq_catag_id = $(this).data("id");
        // alert(faq_catag_id);
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/admin/change_faq_catg_Status_",
            data: {
              status: status,
              faq_catag_id: faq_catag_id,
            },
            success: function (data) {
              if (status == 1) {
                toastr.options = {
                  "timeOut": 500
                }
                toastr.success("Status Activate successfully. !!");
              } else {
                toastr.error("Status Deactivate successfully. !!");
              }
    
              //              location.reload();
              //              console.log(data);
            },
          });
    });
    
    // Faq categories status change end here 
});
