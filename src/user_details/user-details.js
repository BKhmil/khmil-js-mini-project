const root = document.createElement('div');
root.classList.add('root');
document.body.appendChild(root);

class Post {
    constructor(title, titleTagType, cssClasses, parentHTML) {
        this.title = title;
        this.titleTagType = titleTagType;
        this.cssClasses = cssClasses;
        this.parentHTML = parentHTML;
    }

    build() {
        const divPost = document.createElement('div');
        divPost.classList.add(this.cssClasses[0]);

        const titleField = document.createElement(this.titleTagType);
        titleField.classList.add(this.cssClasses[1]);
        titleField.innerText = this.title;

        const btnShowPost = document.createElement('button');
        btnShowPost.classList.add(this.cssClasses[2]);
        btnShowPost.innerText = 'Show post details';
        btnShowPost.onclick = () => {
            window.location.href = '../post_details/post-details.html';
        };

        divPost.append(titleField, btnShowPost);
        this.parentHTML.appendChild(divPost);
    }
}

const showUserInfo = parentHTML => {
    const params = new URL(document.location).searchParams;
    const id = params.get('id');

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => response.json())
        .then(obj => {

            // user-info rendering start
            for (const key in obj) {
                const divField = document.createElement('div');

                if (typeof obj[key] === 'object') {
                    // console.log('worked');

                    const divUlOuterTitle = document.createElement('div');
                    divUlOuterTitle.innerText = key + ': ';

                    const ulOuter = document.createElement('ul');

                    for (const outerKey in obj[key]) {
                        if (typeof obj[key][outerKey] === 'object') {
                            const divUlInnerTitle = document.createElement('li');
                            // divUlInnerTitle.classList.add('inner-title');
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

            const btnUserPostsView = document.createElement('button');
            btnUserPostsView.classList.add('btn-posts-view');
            btnUserPostsView.innerText = 'Posts of current user';
            btnUserPostsView.onclick = () => {
                fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
                    .then(response => response.json())
                    .then(postsArray => {
                        const divPosts = document.createElement('div');

                        // posts start
                        postsArray.forEach(({title}) => new Post(title, 'h1', ['clock', 'cock', 'block'], divPosts).build());
                        // posts end

                        document.body.appendChild(divPosts);
                    });
            };

            document.body.appendChild(btnUserPostsView);
        });
};

showUserInfo(root);