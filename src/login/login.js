const divMainWrapper = document.createElement('div');
divMainWrapper.classList.add('main-wrapper');

const divBlock = document.createElement('div');
divBlock.classList.add('main');

const h1Title = document.createElement('h1');
h1Title.classList.add('title');
h1Title.innerText = 'LOGIN';

        // form start
const form = document.createElement('form');

            // email
const labelEmail = document.createElement('label');
labelEmail.setAttribute('for', 'email');
labelEmail.classList.add('block', 'form-font-size');
labelEmail.innerText = 'e-mail';

const inputEmail = document.createElement('input');
inputEmail.setAttribute('id', 'email');
inputEmail.classList.add('block', 'form-font-size');
inputEmail.placeholder = 'example@gmail.com';
            // email end

            // password start
const labelPassword = document.createElement('label');
labelPassword.setAttribute('for', 'password');
labelPassword.classList.add('block', 'form-font-size');
labelPassword.innerText = 'password';

const inputPassword = document.createElement('input');
inputPassword.type = 'password';
inputPassword.setAttribute('id', 'password');
inputPassword.classList.add('block', 'form-font-size');
inputPassword.placeholder = '********';
            // password end

const btnSend = document.createElement('button');
btnSend.innerText = 'LOGIN';

btnSend.onclick = e => {
    e.preventDefault();

    localStorage.setItem('isLogin', 'true');
    window.location.href = '../../index.html';
};
    // form end

// APPENDINGS
form.append(labelEmail, inputEmail, labelPassword, inputPassword, btnSend);
divBlock.append(h1Title, form);
divMainWrapper.appendChild(divBlock);
document.body.appendChild(divMainWrapper);