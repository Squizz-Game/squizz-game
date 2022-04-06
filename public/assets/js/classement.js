// faire apparaitre l'overflow de l'username
const usernames = document.querySelectorAll(".other_rank_name_player");
const ranking = document.querySelectorAll(".ranking_table");

usernames.forEach((username, i) => {
  username.addEventListener("click", () => {
    if (username.style.overflow == "hidden") {
      username.style.overflow = "visible";
      ranking[i].style = "flex-wrap: wrap";
    } else {
      username.style.overflow = "hidden";
      ranking[i].style = "flex-wrap: nowrap";
    }
  });
});


