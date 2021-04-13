const getPosts = async () => {
  const blogPosts = document.querySelector(".blogs-list");
  const response = await fetch("http://localhost:8080/api/posts");
  const data = await response.json();
  const result = data;
  const value = result.data;
  console.log(value);
  console.log(result);
  let posts = "";
  value.forEach((post) => {
    posts += `      <div class="blog">
    <div class="blog-image">
    <img src = ${post.imageUrl}/></div>
    <div class="blog-title">
    <h2>${post.title}<h2>
    </div>
    <div class=bog-body>
    <p>${post.body}<p>
    </div>
    </div>`;
  });
  blogPosts.innerHTML = posts;
};
getPosts();
