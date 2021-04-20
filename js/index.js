const signlePost = document.querySelector(".single-blog");
const checkauth = localStorage.getItem("token");
console.log(checkauth);
if (checkauth === null) {
  const getPost = async () => {
    try {
      const blogPosts = document.querySelector(".blogs-list");
      const response = await fetch("http://localhost:8080/api/posts");
      const data = await response.json();
      const result = data;
      const value = result.data;
      console.log(value);
      // console.log(result);
      let posts = "";
      value.forEach((post) => {
        posts += `      <div class="blog" id=${post.id}>
        <a href="./singlePage.html?id=${post.id}"><div class="blog-image">
        <img src = '${post.imageUrl}'/></div>
        <div class="blog-title">
        <h2>${post.title}<h2>
        </div>
        <div class='blog-body'>
        <p>${post.body}<p></a>
        <div class="blog-footer">
              <ul>
                <li>3 likes</li>
                <li>12 views</li>
                <li>2 comments</li>
              </ul>
            </div>
            
        </div>
        </div>
        `;
      });
      blogPosts.innerHTML = posts;
    } catch (err) {
      console.log(err.message);
    }
  };
  getPost();
} else {
  const getPosts = async () => {
    try {
      const blogPosts = document.querySelector(".blogs-list");
      const response = await fetch("http://localhost:8080/api/posts");
      const data = await response.json();
      const result = data;
      const value = result.data;
      console.log(value);
      // console.log(result);
      let posts = "";
      value.forEach((post) => {
        posts += `      <div class="blog" id=${post.id}>
        <a href="./singlePage.html?id=${post.id}"><div class="blog-image">
        <img src = '${post.imageUrl}'/></div>
        <div class="blog-title">
        <h2>${post.title}<h2>
        </div>
        <div class='blog-body'>
        <p>${post.body}<p></a>
        <div class="blog-footer">
        <ul>
        <li>3 likes</li>
        <li>12 views</li>
        <li>2 comments</li>
        </ul>
        </div>
        <div class="updateDeleteBtn">
        <a href="./blogs.html?id=${post.id}"><button type="submit" id="${post.id}" class='deleteBtn btn'>delete</button></a>
        <a href="./create.html?id=${post.id}"><button id="${post.id}" class=' btn'>update</button></a>
        </div>
        </div>
        </div>
        `;
      });
      blogPosts.innerHTML = posts;
    } catch (err) {
      console.log(err.message);
    }
  };
  // const removePost = document.querySelector(".deleteBtn");
  // removePost.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   const postId = window.location.href.split(`?id=`)[1];
  //   console.log(postId);
  // });
  getPosts();
}
