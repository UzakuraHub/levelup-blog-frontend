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
if (postId !== undefined) {
  fetch(`http://localhost:8080/api/posts/${postId}`, {
    method: "GET",
    headers: {
      "content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    // body: JSON.stringify({
    //   title,
    //   body,
    // }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
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
    }
    console.log(auth);
    let title = postForm.title.value.trim();
    let body = postForm.body.value.trim();
    const res = await fetch(`http://localhost:8080/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${auth}`,
        "content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        title,
        body,
      }),
    });
    const results = await res.json();
    console.log(results.status);
    if (results.status === 403) {
      let valid = "";
      console.log("please fill all required fields");
      valid = `<div class="fadeIn"><p id="fade-out">No token Provided</p></div>`;
      popupCreate.innerHTML += valid;
      setTimeout(() => {
        popupCreate.classList.add("fadeout");
      }, 3000);
    }
    if (results.status === 409) {
      if (title === null) {
        let valid = "";
        console.log("please fill all required fields");
        valid = `<div class="fadeIn"><p id="fade-out">${data.message}</p></div>`;
        titleErrorHandler.innerHTML += valid;
        setTimeout(() => {
          titleErrorHandler.classList.add("fadeout");
        }, 3000);
      } else if (body === null) {
        let valid = "";
        console.log("please fill all required fields");
        valid = `<div class="fadeIn"><p id="fade-out">${data.message}</p></div>`;
        bodyErrorHandler.innerHTML += valid;
        setTimeout(() => {
          bodyErrorHandler.classList.add("fadeout");
        }, 3000);
      }
    }
  });
}

postCreate.addEventListener("click", (e) => {
  e.preventDefault();

  let title = postForm.title.value.trim();
  let body = postForm.body.value.trim();
  const auth = localStorage.getItem("token");
  if (auth === null) {
    return console.log("no token provided");
  }
  if (postForm.title === null || postForm.body === null)
    return console.log("please fill all fields!");
  fetch("http://localhost:8080/api/posts", {
    method: "POST",
    headers: {
      authorization: `Bearer ${auth}`,
      "content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  })
    .then((res) => {
      title === null;
      body === null;
      return res.json();
    })
    .then((data) => {
      if (data.status === 409) {
        if (title === null) {
          let valid = "";
          console.log("please fill all required fields");
          valid = `<div class="fadeIn"><p id="fade-out">${data.message}</p></div>`;
          titleErrorHandler.innerHTML += valid;
          setTimeout(() => {
            titleErrorHandler.classList.add("fadeout");
          }, 3000);
        } else if (body === null) {
          let valid = "";
          console.log("please fill all required fields");
          valid = `<div class="fadeIn"><p id="fade-out">${data.message}</p></div>`;
          bodyErrorHandler.innerHTML += valid;
          setTimeout(() => {
            bodyErrorHandler.classList.add("fadeout");
          }, 3000);
        }
      } else if (data.status === 208) {
        let valid = "";
        console.log("please fill all required fields");
        valid = `<div class="fadeIn"><p id="fade-out">Title already exists</p></div>`;
        titleErrorHandler.innerHTML += valid;
        setTimeout(() => {
          titleErrorHandler.classList.add("fadeout");
        }, 3000);
      } else if (data.status === 403) {
        let valid = "";
        console.log("please fill all required fields");
        valid = `<div class="fadeIn"><p id="fade-out">need authorization</p></div>`;
        popupCreate.innerHTML += valid;
        setTimeout(() => {
          popupCreate.classList.add("fadeout");
        }, 3000);
      } else {
        location.href = "http://127.0.0.1:5500/blogs.html";
      }

      // setTimeout(() => redirectTo("/index.html"), 800);
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
});
// localStorage.getItem("token", token);
// console.log(token);
