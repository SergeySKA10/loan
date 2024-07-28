/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/accordion.js":
/*!*************************************!*\
  !*** ./src/js/modules/accordion.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Accordion)
/* harmony export */ });
class Accordion {
  constructor(triggers, contents) {
    this.triggers = document.querySelectorAll(triggers);
    this.contents = document.querySelectorAll(contents);
  }
  addStyles(elems) {
    elems.forEach(el => {
      el.style.marginTop = '20px';
      el.classList.add('animated', 'fadeInUp');
    });
  }
  render() {
    this.addStyles(this.contents);
    this.triggers.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        try {
          this.contents[i].classList.toggle('msg');
        } catch (e) {
          if (e.name !== 'TypeError') {
            throw e;
          } else {
            console.log(e.message);
          }
        }
        try {
          if (!this.contents[i].classList.contains('msg')) {
            btn.querySelector('svg').style.cssText = `
                            transition: all 0.8s;
                            transform: rotate(45deg) translateX(-8px);
                        `;
            btn.style.background = 'red';
          }
          if (this.contents[i].classList.contains('msg')) {
            btn.querySelector('svg').style.cssText = `
                        transition: all 0.8s;
                        transform: translateX(-50%) translateY(-50%);
                        `;
            btn.style.background = '#9ec73d';
          }
        } catch (e) {
          if (e.name !== 'TypeError') {
            throw e;
          } else {
            console.log(e.message);
          }
        }
      });
    });
  }
}

/***/ }),

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
    try {
      this.cards = this.container.querySelectorAll(cards);
    } catch (e) {
      console.log(e.message);
    }
    ;
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
    try {
      this.cards.forEach(card => {
        card.style.display = 'none';
      });
      this.cards[this.cards.length - 1].style.display = 'flex';
      this.bindCards();
    } catch (e) {
      if (e.name !== 'TypeError') {
        throw e;
      } else {
        console.log(e.message);
      }
    }
  }
}

/***/ }),

/***/ "./src/js/modules/download.js":
/*!************************************!*\
  !*** ./src/js/modules/download.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Download)
/* harmony export */ });
class Download {
  constructor(triggers) {
    this.triggers = document.querySelectorAll(triggers);
    this.paths = ['assets/img/Bitmap.jpg', 'assets/img/evolve.jpg', 'assets/img/evolve6.jpg', 'assets/img/showup6.jpg', 'assets/img/talk_bg.jpg', 'assets/img/mainbg.jpg', 'assets/img/module_bg.jpg', 'assets/img/showup.jpg'];
  }
  downloadPicture(path, n) {
    const link = document.createElement('a');
    link.setAttribute('href', path);
    link.setAttribute('download', `picture_loan${n}`);
    link.style.display = 'none';
    document.body.append(link);
    link.click();
    link.remove();
  }
  init() {
    this.triggers.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        this.downloadPicture(this.paths[i], i + 1);
      });
    });
  }
}

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Form)
/* harmony export */ });
class Form {
  constructor(forms, url) {
    this.forms = document.querySelectorAll(forms);
    this.url = url;
    this.message = {
      loadingText: 'Loading...',
      loadingIcons: 'assets/icons/spinner.gif',
      failText: 'An error has occurred',
      failIcons: 'assets/icons/fail.png',
      successText: 'Thanks for reaching out! A specialist will contact you shortly.',
      successIcons: 'assets/icons/ok.png'
    };
  }

