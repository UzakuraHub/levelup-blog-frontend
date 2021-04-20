const handleShowLinkMobile = () => {
  const links = document.querySelector(".navbar .links");
  links.classList.toggle("hide");
};

document
  .querySelector(".links")
  .addEventListener("click", handleShowLinkMobile);

document
  .querySelector(".toggle")
  .addEventListener("click", handleShowLinkMobile);
const logout = document.getElementById("logout");
// const logOptions = document.querySelector(".log-options");
// if (localStorage.key("token")) {
//   let login;
//   login = `<a href="#">Login</a>`;
//   logOptions.innerHTML = login;
//   console.log(logOptions.innerHTML);
//   location.href = "http://127.0.0.1:5500/index.html";
// }
logout.addEventListener("click", (e) => {
  e.preventDefault();
  // let login;
  // login = `<a href="#">Logout</a>`;
  // logOptions.innerHTML = login;
  localStorage.clear("token");
});
