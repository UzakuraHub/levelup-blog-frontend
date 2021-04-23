const BlogId = location.href.split(`?id=`)[1];
const singleBlog = document.querySelector('.single-blog-list');
const blogPost = document.querySelector('.blogs-list');
fetch(`https://techblog-pro.herokuapp.com/api/v1/blogs/${BlogId}`, {
  method: 'GET',
  headers: {
    'content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})
  .then(res => {
    return res.json();
  })
  .then(blog => {
    let Data = '';
    console.log(blog.data);
    Data += `
     <div class="single-blog">
        <div class="blog-one">
          <div class="blog-image-1">
            <img src='${blog.data.imageUrl}'/>
          </div>
          <div class="single-blog-title">
          <h2>${blog.data.title}</h2>
        </div>
          <div class="single-blog-body">
            <p> ${blog.data.description}</p>
            <div class="single-blog-footer">
              <ul>
                <li>3 likes</li>
                <li>12 views</li>
                <li>2 comments</li>
              </ul>
              <div class="input-field" style="display: flex; justify-content: space-between;">
                <a href="./update.html?id=${blog.data.id}">
                <input type="submit" value="Update" name="update" id="update" class="button btn" />
              </div>
            </div>
          </div>
        </div>`;
    singleBlog.innerHTML = Data;
  });
