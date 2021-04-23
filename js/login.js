const Login = document.querySelector(".login-form");
const emailErrorHandler = document.querySelector(".fadeIn-fadeOut-email");
const passwordErrorHandler = document.querySelector(".fadeIn-fadeOut-password");
const LoginButton = document.querySelector("#login");
LoginButton.addEventListener("click", (e) => {
  e.preventDefault();
  let email = Login.email.value.trim();
  let password = Login.password.value.trim();

  if (Login.email === null || Login.password === null)
    return console.log("please fill all fields!");

  fetch("https://blog-plaza.herokuapp.com/api/users/login", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
      "Access-Control-Cross-Origin": "*",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => {
      email === null;
      password === null;
      return res.json();
    })
    .then((data) => {
      if (data.status === 409) {
        if (email === null) {
          let valid = "";
          console.log("please fill all required fields");
          valid = `<div class="fadeIn"><p id="fade-out">provide email address</p></div>`;
          emailErrorHandler.innerHTML += valid;
          setTimeout(() => {
            emailErrorHandler.classList.add("fadeout");
            passwordErrorHandler.classList.add("fadeout");
          }, 3000);
        } else if (password === null) {
          let valid = "";
          console.log("please fill all required fields");
          valid = `<div class="fadeIn"><p id="fade-out">password is required</p></div>`;
          passwordErrorHandler.innerHTML += valid;
          setTimeout(() => {
            passwordErrorHandler.classList.add("fadeout");
          }, 3000);
        }
      } else if (data.status === 400) {
        let valid = "";
        console.log("please fill all required fields");
        valid = `<div class="fadeIn"><p id="fade-out">${data.message}</p></div>`;
        emailErrorHandler.innerHTML += valid;
        passwordErrorHandler.innerHTML += valid;
        setTimeout(() => {
          emailErrorHandler.classList.add("fadeout");
          passwordErrorHandler.classList.add("fadeout");
        }, 3000);
      } else if (data.status === 200) {
        console.log("successfully authenticated", data.message);
        const token = data.data.token;
        console.log(token);
        localStorage.setItem("token", token);
        window.location.href = "./index.html";
      }
    })
    .catch((err) => {
      console.log(err.message);
      console.log("some error are happening");
    });
  password = "";
  email = "";
});
