const container = document.querySelector(".container");
const btnsignin = document.getElementById("btn-sign-in");
const btnsignup = document.getElementById("btn-sign-up");
const passwords = document.querySelectorAll(".password");
const icons = document.querySelectorAll(".eye-icon");

btnsignin.addEventListener("click", () => {
    container.classList.remove("toggle");
});

btnsignup.addEventListener("click", () => {
    container.classList.add("toggle");
});

icons.forEach((icon, index) => {
    icon.addEventListener("click", () => {
        if (passwords[index].type === "password") {
            passwords[index].type = "text";
            icon.name = "eye-outline";
        } else {
            passwords[index].type = "password";
            icon.name = "eye-off-outline";
        }
    });
});