/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 const WIDTH = 7;
 const HEIGHT = 6;
 let isGameInprocess = true;

 let currPlayer = 1; // active player: 1 or 2
 let board = []; // array of rows, each row is array of cells  (board[y][x])

 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */

 function makeBoard() {
   // TODO: set "board" to empty HEIGHT x WIDTH matrix array
   for (let i = 0 ; i <= HEIGHT; i++){
     board[i]=[];

     for (let j = 0 ; j <= WIDTH; j++ ){
       board[i][j]=null;
      }
   }

 }

 /** makeHtmlBoard: make HTML table and row of column tops. */

 function makeHtmlBoard() {
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
   const htmlBoard = document.querySelector("#board");

   /**creat row of column tops where you cilck a piece will drop down
   * set each cell id "x" treat as clicked item number
   */
   let top = document.createElement("tr");
   top.setAttribute("id", "column-top");
   top.addEventListener("click", handleClick);

   for (let x = 0; x < WIDTH; x++) {
     let headCell = document.createElement("td");
     headCell.setAttribute("id", x);
     top.append(headCell);
   }
   htmlBoard.append(top);

   // setup each cell in the board table, set id "y-x" corresponds to the index of board array
   for (let y = 0; y < HEIGHT; y++) {
     const row = document.createElement("tr");
     for (let x = 0; x < WIDTH; x++) {
       const cell = document.createElement("td");
       cell.setAttribute("id", `${y}-${x}`);
       row.append(cell);
     }
     htmlBoard.append(row);
   }
 }

 /** findSpotForCol: given column x, return top empty y (null if filled) */

 function findSpotForCol(x) {
   // TODO: write the real version of this, rather than always returning 0
   for(let y = HEIGHT-1 ; y >= 0 ; y-- ){
     if(board[y][x] == null){
       return y;
     }
   }
   return null;
 }

 /** placeInTable: update DOM to place piece into HTML table of board
 *if the game end, it will not run
 */
 function placeInTable(y, x) {


  // make a div and insert into correct table cell
   const piece = document.createElement("div");
   piece.classList.add("piece");
   piece.classList.add(`Player${currPlayer}`);

   const point = document.getElementById(`${y}-${x}`);
   point.append(piece);



 }

 /** endGame: announce game end */

 function endGame(msg) {
  isGameInprocess = false;
   // TODO: pop up alert message
   setTimeout(function(){alert(msg)},500);


 }

 /** handleClick: handle click of column top to play piece */

 function handleClick(evt) {
  if(!isGameInprocess){
    return;
  }
   // get x from ID of clicked cell
   let x = +evt.target.id;

   // get next spot in column (if none, ignore click)
   let y = findSpotForCol(x);
   if (y === null) {
     return;
   }

   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board
   board[y][x] = currPlayer;
   placeInTable(y, x);

   // check for win
   if (checkForWin()) {

     endGame(`Player ${currPlayer} won!`)
     return;
   }

   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame
   if (board.every(row => row.every(cell => cell))){
     endGame("The game is tied! Play again!")

     return;
   }


   // switch players
   // TODO: switch currPlayer 1 <-> 2
   currPlayer = currPlayer === 1 ? 2:1;
 }

 /** checkForWin: check board cell-by-cell for "does a win start here?" */

 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer

     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }

   /* check four-in-a-row rules (horiz, vert, or diag)
   *Starting from [0,0] dimension and check whether it is condition of winning
   */

   for (let y = 0; y < HEIGHT; y++) {
     for (let x = 0; x < WIDTH; x++) {
       let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;
       }
     }
   }
 }

 makeBoard();
 makeHtmlBoard();
