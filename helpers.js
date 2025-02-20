export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}

export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}

export const sanitizeHtml = (htmlString) => {
  return htmlString
    .replaceAll("<", "&lt;", 
    ">", "&gt;", "&", "&amp;", 
    '"', "&quot;", "&lt;", "<", 
    "&gt;", ">", "&amp;", "&", '&quot;', "");

};

export function formatDateTime(date) {
  let dateTime = new Date(date);
  const day = String(dateTime.getDate()).padStart(2, '0');
  const month = String(dateTime.getMonth()).padStart(2, '0');
  const year = String(dateTime.getFullYear() - 2000);
  const minutes = String(dateTime.getMinutes()).padStart(2, '0');
  const hours = String(dateTime.getHours()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
};