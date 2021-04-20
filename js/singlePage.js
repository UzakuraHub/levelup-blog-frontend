const singlePost = document.querySelector(".single-blog");
const postId = location.href.split(`?id=`)[1];
fetch(`http://localhost:8080/api/posts/${postId}`, {
  method: "GET",
  headers: {
    "content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
})
  .then((res) => {
    return res.json();
  })
  .then((post) => {
    let postData = "";
    console.log(post.data);
    postData += `<div class="single-blog><div class="single-blog-image">
          <img src='${post.data.imageUrl}'/>
        </div><div class="single-blog-title">
          <h2>${post.data.title}</h2>
        </div>
        <div class="single-blog-body">
          <p>${post.data.body}
          </p>
        </div><div class="single-blog-footer">
          <ul>
            <li>3 likes</li>
            <li>12 views</li>
            <li>2 comments</li>
          </ul>
        </div></div>`;
    singlePost.innerHTML = postData;
  });
