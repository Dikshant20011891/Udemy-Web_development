// Detecting button press 
var a = document.querySelectorAll("button");

for (var i = 0; i < a.length; i++) {
    document.querySelectorAll(".drum")[i].addEventListener('click', function () {
        // console.log(this.innerHTML);
        makesound(this.innerHTML);
        showAnimation(this.innerHTML);
    })
}

// Detecting keyboard press
document.addEventListener("keydown",function (event){
    //console.log(event);

    makesound(event.key);
    showAnimation(event.key);
})

// Play Sound
function makesound(key){
    let p;
    switch (key) {
        case "w":
            p = new Audio("sounds/tom-1.mp3");
            p.play();
            break;
        case "a":
            p = new Audio("sounds/tom-2.mp3");
            p.play();
            break;
        case "s":
            p = new Audio("sounds/tom-3.mp3");
            p.play();
            break;
        case "d":
            p = new Audio("sounds/tom-4.mp3");
            p.play();
            break;
        case "j":
            p = new Audio("sounds/kick-bass.mp3");
            p.play();
            break;
        case "k":
            p = new Audio("sounds/crash.mp3");
            p.play();
            break;
        case "l":
            p = new Audio("sounds/snare.mp3");
            p.play();
            break;

        default:
            console.log(this.innerHTML);
            break;
    }
}

function showAnimation(key){
    var k = document.querySelector("." + key);

    k.classList.add("pressed");

    setTimeout(function() {
        k.classList.remove("pressed");
    },100);
}