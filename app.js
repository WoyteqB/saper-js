const gameStart = document.querySelector(".game-start");
const gamePlayground = document.querySelector(".game-board");

let playground;

let playgroundReset = () => {
    playground = {
        rows: 0,
        columns: 0,
        values: []
    }
}

gameStart.addEventListener("click", ()=>{
    gameInit(10,10);
    fieldGenerator(playground);
})

let FindIndexByPosition = (row, column) =>{
    return playground.values.findIndex( el => el.row === row && el.column === column);
}

let countNearBombs = (row, column) => {
    let count = 0;
    if(playground.values[FindIndexByPosition( row, column)].bomb === false ){
        let wynik = playground.values.filter(el => el.row >= row-1 && el.row <= row+1 && el.column >= column -1 && el.column <= column+1 && el.bomb === true);
        //console.log(wynik);
        //console.log("nie ma bomby")
        return wynik.length;
    }

}

let gameInit = (rows, columns) => {
    playgroundReset();
    playground.rows = rows;
    playground.columns = columns;
    

    for(let i = 0; i< rows; i++){
        for(let j = 0; j< columns; j++){
            playground.values.push({
                row: i,
                column: j,
                bombClose: 0,
                bomb :false,
                picked: false,
                locked: false
            })
        }
    }
    let level = (rows*columns)/5;

    for(let i = 0; i<= level; i++){
        let randomRow = Math.floor(Math.random()*rows);
        let randomColumn = Math.floor(Math.random()*columns);
        playground.values[FindIndexByPosition( randomRow, randomColumn)].bomb = true;
        //console.log("Losowanie: "+randomRow+ ", "+ randomColumn);
    }

    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            playground.values[FindIndexByPosition( i, j)].bombClose = countNearBombs(i,j)!==undefined?countNearBombs(i,j):"";
        }
    }


}

let youLose = (gameField) =>{
    gamePlayground.innerHTML ="";
    for(let i = 0; i< gameField.rows; i++){
        for(let j = 0; j< gameField.columns; j++){
            let buttonField = document.createElement("button");
            let currentField = playground.values[FindIndexByPosition( i, j)];
            //buttonField.className = i;
            if(currentField.locked === true){
                buttonField.className = "locked"            
            }else if(currentField.bomb === true && currentField.picked === true){
                buttonField.className = "clicked-bomb"
            }else if(currentField.picked === false){
                //buttonField.className = "no-clicked"
            }
            if(currentField.bomb === true){
                buttonField.innerHTML = `<i class="fa fa-bomb" aria-hidden="true"></i>`;            
            }else if(currentField.picked === true){
                buttonField.innerText = currentField.bombClose; 
                buttonField.className = "picked";
            }
            // if(currentField.bomb == true){
            //     buttonField.innerText="X"
            // }else{
            //     buttonField.innerText = currentField.bombClose;
            // }
            gamePlayground.appendChild(buttonField);
        }
    }
}

let fieldPrint = (gameField) => {
    gamePlayground.innerHTML ="";
    for(let i = 0; i< gameField.rows; i++){
        for(let j = 0; j< gameField.columns; j++){
            let buttonField = document.createElement("button");
            let currentField = playground.values[FindIndexByPosition( i, j)];
            buttonField.className = i;
            if(currentField.picked === false){
                if(currentField.locked === false){
                    buttonField.addEventListener("click", ()=> {
                        //console.log("clicked "+i+" "+j);
                        if(currentField.bomb === true){
                            currentField.picked = true;
                            youLose(gameField);
                        }else{
                            currentField.picked = true;
                            fieldPrint(gameField);
                        }
                    });
                }else{
                    buttonField.innerText = "?";
                    buttonField.className = "locked";
                }
                buttonField.addEventListener("mousedown", (e)=>{
                    if(e.button === 2){
                        currentField.locked = !currentField.locked;
                        fieldPrint(gameField);
                    };
                })
            }else{
                buttonField.innerText = currentField.bombClose?currentField.bombClose:"";
                buttonField.className = "picked";
            }
            // if(currentField.bomb == true){
            //     buttonField.innerText="X"
            // }else{
            //     buttonField.innerText = currentField.bombClose;
            // }
            gamePlayground.appendChild(buttonField);
        }
    }
}

let fieldGenerator = ( gameField) =>{
    let grid ="";
    for(let i = 0; i< gameField.columns-1;i++){
        grid = grid + "1fr "
    }
    grid = grid + "1fr"
    //console.log(grid);
    gamePlayground.style.gridTemplateColumns = grid;
    //console.log(gameField.rows + " " + gameField.columns);
    fieldPrint(gameField);
}

gameInit(10,10);
fieldGenerator(playground);

gamePlayground.addEventListener("contextmenu", function(e)
{
    e.preventDefault();
});