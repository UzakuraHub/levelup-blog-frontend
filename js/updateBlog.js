const postForm = document.querySelector('[create-form]');
const popupCreate = document.querySelector('.popupCreate');
const id = location.href.split(`?id=`)[1];
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
let title = document.querySelector('#title');
let body = document.querySelector('#body');
fetch(`https://techblog-pro.herokuapp.com/api/v1/blogs/${id}`, {
  method: 'GET',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})
  .then(res => {
    return res.json();
  })
  .then(data => {
    console.log(data);
    title.value = data.data.title;
    body.value = data.data.description;
  });
postForm.addEventListener('submit', async e => {
  e.preventDefault();
  const title = postForm.title.value.trim();
  const description = postForm.description.value.trim();
  const token = localStorage.getItem('token');
  const data = new FormData(postForm);
  data.append('photo', pic.files[0]);
  const res = await fetch(
    `https://techblog-pro.herokuapp.com/api/v1/blogs/${id}`,
    {
      method: 'PATCH',
      headers: {
        'auth': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
      body: data,
    },
  );
  const results = await res.json();
  console.log(results.message);
  if (results.message === 'Validation error: Title must be atleast 10 words!') {
    setTimeout(() => {
      let popup = `<p>${results.message}</p>`;
      popupCreate.innerHTML = popup;
    }, 200);
  } else if (
    err => {
      console.log(err);
      alert(err.message);
    }
  );
});
