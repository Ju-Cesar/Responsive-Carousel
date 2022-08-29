const track  = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');

const slideWidth = slides[0].getBoundingClientRect().width;
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

slides[0].classList.add('current-slide');
let indexOfCurrenttSlide = 0;

//Create the dots below the image slider
createDotsIndicators()
const dotsNavArr = Array.from(dotsNav.children);
let indexOfCurrentDot = 0;

if (indexOfCurrenttSlide == 0) {
    prevButton.style.display = "none";
}

nextButton.addEventListener('click',()=> {
    let prevSlide = slides[indexOfCurrenttSlide];
    let prevDot = dotsNavArr[indexOfCurrentDot];
    incrementIndexes();
    switchSlide(prevSlide, prevDot, slides[indexOfCurrenttSlide], dotsNavArr[indexOfCurrentDot]);
});
prevButton.addEventListener('click',()=> {
    let prevSlide = slides[indexOfCurrenttSlide];
    let prevDot = dotsNavArr[indexOfCurrentDot];
    decrementIndexes();
    switchSlide(prevSlide, prevDot, slides[indexOfCurrenttSlide], dotsNavArr[indexOfCurrentDot]);
});

dotClicked()

function createDotsIndicators() {
    for (let i=0; i < slides.length; i++){
        const dot = document.createElement('button');
        dot.classList.add('carousel__indicator')
        if (i == 0) {
            dot.classList.add('current-dot')
        }
        dotsNav.append(dot);
    }
}
function incrementIndexes(){
    if (indexOfCurrentDot < dotsNavArr.length && indexOfCurrenttSlide < slides.length) {
        indexOfCurrenttSlide++;
        indexOfCurrentDot++;
    }
}
function decrementIndexes() {
    if (indexOfCurrentDot > 0 && indexOfCurrenttSlide > 0) {
        indexOfCurrenttSlide--;
        indexOfCurrentDot--;
    }
}
function dotClicked() {
    dotsNavArr.forEach((dot,i) => {
        dot.addEventListener('click',()=> {
            switchSlide(slides[indexOfCurrenttSlide],dotsNavArr[indexOfCurrentDot],slides[i],dot);
            indexOfCurrenttSlide = indexOfCurrentDot = i;
        })
    })
}
function switchSlide(currentSlide, currentDot, targetSlide, targetDot) {
    currentDot.classList.remove('current-dot');
    currentSlide.classList.remove('current-slide');
    targetDot.classList.add('current-dot');
    targetSlide.classList.add('current-slide');
    const amountToMove = targetSlide.style.left;
    track.style.transform = `translateX(-${amountToMove})`;
    showHideButtons(nextButton,prevButton,slides.indexOf(targetSlide));
}

function showHideButtons(nextButton,prevButton,indexOfSlide) {
    if(indexOfSlide == 0) {
        hideButton(prevButton);
        showButton(nextButton);
    } else if(indexOfSlide == (slides.length - 1)) {
        hideButton(nextButton);
        showButton(prevButton);
    } else {
        showButton(prevButton);
        showButton(nextButton);
    }
}
function showButton(button) {
    button.style.display = "block"
}
function hideButton(button) {
    button.style.display = "none"
}