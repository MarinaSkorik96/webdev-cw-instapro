import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { cliсkLike } from "./click-like-component.js";
import { postLike, postDisLike, deletePost } from "../api.js";
import { USER_POSTS_PAGE } from "../routes.js";
import { formatDistance } from "date-fns";
import { ru } from 'date-fns/locale'



export function renderUserPostsPageComponent ({appEl, posts}) {
  const appHtml = `
  <div class="page-container">
    <div class="header-container"></div>
    <div class="post-header" data-user-id="${posts[0].user.id}">
      <img src="${posts[0].user.imageUrl}" class="posts-user-header__user-image">
      <p class="posts-user-header__user-name">${posts[0].user.name}</p>
    </div>
    <ul class="posts"></ul>
  </div>`;

  appEl.innerHTML = appHtml;

  console.log("Актуальный список постов:", posts);
  const allPosts = posts.map((post) => {
    const currentDate = new Date;
    const createDate = formatDistance(new Date(post.createdAt), currentDate, {locale: ru})
    return `                  
      <li class="post">
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
        ${createDate} назад
        </p>
      </li>`
  }).join('');
  document.querySelector(".posts").innerHTML = allPosts
  cliсkLike();
 
  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });
}