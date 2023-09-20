//Рендер главной страницы

import { USER_POSTS_PAGE, POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, user } from "../index.js";
import { postLike, postDisLike, deletePost } from "../api.js";
import { formatDistance } from "date-fns";
import { ru } from 'date-fns/locale'
import { cliсkLike } from "./click-like-component.js";
import {
  getUserFromLocalStorage,
} from "../helpers.js";

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
    const createDate = formatDistance(new Date(post.createdAt), currentDate, { locale: ru })
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
          <button class="delete-button" data-id="${post.id}" data-user-login="${post.user.login}">Удалить пост</button>
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

  cliсkLike();

  const deletePostButtons = document.querySelectorAll(".delete-button");
  for (const deletePostButton of deletePostButtons) {
    deletePostButton.disabled = true;
    if (user != null) {
      if (deletePostButton.dataset.userLogin === user.login) {
        console.log(user.login)
        deletePostButton.disabled = false;
      }
    }
  }

  const clickDelete = () => {
    for (const deletePostButton of deletePostButtons) {
      deletePostButton.addEventListener('click', () => {
          let id = deletePostButton.dataset.id;
          deletePost({ id }).then(() => {
            console.log("Удалено")
            goToPage(POSTS_PAGE);
          });
      })
    }
  }
  clickDelete();

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

