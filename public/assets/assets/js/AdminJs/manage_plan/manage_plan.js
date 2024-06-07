    $(document).ready(function(){
    
    // Add plan start  
    $(document).on("click", ".submit", function (e) {
//                e.preventDefault();
        var submit_val = $(this).val();
//        alert(submit_val);
//         return false;
        $("#plan_form").validate({
            rules: {
                plan_name: {
                    required: true,
                },
                myFile:{
                    required: true,
                },
                description: {
                    required: true,
                },
                plan_period: {
                    required: true,
                },
                plan_price: {
                    required: true,
                },
                currency_type: {
                    required: true,
                },
            },
            messages: {
                plan_name: {
                    required: "Please enter plan name",
                },
                myFile:{
                    required: "Please select image",
                },
                description: {
                    required: "Please enter description",
                },
                plan_period: {
                    required: "Please enter plan period",
                },
                plan_price: {
                    required: "Please enter plan price",
                },
                currency_type: {
                    required: "Please enter currency type",
                },        
            },
            submitHandler: function (form) {
//                print_r(form);exit;
                var formData = new FormData(form);
                $.ajax({
                    url: "/admin/insert_plan",
                    type: "POST",
                    data: formData,
                    async: true,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        let response = $.parseJSON(result);
//                         console.log(response);
                        if (response.status == 200) {
                            $("#plan_form").trigger("reset");
                            setTimeout(function () {
                                if (submit_val == "save") {
                                    var url = "/admin/manage_plan";
                                    toastr.options = {
                                        timeOut: 5000,
                                    };
                                    toastr.success("Plan added successfully");
                                    window.location.replace(url);
                                } else {
                                        setTimeout(function () {
                                        window.location.reload();
                                    }, 1000);
                                    toastr.success("Plan added successfully");
                                }
                            }, 1000);
                        } else {
                            $("#plan_form").trigger("reset");
                            toastr.error("Something went wrong");
                        }
                    },
                });
            },
        });
    });

    // Add plan end
    
    // delete plan
    $(document).on("click",".delete_plan",function(){
        var delete_plan_id = $(this).data('id'); 
        // alert(delete_plan_id);
        $('#delete_plan_id').val(delete_plan_id);
        $('#delete_opt').modal('show');
    });

    $(document).on("click",".delete_manage_plan_button",function(e){
        e.preventDefault();
        var delete_id = $('#delete_plan_id').val();
        // alert(delete_id);
        $.ajaxSetup({
            headers: {
              "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
          });
        $.ajax({
            type:"DELETE",
            url:"/admin/delete_plan/" + delete_id,
            success:function(response){
              console.log(response);
              toastr.info("Plan Deleted successfully");
              $('#delete_opt').modal('hide');
            window.location.href = "/admin/manage_plan";

            }
        });
    });
    // delete plan end
    
    // update manage plan
    $(document).on("click", "#edit_manage_plan", function () {
//        alert("edit_manage_plan");
      $("#edit_manage_plan_form").validate({
        rules: {
          edit_plan_id: {
            required: true,
          },
          plan_name: { 
            required: true,
          },
          description: {
            required: true,
          },
          plan_period: {
            required: true,
          },
          plan_price: {
            required: true,
          },
          currency_type: {
            required: true,
          }
        },
        messages: {
          plan_name: {
            required: "Please enter name",
          },
          description: {
            required: "Please enter description",
          },
          plan_period: {
            required: "Please enter period",
          },
          plan_price: {
            required: "Please enter price",
          },
          currency_type: {
            required: "Please enter currency",
          }
        },
        submitHandler: function (form) {
          var formData = new FormData(form);
          $.ajax({
            url: "/admin/update_plan",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                let response = $.parseJSON(result);
              // console.log(response);
              if (response.status == 200) {
                toastr.success("Plan Updated successfully");
                setTimeout(function () {
                  window.location.href = "/admin/manage_plan";
                }, 1000);
              } else {
                toastr.error("Something went wrong");
              }
            },
          });
        },
      });
    });
    // update manage Plan
  
});
