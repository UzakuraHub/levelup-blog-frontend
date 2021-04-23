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

// logout button

const logout = document.getElementById("logout");
const changeButton = document.getElementById("logout");
if (localStorage.getItem("token") === null) {
  let value = "";
  value += `<a href="#">Login</a>`;
  changeButton.innerHTML = value;
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "./login.html";
  });
} else if (localStorage.getItem("token")) {
  let value = "";
  value += `<a href="#">Logout</a>`;
  changeButton.innerHTML = value;
  logout.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.clear("token");
    window.location.href = "./index.html";
  });
}

// create button

const create = document.getElementById("create");
if (localStorage.getItem("token") === null) {
  create.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "./login.html";
  });
} else if (localStorage.getItem("token")) {
  create.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "./create.html";
  });
}
