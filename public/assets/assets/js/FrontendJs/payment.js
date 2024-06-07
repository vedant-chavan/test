
$(document).ready(function () {
    $(document).on("click", ".pay", function () {
        $.ajax({
            type: 'GET',
            url: '/getChecksum',
            data: {
                "_token": "{{ csrf_token() }}",
            },
            success: function (data) {
                console.log("success data",data);
                bdPayment.initialize({
                    "msg": "merchant_id|order_id|NA|100.00|NA|NA|NA|INR|NA|R|securityId|NA|NA|F|john@doe1.com|mobile_no|NA|NA|NA|NA|NA|NA"+data,
                    "options": {
                        "enableChildWindowPosting": true,
                        "enablePaymentRetry": true,
                        "retry_attempt_count": 2,
                        "txtPayCategory": "NETBANKING"
                    },
                    "callbackUrl": "https://gsf.betadelivery.com/payment_response"
                });
//                window.href.location="/";
            },
            error: function (error) {
                console.log("error",error);
            }
        });
    });
});
