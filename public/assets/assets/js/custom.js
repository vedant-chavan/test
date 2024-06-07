//====textarea editor====
//    
//        ClassicEditor
//            .create( document.querySelector( '#editor' ) )
//            .catch( error => {
//                console.error( error );
//            } );
//  







$(document).ready(function () {
    var table = $('#mng-sings-two').removeAttr('width').DataTable({
        scrollX: false,
        responsive: true,
    });
});

$(document).ready(function () {
    var table = $('#mng-sings-three').removeAttr('width').DataTable({
        scrollX: false,
        responsive: true,
    });
});

$(document).ready(function () {
    var table = $('#mng-sings-four').removeAttr('width').DataTable({
        scrollX: false,
        responsive: true,
    });
});


//=====vedio-uploader======

jQuery(document).ready(function($){

// Click button to activate hidden file input
$('.fileuploader-btn').on('click', function(){
$('.fileuploader').click();
});

// Click above calls the open dialog box
// Once something is selected the change function will run
$('.fileuploader').change(function(){

// Create new FileReader as a variable
var reader = new FileReader();

// Onload Function will run after video has loaded
reader.onload = function(file){
var fileContent = file.target.result;
$('body').append('<video class="vedio-play" src="' + fileContent + '" width="320" height="240" controls></video>');
};

// Get the selected video from Dialog
reader.readAsDataURL(this.files[0]);

});

});



$('.file-input').change(function(){
    var curElement = $('.image');
    console.log(curElement);
    var reader = new FileReader();

    reader.onload = function (e) {
        // get loaded data and render thumbnail.
        curElement.attr('src', e.target.result);
    };

    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
});



//=====image-drop=====

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