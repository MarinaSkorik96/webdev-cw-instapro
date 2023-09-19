import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
// import { cliсkLike } from "./click-like-component.js";
import { postLike, postDisLike, deletePost } from "../api.js";
import { USER_POSTS_PAGE } from "../routes.js";



export function renderUserPostsPageComponent ({appEl}) {
  const appHtml = `
  <div class="page-container">
    <div class="header-container"></div>
    <ul class="posts"></ul>
  </div>`;

  appEl.innerHTML = appHtml;

  console.log("Актуальный список постов:", posts);
  const allPosts = posts.map((post) => {
    return `                  
      <li class="post">
        <div class="post-header" data-user-id="${post.user.id}">
            <img src="${post.user.imageUrl}" class="post-header__user-image">
            <p class="post-header__user-name">${post.user.name}</p>
        </div>
        <div class="post-image-container">
          <img class="post-image" src=${post.imageUrl}>
        </div>
        <div class="post-bottom">
          <div class="post-likes">
            <button data-post-id="${post.id}" data-is-liked="${post.isLiked}" class="like-button" >
              ${post.isLiked
                ?`<img src="./assets/images/like-active.svg">`
                :`<img src="./assets/images/like-not-active.svg">`}
            </button>
            <p class="post-likes-text">
              Нравится: <strong>${post.likes.length < 2 
                ? `<strong>${0 === post.likes.length ? "0" : post.likes.map((({name: post})=>post)).join(", ")}</strong>` 
                : `<strong>${post.likes[Math.floor(Math.random() * post.likes.length)].name}</strong>
                и <strong>еще ${(post.likes.length - 1).toString()}</strong>`}
              </strong>
            </p>
          </div>
          <button class="delete-button" data-id="${post.id}" data-user-id="${post.user.id}">Удалить пост</button>
        </div>
        <p class="post-text">
          <span class="user-name">${post.user.name}</span>
          ${post.description}
        </p>
        <p class="post-date">
          19 минут назад
        </p>
      </li>`
  }).join('');
  document.querySelector(".posts").innerHTML = allPosts

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  const cliсkLike = (allPosts) => {
    const likeButtons = document.querySelectorAll(".like-button");
    for (const likeButton of likeButtons) {
      likeButton.addEventListener('click', () => {
        let id = likeButton.dataset.postId;
        console.log(id)
        likeButton.dataset.isLiked === "true" ?
          postDisLike({ id })
            .then((responseData) => {
              console.log(responseData)
              likeButton.innerHTML =
                `<img src="./assets/images/like-not-active.svg">`
              console.log("Актуальный список постов:", posts);
              // goToPage(USER_POSTS_PAGE);
            })
          :
          postLike({ id })
            .then((responseData) => {
              console.log(responseData)
              likeButton.innerHTML =
                `<img src="./assets/images/like-active.svg">`
              console.log("Актуальный список постов:", posts);
              // goToPage(USER_POSTS_PAGE);
            })
      })
    }
  }
  cliсkLike(allPosts);

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });
}