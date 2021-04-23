const Login = document.querySelector('[login-form]');
const LoginButton = document.querySelector('#login');
const emailValidate = document.querySelector('#email-valid');
const passwordValidate = document.querySelector('#password-valid');
Login.addEventListener('submit', e => {
  e.preventDefault();

  let email = Login.email.value.trim();
  let password = Login.password.value.trim();

  fetch('https://techblog-pro.herokuapp.com/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      'Access-Control-Cross-Origin': '*',
    },
    body: JSON.stringify({
      email,
      password,
    })
  })
    .then(res => {
      let email = Login.email.value.trim();
      let password = Login.password.value.trim();

      email === null;
      password === null;
      return res.json();
    })
    .then(data => {
      if (
        data.message === 'Validation error: Email is required'
      ) {
        console.log('Email please!!');
      } else if (data.message === 'Validation error: password is required') {
        console.log('Please input password!!');
      } else if (data.message === 'User Not found') {
        console.log('User Does not Exist!');
      } else if (data.message === 'Invalid password') {
        console.log('Password Invalid!');
      } else {
        console.log('Authentication Successful', data.message);
        const token = data.data.token;
        localStorage.setItem('token', token);
        location.href =
        './blogs.html';
      }
    })
    .catch(err => {
      console.log('Error logging in...', err.message);
    });
  password = '';
  email = '';
});
const validation = () => {};
