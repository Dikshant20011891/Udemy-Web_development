var a = Math.floor(Math.random()*6) + 1;
var b = Math.floor(Math.random()*6) + 1;

var s1 = "images/dice"+ a + ".png";
var s2 = "images/dice"+ b + ".png";

document.querySelector(".img1").setAttribute("src",s1);
document.querySelector(".img2").setAttribute("src",s2);

if(a>b){
    document.querySelector("h1").innerHTML = "🚩 Player 1 Wins !"; 
}
else if(b > a){
    document.querySelector("h1").innerHTML = "🚩 Player 2 Wins !";
}
else{
    document.querySelector("h1").innerHTML = "Draw !";
}