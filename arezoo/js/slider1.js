$(document).ready(function () {

    const slides = $(".slide");
    const totalSlides = slides.length;
    let currentSlide = 0;
    let isAnimating = false;
    

    function showSlide(index) {
        if (!isAnimating) {
            if (index < 0 || index >= totalSlides) {
                return;
            }

            isAnimating = true;
            slides.eq(currentSlide).fadeOut(100, function () {
                slides.eq(index).fadeIn(100, function () {
                    isAnimating = false;
                });
            });
            currentSlide = index;
        }
    }

    $(".next-btn").on("click", function () {
        showSlide(currentSlide + 1);
    });

    $(".prev-btn").on("click", function () {
        showSlide(currentSlide - 1);
    });


    showSlide(currentSlide);

    const dot1 = $("#uno");
    const dot2 = $("#dos");
    const dot3 = $("#tres");

    let count = 0;
    let animationInProgress = false; 

    $(".next-btn").on("click", function () {
        if (!animationInProgress && count < 2) {
            animationInProgress = true;
            const currentLeft = parseFloat(dot1.css("left"));
            const newLeft = currentLeft + 50;

            dot1.stop().animate({ left: newLeft + "px" }, 200, function () {
                animationInProgress = false;
            });
            dot2.stop().animate({ left: "0px" }, 200);

            if (count === 1) {
                dot3.stop().animate({ left: "50px" }, 200);
            }

            count++;
        }
    });

    $(".prev-btn").on("click", function () {
        if (!animationInProgress && count > 0) {
            animationInProgress = true; 
            const currentLeft = parseFloat(dot1.css("left"));
            const newLeft = currentLeft - 50;

            dot1.stop().animate({ left: newLeft + "px" }, 200, function () {
                animationInProgress = false;
            });
            dot2.stop().animate({ left: "0px" }, 200);

            if (count === 2) {
                dot3.stop().animate({ left: "100px" }, 200);
            }

            if (count === 1) {
                dot2.stop().animate({ left: "50px" }, 200);
            }

            count--;
        }
    });
});