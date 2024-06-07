// $(document).ready(function(){
    $("#addPodcastDataForm").validate({
        rules:{
            title:{
                required:true
            },
            description:{
                required:true
            },
            url:{
                required:true,
                // url: true
            },
            image:{
                required:true
            }
        },
        messages:{
            title:{
                required:"Title Is Required"
            },
            description:{
                required:"Description Is Required"
            },
            url:{
                required:"URL Is Required",
                // url: "Please enter a valid URL"
            },
            image:{
                required:"Image Is Required"
            }
        },
        submitHandler:function(form){
            var formData = new FormData(form);
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/admin/addPodcastData",
                type: "POST",
                data: formData,
                async: true,
                cache: false,
                contentType: false,
                processData: false,
                success: function (result) {
                    if (result.status == 200) {
                        var url = "/admin/manage_podcast";
                        setTimeout(function () {
                            window.location.replace(url);
                        }, 1000);
                        toastr.success(result.message);
                    }else if(result.status == 422){
                        toastr.error(result.message);
                    }else{
                        toastr.error(result.message);
                    }
                }
            });
        }
    });
    
    $(".editPodcastBtn").on("click",function(){
        // alert("hii");
        let id = $(this).data('id');
        let title = $(this).data('title');
        let description = $(this).data('description');
        let podcast_url = $(this).data('podcast_url');
        let banner_image = $(this).data('banner_image');
        
        $('.id').val(id);
        $('.title').val(title);
        $('.description').val(description);
        $('.url').val(podcast_url);
        $('.image').val(banner_image);
    });
    
    $("#updatePodcastForm").validate({
        rules:{
            title:{
                required:true
            },
            description:{
                required:true
            },
        },
        messages:{
            title:{
                required:"Title Is Required"
            },
            description:{
                required:"Description Is Required"
            },

        },
        submitHandler:function(form){
            var formData = new FormData(form);
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                
                url: "/admin/updatePodcastData",
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
                    }else if(result.status == 422){
                        toastr.error(result.message);
                    }else{
                        toastr.error(result.message);
                    }
                }
            });
            
        }
    });
    
    $('.deletePodcastBtn').on("click",function(){
        
        let id = $(this).data('id');
        $('#id').val(id);
    });
    $('.deletePodcast').on("click",function(){
        let id = $('#id').val();
        // AJAX request
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: '/admin/deletePodcastData',  // Replace with your actual route
            type: 'POST',
            data: {
                id: id,
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
    
    $('.podcastSwitch').on("change",function(){
           
        var status = this.checked ? 1 : 0;
        
        var queId = this.id.replace('podcastSwitch', '');
        
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
           url: "/admin/updatePodcastStatus",
            type: 'POST',
            data: {
                queId: queId,
                status: status,
                // _token: '{{ csrf_token() }}' 
            }, 
            success: function (result) {
                if (result.status == 200) {
                    toastr.success(result.messages);
                }
            }
        });
    });
// });