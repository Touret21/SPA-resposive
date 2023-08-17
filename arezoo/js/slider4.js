$(document).ready(function () {

    const slider2 = $(".all-press");
    const slides2 = $(".press");
    let currentSlide2 = 0;
    let slidersVisible = 0;
    let totalSliderWidth = 0;

    function updateDotsContainerWidth() {
        const dotsCount = Math.ceil(slides2.length / slidersVisible);
        const dotWidth = 20;
        const dotMargin = 10;
        const dotsContainerWidth = dotsCount * (dotWidth + dotMargin) - dotMargin;
        $(".dots-container-4").width(dotsContainerWidth);
    }

    function positionDots() {
        const dots = $(".dot-4");

        const dotSpacing = 30;

        dots.each(function (index) {
            const leftPosition = index * dotSpacing;
            $(this).css("left", `${leftPosition}px`);
        });
    }

    let touchStartX = 0;
    let touchEndX = 0;

    slider2.on("touchstart", function (event) {
        touchStartX = event.touches[0].clientX;
    });

    slider2.on("touchend", function (event) {
        touchEndX = event.changedTouches[0].clientX;

        if (touchStartX - touchEndX > 50) {
            if (currentSlide2 < $(".dot-4").length - 1) {
                currentSlide2++;
            }
        } else if (touchStartX - touchEndX < -50) {
            if (currentSlide2 > 0) {
                currentSlide2--;
            }
        }

        if (touchEndX !== 0) {
            updateSlider3();
        }

        touchEndX = 0;
    });

    function updateSlider3() {
        const sliderWidth = $(".press").outerWidth();
        let translateXValue2 = -currentSlide2 * sliderWidth;

        translateXValue2 = Math.max(translateXValue2, -(totalSliderWidth - sliderWidth));

        slider2.css("transform", `translateX(${translateXValue2}px)`);
    }

    function updateSlidersVisible() {
        const sliderContainerWidth = $(".press-slider").width();
        const sliderWidth = $(".press").outerWidth();
        slidersVisible = Math.floor(sliderContainerWidth / sliderWidth);
        totalSliderWidth = sliderWidth * slides2.length;
    }

    function generateDots() {
        const dotsContainer = $(".dots-container-4");
        dotsContainer.empty();
        const dotsCount = Math.ceil(slides2.length / slidersVisible);
        for (let i = 0; i < dotsCount; i++) {
            dotsContainer.append(`<div class="dot-4" id="dot4-${i + 1}"></div>`);
        }
        positionDots();
    }

    function arrangeDotsHorizontally() {
        const dotsContainer = $(".dots-container-4");
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
        $(".dot-4").removeClass("active");
        $(`.dot-4#dot4-${currentSlide2 + 1}`).addClass("active");
    });

    updateSlidersVisible();
    generateDots();
    arrangeDotsHorizontally();
    updateDotsContainerWidth();
    updateSlider2();

    function updateNavigationButtons() {
        $(".prev-btn-4").prop("disabled", currentSlide2 === 0);
        $(".next-btn-4").prop("disabled", currentSlide2 >= $(".dot-4").length - 1);
    }

    function updateSlider2() {
        const sliderWidth = $(".press").outerWidth();
        let translateXValue2 = -currentSlide2 * sliderWidth * slidersVisible;

        translateXValue2 = Math.max(translateXValue2, -(totalSliderWidth - sliderWidth * slidersVisible));

        slider2.css("transform", `translateX(${translateXValue2}px)`);

        $(".dot-4").removeClass("active");
        $(`.dot-4#dot4-${currentSlide2 + 1}`).addClass("active");

        updateNavigationButtons();
    }

    $(".next-btn-4").on("click", function () {
        if (currentSlide2 < $(".dot-4").length - 1) {
            currentSlide2++;
            updateSlider2();
        }
    });

    $(".prev-btn-4").on("click", function () {
        if (currentSlide2 > 0) {
            currentSlide2--;
            updateSlider2();
        }
    });

    $(".dot-4").on("click", function () {
        currentSlide2 = $(this).index();
        updateSlider2();
    });

    updateNavigationButtons();
});