import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, slides, prev, next, activeClass, animate, autoplay) {
        super(container, slides, next, prev, activeClass, animate, autoplay);

        try {
            this.slideCollection = this.createCollectionSlides(); // добавляем NodeList в массив для последующей работы с использованием методов массивов
        } catch(e) {}
        
        this.interval = false;
    }

    // добавляем стилей для активых мини-слайдов
    decorizeSlides() {
        this.slideCollection.forEach(slide => {
            slide.classList.remove(this.activeClass);

            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0.4';
                slide.querySelector('.card__controls').style.opacity = '0.5';
            }
        });

        
        this.slideCollection[0].classList.add(this.activeClass);

        if (this.animate) {
            this.slideCollection[0].querySelector('.card__title').style.opacity = '1';
            this.slideCollection[0].querySelector('.card__controls-arrow').style.opacity = '1';
            this.slideCollection[0].querySelector('.card__controls').style.opacity = '1';
        }
    }

    // функция включения автоматического показа слайдов
    activeShowSlide() {
        this.interval = setInterval(() => this.nextSlide(), 5000);
    }

    // функция по добавлению слайдов в массив
    createCollectionSlides() {
        const arrSlides = [];
        this.slides.forEach(item => {
            arrSlides.push(item);
        });
        return arrSlides;
    }

    bindBtns() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextSlide();
            });
        });
    }

    bindTriggers() {
        this.prev.forEach(btn => {
            btn.addEventListener('click', () => {
                let activeSlide = this.slideCollection[this.slideCollection.length - 1];
                this.container.insertBefore(activeSlide, this.slideCollection[0]);
                let elementPop = this.slideCollection.pop(this.slideCollection.length - 1);
                this.slideCollection.unshift(elementPop);
                this.decorizeSlides();
            });
        });
        

        this.next.forEach(btn => {
            btn.addEventListener('click', () => {
                this.nextSlide();
            });
        });
    }

    // функция переклюения слайда вперед
    nextSlide() {
        this.container.append(this.slideCollection[0]);
        let elementShift = this.slideCollection.shift(0);
        this.slideCollection.push(elementShift);
        this.decorizeSlides();
    }

    render() {
        try {
            this.container.style.cssText = `
                    display: flex;
                    flex-wrap: wrap;
                    overflow: hidden;
                    align-items: flex-start;
                `;

            this.decorizeSlides();
            this.bindTriggers();

            if (this.btns) {
                this.bindBtns();
            }

            if (this.autoplay) {
                this.activeShowSlide();

                this.container.addEventListener('mouseenter', () => {
                    clearInterval(this.interval);
                });

                this.container.addEventListener('mouseleave', () => {
                    this.activeShowSlide();
                });
            } 
        } catch(e) {
            if (e.name !== 'TypeError') {
                throw e;
            }
        }
    } 
        
}