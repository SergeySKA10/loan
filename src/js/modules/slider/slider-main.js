import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(container, slides, btns) {
        super(container, btns);
        this.slides = this.container.querySelectorAll('.slide-main');
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        this.slides.forEach(slide => {
            slide.style.display = 'none';
        })

        // добавление и удаление всплывающего блока на 3-тьем слайдере
        try {
            if (n == 3) {
                setTimeout(() => {
                    this.hansonBlock.classList.add('slideInLeft');
                    this.hansonBlock.style.display = 'block';
                }, 3000);
            } else {
                this.hansonBlock.style.display = 'none';
                this.hansonBlock.classList.remove('slideInLeft');
            }

        } catch(e) {};

        this.slides[this.slideIndex - 1].classList.add('animated', 'fadeIn');
        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    // перелистывание слайдера
    plusSlides(n) {
        this.showSlides(this.slideIndex += n)
    }

    render() {
        
        // получение всплывающего блока
        try {
            this.hansonBlock = document.querySelector('.hanson');
            this.hansonBlock.style.display = 'none';
            this.hansonBlock.classList.add('animated');
        } catch(e) {}

        this.btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.plusSlides(1);
            });

            // при клике на логотип - возвращаемся к 1 слайду
            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            })
        });

        this.showSlides(this.slideIndex);
    }
}