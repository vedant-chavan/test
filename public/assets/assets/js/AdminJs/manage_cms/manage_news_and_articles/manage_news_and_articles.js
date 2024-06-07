$("#addCategoriesForm").validate({
    rules:{
        categoryName:{
                required:true
            },
    },
    messages:{
        categoryName:{
                required:"Field Is Required"
            },
    },
    submitHandler: function (form) {
            var formData = new FormData(form);
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/admin/addCategoriesData",
                type: "POST",
                data: formData,
                async: true,
                cache: false,
                contentType: false,
                processData: false,
                success: function (result) {
                    if (result.status == 200) {
                        toastr.success(result.messages);
                            setTimeout(function () {
                                window.location.href = "/admin/manage_cms_news_article";
                            }, 1000);
                    }
                }
            });
        }
});
$(".editNewsCategory").on("click",function(){
    let categoryId = $(this).data('catid');
    let categoryName = $(this).data('categoryname');
    alert(categoryId);
    alert(categoryName);
    $('.editCatName').val(categoryName);
    $('.editCatId').val(categoryId);
});

$("#editCategoryFrom").validate({
    rules:{
        editCatName:{
                required:true
            },
    },
    messages:{
        editCatName:{
                required:"Field Is Required"
            },
    },
    submitHandler: function (form) {
        var formData = new FormData(form);
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: "/admin/editCategoriesData",
            type: "POST",
            data: formData,
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            success: function (result) {
                if (result.status == 200) {
                    toastr.success(result.messages);
                        setTimeout(function () {
                            window.location.href = "/admin/manage_cms_news_article";
                        }, 1000);
                }
            }
        });
    }
});

$('.deleteCategory').on("click",function(){
    let deleteId = $(this).data('catid');
    // alert(deleteId);
    $("#delete_id").val(deleteId)
});

$('.deleteCatBtn').on("click",function(){
    let deleteId = $('#delete_id').val();
    
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: "/admin/deleteCategoriesData",
        type: 'POST',
        data: {
            deleteId: deleteId,
        },
        success: function (response) {
            toastr.error(response.messages);
            setTimeout(function () {
                window.location.reload();
            }, 1000);
        }
    });
});

$('.switchcategory').on("change",function(){
           
    var status = this.checked ? 1 : 0;
    
    var catId = this.id.replace('switchcategory', '');

    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
       url: "/admin/updatCatStatus",
        type: 'POST',
        data: {
            catId: catId,
            status: status,
        }, 
        success: function (result) {
            if (result.status == 200) {
                toastr.success(result.messages);
            }
        }
    });
});

$('.submitArticleBtn').on("click",function(){
    let submitBtnVal = $(this).val();
    $("#addArticleForm").validate({
    rules:{
        articleName:{
            required:true
        },
        articleShortText:{
            required:true
        },
        articleDescription:{
            required:true
        },
        articleCatId:{
            required:true
        },
        articleUrl:{
            required:true
        },
        articleTags:{
            required:true
        },
        articleThumbnailImage:{
            required:true
        },
        articleImage:{
            required:true
        },
    },
    messages:{
        articleName:{
            required:"Field Is Required"
        },
        articleShortText:{
            required:"Field Is Required"
        },
        articleDescription:{
            required:"Field Is Required"
        },
        articleCatId:{
            required:"Field Is Required"
        },
        articleUrl:{
            required:"Field Is Required"
        },
        articleTags:{
            required:"Field Is Required"
        },
        articleThumbnailImage:{
            required:"Field Is Required"
        },
        articleImage:{
            required:"Field Is Required"
        },
    },
    submitHandler: function (form) {
            var formData = new FormData(form);
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/admin/addArticleData",
                type: "POST",
                data: formData,
                async: true,
                cache: false,
                contentType: false,
                processData: false,
                success: function (result) {
                    let url = "";
                    if(submitBtnVal == "save"){
                        url = "/admin/manage_cms_news_article";
                    }
                    else{
                        url = "/admin/add_manage_cms_news_article";
                    }
                    if (result.status == 200) {
                        toastr.success(result.messages);
                            setTimeout(function () {
                                window.location.href = url;
                            }, 1000);
                    }
                }
            });
        }
    });
});

$("#editArticleForm").validate({
    rules:{
        articleName:{
            required:true
        },
        articleShortText:{
            required:true
        },
        articleDescription:{
            required:true
        },
        articleCatId:{
            required:true
        },
        articleUrl:{
            required:true
        },
        articleTags:{
            required:true
        },
    },
    messages:{
        articleName:{
            required:"Field Is Required"
        },
        articleShortText:{
            required:"Field Is Required"
        },
        articleDescription:{
            required:"Field Is Required"
        },
        articleCatId:{
            required:"Field Is Required"
        },
        articleUrl:{
            required:"Field Is Required"
        },
        articleTags:{
            required:"Field Is Required"
        },
    },
    
    submitHandler: function (form) {
        
        var formData = new FormData(form);
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: "/admin/editArticleData",
            type: "POST",
            data: formData,
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            success: function (result) {
                url = "/admin/manage_cms_news_article";
                if (result.status == 200) {
                    toastr.success(result.messages);
                    setTimeout(function () {
                        window.location.href = url;
                    }, 2000);
                }
            }
        });
    }
    
});

$('.switchArticle').on("change",function(){
           
    var status = this.checked ? 1 : 0;
    var catId = this.id.replace('switchArticle', '');

    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
       url: "/admin/updatArticleStatus",
        type: 'POST',
        data: {
            catId: catId,
            status: status,
        }, 
        success: function (result) {
            if (result.status == 200) {
                toastr.success(result.messages);
            }
        }
    });
});


$('.deleteArticle').on("click",function(){
    let deleteId = $(this).data('article_id');
    // alert(deleteId);
    $("#delete_id").val(deleteId)
});

$('.deleteArticleBtn').on("click",function(){
    let deleteId = $('#delete_id').val();
    // alert(deleteId);
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: "/admin/deleteArticlesData",
        type: 'POST',
        data: {
            deleteId: deleteId,
        },
        success: function (response) {
            toastr.error(response.messages);
            setTimeout(function () {
                window.location.reload();
            }, 1000);
        }
    });
});
