$(document).ready(function () {

    const slider2 = $(".slider-2");
    const slides2 = $(".slide-2");
    let currentSlide2 = 0;
    let slidersVisible = 0;
    let totalSliderWidth = 0;


    function updateDotsContainerWidth() {
        const dotsCount = Math.ceil(slides2.length / slidersVisible);
        const dotWidth = 25;
        const dotMargin = 10;
        const dotsContainerWidth = dotsCount * (dotWidth + dotMargin) - dotMargin;
        $(".dots-container-2").width(dotsContainerWidth);
    }

    function positionDots() {
        const dots = $(".dot-2");

        
        const dotSpacing = 35;

        dots.each(function (index) {
            const leftPosition = index * dotSpacing;
            $(this).css("left", `${leftPosition}px`);
        });
    }

    let touchStartX = 0;
    let touchEndX = 0;
    let rightSlides = 0;

    slider2.on("touchstart", function (event) {
        touchStartX = event.touches[0].clientX;
    });

    slider2.on("touchend", function (event) {
        touchEndX = event.changedTouches[0].clientX;

        if (touchStartX - touchEndX > 50) {
            
            if (currentSlide2 < $(".dot-2").length - 1 && rightSlides < 5) {
                currentSlide2++;
                rightSlides++;
            }
        } else if (touchStartX - touchEndX < -50) {
            
            if (currentSlide2 > 0) {
                currentSlide2--;
                rightSlides--;
            }
        }

        
        if (touchEndX !== 0) {
            updateSlider3();
        }

        
        touchEndX = 0;
    });

    function updateSlider3() {
        const sliderWidth = $(".slide-2").outerWidth();
        let translateXValue2 = -currentSlide2 * sliderWidth;

        
        translateXValue2 = Math.max(translateXValue2, -(totalSliderWidth - sliderWidth));

        slider2.css("transform", `translateX(${translateXValue2}px)`);
    }

    
    $(".prev-btn-2, .next-btn-2").on("click", function () {
        rightSlides = 0;
    });

    
    function updateSlidersVisible() {
        const sliderContainerWidth = $(".slider-2-container").width();
        const sliderWidth = $(".slide-2").outerWidth(); 
        slidersVisible = Math.floor(sliderContainerWidth / sliderWidth);
        totalSliderWidth = sliderWidth * slides2.length; 
    }

    
    function generateDots() {
        const dotsContainer = $(".dots-container-2");
        dotsContainer.empty(); 
        const dotsCount = Math.ceil(slides2.length / slidersVisible);
        for (let i = 0; i < dotsCount; i++) {
            dotsContainer.append(`<div class="dot-2" id="dot-${i + 1}"></div>`);
        }
        positionDots();
    }

    
    function arrangeDotsHorizontally() {
        const dotsContainer = $(".dots-container-2");
        dotsContainer.css("display", "flex");
        dotsContainer.css("gap", "10px");
    }

    
    $(window).on("resize", function () {
        updateSlidersVisible();
        generateDots();
        arrangeDotsHorizontally();
        updateDotsContainerWidth();
        currentSlide2 = 0;
        updateSlider2();
        $(".dot-2").removeClass("active");
        $(`.dot-2#dot-${currentSlide2 + 1}`).addClass("active");
    });

    
    updateSlidersVisible();
    generateDots();
    arrangeDotsHorizontally();
    updateDotsContainerWidth();
    updateSlider2();

    
    function updateNavigationButtons() {
        $(".prev-btn-2").prop("disabled", currentSlide2 === 0);
        $(".next-btn-2").prop("disabled", currentSlide2 >= $(".dot-2").length - 1);
    }

    
    function updateSlider2() {
        const sliderWidth = $(".slide-2").outerWidth(); 
        let translateXValue2 = -currentSlide2 * sliderWidth * slidersVisible;

        
        translateXValue2 = Math.max(translateXValue2, -(totalSliderWidth - sliderWidth * slidersVisible));

        slider2.css("transform", `translateX(${translateXValue2}px)`);

        $(".dot-2").removeClass("active");
        $(`.dot-2#dot-${currentSlide2 + 1}`).addClass("active");

        updateNavigationButtons();
    }

    
    $(".next-btn-2").on("click", function () {
        if (currentSlide2 < $(".dot-2").length - 1) {
            currentSlide2++;
            updateSlider2();
        }
    });

    $(".prev-btn-2").on("click", function () {
        if (currentSlide2 > 0) {
            currentSlide2--;
            updateSlider2();
        }
    });

    
    $(".dot-2").on("click", function () {
        currentSlide2 = $(this).index();
        updateSlider2();
    });

    
    updateNavigationButtons();
});