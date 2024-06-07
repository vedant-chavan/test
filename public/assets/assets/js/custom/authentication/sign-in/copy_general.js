"use strict";
var KTSigninGeneral = (function () {
    var e, t, i;
    return {
        init: function () {
            (e = document.querySelector("#kt_sign_in_form")),
                (t = document.querySelector("#kt_sign_in_submit")),
                (i = FormValidation.formValidation(e, {
                    fields: {
                        email: { validators: { regexp: { regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "The value is not a valid email address" }, notEmpty: { message: "Email address is required" } } },
                        password: { validators: { notEmpty: { message: "The password is required" } } },
                        digit_pin: { validators: { notEmpty: { message: "The 4 digit pin is required" } } },
                    },
                    plugins: { trigger: new FormValidation.plugins.Trigger(), bootstrap: new FormValidation.plugins.Bootstrap5({ rowSelector: ".fv-row", eleInvalidClass: "", eleValidClass: "" }) },
                })),
                t.addEventListener("click", function (n) {
                    n.preventDefault(),
                        i.validate().then(function (i) {
                            let email = $('#email').val();
                            let password = $('#password').val();
                            let digit_pin = $('#digit_pin').val();
                            $.ajax({
                                url: 'send_otp',
                                type: 'POST',
                                data: {
                                    '_token': $('meta[name="csrf-token"]').attr('content'),
                                    email : email, password : password, pin : digit_pin,
                                },
                                success: function (result) {
                                    if(result.data.success == '0'){
                                        // toastr.error(result.data.message);
                                        Swal.fire({
                                            text: result.data.message,
                                            icon: "error",
                                            buttonsStyling: !1,
                                            confirmButtonText: "Ok, got it!",
                                            customClass: { confirmButton: "btn btn-primary popup-button" },
                                        });
                                    }
                                    else {
                                        Swal.fire({ text: result.data.message, icon: "success", buttonsStyling: !1, confirmButtonText: "Proceed", customClass: { confirmButton: "btn btn-primary popup-button" } }).then(function (t) {
                                            if (t.isConfirmed) {
                                                (e.querySelector('[name="email"]').value = ""), (e.querySelector('[name="password"]').value = "");
                                                let i = e.getAttribute("data-kt-redirect-url");
                                                // i && (location.href = i);
                                                var url = i+"?d="+result.data.email;
                                                window.location.replace(url);
                                            }
                                        });
                                    }
                                }
                            });
                            // "Valid" == i
                            //     ? (t.setAttribute("data-kt-indicator", "on"),
                            //       (t.disabled = !0),
                            //       setTimeout(function () {
                            //           t.removeAttribute("data-kt-indicator"),
                            //               (t.disabled = !1),
                            //               Swal.fire({ text: "OTP has been send on your mail", icon: "success", buttonsStyling: !1, confirmButtonText: "Proceed", customClass: { confirmButton: "btn btn-primary popup-button" } }).then(function (t) {
                            //                   if (t.isConfirmed) {
                            //                       (e.querySelector('[name="email"]').value = ""), (e.querySelector('[name="password"]').value = "");
                            //                       var i = e.getAttribute("data-kt-redirect-url");
                            //                       i && (location.href = i);
                            //                   }
                            //               });
                            //       }, 2e3))
                            //     : Swal.fire({
                            //           text: "Sorry, looks like there are some errors detected, please try again.",
                            //           icon: "error",
                            //           buttonsStyling: !1,
                            //           confirmButtonText: "Ok, got it!",
                            //           customClass: { confirmButton: "btn btn-primary popup-button" },
                            //       });
                        });
                });
        },
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KTSigninGeneral.init();
});