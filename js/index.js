const signlePost = document.querySelector(".single-blog");
const checkauth = localStorage.getItem("token");
if (checkauth === null) {
  const getPost = async () => {
    try {
      const blogPosts = document.querySelector(".blogs-list");
      const response = await fetch(
        "https://blog-plaza.herokuapp.com/api/posts",
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await response.json();
      const result = data;
      const value = result.data;
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
      const response = await fetch(
        "https://blog-plaza.herokuapp.com/api/posts",
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await response.json();
      const result = data;
      const value = result.data;
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
        <a href="./update.html?id=${post.id}"><button id="${post.id}" class=' btn'>update</button></a>
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
  getPosts();
}
