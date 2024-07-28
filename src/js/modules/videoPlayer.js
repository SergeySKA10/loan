export default class VideoPlayer {
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
                //if (!document.querySelector('iframe#frame')) {
                const path = btn.getAttribute('data-url');   
                this.createPlayer(path);
                //}  
            });
        });   
    }

    // обработчик на close
    bindClose() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.stopVideo(); // остановка видео
            this.player.destroy();

            const div = document.createElement('div');
            div.setAttribute('id', 'frame');
            this.overlay.document.querySelector('.video').append(div);
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