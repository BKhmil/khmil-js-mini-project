class User {
    constructor(id, name, idTagType, nameTagType, cssClasses, parentHTML) {
        this.id = id;
        this.nameOfUser = name;
        this.idTagType = idTagType;
        this.nameTagType = nameTagType;
        this.cssClasses = cssClasses;
        this.parentHTML = parentHTML;
    }

    build() {
        const divWrapper = document.createElement('div');
        divWrapper.classList.add(this.cssClasses[3]);

        const idField = document.createElement(this.idTagType);
        idField.classList.add(this.cssClasses[0]);
        idField.innerText = 'id: ' + this.id;

        const nameField = document.createElement(this.nameTagType);
        nameField.classList.add(this.cssClasses[1]);
        nameField.innerText = 'name: ' + this.nameOfUser;

        const btnDetails = document.createElement('button');
        btnDetails.classList.add(this.cssClasses[2]);
        btnDetails.innerText = 'View user details';

        btnDetails.onclick = () => {
            window.location.href = './src/user_details/user-details.html?id=' + this.id;
        };

        divWrapper.append(idField, nameField, btnDetails);
        this.parentHTML.appendChild(divWrapper);
    }
}

const btnLogOut = document.createElement('button');
btnLogOut.classList.add('btn-logout');
btnLogOut.innerText = 'LOGOUT';

btnLogOut.onclick = () => {
    localStorage.setItem('isLogin', 'false');
    window.location.href = './src/login/login.html';
};

document.body.appendChild(btnLogOut);

if (!localStorage.getItem('isLogin') || localStorage.getItem('isLogin') === 'false') {
    // setTimeout(() => window.location.href = './src/login/login.html', 1000);
    window.location.href = './src/login/login.html';
} else {
    const root = document.createElement('div');
    root.classList.add('root');
    document.body.appendChild(root);

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(dataArray => {
            dataArray.forEach(({id, name}) => {
                new User(id, name, 'h1', 'h1', ['id', 'name', 'btn-details', 'user'], root).build();
            });
        });
}