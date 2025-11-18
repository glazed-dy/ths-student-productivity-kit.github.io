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




//     -     -     -     T  I  M  E  R    S  C  R  I  P  T     -     -     -
document.addEventListener('DOMContentLoaded', function() {
    // Timer functionality
    const timerDisplay = document.getElementById('timer-display');
    const minutesInput = document.getElementById('minutes-input');
    const secondsInput = document.getElementById('seconds-input');
    const startPauseBtn = document.getElementById('start-pause-btn');
    const resetBtn = document.getElementById('reset-btn');

    let timerInterval;
    let isPaused = false;
    let totalTimeSeconds = 0;
    let remainingTime = 0;

    // Sound effect for timer completion
    const beepSound = new Audio('other-files/War.opus');

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function updateTimerDisplay() {
        timerDisplay.textContent = formatTime(remainingTime);
    }

    function startTimer() {
        if (!isPaused && remainingTime === 0) {
            const minutes = parseInt(minutesInput.value) || 0;
            const seconds = parseInt(secondsInput.value) || 0;
            
            if (minutes <= 0 && seconds <= 0) {
                alert('Please enter valid time');
                return;
            }
            
            totalTimeSeconds = minutes * 60 + seconds;
            remainingTime = totalTimeSeconds;
        }

        isPaused = false;
        startPauseBtn.textContent = 'Pause';
        
        timerInterval = setInterval(() => {
            if (remainingTime > 0 && !isPaused) {
                remainingTime--;
                updateTimerDisplay();
            } else if (remainingTime === 0) {
                clearInterval(timerInterval);
                beepSound.play().catch(console.error);
                startPauseBtn.textContent = 'Start';
                minutesInput.disabled = false;
                secondsInput.disabled = false;
            }
        }, 1000);

        minutesInput.disabled = true;
        secondsInput.disabled = true;
    }

    function pauseResumeTimer() {
        isPaused = !isPaused;
        if (isPaused) {
            clearInterval(timerInterval);
            startPauseBtn.textContent = 'Resume';
        } else {
            startTimer();
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        isPaused = false;
        remainingTime = totalTimeSeconds;
        updateTimerDisplay();
        startPauseBtn.textContent = 'Start';
        minutesInput.disabled = false;
        secondsInput.disabled = false;
        
        // Stop any currently playing alarm
        beepSound.pause();
        beepSound.currentTime = 0;
    }

    startPauseBtn.addEventListener('click', pauseResumeTimer);
    resetBtn.addEventListener('click', resetTimer);
});
