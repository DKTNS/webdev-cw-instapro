import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appElement = document.getElementById("app");
  const appPostElement = posts
  .map((post, index) => {
  return `
  <li class="post">
  <div class="post-header" data-user-id="${user-post-id}>
      <img src=${post.user.imageUrl} class="post-header__user-image">
      <p class="post-header__user-name">${post.user.name}</p>
  </div>
  <div class="post-image-container">
    <img class="post-image" src="${post.imageUrl}">
  </div>
  <div class="post-likes">
    <button data-post-id="${post.id}" data-is-liked="${post.isLiked}" 
    class="like-button ${post.isLiked ? "-active-like" : ""} "data-index="${post.user.id}">
      ${likeImg}
    </button>
    <p class="post-likes-text">
      Нравится: <strong>${likes}</strong>
    </p>
  </div>
  <p class="post-text">
    <span class="user-name">${post.user.name}</span>
    ${post.descrption}
  </p>
  <p class="post-date">
    ${FormDate(new Date)}
  </p>
</li>`;
}).join("");
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">

                </ul>
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
/* const LikeElement = document.querySelector(".like-button");
  LikeElement.addEventListener ("click", () = {
    addLike({"rrr"});
  }) */
}

