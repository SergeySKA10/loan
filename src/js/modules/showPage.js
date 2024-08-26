export default class ShowPage {
    constructor(btnsSelector) {
        this.btns = document.querySelectorAll(btnsSelector);
        this.url = {
            loan: 'http://localhost:4000/',
            modules: 'http://localhost:4000/modules.html'
        }
    }

    show(btn) {
        btn.addEventListener('click', () => {
            switch (btn.getAttribute('data-url')) {
                case '1':
                    location.href = 'http://localhost:4000/modules.html';
                    break;
                case '2':
                    location.href = 'http://localhost:4000/';
                    break;
            }
        });
    }

    render() {
        this.btns.forEach(btn => {
            this.show(btn);
        })
    }
}