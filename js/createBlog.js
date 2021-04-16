const postForm = document.querySelector("[new-post-form]");
const postCreate = document.querySelector("#create");
const postUpdate = document.querySelector("#update");
let titl = document.getElementById("title");
const popupCreate = document.querySelector(".popupCreate");
const postId = window.location.href.split(`?id=`)[1];
console.log(postId);

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
  console.log(auth);

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
    setTimeout(() => {
      let popup = `<p>${results.message}</p>`;
      popupCreate.innerHTML = popup;
    }, 2000);
  }
});

postCreate.addEventListener("click", (e) => {
  e.preventDefault();

  let title = postForm.title.value.trim();
  let body = postForm.body.value.trim();

  if (postForm.title === null || postForm.body === null)
    return console.log("please fill all fields!");
  fetch("http://localhost:8080/api/posts", {
    method: "POST",
    headers: {
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
        return console.log("please fill all fields");
      } else if (data.status === 208) {
        return console.log("title already exist");
      } else if (data.status === 403) {
        postForm.innerHTML += `<p>no token provided ${data.message}</p>`;
        return console.log("no token provided");
      } else {
        console.log("post created", data);
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
