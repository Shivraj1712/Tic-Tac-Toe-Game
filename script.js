// Including all html tags
let boxes = document.querySelectorAll(".box");
let resetbtn=document.querySelector("#resetbutton");
let newGameButton=document.querySelector("#newbutton");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let noResult=document.querySelector("#msg1");
msgcontainer.classList.remove("hide");
// Player O starts the game
let turnO=true;
msg.innerText="";
noResult.innerText="";
// Declaring the array of inclusion of all winning patterns
const winPattern=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Changes in boxes on clicking
boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText="O";
            turnO=false;
        }else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        checkWinner();
    });
});

// Enabling Boxes when Reset and New Game button is clicked
const enableboxes=() =>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};
// Disabling Boxes when Game has ended or box is click
const disableboxes=() =>{
    for(let box of boxes){
        box.disabled=true;
    }
};
// Enabling Reset Button
const resetGame = () => {
    turnO = true;
    enableboxes();
    msgcontainer.classList.add("hide");
    msg.innerText = "";
    noResult.innerText = "";
};

// Displayimg the Winner
const showWinner=(Winner)=>{
    msg.innerText=(`Congratulations , ${Winner} is the Winner`);
    msgcontainer.classList.remove("hide");
    disableboxes();
};
// Checking who is the Winner
const checkWinner = () => {
    let winnerFound = false;

    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if ((pos1Val !== "") && (pos2Val !== "") && (pos3Val !== "")) {
            if ((pos1Val === pos2Val) && (pos2Val === pos3Val)) {
                console.log("Winner", pos1Val);
                showWinner(pos1Val);
                winnerFound = true;
                return;
            }
        }
    }

    // Check for draw only if no winner found
    let isDraw = [...boxes].every(box => box.innerText !== "");
    if (!winnerFound && isDraw) {
        noResult.innerText = "No Winner! Start Again";
        msgcontainer.classList.remove("hide");
    }
};

// Adding Events for Reset Game Button and New Game Button
newGameButton.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);
// CODE ENDS