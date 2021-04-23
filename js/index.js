const signout = document.querySelector('#logout');
const getPosts = async () => {
  const blogPosts = document.querySelector('.blogs-list');
  const response = await fetch(
    'https://techblog-pro.herokuapp.com/api/v1/blogs',
    );
    console.log(response);
  const data = await response.json();
  const result = data;
  const value = result.data;
  console.log(value);
  let posts = '';
  value.forEach(post => {
    posts += `
      <a href="./blog.html?id=${post.id}" class='blog' id=${post.id}>
      <div class="blog-image">
      <img src ='${post.imageUrl}'/>
      </div>
      <div class="blog-title">
      <h3>${post.title}<h3>
      </div>
      <div class="blog-body">
      <p>${post.description}<p>
      <div class="blog-footer">
      <ul>
      <li>20 likes</li>
      <li>25 views</li>
      <li>5 comments</li>
      </ul>
      </div>
      </div>
      </a>`;
  });
  blogPosts.innerHTML = posts;
  if (localStorage.token === undefined) {
  let text = ''
    text += `<a href='./index.html'>Login</a>`
    signout.innerHTML = text
} else if (localStorage.getItem("token")) {
  const text = 'Logout'
  signout.value = text
  signout.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.clear("token");
    console.log('Logged out');
    window.location.href = "./index.html";
  });
}
};
getPosts();
