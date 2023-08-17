$(document).ready(function () {
    const slider2 = $("#types-treatments");
    const slides2 = $(".image-container");
    let currentSlide = 0;
    let animationInProgress = false;

    let touchStartX = 0;
    let touchEndX = 0;

    function handleWindowResize() {
        const windowWidth = $(window).width();
        const breakpointWidth = 390;
        const breakpointWidth2 = 1000;

        if (windowWidth <= breakpointWidth || windowWidth > breakpointWidth2) {
            
            slider2.off("touchstart touchmove touchend");
            resetSlider();
        } else {
            
            slider2.on("touchstart", function (event) {
                touchStartX = event.touches[0].clientX;
            });

            slider2.on("touchmove", function (event) {
                touchEndX = event.touches[0].clientX;
            });

            slider2.on("touchend", function () {
                
                if (touchStartX - touchEndX > 50) {
                    
                    if (currentSlide < slides2.length - 1) {
                        currentSlide++;
                        updateSlider2();
                        if (!animationInProgress && count < 2) {
                            
                            animationInProgress = true; 
                            const currentLeft = parseFloat(dot1.css("left"));
                            const newLeft = currentLeft + 50;

                            toggleNavigationButtons(true);

                            dot1.stop().animate({ left: newLeft + "px" }, 200, function () {
                                animationInProgress = false;
                                toggleNavigationButtons(false);
                            });
                            dot2.stop().animate({ left: "0px" }, 200);

                            if (count === 1) {
                                dot3.stop().animate({ left: "50px" }, 200);
                            }

                            count++;
                        }
                    }
                } else if (touchStartX - touchEndX < -50) {
                    
                    if (currentSlide > 0) {
                        currentSlide--;
                        updateSlider2();
                        if (!animationInProgress && count > 0) {
                            
                            animationInProgress = true;
                            const currentLeft = parseFloat(dot1.css("left"));
                            const newLeft = currentLeft - 50;

                            toggleNavigationButtons(true);

                            dot1.stop().animate({ left: newLeft + "px" }, 200, function () {
                                animationInProgress = false;
                                toggleNavigationButtons(false);
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
                    }
                }
            });
        }
    }

    
    function updateDots() {
        $(".dot-3").removeClass("active");
        $(`.dot-3#dot-${currentSlide + 1}`).addClass("active");
    }

    function resetSlider() {
        currentSlide = 0;
        updateSlider2();
    }

    resetSlider();

    
    $(window).on("resize", function() {
        handleWindowResize();
        resetSlider();
        $("#uno-3").css("left", "0px");
        $("#dos-3").css("left", "50px");
        $("#tres-3").css("left", "100px");
        count = 0;
    });

    
    function updateNavigationButtons() {
        $(".prev-btn-3").prop("disabled", currentSlide === 0);
        $(".next-btn-3").prop("disabled", currentSlide >= slides2.length - 1);
    }

    
    function updateSlider2() {
        const sliderWidth = $(".image-container").outerWidth(); 
        let translateXValue2 = -currentSlide * sliderWidth;

        
        translateXValue2 = Math.max(translateXValue2, -(sliderWidth * (slides2.length - 1)));

        slider2.css("transform", `translateX(${translateXValue2}px)`);

        updateDots();
        updateNavigationButtons();
    }

    $(".next-btn-3").on("click", function () {
        if (currentSlide < slides2.length - 1) {
            currentSlide++;
            updateSlider2();
        }
    });

    $(".prev-btn-3").on("click", function () {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider2();
        }
    });

    updateNavigationButtons();

    const dot1 = $("#uno-3");
    const dot2 = $("#dos-3");
    const dot3 = $("#tres-3");

    let count = 0;

    function toggleNavigationButtons(disabled) {
        $(".prev-btn-3, .next-btn-3").prop("disabled", disabled);
    }

    $(".next-btn-3").on("click", function () {
        if (!animationInProgress && count < 2) {
            
            animationInProgress = true; 
            const currentLeft = parseFloat(dot1.css("left"));
            const newLeft = currentLeft + 50;

            toggleNavigationButtons(true); 

            dot1.stop().animate({ left: newLeft + "px" }, 200, function () {
                animationInProgress = false;
                toggleNavigationButtons(false);
            });
            dot2.stop().animate({ left: "0px" }, 200);

            if (count === 1) {
                dot3.stop().animate({ left: "50px" }, 200);
            }

            count++;
        }
    });

    $(".prev-btn-3").on("click", function () {
        if (!animationInProgress && count > 0) {
            
            animationInProgress = true;
            const currentLeft = parseFloat(dot1.css("left"));
            const newLeft = currentLeft - 50;

            toggleNavigationButtons(true);

            dot1.stop().animate({ left: newLeft + "px" }, 200, function () {
                animationInProgress = false;
                toggleNavigationButtons(false);
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

