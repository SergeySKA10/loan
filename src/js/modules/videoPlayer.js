export default class VideoPlayer {
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
            } catch(e) {
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

            if (state.data === 0) { // при окончании видео
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
        } catch(e) {
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