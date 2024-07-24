export default class Difference {
    constructor(container, cards) {
        this.container = document.querySelector(container);

        try {
            this.cards = this.container.querySelectorAll(cards);
        } catch(e) {
            console.log(e.message);
        };

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

        } catch(e) {
            if (e.name !== 'TypeError') {
                throw e;
            }
        }
    }
}