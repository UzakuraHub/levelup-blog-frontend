const Login = document.querySelector('[login-form]');
const LoginButton = document.querySelector('#login');
const emailValidate = document.querySelector('#email-valid');
const passwordValidate = document.querySelector('#password-valid');
LoginButton.addEventListener('click', e => {
  e.preventDefault();

  fetch('https://techblog-pro.herokuapp.com/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      'Access-Control-Cross-Origin': '*',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(res => {
      let email = Login.email.value.trim();
      let password = Login.password.value.trim();

      if (Login.email === null || Login.password === null);
      console.log('Please input your email and password!');
      email === null;
      password === null;
      return res.json();
    })
    .then(data => {
      if (
        data.status === 400 &&
        data.message === 'Validation error Email is required'
      ) {
        emailValidate.innerHTML += `<p class="email-validation">Please provide an Email ${data.message}</p>`;
        console.log('fuckkkk');
      } else if (data.status === 401) {
        passwordValidate.innerHTML += `<p class="email-validation">Invalid Password! ${data.message}</p>`;
        console.log('fuckkkk');
      } else if (data.status === 200) {
        console.log('Authentication Successful', data.message);
        const token = JSON.stringify(data.data.token);
        localStorage.setItem('token', token);
        location.href =
          'http://127.0.0.1:5500/ui/levelup-blog-frontend/create.html';
      }
    })
    .catch(err => {
      console.log('Error logging in...', err.message);
    });
  password = '';
  email = '';
});
const validation = () => {};
