export default class Form {
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

    createMaskNumber() {
        const inputs = document.querySelectorAll('[name="phone"]');

        const createMask = function(event) {
            let matrix = '+1 (___) ___-____';
    
            let i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
    
            if (def.length >= val.length) {
                val = def;
            }
    
            this.value = matrix.replace(/./g, function(a) {
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
        }
    
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
        }

        inputs.forEach(input => {
            input.addEventListener('click', createMask);
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

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

    checkTextInput() {
        const textInputs = document.querySelectorAll('[name="name"]');

        textInputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
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
            form.addEventListener('submit', (e) => {
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
                statusImg.classList.add('animated', 'fadeInUp')
                messageBlock.append(statusImg);

                let statusText = document.createElement('div');

                statusText.textContent = this.message.loadingText;
                messageBlock.append(statusText);

                const formData = new FormData(form);

                this.postData(this.url, formData)
                .then(data => {
                    console.log(data);
                    statusText.textContent = this.message.successText;
                    statusImg.setAttribute('src', this.message.successIcons);
                })
                .catch(e => {
                    console.log(e);
                    messageBlock.style.color = 'red';
                    statusText.textContent = `${this.message.failText}: Could not fetch: ${this.url}, status: ${e.status}`;
                    statusImg.setAttribute('src', this.message.failIcons);
                })
                .finally(() => {
                    form.reset();
                    setTimeout(() => {
                        messageBlock.remove();
                        form.style.display = 'block';
                        form.classList.remove('fadeOutUp');
                        form.classList.add('fadeInUp');
                    }, 4000)
                })
            });
        });

    }
}