'use strict';

import MainSlider from "./modules/slider/slider-main";
import VideoPlayer from "./modules/videoPlayer";
import MiniSlider from "./modules/slider/slider-mini";
import Difference from "./modules/difference";

window.addEventListener('DOMContentLoaded', () => {
    const sliderMain = new MainSlider({
        container: '.page',
        slides: '.slide-main',
        btns: '.next'
    }).render();

    const player = new VideoPlayer('.showup .play', '.overlay');
    player.init();

    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider', 
        prev: '.showup__prev', 
        next: '.showup__next',
        btns: '.card__controls-arrow',
        activeClass: 'card-active',
        animate: true
    }).render();

    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider',
        prev: '.slick-prev', 
        next: '.slick-next',
        btns: '.card__controls-arrow',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    }).render();

    const feedSlider = new MiniSlider({
        container: '.feed__slider', 
        prev: '.feed_prev', 
        next: '.feed_next',
        activeClass: 'feed__item-active'
    }).render();

    const differenceTenYers = new Difference('.officerold', '.officer__card-item').render();
    const differenceNow = new Difference('.officernew', '.officer__card-item').render(); 

});