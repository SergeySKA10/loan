export default class Download {
    constructor(triggers) {
        this.triggers = document.querySelectorAll(triggers);
        this.paths = [
            'assets/img/Bitmap.jpg',
            'assets/img/evolve.jpg',
            'assets/img/evolve6.jpg',
            'assets/img/showup6.jpg',
            'assets/img/talk_bg.jpg',
            'assets/img/mainbg.jpg',
            'assets/img/module_bg.jpg',
            'assets/img/showup.jpg'
        ]
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
                this.downloadPicture(this.paths[i], i+1);
            });
        });
    }
}