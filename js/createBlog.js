const postForm = document.querySelector('[create-form]');
const postCreate = document.querySelector('#create');
postCreate.addEventListener('click', e => {
  e.preventDefault();

  const title = postForm.title.value.trim();
  const description = postForm.description.value.trim();

  if (postForm.title === null || postForm.description === null)
    return console.log('please fill all fields!');

  fetch('https://techblog-pro.herokuapp.com/api/v1/blogs', {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      title,
      description,
    }),
  })
    .then(res => {
      title === null;
      body === null;
      return res.json();
    })
    .then(data => {
      if (data.status === 400) {
        return console.log('Validation Error');
      } else if (data.status === 401) {
        postForm.innerHTML += `<p>Access denied! ${data.message}</p>`;
        return console.log('Token Error.');
      } else if (data.status === 403) {
        postForm.innerHTML += `<p>Error creating blog! ${data.message}</p>`;
        return console.log('No token or unauthorised token.');
      } else {
        console.log('Successfully created blog!', data);
        const token = JSON.stringify(data.data.token);
        localStorage.setItem('token', token);
      }

      // setTimeout(() => redirectTo("/index.html"), 800);
    })
    .catch(err => {
      console.log(err);
      alert(err.message);
    });
});
