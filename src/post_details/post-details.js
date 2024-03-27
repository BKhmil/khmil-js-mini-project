const body = document.body;

const postData = JSON.parse(new URL(window.location).searchParams.get('postData'));

const btnPrevPage = document.createElement('button');
btnPrevPage.classList.add('btn-special', 'btn-prev');
btnPrevPage.innerText = 'Back to previous page';
btnPrevPage.onclick = () => {
    window.location.href = '../user_details/user-details.html?id=' + postData.userId;
};
body.appendChild(btnPrevPage);

const btnLogOut = document.createElement('button');
btnLogOut.classList.add('btn-special', 'btn-logout');
btnLogOut.innerText = 'LOGOUT';
btnLogOut.onclick = () => {
    localStorage.setItem('isLogin', 'false');
    window.location.href = '../login/login.html';
};
body.appendChild(btnLogOut);

const h1MainTitle = document.createElement('h1');
h1MainTitle.classList.add('main-element', 'text-center', 'titles');
h1MainTitle.innerText = 'Post details';
body.appendChild(h1MainTitle);

const root = document.createElement('div');
root.classList.add('main-element', 'root');
body.appendChild(root);

class Comment {
    constructor({id, name, email, body}, tagsTypes, cssClasses, parentHTML) {
        this.commId = id;
        this.userName = name;
        this.userEmail = email;
        this.commBody = body;
        this.tagsTypes = tagsTypes;
        this.cssClasses = cssClasses;
        this.parent = parentHTML;
    }

    build () {
        const divComment = document.createElement('div');
        divComment.classList.add(this.cssClasses[0]);

        const idField = document.createElement(this.tagsTypes[0]);
        idField.classList.add(this.cssClasses[1]);
        idField.innerText = 'id: ' + this.commId;

        const nameField = document.createElement(this.tagsTypes[1]);
        nameField.classList.add(this.cssClasses[2]);
        nameField.innerText = 'name: ' + this.userName;

        const emailField = document.createElement(this.tagsTypes[2]);
        emailField.classList.add(this.cssClasses[3]);
        emailField.innerText = 'email: ' + this.userEmail;

        const bodyField = document.createElement(this.tagsTypes[3]);
        bodyField.classList.add(this.cssClasses[4]);
        bodyField.innerText = 'body: ' + this.commBody;

        divComment.append(idField, nameField, emailField, bodyField);
        this.parent.appendChild(divComment);
    }
}

const showPostInfo = parentHTML => {
    for (const key in postData) {
        const divField = document.createElement('div');
        divField.classList.add('post-field');
        divField.innerText = `${key}: ${postData[key]}`;
        parentHTML.appendChild(divField);
    }

    fetch(`https://jsonplaceholder.typicode.com/posts/${postData.id}/comments`)
        .then(response => response.json())
        // 5
        .then(commsArray => {
            const h2CommentsTitle = document.createElement('h2');
            h2CommentsTitle.classList.add('section', 'text-center', 'titles');
            h2CommentsTitle.innerText = 'Comments';
            body.appendChild(h2CommentsTitle);

            const divComments = document.createElement('div');
            divComments.classList.add('section', 'comments');

            commsArray.forEach(comm => new Comment(comm, ['div', 'div', 'div', 'p'], ['comment', 'comm-field', 'comm-field', 'comm-field', 'comm-field'], divComments).build());

            body.appendChild(divComments);
        });
};

showPostInfo(root);