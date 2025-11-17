document.addEventListener('DOMContentLoaded', function() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    const dots = document.querySelectorAll('.dot');

    let currentSlideIndex = 0;
    const slideInterval = 10000; // 10 seconds

    // Initialize slideshow
    function initializeSlideshow() {
        slides.forEach((slide, index) => {
            if (index === 0) {
                slide.classList.add('active');
            }
            
            dots[index].addEventListener('click', () => {
                changeSlide(index);
            });
        });

        // Auto-play functionality
        const autoPlay = setInterval(() => {
            nextSlide();
        }, slideInterval);

        // Pause on hover
        slideshowContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlay);
        });

        slideshowContainer.addEventListener('mouseleave', () => {
            autoPlay = setInterval(nextSlide, slideInterval);
        });
    }

    // Slide navigation functions
    function changeSlide(newIndex) {
        slides[currentSlideIndex].classList.remove('active');
        slides[newIndex].classList.add('active');
        
        dots[currentSlideIndex].classList.remove('active');
        dots[newIndex].classList.add('active');
        
        currentSlideIndex = newIndex;
    }

    function nextSlide() {
        const nextIndex = (currentSlideIndex + 1) % slides.length;
        changeSlide(nextIndex);
    }

    function previousSlide() {
        const previousIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        changeSlide(previousIndex);
    }

    // Event listeners
    prevButton.addEventListener('click', previousSlide);
    nextButton.addEventListener('click', nextSlide);

    // Initialize slideshow
    initializeSlideshow();
});