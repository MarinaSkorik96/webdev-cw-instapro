import { postLike, postDisLike } from "../api.js";
import { getToken } from "../index.js";


export const cliсkLike = () => {
  const likeButtons = document.querySelectorAll(".like-button");
  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', () => {
      let id = likeButton.dataset.postId;
      let token = getToken();
      console.log(token)
      if (token === undefined) {
        alert("Вы не авторизированы")
      } else {
        likeButton.dataset.isLiked === "true" ?
          postDisLike({ id, token })
            .then((responseData) => {
              likeButton.innerHTML =
                `<img src="./assets/images/like-not-active.svg">`
              clickLikeElement({ likeButton, responseData });
              likeButton.dataset.isLiked = "false"
            })
          :
          postLike({ id, token })
            .then((responseData) => {
              likeButton.innerHTML =
                `<img src="./assets/images/like-active.svg">`
              clickLikeElement({ likeButton, responseData });
              likeButton.dataset.isLiked = "true"
            })
      }
      // likeButton.dataset.isLiked === "true" ?
      //   postDisLike({ id, token })
      //     .then((responseData) => {
      //       likeButton.innerHTML =
      //         `<img src="./assets/images/like-not-active.svg">`
      //       clickLikeElement({ likeButton, responseData });
      //       likeButton.dataset.isLiked = "false"
      //     })
      //   :
      //   postLike({ id, token })
      //     .then((responseData) => {
      //       likeButton.innerHTML =
      //         `<img src="./assets/images/like-active.svg">`
      //       clickLikeElement({ likeButton, responseData });
      //       likeButton.dataset.isLiked = "true"
      //     })
    })
  }
}

const clickLikeElement = ({ likeButton, responseData }) => {
  const postLikesText = likeButton.closest(".post-bottom").querySelector(".post-likes-text")
  postLikesText.innerHTML =
    `<p class="post-likes-text">
    Нравится: <strong>${responseData.post.likes.length < 2
      ? `<strong>${0 === responseData.post.likes.length ? "0" : responseData.post.likes.map((({ name: post }) => post)).join(", ")}</strong>`
      : `<strong>${responseData.post.likes[Math.floor(Math.random() * responseData.post.likes.length)].name}</strong>
      и <strong>еще ${(responseData.post.likes.length - 1).toString()}</strong>`}
    </strong>
  </p>`;

}