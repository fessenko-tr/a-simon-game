let isLost = false;
let score = 1;
let storage = [];
let userStorage = [];
let sounds;

function playd(str) {
    sounds = new Audio(`sounds/${str}.mp3`)
    $(`#${str}`).fadeOut(100).fadeIn(100);
    sounds.play();
}

function stageOver() {
    $("#level-title").text(`Level ${score}`);
    let ranNum = Math.floor(Math.random() * 4);
    storage.push(ranNum);
    switch (ranNum) {
        case 0:
            playd("green");

            break;
        case 1:
            playd("red");

            break;
        case 2:
            playd("yellow");

            break;
        case 3:
            playd("blue");
            break;
    }

}


$(".btn").click((e) => {
    if (!isLost) {
        if (e.target.id === "green") {
            playd(e.target.id);
            userStorage.push(0);
        } else if (e.target.id === "red") {
            playd(e.target.id);
            userStorage.push(1);
        } else if (e.target.id === "yellow") {
            playd(e.target.id);
            userStorage.push(2);
        } else if (e.target.id === "blue") {
            playd(e.target.id);
            userStorage.push(3);
        }

        checker();

    }

})

function checker() {
    for (let i = 0; i < userStorage.length; i++) {
        if (userStorage[i] !== storage[i]) {
            sounds = new Audio("sounds/wrong.mp3")
            $("body").css("backgroundColor", "red");
            sounds.play();
            isLost = true;
            score = 1;
            $("#level-title").text(`You've just lost!~ press smth to try again `);
            setTimeout(() => {
                $("body").css("backgroundColor", "#011F3F");
            }, 200);
            break;
        }

    }
    if (userStorage.length === storage.length) {
        score++;
        setTimeout(() => {
            stageOver();
            userStorage = [];
        }, 900);

    }

}

$(document).on("keypress", () => {
    if (!isLost && storage.length === 0) {
        stageOver();
    } else if (isLost) {
        userStorage = [];
        storage = [];
        isLost = false;
        stageOver();
    }
})