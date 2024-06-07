// $(document).ready(function(){
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    var nextDay = currentDate.toISOString().split('T')[0];
    $('#scheduleDate').attr('min', nextDay);
    $(".cancelScheduleDate").on("click", function() {
        $('#scheduleDate').val('');
    });

    $("#quiz_form").validate({
        rules:{
            question:{
                required:true
            },
            ans_a:{
                required:true
            },
            ans_b:{
                required:true
            },
            ans_c:{
                required:true
            },
            ans_d:{
                required:true
            },
            answer:{
                required:true
            }
        },
        messages:{
            question:{
                required:"Please Enter Question"
            },
            ans_a:{
                required:"Please Enter Answer A"
            },
            ans_b:{
                required:"Please Enter Answer B"
            },
            ans_c:{
                required:"Please Enter Answer C"
            },
            ans_d:{
                required:"Please Enter Answer D"
            },
            answer:{
                required:"Please Select Right Answer"
            }
        },
        submitHandler: function (form) {
            var formData = new FormData(form);
            $.ajax({
                url: "/admin/add_quiz_data",
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
                                window.location.href = "/admin/add_quiz";
                            }, 1000);
                    }
                }
            });
        }
    });
    
    // $('.viewAnswer').click(function(){
    //     // alert("hello");
    //     let queId = $(this).attr("data-que_id");
    //     alert(queId);
    // });
    
    
    // Add event listener for modal close event
        $('#closeQueButtn').on('click', function () {
            // Clear the modal body
            $('#view_opt .modal-body').empty();
            $('view_opt').hide('modal');
        });

        $('.viewAnswer').click(function(){
            var question = $(this).data('question');
            var answers = $(this).data('answers');

            // Ensure that answers is an array
            if (!Array.isArray(answers)) {
                console.error('Answers is not an array:', answers);
                answers = [];
            }
            
            // Set the modal title
            $('#view_opt .modal-title').text(question);

            // Populate the modal body
            answers.forEach(function(answer, index) {
                var optionLabel = String.fromCharCode(65 + index);
                var isChecked = (answer.is_active == '1') ? "select-rgh" : "";
                var answerHTML = `
                    <div class="alorem">
                        <label>${optionLabel}</label>
                        <div class="ans-opt ${isChecked}">
                            <label>
                                ${answer.answers}
                                <input type='checkbox' disabled>
                                <span></span>
                            </label>
                        </div>
                    </div>`;
                $('#view_opt .modal-body').append(answerHTML);
            });

            // Open the modal
            // $('#view_opt').modal('show');
        });
        
        
        $('.quizSwitch').on("change",function(){
           
            var status = this.checked ? 1 : 0;
            
            var queId = this.id.replace('paint', '');
            
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
               url: "/admin/updateQueStatus",
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
        
        $("#updateQueAnsForm").validate({
        rules:{
            question:{
                required:true
            },
            // answer_A:{
            //     required:true
            // },
            // answer_B:{
            //     required:true
            // },
            // answer_C:{
            //     required:true
            // },
            // answer_D:{
            //     required:true
            // },
            answer:{
                required:true
            }
        },
        messages:{
            question:{
                required:"Please Enter Question"
            },
            // ans_a:{
            //     required:"Please Enter Answer A"
            // },
            // ans_b:{
            //     required:"Please Enter Answer B"
            // },
            // ans_c:{
            //     required:"Please Enter Answer C"
            // },
            // ans_d:{
            //     required:"Please Enter Answer D"
            // },
            answer:{
                required:"Please Select Right Answer"
            }
        },
        submitHandler: function (form) {
            var formData = new FormData(form);
            $.ajax({
                url: "/admin/updateQueAnsFormData",
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
                                window.location.href = "/admin/manage_quiz";
                            }, 1000);
                    }
                }
            });
        }
    });
    
    $('.deleteQueBtn').on("click",function(){
        let deleteId = $(this).data('id');
        // alert(deleteId);
        $('#deleteQueId').val(deleteId);
    });
    
    $('.deleteQueFormBtn').on("click",function(e){
        e.preventDefault();
        let deleteQueId = $('#deleteQueId').val();
        
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        
        $.ajax({
            type: "DELETE",
            url: "/admin/deleteQueAns/" + deleteQueId,
            success: function (response) {
                toastr.error(response.messages);
                window.location.reload();
            }
        });
    });
// });