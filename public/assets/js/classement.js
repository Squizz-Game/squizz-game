// faire apparaitre l'overflow de l'username
const usernames = document.querySelector(".other_rank_name_player");
const ranking = document.querySelector(".ranking_table");

usernames.addEventListener("click", () => {
    if (usernames.style.overflow == "hidden") {
        usernames.style.overflow = "visible";
        ranking.style = "flex-wrap: wrap"
    } else {
        usernames.style.overflow = "hidden";
        ranking.style = "flex-wrap: nowrap"
    }
})