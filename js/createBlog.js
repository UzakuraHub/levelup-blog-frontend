const postForm = document.querySelector("[new-post-form");
const postCreate = document.querySelector("#create");
postCreate.addEventListener("click", (e) => {
  e.preventDefault();

  const title = postForm.title.value.trim();
  const body = postForm.body.value.trim();

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
      }

      // setTimeout(() => redirectTo("/index.html"), 800);
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
});
