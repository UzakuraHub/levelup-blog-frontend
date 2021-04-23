const postForm = document.querySelector('[create-form]');
const pic = document.querySelector('#picture');
const previewpic = postForm.querySelector('.image-preview');
pic.addEventListener('change', showPicture);
function showPicture(e) {
  previewpic.innerHTML = '';
  file = e.target.files[0];
  if (file) {
    const readImage = new FileReader();
    readImage.addEventListener('load', () => {
      const preview = document.createElement('img');
      preview.setAttribute('src', readImage.result);
      console.log(preview);
      return previewpic.appendChild(preview);
    });
    readImage.readAsDataURL(file);
  }
}
postForm.addEventListener('submit', e => {
  e.preventDefault();

  const title = postForm.title.value.trim();
  const description = postForm.description.value.trim();

  if (postForm.title === null || postForm.description === null)
    return console.log('please fill all fields!');
  const data = new FormData(postForm);
  data.append('photo', pic.files[0]);
  const token = localStorage.getItem('token');
  fetch('https://techblog-pro.herokuapp.com/api/v1/blogs', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      auth: `Bearer ${token}`,
    },
    body: data,
  })
    .then(res => {
      title === null;
      description === null;
      return res.json();
    })

    .then(data => {
      if (data.status === 400) {
        console.log('Please Add a title to your blog');
      } else if (
        data.status === 400 &&
        data.message ===
          'Validation error: Please describe your blog in atleast 25 words but no longer tan 500 words!'
      ) {
        console.log('Please describe your blog!');
      } else if (data.status === 401) {
        postForm.innerHTML += `<p>Access denied! ${data.message}</p>`;
        return console.log('Token Error.');
      } else if (data.status === 403) {
        postForm.innerHTML += `<p>Error creating blog! ${data.message}</p>`;
        return console.log('No token or unauthorised token.');
      } else if (data.status === 500) {
        console.log(
          'Error creating blog! Please sign in or try again',
          data.message,
        );
      } else if (data.message === 'Successfully created Blog') {
        console.log(data.message);
        location.href = './blogs.html';
      }
    })
    .catch(err => {
      console.log(err);
      alert(err.message);
    });
});
