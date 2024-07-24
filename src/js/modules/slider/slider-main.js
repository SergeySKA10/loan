import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(container, slides, btns, next, prev) {
        super(container, slides, btns, next, prev);
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
            if (n == 3 && this.hansonBlock) {
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

    // функция переключения слайдов при событии 'click' на триггеры && logo
    bindBtn() {
        this.bindTriggers(this.btns, 1, true);

        if (this.next && this.prev) {
            this.bindTriggers(this.next, 1);
            this.bindTriggers(this.prev, -1);
        }
    }

    // функция привязки обработчика 'click' к триггерам 
    bindTriggers(triggers, i, logo) {
        triggers.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.plusSlides(i);
            });
            
            if (logo) {
                // при клике на логотип - возвращаемся к 1 слайду
                btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.slideIndex = 1;
                    this.showSlides(this.slideIndex);
                });
            }
        });
    }

    render() {
        // проверка на наличие свойства this.container
        if (this.container) {
            // получение всплывающего блока
            try {
                this.hansonBlock = document.querySelector('.hanson');
                this.hansonBlock.style.display = 'none';
                this.hansonBlock.classList.add('animated');
            } catch(e) {}
    
            this.bindBtn();
            
            this.showSlides(this.slideIndex);  
        }
    }

}