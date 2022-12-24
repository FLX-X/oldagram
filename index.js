import { posts } from "./data.js"

const container = document.getElementById('posts--container')

document.addEventListener('click', ({target}) => {
    if(target.dataset.like) {
        handleLikeClick(target.dataset.like)
    }
})

function handleLikeClick(postId) {
    const postObj = posts.find(post => {
        return post.id == postId
    })

    if (postObj.isLiked) {
        postObj.likes--
    } else {
        postObj.likes++
    }

    postObj.isLiked = !postObj.isLiked
    renderPosts()
}

function getPosts() {
    let articleHtml = ``

    posts.map(post => {
        let likedClass = 'fa-regular'

        if (post.isLiked) {
            likedClass = 'fa-solid liked'
        }

        articleHtml += `
            <article class="post">
                <div class="post--header padding">
                    <img src="${post.avatar}" class="post--avatar">
                    <div class="post--info">
                        <h3 class="post--name">${post.name}</h3>
                        <h5 class="post--location">${post.location}</h5>
                    </div>
                </div>
                <img src="${post.post}" class="post--image">
                <div class="post--body padding">
                    <div class="icons--container">
                        <button aria-label="Like post" id="like-btn"><i class="fa-heart ${likedClass}" data-like=${post.id}></i></button>
                        <button aria-label="Comment on post" class="comment-btn"><img src="./images/icon-comment.png" alt="comment icon" class="icon"></button>
                        <button aria-label="Send direct message"><img src="./images/icon-dm.png" alt="direct message icon" class="icon"></button>
                    </div>
                    <p class="post--like--count">${post.likes} likes</p>
                    <p class="post--comment"><span class="post--username">${post.username}</span> ${post.comment}</p>
                </div>
            </article>
        `
    });

    return articleHtml
}

function renderPosts() {
    container.innerHTML = getPosts()
}

renderPosts()
