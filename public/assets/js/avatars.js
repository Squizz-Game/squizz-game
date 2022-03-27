// const { Exception } = require("sass");

let avatars = [];
let selectAvatar = document.getElementById("btn_avatar");
let sectionAvatar = document.querySelector(".section_avatar");
let sectionForm = document.querySelector(".form_registration");
let images = document.querySelectorAll(".img_avatar");
let avatarPrincipal = document.querySelector("#avatar img");
let input = document.querySelector("#avatar input");

fetch("/api/avatars/")
  .then((res) => res.json())
  .then((res) => {
    avatars = res;
    selectAvatar.addEventListener("click", (e) => {
      e.preventDefault();
        sectionAvatar.classList.add("reveal_avatar")
        sectionForm.style = "display: none"
        images.forEach((image) => {
            image.addEventListener("click", () => {
                avatarPrincipal.src = image.src
                input.value = image.dataset.avatar
                sectionAvatar.classList.remove("reveal_avatar");
                sectionForm.style = "display: auto"
            })
        })
    });
  });
