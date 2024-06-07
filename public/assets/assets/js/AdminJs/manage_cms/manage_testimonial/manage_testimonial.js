$(document).ready(function(){
    // delete testimonial
    $(document).on("click",".delete_testimonial",function(){
        var delete_testimonial_id = $(this).data('id'); 
        // alert(delete_testimonial_id);
        $('#delete_testimonial_id').val(delete_testimonial_id);
        $('#delete_opt').modal('show');
    });

    $(document).on("click",".delete_manage_testimonial_button",function(e){
        e.preventDefault();
        var delete_id = $('#delete_testimonial_id').val();
        // alert(delete_id);
        $.ajaxSetup({
            headers: {
              "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
          });
        $.ajax({
            type:"DELETE",
            url:"/admin/delete_testimonial/" + delete_id,
            success:function(response){
              console.log(response);
              toastr.info("Testimonial Deleted successfully");
              $('#delete_opt').modal('hide');
            window.location.href = "/admin/view_testimonial";

            }
        });
    });
    
    // delete testimonial end
    
    // Add testimonial start
    
    $(document).on("click", ".submit", function (e) {
        var submit_val = $(this).val();
//        alert(submit_val);
//         return false;
        $("#testimonial_form").validate({
            rules: {
                name: {
                    required: true,
                },
                title: {
                    required: true,
                },
                description: {
                    required: true,
                },
                image: {
                    required: true,
                },
            },
            messages: {
                name: {
                    required: "Please enter name",
                },
                title: {
                    required: "Please enter title",
                },
                description: {
                    required: "Please enter description",
                },
                image: {
                    required: "Please select image",
                },        
            },
            submitHandler: function (form) {
//                print_r(form);exit;
                var formData = new FormData(form);
                $.ajax({
                    url: "/admin/insert_testimonial",
                    type: "POST",
                    data: formData,
                    async: true,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        $(".publish").html("Publishing....");
                        $(".publish").prop("disabled", true);
                        
                        if (result.status == 200) {
                            toastr.success('Testimonial added successfully');
                            setTimeout(function () {
                                window.location.href = "/admin/view_testimonial";
                            }, 1000);
                        } else if(result.status == 422){
                            toastr.error('The File Must Not Be Greater Than 400 KB.');
                        }
                        else {
                            toastr.error("Something went wrong");
                        }
                    },
                });
            },
        });
    });
    
    // Add testimonial end
    
    
    // edit testimonial start
    
    $("#edit_testimonial_form").validate({
        rules: {
            user_name: {
                required: true,
//                maxlength: 80,
            },
            title: {
                required: true,
//                maxlength: 80,
            },
            description: {
                required: true,
//                minlength: 30,
            },
            
        },
        messages: {
            user_name: {
                required: "Please enter name",
            },
            title: {
                required: "Please enter title",
            },
            description: {
                required: "Please enter description",
//                minlength: "Description should be atleast 30 characters",
            },
            
        },
        submitHandler: function (form) {
            // print_r(form);exit;
            // $("#edit_submit").html("Please Wait...");
            // $("#edit_submit").prop("disabled", true);

            var formData = new FormData(form);
            // alert(formData);
            // var id= $("#edit_id").val();
            // alert(id);
            // console.log(formData);
            $.ajax({
                url: "/admin/update_testimonial",
                type: "POST",
                data: formData,
                async: true,
                cache: false,
                contentType: false,
                processData: false,
                success: function (result) {
                    // console.log(response);
                    if (result.status == 200) {
                        toastr.success("Testimonial updated successfully");
                        setTimeout(function () {
                            window.location.href = "/admin/view_testimonial";
                        }, 1000);
                    } 
                    else if(result.status == 422){
                        toastr.error('The File Must Not Be Greater Than 400 KB.');
                    }
                    else {
                        toastr.error("Something went wrong");
                    }
                },
            });
        },
    });
    //edit testimonial end
    
    
    $('.edit_remove-btn').click(function () {
        var imageId = $(this).data('image_id');
        // alert(imageId);
        var imagesToRemove = $('#images-to-remove');

        // Get the current value and parse it as an array
        var removedImages = imagesToRemove.val() ? JSON.parse(imagesToRemove.val()) : [];
        
        // Only push to the array if the imageId is not null
        if (imageId) {
            removedImages.push(imageId);
        }

        // Update the hidden input with the updated array as JSON string
        imagesToRemove.val(JSON.stringify(removedImages));

        // Remove the image element from the DOM
        $(this).parent('.edit_wrapper-thumb').remove();
    });
    
    //    multi image upload js start 
    var imgUpload = document.getElementById('upload-img')
            , imgPreview = document.getElementById('img-preview')
            , imgUploadForm = document.getElementById('form-upload')
            , totalFiles
            , previewTitle
            , previewTitleText
            , img;

    imgUpload.addEventListener('change', previewImgs, true);

    function previewImgs(event) {
        totalFiles = imgUpload.files.length;

        if (!!totalFiles) {
            imgPreview.classList.remove('img-thumbs-hidden');
        }

        for (var i = 0; i < totalFiles; i++) {
            wrapper = document.createElement('div');
            wrapper.classList.add('edit_wrapper-thumb');
            removeBtn = document.createElement("span");
            nodeRemove = document.createTextNode('x');
            removeBtn.classList.add('edit_remove-btn');
            removeBtn.appendChild(nodeRemove);
            img = document.createElement('img');
            img.src = URL.createObjectURL(event.target.files[i]);
            img.classList.add('img-preview-thumb');
            wrapper.appendChild(img);
            wrapper.appendChild(removeBtn);
            imgPreview.appendChild(wrapper);

            $('.edit_remove-btn').click(function () {
                $(this).parent('.edit_wrapper-thumb').remove();
            });
        }
    }
});
