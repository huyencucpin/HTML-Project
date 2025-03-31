const signupform = document.getElementById('signupform');
const userLocal = JSON.parse(localStorage.getItem('user')) || [];

function showForm(formId) {
    let signupForm = document.getElementById("signupform");
    let signinForm = document.getElementById("signinform");
    let homeSection = document.getElementById("home");

    if (formId !== "signupform") signupForm.style.display = "none";
    if (formId !== "signinform") signinForm.style.display = "none";
    if (formId !== "home") homeSection.style.display = "none";
    document.getElementById(formId).style.display = "block";
}

let username = document.getElementById('signupusername').value;
let password = document.getElementById('signuppassword').value;
let cfpassword = document.getElementById('cfpassword').value;
let email = document.getElementById('signupemail').value;

//Kiểm tra email đúng định dạng hay không => Đưa ra thông báo
function isValidEmail(email) {
    let signupemailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return signupemailPattern.test(email);
}

function kiemTraEmail() {
    let email = document.getElementById('signupemail').value;
    let result = document.getElementById('result');
    if (!isValidEmail(email)) {
        result.innerHTML = "❌ Email không hợp lệ";
        result.style.color = "red";
        document.getElementById('result').style.display = 'block';
    }
    else {
        document.getElementById('result').style.display = 'none';
    }
}

// Chuyển hướng form khi ấn "login here" & "signup now"
document.addEventListener("DOMContentLoaded", function () {
    let loginHereBtn = document.getElementById("loginhere");

    if (loginHereBtn) {
        loginHereBtn.addEventListener("click", function () {
            showForm("signinform");
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let signupNowBtn = document.getElementById("signupnow");

    if (signupNowBtn) {
        signupNowBtn.addEventListener("click", function () {
            showForm("signupform");
        });
    }
});

// Ngăn việc ấn enter là reload lại trang
document.getElementById("signinform").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});

function register(event) {
    event.preventDefault();
    let username = document.getElementById('signupusername').value;
    let password = document.getElementById('signuppassword').value;
    let cfpassword = document.getElementById('cfpassword').value;
    let email = document.getElementById('signupemail').value;
    let notice = document.getElementById('notice');
    let checkbox = document.getElementById('confirm');

    let userLocal = JSON.parse(localStorage.getItem('users')) || [];

    // Kiểm tra checkbox
    if (!checkbox || !checkbox.checked) {
        notice.style.display = 'block';
        notice.innerHTML = "❌ Vui lòng xác nhận điều khoản!";
        notice.style.color = 'red';
        return;
    }

    // Kiểm tra nhập đầy đủ thông tin
    if (!username || !password || !cfpassword || !email) {
        notice.style.display = 'block';
        notice.innerHTML = "❌ Vui lòng nhập đầy đủ thông tin!";
        notice.style.color = 'red';
        return;
    }

    // Kiểm tra mật khẩu khớp nhau
    if (password !== cfpassword) {
        notice.style.display = 'block';
        notice.innerHTML = "❌ Mật khẩu không khớp!";
        notice.style.color = 'red';
        return;
    }

    // Kiểm tra email đã tồn tại chưa
    let emailExist = userLocal.some((user) => user.email === email);
    if (emailExist) {
        alert('Email đã được đăng ký. Vui lòng đăng nhập');
        setTimeout(() => {
            showForm("signinform");
        }, 100);
        return;
    }

    // Lưu user mới
    let user = { username, password, email };
    userLocal.push(user);
    localStorage.setItem("users", JSON.stringify(userLocal));

    alert('Đăng ký thành công. Đăng nhập ngay!');
    setTimeout(() => {
        showForm("signinform");
        document.getElementById("signinusername").value = username;
    }, 100);
}


// Phần đăng nhập
function login(event) {
    event.preventDefault();
    let signinusername = document.getElementById('signinusername').value;
    let signinpassword = document.getElementById('signinpassword').value;
    let signinnotice = document.getElementById('signinnotice');
    let welcomeMessage = document.getElementById('welcomeMessage');

    // Validate dữ liệu đầu vào 

    if (!signinusername || !signinpassword) {
        document.getElementById('signinnotice').style.display = 'block';
        signinnotice.innerHTML = "Vui lòng điền đầy đủ thông tin!";
        signinnotice.style.color = 'red';
        return;
    }
    // Lấy dữ liệu từ local về
    let userLocal = JSON.parse(localStorage.getItem('users')) || [];
    // Tìm kiếm tên đăng nhập + mật khẩu đã có trên local hay chưa?/ Hoặc so khớp dữ liệu có được không?
    let findUser = userLocal.find((users) => users.username == signinusername && users.password == signinpassword)   
    console.log(findUser);
    // Nếu có => Thông báo đăng nhập thành công và chuyển hướng về trang chủ + (Bỏ nút sign in - sign up => Thay bằng sign out + Chào mừng ${username})
    if(findUser) {
        alert('Đăng nhập thành công!');
        localStorage.setItem("loggedInUser", JSON.stringify(findUser));
        window.location.href = 'signout.html';

    }
    // Nếu tên đăng nhập hoặc mật khẩu không trùng khớp => Notice Sai tên đăng nhập hoặc mật khẩu
    else {
        document.getElementById('signinnotice').style.display = 'block';
        signinnotice.innerHTML = 'Sai tên đăng nhập hoặc mật khẩu';
        return;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let welcomeMessage = document.getElementById("welcomeMessage");
    let signOutBtn = document.getElementById("signout");

    if (loggedInUser) {
        welcomeMessage.innerText = `Chào mừng, ${loggedInUser.username}!`;
        document.getElementById("welcomeMessage").style.color ='grey';
        document.getElementById("welcomeMessage").style.fontStyle = 'italic';
        signOutBtn.style.display = "block";
    }
});

document.getElementById("signout").addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
});