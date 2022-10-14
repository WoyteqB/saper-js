const gameStart = document.querySelector(".game-start");
const gamePlayground = document.querySelector(".game-board");
const bombStay = document.querySelector(".bomb-stay span");

let playground;

let playgroundReset = () => {
    playground = {
        rows: 0,
        columns: 0,
        bombs: 0,
        win: false,
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


let findEmptyFields = (row, column) =>{
    let startElement = playground.values[FindIndexByPosition( row, column)];
    let emptyFields = [startElement];
    //startElement.picked = true;

    //emptyFields.forEach(el => playground.values[FindIndexByPosition( el.row, el.column)].picked = true)
    //console.log(emptyFields);
    console.log("Kliknieto w pole "+row+", "+column);
    if(playground.values[FindIndexByPosition( row, column)].bomb === false && playground.values[FindIndexByPosition( row, column)].bombClose === 0){
        emptyFields = findEmpty(emptyFields);
    }
    //emptyFields.forEach(el => playground.values[FindIndexByPosition( el.row, el.column)].picked = true);
    //console.log(emptyFields);
    //return emptyFields;


    // if(playground.values[FindIndexByPosition( row, column)].bomb === false && playground.values[FindIndexByPosition( row, column)].bombClose === 0){
    //     let wynik = playground.values.filter(el => el.row >= row-1 && el.row <= row+1 && el.column >= column -1 && el.column <= column+1);
    //     console.log("Lista pustych pol w sąsiectwie pustego pola "+row+", "+column);
    //     console.log(wynik);
    //     //wynik = wynik.concat(findEmpty(wynik));
    //     //console.log(wynik);
    //     //console.log("nie ma bomby")
    //     console.log("Lista pustych pol w sąsiectwie");
    //     console.log(wynik);
    //     return wynik;
    // }
}

let findEmpty = (list) =>{
    let newList = [];
    
    
    //console.log(newList.filter( el => el.picked === false).length);
    //console.log(newList);

    list.forEach(element => {
        element.picked =true;
        
        if(element.bombClose === 0){
            newList = newList.concat(playground.values.filter(el => el.row >= element.row-1 && el.row <= element.row+1 && el.column >= element.column -1 && el.column <= element.column+1));
            newList.forEach( el => el.bombClose !== 0?el.picked=true:el.bomb=true);
            //console.log(playground.values.filter(el => el.row >= element.row-1 && el.row <= element.row+1 && el.column >= element.column -1 && el.column <= element.column+1));
        }else{
            element.picked = true;
            console(element);
        }
        
    });
    console.log(newList);
    
    return newList;
    
}

let countCheckedBombs = () =>{
    //console.log(playground.bombs);
    return playground.values.filter(el => el.locked === true).length;
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
    playground.bombs = Math.floor((rows*columns)/10);
    bombStay.innerHTML = playground.bombs;

    for(let i = 0; i< playground.bombs; i++){
        let randomRow = Math.floor(Math.random()*rows);
        let randomColumn = Math.floor(Math.random()*columns);
        if(playground.values[FindIndexByPosition( randomRow, randomColumn)].bomb === true){
            i--;
        }else{
            playground.values[FindIndexByPosition( randomRow, randomColumn)].bomb = true;
            //console.log("Losowanie: "+randomRow+ ", "+ randomColumn);
        }
    }
    // playground.bombs = playground.values.filter(el => el.bomb === true).length;
    // bombStay.innerHTML = playground.bombs;
    
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            playground.values[FindIndexByPosition( i, j)].bombClose = countNearBombs(i,j)!==undefined?countNearBombs(i,j):"";
        }
    }


}
let youWon = (gameField) =>{
    let countPickedFields = playground.values.filter(el => el.picked === true).length;
    if(countPickedFields === (gameField.columns * gameField.rows) - gameField.bombs){
        gameField.win = true;
        console.log("Wygrałeś");
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
    bombStay.innerHTML = gameField.bombs - countCheckedBombs();
    youWon(gameField);
    for(let i = 0; i< gameField.rows; i++){
        for(let j = 0; j< gameField.columns; j++){
            let buttonField = document.createElement("button");
            let currentField = playground.values[FindIndexByPosition( i, j)];
            buttonField.className = i;
            if(currentField.picked === false){
                if(gameField.win === false){
                    if(currentField.locked === false){
                        buttonField.addEventListener("click", ()=> {
                            //console.log("clicked "+i+" "+j);
                            if(currentField.bomb === true){
                                currentField.picked = true;
                                youLose(gameField);
                            }else{
                                if(currentField.bombClose !== 0){ 
                                    currentField.picked = true;
                                }else{
                                    findEmptyFields(currentField.row, currentField.column);//.forEach(el => playground.values[FindIndexByPosition( el.row, el.column)].picked = true);
                                }
                                fieldPrint(gameField);
                            }
                        });
                    }else{
                        buttonField.innerText = "?";
                        buttonField.className = "locked";
                    }
                }
                if(gameField.win === false){
                    buttonField.addEventListener("mousedown", (e)=>{
                        if(e.button === 2){
                            if(currentField.locked === true){
                                currentField.locked = false;
                            }else if((gameField.bombs - countCheckedBombs())>=0 && currentField.locked === false){
                                currentField.locked = true;
                            }
                            
                            fieldPrint(gameField);
                        };
                    })
                }
            }else{
                buttonField.innerText = currentField.bombClose?currentField.bombClose:"";
                buttonField.className = "picked";
            }
            if(gameField.win===true && currentField.bomb === true){
                buttonField.innerHTML = `<i class="fa fa-bomb" aria-hidden="true"></i>`;
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

let arr1 = [
    {
        name: "Wojtek",
        age: 39
    },
    {
        name: "Jurek",
        age: 39
    },
    {
        name: "Marek",
        age: 38
    }
]
let arr = [];

arr = arr1.filter(el => el.age === 39);
arr[0].name = "Wojciech";

console.log(arr);
console.log(arr1);