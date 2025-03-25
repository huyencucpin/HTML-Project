function showForm(formId) {
    document.getElementById("signupform").style.display = "none";
    document.getElementById("signinform").style.display = "none";
    document.getElementById("home").style.display = "none";
    document.getElementById(formId).style.display = 'block';
}

function closeForm(formId) {
    document.getElementById("signupform").style.display = "none";
    document.getElementById("signinform").style.display = "none";
    document.getElementById("home").style.display = 'block';
}
