const postForm = document.querySelector("[new-post-form]");
const postCreate = document.querySelector("#create");
const postUpdate = document.querySelector("#update");
const titleErrorHandler = document.querySelector(".title-error");
const bodyErrorHandler = document.querySelector(".body-error");
const picture = document.querySelector("#picture");
const popupCreate = document.querySelector(".popupCreate");
const previewpicture = postForm.querySelector(".image-preview");
const postId = window.location.href.split(`?id=`)[1];
console.log(postId);

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

fetch(`https://blog-plaza.herokuapp.com/api/posts/${postId}`, {
  method: "GET",
  headers: {
    "content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    title.value = data.data.title;
    body.value = data.data.body;
  });
postUpdate.addEventListener("click", async (e) => {
  e.preventDefault();
  const auth = localStorage.getItem("token");
  if (auth === null) {
    let valid = "";
    console.log("please fill all required fields");
    valid = `<div class="fadeIn"><p id="fade-out">requires authorization</p></div>`;
    popupCreate.innerHTML += valid;
    setTimeout(() => {
      popupCreate.classList.add("fadeout");
    }, 3000);
    return console.log("no token provided");
  } else {
    console.log(auth);
    const data = new FormData(postForm);
    data.append("imageUrl", picture.files[0]);
    const res = await fetch(
      `https://blog-plaza.herokuapp.com/api/posts/${postId}`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${auth}`,
          "Access-Control-Allow-Origin": "*",
        },
        body: data,
      }
    );
    const results = await res.json();
    if (results.status === 400) {
      let valid = "";
      valid = `<div class="fadeIn"><p id="fade-out">Bad-Request Empty fields</p></div>`;
      titleErrorHandler.innerHTML += valid;
      setTimeout(() => {
        titleErrorHandler.classList.add("fadeout");
      }, 3000);
      return console.log("Bad-Request");
    } else if (results.status === 409) {
      let valid = "";
      valid = `<div class="fadeIn"><p id="fade-out">Title alreadyexists</p></div>`;
      titleErrorHandler.innerHTML += valid;
      setTimeout(() => {
        titleErrorHandler.classList.add("fadeout");
      }, 3000);
      return console.log("Please fill all required fields");
    } else if (results.status === 200) {
      console.log(results.status);
      console.log("updted sucessfully", results);
      window.location.href = "./blogs.html";
    } else {
      console.log("post not updated");
    }
  }
});
