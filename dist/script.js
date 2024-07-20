/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/difference.js":
/*!**************************************!*\
  !*** ./src/js/modules/difference.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Difference)
/* harmony export */ });
class Difference {
  constructor(container, cards) {
    this.container = document.querySelector(container);
    this.cards = this.container.querySelectorAll(cards);
    this.index = 0;
  }
  bindCards() {
    this.cards[this.cards.length - 1].addEventListener('click', () => {
      this.cards[this.index].classList.add('animated', 'slideInUp');
      this.cards[this.index].style.display = 'flex';
      this.index += 1;
      if (this.index == this.cards.length - 1) {
        this.cards[this.cards.length - 1].remove();
      }
    });
  }
  render() {
    this.cards.forEach(card => {
      card.style.display = 'none';
    });
    this.cards[this.cards.length - 1].style.display = 'flex';
    this.bindCards();
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider-main.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-main.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MainSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
    });

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
    } catch (e) {}
    ;
    this.slides[this.slideIndex - 1].classList.add('animated', 'fadeIn');
    this.slides[this.slideIndex - 1].style.display = 'block';
  }

  // перелистывание слайдера
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }
  render() {
    // получение всплывающего блока
    try {
      this.hansonBlock = document.querySelector('.hanson');
      this.hansonBlock.style.display = 'none';
      this.hansonBlock.classList.add('animated');
    } catch (e) {}
    this.btns.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        this.plusSlides(1);
      });

      // при клике на логотип - возвращаемся к 1 слайду
      btn.parentNode.previousElementSibling.addEventListener('click', e => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });
    this.showSlides(this.slideIndex);
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider-mini.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-mini.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MiniSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MiniSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(container, slides, prev, next, activeClass, animate, autoplay) {
    super(container, slides, next, prev, activeClass, animate, autoplay);
    this.slides = this.container.querySelectorAll('.slide-mini');
    this.slideCollection = this.createCollectionSlides(); // добавляем NodeList в массив для последующей работы с использованием методов массивов
    this.interval = false;
  }

  // добавляем стилей для активых мини-слайдов
  decorizeSlides() {
    for (let i = 0; i < this.slideCollection.length; i++) {
      this.slideCollection[i];
    }
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
      btn.addEventListener('click', e => {
        e.preventDefault();
        this.nextSlide();
      });
    });
  }
  bindTriggers() {
    this.prev.addEventListener('click', () => {
      let activeSlide = this.slideCollection[this.slideCollection.length - 1];
      this.container.insertBefore(activeSlide, this.slideCollection[0]);
      let elementPop = this.slideCollection.pop(this.slideCollection.length - 1);
      this.slideCollection.unshift(elementPop);
      this.decorizeSlides();
    });
    this.next.addEventListener('click', () => {
      this.nextSlide();
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
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider.js":
/*!*****************************************!*\
  !*** ./src/js/modules/slider/slider.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Slider)
/* harmony export */ });
class Slider {
  constructor({
    container = null,
    btns = null,
    prev = null,
    next = null,
    activeClass = '',
    animate,
    autoplay
  } = {}) {
    this.container = document.querySelector(container);
    this.btns = document.querySelectorAll(btns);
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoplay = autoplay;
    this.slideIndex = 1;
  }
}

/***/ }),

/***/ "./src/js/modules/videoPlayer.js":
/*!***************************************!*\
  !*** ./src/js/modules/videoPlayer.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VideoPlayer)
/* harmony export */ });
class VideoPlayer {
  constructor(triggers, overlay) {
    this.triggers = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close');
  }

  // Обработчик событя для открытия overlay, получения и отображения видео
  bindBtns() {
    this.triggers.forEach(btn => {
      btn.addEventListener('click', () => {
        this.overlay.style.display = 'flex';

        // проверка на отсутствие блока 'iframe#frame' в верстке
        if (!document.querySelector('iframe#frame')) {
          const path = btn.getAttribute('data-url');
          this.createPlayer(path);
        }
      });
    });
  }

  // обработчик на close
  bindClose() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      this.player.stopVideo(); // остановка видео
    });
  }

  // функция получения видео
  async createPlayer(url) {
    this.player = await new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: url
    });
  }
  init() {
    // ассинхронное подключение YouTube API 
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    this.bindBtns();
    this.bindClose();
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/slider/slider-main */ "./src/js/modules/slider/slider-main.js");
/* harmony import */ var _modules_videoPlayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/videoPlayer */ "./src/js/modules/videoPlayer.js");
/* harmony import */ var _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider/slider-mini */ "./src/js/modules/slider/slider-mini.js");
/* harmony import */ var _modules_difference__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/difference */ "./src/js/modules/difference.js");






window.addEventListener('DOMContentLoaded', () => {
  const sliderMain = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__["default"]({
    container: '.page',
    slides: '.slide-main',
    btns: '.next'
  }).render();
  const player = new _modules_videoPlayer__WEBPACK_IMPORTED_MODULE_1__["default"]('.showup .play', '.overlay');
  player.init();
  const showUpSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: '.showup__content-slider',
    prev: '.showup__prev',
    next: '.showup__next',
    btns: '.card__controls-arrow',
    activeClass: 'card-active',
    animate: true
  }).render();
  const modulesSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: '.modules__content-slider',
    prev: '.slick-prev',
    next: '.slick-next',
    btns: '.card__controls-arrow',
    activeClass: 'card-active',
    animate: true,
    autoplay: true
  }).render();
  const feedSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: '.feed__slider',
    prev: '.feed_prev',
    next: '.feed_next',
    activeClass: 'feed__item-active'
  }).render();
  const differenceTenYers = new _modules_difference__WEBPACK_IMPORTED_MODULE_3__["default"]('.officerold', '.officer__card-item').render();
  const differenceNow = new _modules_difference__WEBPACK_IMPORTED_MODULE_3__["default"]('.officernew', '.officer__card-item').render();
});
/******/ })()
;
//# sourceMappingURL=script.js.map