  // маска номера
  createMaskNumber() {
    const inputs = document.querySelectorAll('[name="phone"]');
    const createMask = function (event) {
      let matrix = '+1 (___) ___-____';
      let i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');
      if (def.length >= val.length) {
        val = def;
      }
      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      });
      if (event.type === 'blur') {
        if (this.value.length == 2) {
          this.value = '';
        }
      } else if (event.type === 'click') {
        setCursorPosition(2, this);
      } else {
        setCursorPosition(this.value.length, this);
      }
    };
    // установка курсора
    let setCursorPosition = (pos, elem) => {
      elem.focus();
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    };
    inputs.forEach(input => {
      input.addEventListener('click', createMask);
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
    });
  }
  // валидация email
  checkEmailInput() {
    const emailInputs = document.querySelectorAll('[name="email"]');
    emailInputs.forEach(item => {
      item.addEventListener('change', () => {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(item.value)) {
          item.style.color = 'red';
          item.value = 'Неверно введен email';
          setTimeout(() => {
            item.style.color = '';
            item.value = '';
          }, 3000);
        }
      });
    });
  }
  // валидация input="name"
  checkTextInput() {
    const textInputs = document.querySelectorAll('[name="name"]');
    textInputs.forEach(input => {
      input.addEventListener('keypress', e => {
        if (e.key.match(/[^a-zA-Z0-9.!]/ig)) {
          e.preventDefault();
        }
      });
      input.addEventListener('input', () => {
        if (input.value.match(/[^a-zA-Z0-9.!]/ig)) {
          input.value = '';
        }
      });
    });
  }
  async postData(url, data) {
    const response = await fetch(url, {
      method: "POST",
      body: data
    });
    if (!response.ok) {
      throw new Error(`Could not fetch: ${url}, status: ${response.status}`);
    }
    return await response.text();
  }
  submitForms() {
    this.createMaskNumber();
    this.checkEmailInput();
    this.checkTextInput();
    this.forms.forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        let messageBlock = document.createElement('div');
        messageBlock.style.cssText = `
                    display: block;
                    margin-top: 30px;
                    text-align: left;
                    color: #9ec73d;
                `;
        form.parentNode.append(messageBlock);
        form.classList.add('animated', 'fadeOutUp');
        setTimeout(() => {
          form.style.display = 'none';
        }, 400);
        let statusImg = document.createElement('img');
        statusImg.setAttribute('src', this.message.loadingIcons);
        statusImg.classList.add('animated', 'fadeInUp');
        messageBlock.append(statusImg);
        let statusText = document.createElement('div');
        statusText.textContent = this.message.loadingText;
        messageBlock.append(statusText);
        const formData = new FormData(form);
        this.postData(this.url, formData).then(data => {
          console.log(data);
          statusText.textContent = this.message.successText;
          statusImg.setAttribute('src', this.message.successIcons);
        }).catch(e => {
          console.log(e);
          messageBlock.style.color = 'red';
          statusText.textContent = `${this.message.failText}: Could not fetch: ${this.url}, status: ${e.status}`;
          statusImg.setAttribute('src', this.message.failIcons);
        }).finally(() => {
          form.reset();
          setTimeout(() => {
            messageBlock.remove();
            form.style.display = 'block';
            form.classList.remove('fadeOutUp');
            form.classList.add('fadeInUp');
          }, 4000);
        });
      });
    });
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
    });

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
    } catch (e) {}
    ;
    this.slides[this.slideIndex - 1].classList.add('animated', 'fadeIn');
    this.slides[this.slideIndex - 1].style.display = 'block';
  }

  // перелистывание слайдера
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
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
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        this.plusSlides(i);
      });
      if (logo) {
        // при клике на логотип - возвращаемся к 1 слайду
        btn.parentNode.previousElementSibling.addEventListener('click', e => {
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
      } catch (e) {}
      this.bindBtn();
      this.showSlides(this.slideIndex);
    }
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
    try {
      this.slideCollection = this.createCollectionSlides(); // добавляем NodeList в массив для последующей работы с использованием методов массивов
    } catch (e) {}
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
      btn.addEventListener('click', e => {
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
    } catch (e) {
      if (e.name !== 'TypeError') {
        throw e;
      }
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
    slides = null,
    btns = null,
    prev = null,
    next = null,
    activeClass = '',
    animate,
    autoplay
  } = {}) {
    this.container = document.querySelector(container);
    try {
      this.slides = this.container.querySelectorAll(slides);
    } catch (e) {}
    ;
    this.btns = document.querySelectorAll(btns);
    this.prev = document.querySelectorAll(prev);
    this.next = document.querySelectorAll(next);
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
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  // Обработчик событя для открытия overlay, получения и отображения видео
  bindBtns() {
    this.triggers.forEach((btn, i) => {
      try {
        // блок кода для 2-ой страницы для установки атрибута data-disabled
        const blockElem = btn.closest('.module__video-item').nextElementSibling;
        if (i % 2 === 0) {
          blockElem.setAttribute('data-disabled', 'true');
        }
      } catch (e) {
        if (e.name !== 'TypeError') {
          throw e;
        } else {
          console.log(e.message);
        }
      }
      btn.addEventListener('click', () => {
        // проверка на отсутствие кнопки для избежания ошибки и атрибута data-disabled для исключения заблокированных btn
        if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
          this.activeBtn = btn; // действующая кнопка 

          if (document.querySelector('iframe#frame')) {
            this.overlay.style.display = 'flex';

            // проверяем path на равенство с атрибутом btn (и открываем нужное видео по id)
            if (this.path !== btn.getAttribute('data-url')) {
              this.path = btn.getAttribute('data-url');
              this.player.loadVideoById({
                videoId: this.path
              });
            }
          } else {
            // создаем динамический path зависщий от атрибута btn и создаем плеер
            this.overlay.style.display = 'flex';
            this.path = btn.getAttribute('data-url');
            this.createPlayer(this.path);
          }
        }
      });
    });
  }

  // метод для реализации события 'onStateChange' в плеере
  onPlayerStateChange(state) {
    try {
      const blockElem = this.activeBtn.closest('.module__video-item').nextElementSibling,
        playBtn = this.activeBtn.querySelector('svg').cloneNode(true);
      if (state.data === 0) {
        // при окончании видео
        blockElem.querySelector('.play__circle').classList.remove('closed');
        if (!blockElem.querySelector('.play__circle').classList.contains('closed')) {
          blockElem.querySelector('svg').remove();
          blockElem.querySelector('.play__circle').append(playBtn);
          blockElem.querySelector('.play__text').textContent = 'play video';
          blockElem.querySelector('.play__text').classList.remove('attention');
          blockElem.style.cssText = `
                        opacity: 1;
                        filter: none;
                    `;
          // разблокировка кнопки для просмота видео
          blockElem.setAttribute('data-disabled', 'false');
        }
      }
    } catch (e) {
      if (e.name !== 'TypeError') {
        throw e;
      } else {
        console.log(e.message);
      }
    }
  }

  // обработчик на close
  bindClose() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      this.player.stopVideo(); // остановка видео
    });
  }

  // функция получения видео
  createPlayer(url) {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: url,
      events: {
        'onStateChange': this.onPlayerStateChange
      }
    });
  }
  init() {
    if (this.triggers.length > 0) {
      // ассинхронное подключение YouTube API 
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      this.bindBtns();
      this.bindClose();
    }
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
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_accordion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/accordion */ "./src/js/modules/accordion.js");
/* harmony import */ var _modules_download__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/download */ "./src/js/modules/download.js");









