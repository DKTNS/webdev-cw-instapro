import { renderHeaderComponent } from "./header-component.js";
import { formatDateTime } from "../helpers.js";
import { USER_POSTS_PAGE } from "../routes.js";
import { disLike, like } from "../api.js";
import { goToPage } from "../index.js";


export function renderUserPostsPage({ posts }) {
  // TODO: реализован рендер постов из api
  console.log("Cписок постов юзера :", posts);
  const appElement = document.getElementById("app");
  const postEl = posts.map((post) => {
    return `
      <li class="post" id="user-posts">
        <div class="post-header" data-user-id="${post.user.id}">
            <img  class="post-header__user-image" src=${post.user.imageUrl}>
            <p class="post-header__user-name">${post.user.name}</p>
        </div>
        <div class="post-image-container">
          <img class="post-image" src="${post.imageUrl}">
        </div>
        <div class="post-likes">
            <button data-post-id="${post.id}" data-liked="${post.isLiked}" class="like-button" 
            "data-index="${post.user.id}" data-user-id="${post.user.id}">
            <img src="./assets/images/${post.isLiked ? "like-active" : "like-not-active"}.svg">
            </button>
            <p class="post-likes-text">Нравится: <strong>${post.likes.length}</strong></p>
          </div>
          <button  class="delete-form-button header-button logout-button" style="display:none" data-id="${post.id}">Удалить пост</button>
        </div>
        <p class="post-text"><span class="user-name">${post.user.name}</span>: ${post.description} </p>
        <p class="post-date">${formatDateTime(post.createdAt)}</p>
      </li>`;
  })
    .join("");

  const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts" id="posts">${postEl}</ul>
    </div>`;
  appElement.innerHTML = appHtml;

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


  for (let likeEl of document.querySelectorAll(".like-button")) {
    likeEl.addEventListener("click", () => {
      const isLiked = likeEl.dataset.liked;
      const id = likeEl.dataset.postId;
      const userId = likeEl.dataset.userId;
      console.log(typeof false);
      if (isLiked === "true") {
        console.log("ДизЛакнуто");
        console.log(isLiked);
        disLike({ id })
          .then(() => {
            goToPage(USER_POSTS_PAGE, {
              userId,
            });
          })
      } else {
        console.log("Лакнуто");
        like({ id })
          .then(() => {
            goToPage(USER_POSTS_PAGE, {
              userId,
            });
          })
      }

    })
  }
}
