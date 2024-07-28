export default class Accordion {
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