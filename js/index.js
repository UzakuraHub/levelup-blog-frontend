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
  console.log(result);
  let posts = '';
  value.forEach(post => {
    posts += `
    <div class="blog">
      <div class="blog-image">
        <img src = ${post.photo}/>
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
    </div>`;
  });
  blogPosts.innerHTML = posts;
};
getPosts();
