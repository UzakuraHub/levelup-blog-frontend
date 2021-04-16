const Login = document.querySelector("[data-login-form]");
const LoginButton = document.querySelector("#login");
const emailValidate = document.querySelector("#email-valid");
const passwordValidate = document.querySelector("#password-valid");
LoginButton.addEventListener("click", (e) => {
  e.preventDefault();

  let email = Login.email.value.trim();
  let password = Login.password.value.trim();

  if (Login.email === null || Login.password === null)
    return console.log("please fill all fields!");

  fetch("http://localhost:8080/api/users/login", {
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
        if (data.message === "please provideemail") {
          emailValidate.innerHTML += `<p class="email-validation">please fill all required fields ${data.message}</p>`;
        } else {
          passwordValidate.innerHTML += `<p class="email-validation">please fill all required fields ${data.message}</p>`;
        }
      } else if (data.status === 401) {
        if (data.message === "please provideemail") {
          emailValidate.innerHTML += `<p class="email-validation">please fill all required fields ${data.message}</p>`;
        } else {
          passwordValidate.innerHTML += `<p class="email-validation">please fill all required fields ${data.message}</p>`;
        }
      } else if (data.status === 200) {
        console.log("successfully authenticated", data.message);
        const token = JSON.stringify(data.data.token);
        localStorage.setItem("token", token);
        window.location.href = "http://127.0.0.1:5500/blogs.html";
      }
    })
    .catch((err) => {
      console.log(err.message);
      console.log("some error are happening");
    });
  password = "";
  email = "";
});
const validation = () => {};
