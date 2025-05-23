// Tài khoản Admin mặc định
const defaultAdmin = { username: "admin", password: "admin123", isAdmin: true };

// Kiểm tra và lưu tài khoản Admin vào LocalStorage nếu chưa có
if (!localStorage.getItem("adminAccount")) {
    localStorage.setItem("adminAccount", JSON.stringify(defaultAdmin));
}

// Đăng nhập (Kiểm tra Admin và User)
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const user = JSON.parse(localStorage.getItem("user"));
    const admin = JSON.parse(localStorage.getItem("adminAccount"));

    if (admin && username === admin.username && password === admin.password) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("isAdmin", "true");
        alert("Đăng nhập thành công với quyền ADMIN!");
        window.location.href = "index.html";
    } else if (user && username === user.username && password === user.password) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("isAdmin", user.isAdmin);
        alert("Đăng nhập thành công!");
        window.location.href = "index.html";
    } else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
}

// Kiểm tra đăng nhập
function checkLogin() {
    if (!localStorage.getItem("loggedIn")) {
        window.location.href = "login.html";
    }

    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (isAdmin) {
        document.body.innerHTML += `<div class="alert alert-success">Bạn đang đăng nhập với quyền ADMIN!</div>`;
    }
}

// Đăng xuất
function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("isAdmin");
    window.location.href = "login.html";
}

// Thêm ảnh vào danh sách
function addImage() {
    const input = document.getElementById('imageUpload');
    const table = document.getElementById('imageTable');

    if (input.files.length > 0) {
        const file = input.files[0];
        const imgURL = URL.createObjectURL(file);

        const row = document.createElement('tr');
        row.innerHTML = `<td><img src="${imgURL}" class="img-thumbnail" style="width: 100px;"></td>
                         <td><button class="btn btn-danger" onclick="deleteImage(this)">Xóa</button></td>`;
        table.appendChild(row);

        let images = JSON.parse(localStorage.getItem("images")) || [];
        images.push(imgURL);
        localStorage.setItem("images", JSON.stringify(images));
    }
}

// Hiển thị ảnh đã lưu khi tải trang
window.onload = function () {
    if (!localStorage.getItem("loggedIn")) {
        window.location.href = "login.html";
    }

    const table = document.getElementById('imageTable');
    let images = JSON.parse(localStorage.getItem("images")) || [];

    images.forEach(imgURL => {
        const row = document.createElement('tr');
        row.innerHTML = `<td><img src="${imgURL}" class="img-thumbnail" style="width: 100px;"></td>
                         <td><button class="btn btn-danger" onclick="deleteImage(this)">Xóa</button></td>`;
        table.appendChild(row);
    });
};

// Xóa hình ảnh khỏi danh sách
function deleteImage(button) {
    const row = button.parentElement.parentElement;
    const imgURL = row.querySelector('img').src;
    
    let images = JSON.parse(localStorage.getItem("images")) || [];
    images = images.filter(image => image !== imgURL);
    localStorage.setItem("images", JSON.stringify(images));

    row.remove();
}