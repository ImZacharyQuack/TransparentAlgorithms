"use client";

import React, { useState } from "react";

import "./App.css";

const initialArray = [
  [0, 5, 0, 9, 0, 0, 0, 0, 0],
  [8, 0, 0, 0, 4, 0, 3, 0, 7],
  [0, 0, 0, 2, 8, 0, 1, 9, 0],
  [5, 3, 8, 6, 0, 7, 9, 4, 0],
  [0, 2, 0, 3, 0, 1, 0, 0, 0],
  [1, 0, 9, 8, 0, 4, 6, 2, 3],
  [9, 0, 7, 4, 0, 0, 0, 0, 0],
  [0, 4, 5, 0, 0, 0, 2, 0, 9],
  [0, 0, 0, 0, 3, 0, 0, 7, 0]
];
const startBoard = [
  [0, 5, 0, 9, 0, 0, 0, 0, 0],
  [8, 0, 0, 0, 4, 0, 3, 0, 7],
  [0, 0, 0, 2, 8, 0, 1, 9, 0],
  [5, 3, 8, 6, 0, 7, 9, 4, 0],
  [0, 2, 0, 3, 0, 1, 0, 0, 0],
  [1, 0, 9, 8, 0, 4, 6, 2, 3],
  [9, 0, 7, 4, 0, 0, 0, 0, 0],
  [0, 4, 5, 0, 0, 0, 2, 0, 9],
  [0, 0, 0, 0, 3, 0, 0, 7, 0]
];
var tempArray = initialArray;

