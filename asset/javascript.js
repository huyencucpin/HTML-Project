function showForm(formId) {
    document.getElementById("signupform").style.display = "none";
    document.getElementById("signinform").style.display = "none";
    document.getElementById(formId).style.display = 'block';
    document.getElementById("home").style.display = "none"; 
    document.getElementById("result").style.display = "none"; 
}

function closeForm(formId) {
    document.getElementById(formId).style.display = "none";
    document.getElementById("home").style.display = "block"; 
}

function isValidEmail(signupemail) {
    let signupemailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return signupemailPattern.test(signupemail); 
}
function kiemTraEmail() {
    let email = document.getElementById("signupemail").value;
    let result = document.getElementById("result");
    if (!isValidEmail(email)) {
        result.innerHTML = "❌ Email không hợp lệ!";
        result.style.color = "red";
        document.getElementById("result").style.display = "block";
        submitbutton.disabled = true;
    }
    else {
        document.getElementById("result").style.display = "none";
    }
}

function kiemTraPassword(){
    let password = document.getElementById("signuppassword").value;
    let cfpassword = document.getElementById("cfpassword").value;
    let pass = document.getElementById("pass");

    if (password !== cfpassword) {
    document.getElementById("pass").style.display = "block";
    pass.innerHTML = "Mật khẩu không trùng khớp";
    pass.style.color = "red";
    return;
    }
    else {
        document.getElementById("pass").style.display = "none";
    }
}

function kiemTraCheckbox() {
    let checkbox = document.getElementById("confirm");
    let submitbutton = document.getElementById("submitbutton");
    let notice = document.getElementById('notice')

    document.getElementById("notice").style.display = "block";
    submitbutton.disabled = !checkbox.checked;
    if (submitbutton.disabled) {
    notice.innerHTML = "❌ Vui lòng điền thông tin hợp lệ!";
    notice.style.color = "red";
    return;
    }
}

function register() {
    let email = document.getElementById("signupemail").value;
    let username = document.getElementById("signupusername").value;
    let password = document.getElementById("signuppassword").value;
    let cfpassword = document.getElementById("cfpassword").value;
    let notice = document.getElementById("notice");
    let submitbutton = document.getElementById("submitbutton");

    if (!username || !password || !cfpassword || !email) {
        notice.innerHTML = "Vui lòng nhập đầy đủ thông tin";
        notice.style.color = "red";
        submitbutton.disabled = "true";
        return;
    }
    else {
        notice.innerHTML = "";
    }

    // if (email == user.email, username == user.username) {
    //     alert("Bạn đã có tài khoản? Đăng nhập ngay")
    //     showForm("signinform");
    //     document.getElementById("signinusername").value = username;
    // }
    // else {
    let user = {email: email, username: username, password: password}
    localStorage.setItem("user", JSON.stringify(user));
    alert("Đăng ký thành công");
    showForm("signinform");
    document.getElementById('signinform').style.display = 'block';
    document.getElementById("signinusername").value = username;
}

function login() {
    let username = document.getElementById('signinusername').value;
    let password = document.getElementById('signinpassword').value;
    let signinbutton = document.getElementById('signinbutton');
    let user = JSON.parse(localStorage.getItem("user"));

    if (!username || !password) {
        signinnotice.innerHTML = "Điền đầy đủ thông tin đăng nhập";
    }
    else {
        signinnotice.innerHTML = "";
    }

    if (!user) {
        signinnotice.innerHTML = "⚠ Chưa có tài khoản. Vui lòng đăng ký!";
        return;
    }

    if (username !== user.username || password !== user.password) {
        signinnotice.innerHTML = "Sai tên đăng nhập hoặc mật khẩu. Vui lòng thử lại";
        signinbutton.disabled = true;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInUser", user.username);
    alert(`Đăng nhập thành công! Chào mừng ${user.username}`);
    
    window.location.href = "HTML-Project/index.html";
}

document.addEventListener("DOMContentLoaded", function () {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    let username = localStorage.getItem("loggedInUser");
    // localStorage.setItem("isLoggedIn", "true");
    // localStorage.setItem("loggedInUser",username);

    if (isLoggedIn === "true" && username) {
        document.getElementById("signout").style.display = 'block';
        document.getElementById("signuptext").style.display = 'none';
        document.getElementById("signintext").style.display = 'none';
        document.getElementById("welcomeusername").style.display = 'block';
        welcomeusername.innerHTML = `Chào mừng, ${username}!`;
    }
    else {
        document.getElementById("signout").style.display = 'none';
        document.getElementById("signuptext").style.display = 'block';
        document.getElementById("signintext").style.display = 'block';
        document.getElementById("signinform").style.display = 'none';  // Quan trọng!
        document.getElementById("signupform").style.display = 'none';
    }
});

function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");

    alert("Bạn đã đăng xuất!");
    
    window.location.replace("D:/code/HTML/HTML-Project/index.html");
}

