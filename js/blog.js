let blogs = [];
let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "Desember",
];

function addBlog(event) {
  event.preventDefault();

  let title = document.getElementById("input-blog-title").value;
  let content = document.getElementById("input-blog-content").value;
  let image = document.getElementById("input-blog-image").files[0];

  if (!title || !content || !image) {
    alert("Kolom harap diisi untuk posting!");
    getDistance();
  } else {
    image = URL.createObjectURL(image);
    let blog = {
      title,
      content,
      image,
      author: "Acep",
      postAt: new Date(),
    };

    blogs.push(blog);
    title = "";

    renderBlog();
    document.getElementById("modal-container").classList.toggle("modal-toggle");
  }
}
// menampilkan blog
function renderBlog() {
  let createPostBlog = document.getElementById("contents");

  createPostBlog.innerHTML = "";

  blogs.map((blog) => {
    createPostBlog.innerHTML += `
        <div id="contents" class="blog-list">
        <!-- dynamic content would be here -->
        <div class="blog-list-item">
          <div class="blog-image">
            <img src="${blog.image}" alt="" />
          </div>
          <!-- Content -->
          <div class="blog-content">
            <div class="btn-group">
              <button class="btn-edit">Edit Post</button>
              <button class="btn-post">Post Blog</button>
            </div>
            <h1>
              <a href="blog-detail.html" target="_blank"
                >${blog.title}</a
              >
            </h1>
            <div class="detail-blog-content">
              ${getFullTime(blog.postAt)} | ${blog.author}
            </div>
            <p>
              ${blog.content}
            </p>
            <div style="text-align: right; font-size: 15px; color: gray;">
              ${getDistance(blog.postAt)}
            </div>
          </div>
        </div>
      </div>
  `;
  });
}

function getFullTime(time) {
  let date = time.getDate();
  let monthIndex = time.getMonth();
  let year = time.getFullYear();

  let hours = time.getHours();
  let minutes = time.getMinutes();

  let fulltime = `${date} ${month[monthIndex]} ${year}, ${hours}:${minutes} WIB`;
  return fulltime;
}

function getDistance(timeValue) {
  let timePost = timeValue;
  let timeNow = new Date();

  let distance = timeNow - timePost;
  // convert milli to day
  let distanceDay = Math.floor(distance / (1000 * 3600 * 23));
  let distanceHours = Math.floor(distance / (1000 * 60 * 60));
  let distanceMinutes = Math.floor(distance / (1000 * 60));
  let distanceSecond = Math.floor(distance / 1000);

  if (distanceDay >= 1) {
    return `${distanceDay} Day ago`;
  } else {
    if (distanceHours >= 1) {
      return `${distanceHours} Hours ago`;
    } else {
      if (distanceMinutes >= 1) {
        return `${distanceMinutes} Minutes ago`;
      } else {
        return `${distanceSecond} Second ago`;
      }
    }
  }
}

setInterval(() => {
  if (blogs.length) {
    renderBlog();
  } else {
    document
      .getElementById("blog-container")
      .setAttribute("style", "height: 40.3rem");
  }
});

const buttonAdd = document.getElementById("add-blog");

buttonAdd.addEventListener("click", function () {
  document.getElementById("modal-container").classList.toggle("modal-toggle");
});

const buttonCancel = document.getElementById("btn-ca");

buttonCancel.addEventListener("click", function () {
  document.getElementById("modal-container").classList.toggle("modal-toggle");
});

// const aa = document.getElementById("blog-container");
// aa.addEventListener("click", function () {
//   aa.setAttribute("style", "height: 40.3rem");
// });
