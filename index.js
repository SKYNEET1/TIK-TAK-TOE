const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game_info");
const newGameBtn = document.querySelector(".btn");
let curentPlayer ;
let gameGrid;
const winningPositi0n = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
// creating a function to initiaise the game

function initGame(){
    curentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // clear in UI
    boxes.forEach((box,index)=> {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all"
        // one more is missing  after seeing its a win then renove the green color so initialize the css again.
        box.classList = `box box${index+1}`
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${curentPlayer}`;
}
initGame();

function swapTurn(){
    if(curentPlayer == "X"){
        curentPlayer = "O";
    }
    else{
        curentPlayer = "X";
    }
    // UI UPDATE
    gameInfo.innerText = `Curent Player - ${curentPlayer}`;
}

function checkGameOver(){
    let answwer = "";
    // all three boxes should not be empty and should contain same value.
    winningPositi0n.forEach((position) => {
        if((gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="") &&
    (gameGrid[position[0]] == gameGrid[position[1]] ) && (gameGrid[position[1]] == gameGrid[position[2]] )){

        //  check winner is X 
        if(gameGrid[position[0]] == "X")
            answwer = "X";
            
        
            else
             answwer = "O";

            //  after win dissabe the cursir pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
                
            // now we have winner so just color it green
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            
        }
    
    });
    
    if(answwer !== "")
    {
        gameInfo.innerText = `Winner Player - ${answwer}`;
        newGameBtn.classList.add("active");
        return;
    }
// to check its tye or not by seeing the fillcount is 9 or not.
    let fillcount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillcount++;
    });

    if(fillcount === 9)      {
        gameInfo.innerText = `It's a Tie`;
        newGameBtn.classList.add("active");
    }

}


function handleClick(index){
    if(gameGrid[index]==""){
        boxes[index].innerText = curentPlayer;
        // this  wil show in UI
        gameGrid[index] = curentPlayer;
        // this  will update the game grid

        boxes[index].style.pointerEvents = "none";
        // this means afer putting x or o the cursor pinter will be none

        swapTurn();
        // this function is for  switching the player

        checkGameOver();
        // this function is for checking the game over or not

            }
}
    



boxes.forEach((box,index) => {

    // this loop will go to each of the box and check  if it has a click event listener

    box.addEventListener("click", () => {
        handleClick(index);

        // handle click is the fnction use to retrn the index where  the player clicked


        // HERE WE HAVE USED INDEX INSTED OF .TARGET BECAUSE GAME GRID IS AN ARRAY AND THROUGH  INDEX WE CAN ACCESS THE ARRAY ELEMENTS
        // AND IF WE USE .EVENT PROPERTY THEN IT WOULD  RETURN THE HTML ELEMENT WHICH IS THE BOX IN THIS CASE AND WE HAVE TO ACCESS THE INDEX BY USING =

        // box.addEventListener("click", (event) => {
        //     const clickedBox = event.target;
        //     const boxIndex = Array.from(boxes).indexOf(clickedBox);
        //     handleClick(boxIndex);
        // });
        
})
});

newGameBtn.addEventListener('click',initGame);
// this is for the new game button if you click the new game button then it will call  the initGame function and it will start the game from the beginning
