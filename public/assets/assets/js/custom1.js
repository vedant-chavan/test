






$(document).ready(function () {
    function datatble_resize() {
        var table = $('#mng-sings').removeAttr('width').DataTable({
            scrollX: false,
            responsive: true,
        });
    }
    var datatble_resize = $('#mng-sings').DataTable({
        responsive: true
    })

    // $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
    //   if (e.target.hash == '#Plans') {
    //     datatble_resize.columns.adjust().draw()
    //   }
    // })
});




let digitValidate = function (ele) {
    console.log(ele.value);
    ele.value = ele.value.replace(/[^0-9]/g, '');
};

let tabChange = function (val) {
    let ele = document.querySelectorAll('input');
    if (ele[val - 1].value !== '') {
        ele[val].focus();
    } else if (ele[val - 1].value === '') {
        ele[val - 2].focus();
    }
};



//onclick

var div = document.getElementById('new_post');

document.getElementById('sch_btn').addEventListener('click', showhide);

function showhide(e) {
    e.preventDefault();
    div.classList.toggle('visible');
}



//            Drag & Drop

document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("click", (e) => {
        inputElement.click();
    });

    inputElement.addEventListener("change", (e) => {
        if (inputElement.files.length) {
            updateThumbnail(dropZoneElement, inputElement.files[0]);
        }
    });

    dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("drop-zone--over");
        });
    });

    dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault();

        if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files;
            updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        }

        dropZoneElement.classList.remove("drop-zone--over");
    });
});

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */
function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        };
    } else {
        thumbnailElement.style.backgroundImage = null;
    }
}



//
////table
//
//
//$('#mng-sings-two').DataTable({
//  responsive: true
//});
//
//
//$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
//  $($.fn.dataTable.tables(true)).DataTable().columns.adjust().responsive.recalc();
//});  


// Select cheque
//
//   $(document).ready(function() {
//         $(".linkedac").select2({
// 			closeOnSelect : true,
// 			placeholder : "",
// 			allowHtml: true,
//  			allowClear: true,
// 		});
//   }






