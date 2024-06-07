

document.addEventListener("DOMContentLoaded", function() {
    
    
// function for hiding about us tab

    const aboutUsTabs = document.querySelectorAll(".about-us-tab");

    aboutUsTabs.forEach(tab => {
        const currentURL = window.location.href;
        console.log(currentURL)
        if (currentURL.includes("/Home") || currentURL === "https://thegsf.co/") {
            tab.style.display = "block";
        } else if (currentURL.includes("/our_services")) {
            tab.style.display = "none";
        } else if (currentURL.includes("/download")) {
            tab.style.display = "none";
        } else if (currentURL.includes("/contact_us")) {
            tab.style.display = "none";
        } else if (currentURL.includes("/transform_beyond")) {
            tab.style.display = "none";
        } else if (currentURL.includes("/transform_beyond_beginner")) {
            tab.style.display = "none";
        } else if (currentURL.includes("/gsf_exclusive")) {
            tab.style.display = "none";
        } else if (currentURL.includes("/get_set_eat")) {
            tab.style.display = "none";
        } 
    });
    
    
    // count down
    // const currentTab = window.location.href;
    
    // if(currentTab === 'https://thegsf.co/Home' || currentTab === 'https://thegsf.co/'){
    //     const second = 1000,
    //       minute = second * 60,
    //       hour = minute * 60,
    //       day = hour * 24;
        
    //         let countDown = new Date('September 9, 2023 00:00:00').getTime(),
    //         x = setInterval(function() {
        
    //       let now = new Date().getTime(),
    //         distance = countDown - now;
        
    //       document.getElementById('counter-days').innerText = Math.floor(distance / (day)),
    //       document.getElementById('counter-hours').innerText = Math.floor((distance % (day)) / (hour)),
    //       document.getElementById('counter-minutes').innerText = Math.floor((distance % (hour)) / (minute)),
    //       document.getElementById('counter-seconds').innerText = Math.floor((distance % (minute)) / second);
          
    //     }, second)
    // }
});

// header sticky

$(document).ready(function () {
  $(window).on('scroll', function () {
      if ($(document).scrollTop() > 100) {
          $('#header-topp').addClass('fixed_head')
      } else {
          $('#header-topp').removeClass('fixed_head')
      }
      ;
  });
});




// side navbar


function openNav() {
  document.getElementById("mySidenav_sc").style.width = "270px";
}

function closeNav() {
  document.getElementById("mySidenav_sc").style.width = "0";
}



// Counter

let count = document.querySelectorAll(".count")
let arr = Array.from(count)


arr.map(function(item){
  let startnumber = 0

  function counterup(){
  startnumber++
  item.innerHTML= startnumber
   
  if(startnumber == item.dataset.number){
      clearInterval(stop)
  }
}

let stop =setInterval(function(){
  counterup()
},1)

})


// slider

$(document).ready(function(){
  $('.slide-imgs').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    
  }); 
});

$(document).ready(function(){
  $('.commu-sliders').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: true,
    dots: false,
    infinite: false,
  });
});


  $('.mobiles-show').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: true,
    dots: true,
    infinite: false,
  });




// accordian

$(document).ready(function () {
    $(".set > button").on("click", function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this)
                    .siblings(".content")
                    .slideUp(200);
            $(".set > button i")
                    .removeClass("fa-minus")
                    .addClass("fa-plus");
        } else {
            $(".set > button i")
                    .removeClass("fa-minus")
                    .addClass("fa-plus");
            $(this)
                    .find("i")
                    .removeClass("fa-plus")
                    .addClass("fa-minus");
            $(".set > button").removeClass("active");
            $(this).addClass("active");
            $(".content").slideUp(200);
            $(this)
                    .siblings(".content")
                    .slideDown(200);
        }
    });
});




// add extra class on hover


const firstDiv = document.querySelector('.i-1 .img1-icon');
const otherDivs = document.querySelectorAll('.i-2, .i-3, .i-4, .i-5, .i-6, .i-7, .i-8');

otherDivs.forEach(div => {
  div.addEventListener('mouseover', function() {
    firstDiv.classList.add('extra_class');
  });

  div.addEventListener('mouseout', function() {
    firstDiv.classList.remove('extra_class');
  });
});








