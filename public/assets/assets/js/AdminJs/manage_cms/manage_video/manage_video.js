$(document).ready(function () {
    // for add image croping tool start here
    var $add_modal = $("#cropting_add_modal");
    var image = document.getElementById("image");
    var cropper;
  
    $(".croping").on("change", ".image", function (e) {
    //   alert("image"); 
      var files = e.target.files;
      var done = function (url) {
        image.src = url;
        $add_modal.modal("show");
      };
      var reader;
      var file;
      var url;
  
      if (files && files.length > 0) {
        file = files[0];
        if (URL) {
          done(URL.createObjectURL(file));
        } else if (FileReader) {
          reader = new FileReader();
          reader.onload = function (e) {
            done(reader.result);
          };
          reader.readAsDataURL(file);
        }
      }
    });
  
    $add_modal.on("shown.bs.modal", function () {
        cropper = new Cropper(image, {
          dragMode: "move",
          preview: ".preview",
          aspectRatio: 16 / 9,
          autoCropArea: 0.65,
          restore: false,
          guides: false,
          center: false,
          highlight: false,
          cropBoxMovable: false,
          cropBoxResizable: false,
          toggleDragModeOnDblclick: false,
        });
          })
        .on("hidden.bs.modal", function () {
            cropper.destroy();
            cropper = null;
        });
  
    $("#cropting_modal_cancle").click(function () {
      $("#cropting_add_modal").modal("hide");
    });
  
    $("#crop").click(function () {
      canvas = cropper.getCroppedCanvas({
        width: 400,
        height: 400,
      });
      canvas.toBlob(function (blob) {
        url = URL.createObjectURL(blob);
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          var base64data = reader.result;
          $("#img_path").val(base64data);
          $("#cropting_add_modal").modal("hide");
        };
      });
    });
    // for add image croping tool end here

    // for edit image croping tool start here
    var $modal = $("#cropting_edit_modal");
    var image = document.getElementById("image");
    var cropper;
  
    $(".croping_edit").on("change", ".edit_image", function (e) {
    //   alert(image);
      var files = e.target.files;
      var done = function (url) {
        image.src = url;
        $modal.modal("show");
      };

      var reader;
      var file;
      var url;
  
      if (files && files.length > 0) {
        file = files[0];
        if (URL) {
          done(URL.createObjectURL(file));
        } else if (FileReader) {
          reader = new FileReader();
          reader.onload = function (e) {
            done(reader.result);
          };
          reader.readAsDataURL(file);
        }
      }
    });
  
    $modal.on("shown.bs.modal", function () {
        cropper = new Cropper(image, {
          dragMode: "move",
          preview: ".preview",
          aspectRatio: 16 / 9,
          autoCropArea: 0.65,
          restore: false,
          guides: false,
          center: false,
          highlight: false,
          cropBoxMovable: false,
          cropBoxResizable: false,
          toggleDragModeOnDblclick: false,
        });
          })
        .on("hidden.bs.modal", function () {
            cropper.destroy();
            cropper = null;
        });
  
    $("#cropting_edit_modal_cancle").click(function () {
      $("#cropting_edit_modal").modal("hide");
    });
  
    $("#crop_update").click(function () {
      canvas = cropper.getCroppedCanvas({
        width: 400,
        height: 400,
      });
      canvas.toBlob(function (blob) {
        url = URL.createObjectURL(blob);
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          var base64data = reader.result;
          $("#img_path_edit").val(base64data);
          $("#cropting_edit_modal").modal("hide");
        };
      });
    });
    // for edit image croping tool end here

  
    // add manage video
    $(document).on("click", "#add_manage_video", function () {
      $("#add_manage_video_form").validate({
        rules: {
          video_type: {
            required: true,
          },
          video_title: {
            required: true,
            maxlength: 50,
          },
          video_description: {
            required: true,
            minlength: 30,
          },
          video_cover_image: {
            required: true,
          },
          video_url: {
            required: true,
            url: true,
          },
        },
        messages: {
          video_type: {
            required: "Please select a category",
          },
          video_title: {
            required: "Please Enter Video Title",
            maxlength: "Title should not be more than 50 characters",
          },
          video_description: {
            required: "Please enter description",
            minlength: "Description should be atleast 30 characters",
          },
          video_cover_image: {
            required: "Please select video cover image",
          },
          video_url: {
            required: "Please enter url",
            url: "Please enter valid url",
          },
        },
        submitHandler: function (form) {
          var formData = new FormData(form);
          $.ajax({
            url: "/admin/insert_manage_video",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                let response = $.parseJSON(result);
              // console.log(response);
              if (response.status == 200) {
                toastr.success("Video added successfully");
                setTimeout(function () {
                  window.location.href = "/admin/manage_video";
                }, 1000);
              } else {
                toastr.error("Something went wrong");
              }
            },
          });
        },
      });
    });
    // add manage video end
  
    // delete manage video
    $(document).on("click", ".delete_manage_video", function () {
      var delete_id = $(this).data("id");
      $("#delete_manage_video_id").val(delete_id);
      $("#delete_opt").modal("show");
    });
  
    $(document).on("click", ".delete_manage_video_button", function (e) {
      e.preventDefault();
      var delete_id = $("#delete_manage_video_id").val();
      $.ajaxSetup({
        headers: {
          "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
      });
      $.ajax({
        type: "DELETE",
        url: "/admin/delete_video/" + delete_id,
        success: function (response) {
          console.log(response);
          toastr.info("Video Deleted successfully");
          $("#delete_opt").modal("hide");
          window.location.href = "/admin/manage_video";
        },
      });
    });
    // delete manage video end
  
    // update manage video
    $(document).on("click", "#edit_manage_video", function () {
      //  alert("call the function");
      $("#edit_manage_video_form").validate({
        rules: {
          video_type: {
            required: true,
          },
          video_title: {
            required: true,
            maxlength: 50,
          },
          video_description: {
            required: true,
            minlength: 30,
          },
          // video_cover_image:{
          //     required: true,
          // },
          video_url: {
            required: true,
            url: true,
          },
        },
        messages: {
          video_type: {
            required: "Please select a category",
          },
          video_title: {
            required: "Please Enter Video Title",
            maxlength: "Title should not be more than 50 characters",
          },
          video_description: {
            required: "Please enter description",
            minlength: "Description should be atleast 30 characters",
          },
          // video_cover_image:{
          //     required: "Please select video cover image",
          // },
          video_url: {
            required: "Please enter url",
            url: "Please enter valid url",
          },
        },
        submitHandler: function (form) {
          var formData = new FormData(form);
          $.ajax({
            url: "/admin/update_mange_video",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                let response = $.parseJSON(result);
              // console.log(response);
              if (response.status == 200) {
                toastr.success("Video Updated successfully");
                setTimeout(function () {
                  window.location.href = "/admin/manage_video";
                }, 1000);
              } else {
                toastr.error("Something went wrong");
              }
            },
          });
        },
      });
    });
    // update manage video
  
    // update manage video status
    $("#mng-sings").on("change", ".active_manage_video", function () {
    //   console.log("handler");
      var status = $(this).prop("checked") == true ? 1 : 0;
      var manage_video_id = $(this).data("id");
      // alert(manage_video_id);
      $.ajax({
        type: "GET",
        dataType: "json",
        url: "/admin/change_manage_video_Status",
        data: {
          status: status,
          manage_video_id: manage_video_id,
        },
        success: function (data) {
          if (status == 1) {
            toastr.options = {
              timeOut: 500,
              //   positionClass: 'toast-top-center',
            };
            toastr.success("Status Activate successfully. !!");
          } else {
            toastr.error("Status Deactivate successfully. !!");
          }
  
          //              location.reload();
          //              console.log(data);
        },
      });
    });
    // update manage video status
  });
  