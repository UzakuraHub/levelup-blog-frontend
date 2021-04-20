const registerForm = document.querySelector("[register-form]");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const SignUp = document.querySelector("#register");

SignUp.addEventListener("click", (e) => {
  e.preventDefault();

  const username = registerForm.username.value.trim();
  const email = registerForm.email.value.trim();
  const password = registerForm.password.value.trim();

  fetch("http://localhost:8080/api/users", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 208) {
        openModal(modal);
      } else {
        if (data.status === 201) {
          location.href = "http://127.0.0.1:5500/blogs.html";
        }
        console.log("successfully created user", data);
      }
    })
    .catch((err) => {
      console.log("some error  occured", err.message);
    });
});

const openModal = (modal) => {
  modal.classList.add("active");
};