const rowList = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const columnList = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const App = () => {

  var waitTime = 250;

  const [sudokuArr, setSudokuArray] = useState(getDeepCopy(initialArray));
  const [toggleText, textToggleState] = useState(true);

  const [arrowNumber, setArrowNumber] = useState(20);

  const [forLoopOne, setForLoopOne] = useState(0);
  const [forLoopTwo, setForLoopTwo] = useState(0);
  const [forLoopThree, setForLoopThree] = useState(0);
  const [forLoopFour, setForLoopFour] = useState(0);
  const [forLoopFive, setForLoopFive] = useState(0);
  const [forLoopSix, setForLoopSix] = useState(0);
  const [forLoopSeven, setForLoopSeven] = useState(0);

  var [posX, setPosX] = useState(0);
  var [posY, setPosY] = useState(0);

  function getDeepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

  function onInputChange(e, row, col) {
    var val = parseInt(e.target.value) || 0, grid = getDeepCopy(sudokuArr);
    if ((val === 0 || val >= 1) && val <= 9) grid[row][col] = val;
    setSudokuArray(grid);
  }
 

  /* BACKTRACKING ALGORITHM */
  async function findEmpty(board) {
    setArrowNumber(0);
    await new Promise(resolve => setTimeout(resolve, waitTime));

    for (var x=0; x < board.length; x++) {
      setArrowNumber(1);
      setForLoopOne(x);
      await new Promise(resolve => setTimeout(resolve, waitTime));

      for (var y=0; y < board[0].length; y++) {
        setArrowNumber(2);
        setForLoopTwo(y);
        await new Promise(resolve => setTimeout(resolve, waitTime));

        if (board[x][y] === 0) {
          setArrowNumber(3);
          await new Promise(resolve => setTimeout(resolve, waitTime));

          setArrowNumber(4);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          return [x, y];
          
        }
      }
    }
  
    setArrowNumber(5);
    await new Promise(resolve => setTimeout(resolve, waitTime));
    return false;
    
  }
  
  
  async function valid(board, num, pos) {
    setArrowNumber(6);
    await new Promise(resolve => setTimeout(resolve, waitTime));
  
    // check row
    for (var x=0; x < board[0].length; x++) {
      setArrowNumber(7);
      setForLoopThree(x);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      if (board[pos[0]][x] === num && pos[1] !== x) {
        setArrowNumber(8);
        await new Promise(resolve => setTimeout(resolve, waitTime));

        setArrowNumber(9);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        return false;
      }
    }
  
    // check col
    for (var y=0; y < board.length; y++) {
      setArrowNumber(10);
      setForLoopFour(y);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      if (board[y][pos[1]] === num && pos[0] !== y) {
        setArrowNumber(11);
        await new Promise(resolve => setTimeout(resolve, waitTime));

        setArrowNumber(12);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        return false;
      }
    }
  
    // check boxes
    var box_x = Math.floor(pos[1] / 3);
    setArrowNumber(13);
    await new Promise(resolve => setTimeout(resolve, waitTime));
    var box_y = Math.floor(pos[0] / 3);
    setArrowNumber(14);
    await new Promise(resolve => setTimeout(resolve, waitTime));
  
    for (var i=box_y*3; i < box_y*3+3; i++) {
      setArrowNumber(15);
      setForLoopFive(i);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      for (var j=box_x*3; j < box_x*3+3; j++) {
        setArrowNumber(16);
        setForLoopSix(j);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        if (board[i][j] === num && (i, j) !== pos) {
          setArrowNumber(17);
          await new Promise(resolve => setTimeout(resolve, waitTime));

          setArrowNumber(18);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          return false;
        }
      }
    }
  
    setArrowNumber(19);
    await new Promise(resolve => setTimeout(resolve, waitTime));
    return true;
  
  }
  
  async function solve() {
    var board = sudokuArr;
    setArrowNumber(20);
    await new Promise(resolve => setTimeout(resolve, waitTime));
  
    var findEmptySpot = await findEmpty(board);
    setArrowNumber(21);
    await new Promise(resolve => setTimeout(resolve, waitTime));
  
    if (!findEmptySpot) {
      setArrowNumber(22);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      
      setArrowNumber(23);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return true;

    } else {
      var [row, col] = findEmptySpot;
      setArrowNumber(25);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }

  
    for (var i=1; i < 10; i++) {
      setArrowNumber(26);
      setForLoopSeven(i);
      setPosX(row); setPosY(col);
      tempArray[row][col] = i;
      setSudokuArray(tempArray);
      await new Promise(resolve => setTimeout(resolve, waitTime));

      if (await valid(board, i, [row, col])) {
        setArrowNumber(27);
        await new Promise(resolve => setTimeout(resolve, waitTime));
  
        board[row][col] = i;
        setArrowNumber(28);
        await new Promise(resolve => setTimeout(resolve, waitTime));
  
        if (await solve(board)) {
          setArrowNumber(29);
          await new Promise(resolve => setTimeout(resolve, waitTime));

          setArrowNumber(30);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          return true;
        }
  
        board[row][col] = 0;
        setArrowNumber(31);
        await new Promise(resolve => setTimeout(resolve, waitTime));
  
      }
      tempArray[row][col] = 0;
    }

    setArrowNumber(32);
    await new Promise(resolve => setTimeout(resolve, waitTime));
    return false;
    
  }


  return (
    <div class="app">
      <div class="app-header">
        <h3>Soduku Solver</h3>

        <table>
          <tbody>
            {
              rowList.map((row, rIndex) => {
                return <tr key={rIndex} class={(row+1) % 3 === 0 ? "tableRow" : ""}>
                  {columnList.map((col, cIndex) => {
                    return <td key={rIndex + cIndex} class={(col+1) % 3 === 0 ? "tableCol" : ""}>
                      <input onChange={(e) => onInputChange(e, row, col)} value={sudokuArr[row][col] === 0 ? '' : sudokuArr[row][col]} 
                      class={posX === row && posY === col ? "square active-input" : "square"} id={startBoard[row][col] === 0 ? '' : 'bold'} disabled='true'></input>
                    </td>
                  })}
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
      
      {/* DESCRIPTION */}
      <div class={!toggleText ? "app-body d-none" : "app-body d-block"}>

        <h3>Algorithm</h3>

        <div class="description">
          <p>The first approach would be the "naive" algorithm, this would be the way others would take if they didn't know about "backtracking".</p>

          <p>The common way you may try to approach it, is to try every single combination of numbers in each square for the board 
            & generate every single combination possible until you get the correct one.</p>

          <p>The issue with this is that it is very slow. The amount of differnet combinations does differ but you square 9 by the amount of blank squares
            on the board. e.g. a board with 45 blank squares will be 9^45, which is a huge number. 
            It equals to 8,727,963,568,087,712,000,000,000,000,000,000,000,000,000 different combinations.</p>


          <p>This approach uses "backtracking" instead. This starts out the same as the "naive"
            algorithm by first picking an empty spot. Then will try all numbers in that spot until we find one that works, once that happens we will move onto the 
            next square in the line & repeat until the end of the line.</p>
          <p>Once at the end of the line & you haven't found the correct solution, you "backtrack"; you go back to the previous number & go up from there, if you don't
            find the solution then, you "backtrack" again & count again. You repeat you this step until you find all the correct numbers for the line.</p>

          <button className="button" onClick={() => {textToggleState(!toggleText); solve();}}>Start</button>

        </div>

      </div>

      {/* CODE */}
      <div class={!toggleText ? "code-body d-block" : "code-body d-none"}>

        <h3>Psuedo Code</h3>

        <div class="code-block d-flex">
          <div class="left d-flex">
            <div class="code-find-empty">
              <pre>
                <span class={arrowNumber===0 ? "active" : "not-active"}>&#8594;</span>findEmpty (board):<br></br>
                <span class={arrowNumber===1 ? "active" : "not-active"}>&#8594;</span>   for x in range(len(board)): [count: {forLoopOne+1}/9]<br></br>
                <span class={arrowNumber===2 ? "active" : "not-active"}>&#8594;</span>       for y in range(len(board[0])): [count: {forLoopTwo+1}/9]<br></br>
                <span class={arrowNumber===3 ? "active" : "not-active"}>&#8594;</span>           if board[x][y] == 0:<br></br>
                <span class={arrowNumber===4 ? "active" : "not-active"}>&#8594;</span>               return (x, y)<br></br><br></br>
                <span class={arrowNumber===5 ? "active" : "not-active"}>&#8594;</span>   return false<br></br>
              </pre>
            </div>
              
            <div class="code-valid">
              <pre>
                <span class={arrowNumber===6 ? "active" : "not-active"}>&#8594;</span>valid (board, num, pos):<br></br>
                <span class={arrowNumber===7 ? "active" : "not-active"}>&#8594;</span>   for x in range(len(board[0])): [count: {forLoopThree+1}/9]<br></br>
                <span class={arrowNumber===8 ? "active" : "not-active"}>&#8594;</span>       if board[pos[0]][x] == num and pos[1] != x:<br></br>
                <span class={arrowNumber===9 ? "active" : "not-active"}>&#8594;</span>           return false<br></br><br></br>
                <span class={arrowNumber===10 ? "active" : "not-active"}>&#8594;</span>   for y in range(len(board)): [count: {forLoopFour+1}/9]<br></br>
                <span class={arrowNumber===11 ? "active" : "not-active"}>&#8594;</span>       if board[y][pos[1]] == num and pos[1] != y:<br></br>
                <span class={arrowNumber===12 ? "active" : "not-active"}>&#8594;</span>           return false<br></br><br></br>
                <span class={arrowNumber===13 ? "active" : "not-active"}>&#8594;</span>   box_x = pos[1] / 3<br></br>
                <span class={arrowNumber===14 ? "active" : "not-active"}>&#8594;</span>   box_y = pos[0] / 3<br></br><br></br>
                <span class={arrowNumber===15 ? "active" : "not-active"}>&#8594;</span>   for x in range(box_y*3, box_y*3 + 3): [count: {forLoopFive+1}/3]<br></br>
                <span class={arrowNumber===16 ? "active" : "not-active"}>&#8594;</span>       for y in range(box_x * 3, box_x*3 + 3): [count: {forLoopSix+1}/9]<br></br>
                <span class={arrowNumber===17 ? "active" : "not-active"}>&#8594;</span>           if bo[x][y] == num and (x, y) != pos:<br></br>
                <span class={arrowNumber===18 ? "active" : "not-active"}>&#8594;</span>               return false<br></br><br></br>
                <span class={arrowNumber===19 ? "active" : "not-active"}>&#8594;</span>   return true<br></br>
              </pre>
            </div>
          </div>

          <div class="code-solve">
            <pre>
              <span class={arrowNumber===20 ? "active" : "not-active"}>&#8594;</span>solve (board):<br></br>
              <span class={arrowNumber===21 ? "active" : "not-active"}>&#8594;</span>   find = findEmpty(board)<br></br><br></br>
              <span class={arrowNumber===22 ? "active" : "not-active"}>&#8594;</span>   if not find:<br></br>
              <span class={arrowNumber===23 ? "active" : "not-active"}>&#8594;</span>     return true<br></br>
              <span class={arrowNumber===24 ? "active" : "not-active"}>&#8594;</span>   else:<br></br>
              <span class={arrowNumber===25 ? "active" : "not-active"}>&#8594;</span>       row, col = find<br></br><br></br>
              <span class={arrowNumber===26 ? "active" : "not-active"}>&#8594;</span>   for i in range(1,10): [count: {forLoopSeven}/9]<br></br>
              <span class={arrowNumber===27 ? "active" : "not-active"}>&#8594;</span>       if valid(board, i, (row, col)):<br></br><br></br>
              <span class={arrowNumber===28 ? "active" : "not-active"}>&#8594;</span>           board[row][col] = i<br></br><br></br>
              <span class={arrowNumber===29 ? "active" : "not-active"}>&#8594;</span>           if solve(board):<br></br>
              <span class={arrowNumber===30 ? "active" : "not-active"}>&#8594;</span>               return true<br></br><br></br>
              <span class={arrowNumber===31 ? "active" : "not-active"}>&#8594;</span>           board[row][col] = 0<br></br><br></br>
              <span class={arrowNumber===32 ? "active" : "not-active"}>&#8594;</span>   return false<br></br>

            </pre>
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;
