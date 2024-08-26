'use strict';

import MainSlider from "./modules/slider/slider-main";
import VideoPlayer from "./modules/videoPlayer";
import MiniSlider from "./modules/slider/slider-mini";
import Difference from "./modules/difference";
import Form from "./modules/forms";
import Accordion from "./modules/accordion";
import Download from "./modules/download";
import ShowPage from "./modules/showPage";

window.addEventListener('DOMContentLoaded', () => {
    
    const sliderMain = new MainSlider({
        container: '.page',
        slides: '.slide-main',
        btns: '.next'
    }).render();

    const sliderMainModuleApp = new MainSlider({
        container: '.moduleapp',
        slides: '.module',
        btns: '.next',
        prev: '.prevmodule',
        next: '.nextmodule'
    }).render(); 
    
    new VideoPlayer('.showup .play', '.overlay').init();

    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider',
        slides: '.slide-mini', 
        prev: '.showup__prev', 
        next: '.showup__next',
        btns: '.card__controls-arrow',
        activeClass: 'card-active',
        animate: true
    }).render();

    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider',
        slides: '.slide-mini',
        prev: '.slick-prev', 
        next: '.slick-next',
        btns: '.card__controls-arrow',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    }).render();

    const feedSlider = new MiniSlider({
        container: '.feed__slider',
        slides: '.slide-mini', 
        prev: '.feed_prev', 
        next: '.feed_next',
        activeClass: 'feed__item-active'
    }).render();

    new Difference('.officerold', '.officer__card-item').render();

    new Difference('.officernew', '.officer__card-item').render(); 

    new Form('form', 'assets/question.php').submitForms();

    new Accordion('.plus__content', '.msg').render();

    new Download('.download').init();

    new VideoPlayer('.module__video-item .play', '.overlay').init();

    new ShowPage('[data-url]').render();

});