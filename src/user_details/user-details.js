const body = document.body;

const btnPrevPage = document.createElement('button');
btnPrevPage.classList.add('btn-special', 'btn-prev');
btnPrevPage.innerText = 'Back to previous page';
btnPrevPage.onclick = () => {
    window.location.href = '../../index.html';
}
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
h1MainTitle.classList.add('main-element', 'text-center');
h1MainTitle.innerText = 'User details';
body.appendChild(h1MainTitle);

const root = document.createElement('div');
root.classList.add('main-element', 'root');
body.appendChild(root);

class Post {
    constructor(objPost, titleTagType, cssClasses, parentHTML) {
        this.objPost = objPost;
        this.titleTagType = titleTagType;
        this.cssClasses = cssClasses;
        this.parentHTML = parentHTML;
    }

    build() {
        const divPost = document.createElement('div');
        divPost.classList.add(this.cssClasses[0]);

        const titleField = document.createElement(this.titleTagType);
        titleField.classList.add(this.cssClasses[1]);
        titleField.innerText = this.objPost.title;

        const btnShowPost = document.createElement('button');
        btnShowPost.classList.add(this.cssClasses[2]);
        btnShowPost.innerText = 'Show post details';
        btnShowPost.onclick = () => {
            window.location.href = '../post_details/post-details.html?postData=' + JSON.stringify(this.objPost);
        };

        divPost.append(titleField, btnShowPost);
        this.parentHTML.appendChild(divPost);
    }
}

const showUserInfo = parentHTML => {
    const id = new URL(document.location).searchParams.get('id');

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => response.json())
        .then(obj => {

            // user-info rendering start
            for (const key in obj) {
                const divField = document.createElement('div');

                if (typeof obj[key] === 'object') {
                    // console.log('here');

                    const divUlOuterTitle = document.createElement('div');
                    divUlOuterTitle.innerText = key + ': ';

                    const ulOuter = document.createElement('ul');

                    for (const outerKey in obj[key]) {
                        if (typeof obj[key][outerKey] === 'object') {
                            const divUlInnerTitle = document.createElement('li');
                            divUlInnerTitle.innerText = outerKey + ': ';

                            const ulInner = document.createElement('ul');
                            // ulInner.classList.add('inner-ul');

                            for (const innerKey in obj[key][outerKey]) {
                                const liInner = document.createElement('li');
                                liInner.innerText = innerKey + ': ' + obj[key][outerKey][innerKey];

                                ulInner.appendChild(liInner);
                            }

                            ulOuter.append(divUlInnerTitle, ulInner);
                        } else {
                            const liOuter = document.createElement('li');
                            liOuter.innerText = outerKey + ': ' + obj[key][outerKey];

                            ulOuter.appendChild(liOuter);
                            divField.append(divUlOuterTitle, ulOuter);
                            parentHTML.appendChild(divField);
                        }
                    }
                } else {
                    divField.innerText = key + ': ' + obj[key];
                    parentHTML.appendChild(divField);
                }
            }
            // user-info rendering end

            const showSortPostInfo = () => {
                fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
                    .then(response => response.json())
                    .then(postsArray => {
                        const divPosts = document.createElement('div');
                        divPosts.classList.add('posts');

                        postsArray.forEach(post => new Post(post, 'h2', ['post', 'post-title', 'btn'], divPosts).build());

                        body.appendChild(divPosts);

                        // scrolling to posts block
                        const postsOffsetTop = divPosts.offsetTop;
                        window.scrollTo({top: postsOffsetTop, behavior: 'smooth'});

                        // preventing copy-building of posts titles
                        btnUserPostsView.removeEventListener('click', showSortPostInfo);

                        // adding new ev-list for scrolling to posts info if user try to hide it by scrolling up
                        btnUserPostsView.addEventListener('click', () => window.scrollTo({top: postsOffsetTop, behavior: 'smooth'}));
                    });
            };

            const btnUserPostsView = document.createElement('button');
            btnUserPostsView.classList.add('btn-posts-view', 'btn');
            btnUserPostsView.innerText = 'Posts of current user';
            btnUserPostsView.addEventListener('click', showSortPostInfo);

            document.body.appendChild(btnUserPostsView);
        });
};

showUserInfo(root);