window.addEventListener('DOMContentLoaded', () => {
  const sliderMain = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__["default"]({
    container: '.page',
    slides: '.slide-main',
    btns: '.next'
  }).render();
  const sliderMainModuleApp = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__["default"]({
    container: '.moduleapp',
    slides: '.module',
    btns: '.next',
    prev: '.prevmodule',
    next: '.nextmodule'
  }).render();
  new _modules_videoPlayer__WEBPACK_IMPORTED_MODULE_1__["default"]('.showup .play', '.overlay').init();
  const showUpSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: '.showup__content-slider',
    slides: '.slide-mini',
    prev: '.showup__prev',
    next: '.showup__next',
    btns: '.card__controls-arrow',
    activeClass: 'card-active',
    animate: true
  }).render();
  const modulesSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: '.modules__content-slider',
    slides: '.slide-mini',
    prev: '.slick-prev',
    next: '.slick-next',
    btns: '.card__controls-arrow',
    activeClass: 'card-active',
    animate: true,
    autoplay: true
  }).render();
  const feedSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: '.feed__slider',
    slides: '.slide-mini',
    prev: '.feed_prev',
    next: '.feed_next',
    activeClass: 'feed__item-active'
  }).render();
  new _modules_difference__WEBPACK_IMPORTED_MODULE_3__["default"]('.officerold', '.officer__card-item').render();
  new _modules_difference__WEBPACK_IMPORTED_MODULE_3__["default"]('.officernew', '.officer__card-item').render();
  new _modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"]('form', 'assets/question.php').submitForms();
  new _modules_accordion__WEBPACK_IMPORTED_MODULE_5__["default"]('.plus__content', '.msg').render();
  new _modules_download__WEBPACK_IMPORTED_MODULE_6__["default"]('.download').init();
  new _modules_videoPlayer__WEBPACK_IMPORTED_MODULE_1__["default"]('.module__video-item .play', '.overlay').init();
});
/******/ })()
;
//# sourceMappingURL=script.js.map