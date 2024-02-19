import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "/components/header-component.js";
import { posts, goToPage } from "../index.js";
import { disLike, like } from "../api.js";
import { formatDateTime } from "../helpers.js";

export function renderPostsPageComponent() {
  // TODO: реализовать рендер постов из api
  console.log(posts);

  const appElement = document.getElementById("app");
  const appEl = posts
    .map((post) => {
      return `
        <li class="post" id="${post.id}">
          <div class="post-header" data-user-id="${post.user.id}">
            <img  class="post-header__user-image" src=${post.user.imageUrl}>
            <p class="post-header__user-name">${post.user.name}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src="${post.imageUrl}">
          </div>
          <div class="post-likes">
            <button data-post-id="${post.id}" data-liked="${post.isLiked}" class="like-button" 
            "data-index="${post.user.id}">
            <img src="./assets/images/${post.isLiked ? "like-active" : "like-not-active"}.svg">
            </button>
            <p class="post-likes-text">Нравится: <strong>${post.likes.length}</strong></p>
          </div>
          <p class="post-text">
            <span class="user-name">${post.user.name}</span>: ${post.description}</p>
          <p class="post-date">${formatDateTime(post.createdAt)}</p>
        </li>
      `;
    })
    .join("");

  const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts" id="posts">${appEl}</ul>
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
      console.log(typeof false);
      if (isLiked === "true") {
        console.log("ДизЛакнуто");
        console.log(isLiked);
        disLike({ id })
          .then(() => {
            goToPage(POSTS_PAGE);
          })
      } else {
        console.log("Лакнуто");
        like({ id })
          .then(() => {
            goToPage(POSTS_PAGE);
          })
      }

    })
  }
}