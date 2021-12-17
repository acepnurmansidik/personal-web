// button add
const buttonAdd = document.getElementById("add-blog");
buttonAdd.addEventListener("click", function () {
  document.getElementById("modal-container").classList.toggle("modal-toggle");
});
// button cancel
const buttonCancel = document.getElementById("btn-ca");
buttonCancel.addEventListener("click", function () {
  document.getElementById("modal-container").classList.toggle("modal-toggle");
});

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
  // get value dari form
  let title = document.getElementById("input-blog-title").value;
  let content = document.getElementById("input-blog-content").value;
  let image = document.getElementById("input-blog-image").files[0];

  // check isi value dari form
  if (!title || !content || !image) {
    alert("Kolom harap diisi untuk posting!");
  } else {
    // menampilkan gambar
    image = URL.createObjectURL(image);
    // jika semuanya terisi masukan ke dalam objek
    // masukan new Date le postAt
    let blog = {
      title,
      content,
      image,
      author: "Acep",
      postAt: new Date(),
    };

    blogs.push(blog);

    // clear form create post blog
    document.querySelector("input").value = "";
    document.querySelector("textarea").value = "";

    // tutup modal box
    document.getElementById("modal-container").classList.toggle("modal-toggle");
  }
}
// menampilkan blog
function renderBlog() {
  // select content menggunakn id
  let createPostBlog = document.getElementById("contents");
  // clear ketika ada yg post baru
  createPostBlog.innerHTML = "";
  // tampilkan blog dari aray
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

// function menampilkan ttl
function getFullTime(time) {
  let date = time.getDate();
  let monthIndex = time.getMonth();
  let year = time.getFullYear();

  let hours = time.getHours();
  let minutes = time.getMinutes();

  let fulltime = `${date} ${month[monthIndex]} ${year}, ${hours}:${minutes} WIB`;
  return fulltime;
}
// fungsi utk distance waktu
function getDistance(timeValue) {
  let timePost = timeValue;
  let timeNow = new Date();

  let distance = timeNow - timePost;
  // convert milli to day
  let distanceDay = Math.floor(distance / (1000 * 3600 * 23));
  let distanceHours = Math.floor(distance / (1000 * 60 * 60));
  let distanceMinutes = Math.floor(distance / (1000 * 60));
  let distanceSecond = Math.floor(distance / 1000);
  // cek kondisi berapa lama blog di posting
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

// menjalakan time post secara dinamis
setInterval(() => {
  if (blogs.length) {
    renderBlog();
    document
      .getElementById("blog-container")
      .removeAttribute("style", "height: 40.3rem");
  } else {
    document
      .getElementById("blog-container")
      .setAttribute("style", "height: 40.3rem");
  }
});
