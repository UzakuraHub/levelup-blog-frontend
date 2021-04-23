const postForm = document.querySelector("[new-post-form]");
const postCreate = document.querySelector("#create");
const postUpdate = document.querySelector("#update");
const titleErrorHandler = document.querySelector(".title-error");
const bodyErrorHandler = document.querySelector(".body-error");
const picture = document.querySelector("#picture");
const popupCreate = document.querySelector(".popupCreate");
const previewpicture = postForm.querySelector(".image-preview");
const postId = window.location.href.split(`?id=`)[1];

picture.addEventListener("change", showPicture);
function showPicture(e) {
  previewpicture.innerHTML = "";
  file = e.target.files[0];
  if (file) {
    const readImage = new FileReader();
    readImage.addEventListener("load", () => {
      const preview = document.createElement("img");
      preview.setAttribute("src", readImage.result);
      console.log(preview);
      return previewpicture.appendChild(preview);
    });
    readImage.readAsDataURL(file);
  }
}
console.log(postId);

postCreate.addEventListener("click", async (e) => {
  e.preventDefault();
  const auth = localStorage.getItem("token");
  if (auth === undefined) {
    return console.log("no token provided");
  }
  const data = new FormData(postForm);
  data.append("imageUrl", picture.files[0]);
  const res = await fetch("https://blog-plaza.herokuapp.com/api/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${auth}`,
      "Access-Control-Allow-Origin": "*",
    },
    body: data,
  });
  const result = await res.json();
  if (result.status === 400) {
    let valid = "";
    valid = `<div class="fadeIn"><p id="fade-out">Bad-Request Empty fields</p></div>`;
    titleErrorHandler.innerHTML += valid;
    setTimeout(() => {
      titleErrorHandler.classList.add("fadeout");
    }, 3000);
    return console.log("bad request");
  } else if (result.status === 409) {
    let valid = "";
    valid = `<div class="fadeIn"><p id="fade-out">Title alreadyexists</p></div>`;
    titleErrorHandler.innerHTML += valid;
    setTimeout(() => {
      titleErrorHandler.classList.add("fadeout");
    }, 3000);
    return console.log("please try another title of the post");
  } else if (result.status === 201) {
    console.log("post created Successfully");
    window.location.href = "./blogs.html";
  } else {
    console.log("post not created");
  }
});
