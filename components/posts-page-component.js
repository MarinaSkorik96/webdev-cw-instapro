//Рендер главной страницы

import { USER_POSTS_PAGE, POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { postLike, postDisLike, deletePost } from "../api.js";
import { formatDistance } from "date-fns";
import { ru } from 'date-fns/locale'
import { cliсkLike } from "./click-like-component.js";


export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api

  const appHtml = `
  <div class="page-container">
    <div class="header-container"></div>
    <ul class="posts"></ul>
  </div>`;

  appEl.innerHTML = appHtml;

  console.log("Актуальный список постов:", posts);
  const allPosts = posts.map((post) => {
    const currentDate = new Date;
    const createDate = formatDistance(new Date(post.createdAt), currentDate, {locale: ru})
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
            <button data-post-id="${post.id}" data-is-liked="${post.isLiked}" class="like-button">
              ${post.isLiked
                ? `<img src="./assets/images/like-active.svg">`
                : `<img src="./assets/images/like-not-active.svg">`}
            </button>
            <p class="post-likes-text">
              Нравится: <strong>${post.likes.length < 2
                ? `<strong>${0 === post.likes.length ? "0" : post.likes.map((({ name: post }) => post)).join(", ")}</strong>`
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

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  // const cliсkLike = () => {
  //   const likeButtons = document.querySelectorAll(".like-button");
  //   for (const likeButton of likeButtons) {
  //     likeButton.addEventListener('click', () => {
  //       let id = likeButton.dataset.postId;
  //       likeButton.dataset.isLiked === "true" ?
  //         postDisLike({ id })
  //           .then((responseData) => {
  //             likeButton.innerHTML =
  //               `<img src="./assets/images/like-not-active.svg">`
  //               const postLikesText = likeButton.closest(".post-bottom").querySelector(".post-likes-text")
  //               postLikesText.innerHTML = 
  //               `<p class="post-likes-text">
  //                 Нравится: <strong>${responseData.post.likes.length < 2
  //                   ? `<strong>${0 === responseData.post.likes.length ? "0" : responseData.post.likes.map((({ name: post }) => post)).join(", ")}</strong>`
  //                   : `<strong>${responseData.post.likes[Math.floor(Math.random() * responseData.post.likes.length)].name}</strong>
  //                   и <strong>еще ${(responseData.post.likes.length - 1).toString()}</strong>`}
  //                 </strong>
  //               </p>`;
  //               likeButton.dataset.isLiked = "false"
  //           })
  //         :
  //         postLike({ id })
  //           .then((responseData) => {
  //             likeButton.innerHTML =
  //               `<img src="./assets/images/like-active.svg">`
  //               const postLikesText = likeButton.closest(".post-bottom").querySelector(".post-likes-text")
  //               postLikesText.innerHTML = 
  //               `<p class="post-likes-text">
  //                 Нравится: <strong>${responseData.post.likes.length < 2
  //                   ? `<strong>${0 === responseData.post.likes.length ? "0" : responseData.post.likes.map((({ name: post }) => post)).join(", ")}</strong>`
  //                   : `<strong>${responseData.post.likes[Math.floor(Math.random() * responseData.post.likes.length)].name}</strong>
  //                   и <strong>еще ${(responseData.post.likes.length - 1).toString()}</strong>`}
  //                 </strong>
  //               </p>`;
  //               likeButton.dataset.isLiked = "true"
  //           })
  //     })
  //   }
  // }
  cliсkLike();


  const deletePostButtons = document.querySelectorAll(".delete-button");
  const postID = document.querySelectorAll(".post-header");

  const a = false;
  // if (post.user.id) {
  const clickDelete = () => {
    for (const deletePostButton of deletePostButtons) {
      // deletePostButton.disabled = true;
      // console.log(postID)

      // if (a === true) {
      deletePostButton.addEventListener('click', () => {
        console.log(deletePostButton.dataset.userId)

        console.log("f")
        let id = deletePostButton.dataset.id;
        console.log(id);
        // deletePost({ id }).then(() => {
        //   console.log("Удалено")
        //   goToPage(POSTS_PAGE);
        // });
      })
      // } else {
      // deletePostButton.disabled = true;
      // }
    }
  }
  clickDelete();
  // } else {
  // }


  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}

