$(document).ready(function () {

    // insert Thought start here
    $('#save_thoughts').on("click", function (e) {
//         alert('save_thoughts');
        $('#add_thought_form').validate({
            rules: {
                user_thought: {
                    required: true,
                }
            },
            messages: {
                user_thought: {
                    required: "Please Enter Thought",
                }
            },
            submitHandler: function (form) {
                var formData = new FormData(form);
                // console(formData);
                e.preventDefault(),
                    $.ajax({
                        url: '/admin/add_thought',
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            // let response = $.parseJSON(result);
                            // console.log(response);
                            if (result.status == 200) {
                                toastr.success('Thought added successfully');
                                setTimeout(function () {
                                    window.location.reload();
                                }, 1000);
                            } else {
                                toastr.error("Something went wrong");
                            }
                        },
                    });
            }
        });
    });
    // insert Thought end here

    // Delete Thought start here
    $(document).on("click",".delete_thoughts",function(){
        var delete_id = $(this).data('id'); 
        // alert(delete_id);
        $('#delete_thought_id').val(delete_id);
        $('#delete_opt').modal('show');
    });
    
    $(document).on("click",".delete_thought_button",function(e){
        e.preventDefault();
        var delete_id = $('#delete_thought_id').val();
        // alert(delete_id);
        $.ajaxSetup({
            headers: {
              "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
          });
        $.ajax({
            type:"DELETE",
            url: "/admin/delete_thought/" + delete_id,
            // url:"/delete_short_clips/"+delete_id,
            success:function(response){
              console.log(response);
              toastr.info("Thought Deleted successfully");
              $('#delete_opt').modal('hide');
            window.location.href = "/admin/manage_thoughts";
            }
        });
    });

    // Delete Thought end here

    // edit Thought start here
    $(document).on("click", "#edit_thought_value", function (e) {
        var edit_thoug_id = $(this).data('id');
        var edit_user_thoug = $(this).data('thought');
        $('#edit_thought_id').val(edit_thoug_id);
        $('#edit_user_thought').val(edit_user_thoug);
//         alert(edit_user_thoug);
    });
    
    $(document).on("click", "#edit_thought", function (e){
        $('#update_thought_form').validate({
            rules: {
                uuser_thought: {
                    required: true,
                }
            },
            messages: {
                uuser_thought: {
                    required: "Please Enter Thought",
                }
            },
            submitHandler: function (form) {
                var formData = new FormData(form);
                // console(formData);
                e.preventDefault(),
                $.ajax({
                    url: '/admin/update_thought',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (result) {
                        // let response = $.parseJSON(result);
                        if (result.status == 200) {
                            toastr.success('Thought Updated successfully');
                            setTimeout(function () {
                                window.location.reload();
                            }, 1000);
                        } else {
                            toastr.error("Something went wrong");
                        }
                    },
                });
            }
        });
    });
    // edit Thought end here

// Active inactive functionality start
$("#mng-sings").on("change", ".active_thought", function () {
  var isChecked = $(this).prop('checked');
  var buttonId = $(this).data('id');

  if (isChecked) {
    // Check if any other active button is already checked
    var isOtherActiveButtonChecked = $('.active_thought:checked').not(this).length > 0;

    if (isOtherActiveButtonChecked) {
      // Display error message or perform desired action
//      alert('Only one button can be active at a time.');
        toastr.options = {
          "timeOut": 1000
        }
      toastr.error("Only One Thoughts Can Be Active At A Time.");
      $(this).prop('checked', false); // Uncheck the current button
      return;
    }

    // Deactivate all other toggle buttons
    $('.active_thought').not(this).prop('checked', false);
    $('.onoffswitch').not($(this).parent()).removeClass('active');
  }

  // Thoughts status change start here
  var status = isChecked ? 1 : 0;
  var thought_id = buttonId;

  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/admin/change_manage_thoughts_Status",
    data: {
      status: status,
      thought_id: thought_id,
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
    },
    error: function (xhr, status, error) {
      console.error('An error occurred while changing thoughts status.');
    }
  });
});
// Check for initially active buttons
  $('.active_thought:checked').trigger('change');
  // Active inactive functionality end
});
