const gameStart = document.querySelector(".game-start");
const gamePlayground = document.querySelector(".game-board");

let playground = {
    rows: 0,
    columns: 0,
    values: []
}
let field = {
    row: 0,
    column: 0,
    bomb :false,
    picked: false
}

let FindIndexByPosition = (row, column) =>{
    return playground.values.findIndex( el => el.row === row && el.column === column);
}

let countNearBombs = (row, column) => {
    let count = 0;
    if(playground.values[FindIndexByPosition( row, column)].bomb === false ){
    }
}

let gameInit = (rows, columns) => {
    playground.rows = rows;
    playground.columns = columns;

    for(let i = 0; i< rows; i++){
        for(let j = 0; j< columns; j++){
            playground.values.push({
                row: i,
                column: j,
                bombClose: 0,
                bomb :false,
                picked: false
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


}

let fieldGenerator = ( gameField) =>{
    gamePlayground.innerHTML ="";
    console.log(gameField.rows + " " + gameField.columns);
    for(let i = 0; i< gameField.rows; i++){
        for(let j = 0; j< gameField.columns; j++){
            let buttonField = document.createElement("button");
            buttonField.className = i;
            buttonField.addEventListener("click", ()=> console.log("clicked "+i+" "+j))
            if(playground.values[FindIndexByPosition( i, j)].bomb == true){
                buttonField.innerText="X"
            }
            gamePlayground.appendChild(buttonField);
        }
    }
}

gameInit(10,10);
fieldGenerator(playground);