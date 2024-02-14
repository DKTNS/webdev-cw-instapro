import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "/components/header-component.js";
import { posts, goToPage } from "../index.js";
import { initLikeListener } from "../button/likes.js";
import { formatDateTime } from "../helpers.js";

export function renderPostsPageComponent() {
  // TODO: реализовать рендер постов из api
  let likeImg;
  let likes;
  const appElement = document.getElementById("app");
  const appEl = posts
    .map((post) => {
      return `
        <li class="post" id="post">
          <div class="post-header" data-user-id="${post.user.id}">
            <img  class="post-header__user-image" src=${post.user.imageUrl}>
            <p class="post-header__user-name">${post.user.name}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src="${post.imageUrl}">
          </div>
          <div class="post-likes">
            <button data-post-id="${post.id}" data-is-liked="${post.isLiked}" class="like-button ${post.isLiked ? "-active-like" : ""} "data-index="${post.user.id}">
              ${likeImg}
            </button>
            <p class="post-likes-text">Нравится: <strong>${likes}</strong></p>
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
  initLikeListener();
}