/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});
  for (var i = 0; i < n; i++) {
    solution.togglePiece(i, i);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution;
  if (n === 1) {
    solution = 1;
  } else {
    solution = n * countNRooksSolutions(n - 1);
  }
  console.log('Number of solutions for ' + n + ' rooks:', solution);
  return solution;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
// window.findNQueensSolution = function(n) {
//   if (n === 0) {
//     return ([]).push([]);
//   }
//   if (n === 2 || n === 3) {
//     return (new Board({n: n})).rows();
//   }
//   var solution = new Board({n: n});
//   for (var i = 0; i < n; i++) {
//     solution.togglePiece(i, i);
//   }
//   while (solution.hasAnyQueensConflicts()) {
//     var firstRandomIndex = Math.floor(Math.random() * n);
//     var secondRandomIndex = Math.floor(Math.random() * n);
//     var tempRow = solution.get(firstRandomIndex);
//     solution.set(firstRandomIndex, solution.get(secondRandomIndex));
//     solution.set(secondRandomIndex, tempRow);
//     // console.table(solution.rows());
//   }
//   // var helper = function(board, rowIndex) {

//   //   //Account for boards that are 2 or 3
//   //     //No viable solutions for n x n

//   //   for(var i = 0; i < 10; i++){}

//   // };


//   // helper();
//   // for (var i = 0; i < n; i++) {
//   //   solution.togglePiece(i, i);
//   // }

//   console.table(solution.rows());
//   return solution.rows();
// };

window.findNQueensSolution = function(n) {
  if (n === 2 || n === 3) {
    return (new Board({n: n})).rows();
  }
  var solution = new Board({n: n});
  var startIndex = 0;
  var x = 0;
  var y = 0;
  var issueStart;
  var conflictOccured = false;
  while (y < n) {
    // console.log(x, y);
    solution.togglePiece(y, x);

    //Case where we put a queen in a bad spot
    issueStart = x;
    while (solution.hasAnyQueensConflicts()) {
      conflictOccured = true;
      //Recognize where the issue occured
      
      //Immediately untoggle queen;
      solution.togglePiece(y, x);
      // console.table(solution.rows());
      //Shift right one
      x = (x + 1) % n;
      //Toggle queen we moved to
      solution.togglePiece(y, x);
      if (x === issueStart) {
        solution.togglePiece(y, x);
        y--;
        x = solution.rows()[y].indexOf(1);
        solution.togglePiece(y, x);
        x = (x + 1) % n;
      }

    }


    if (!conflictOccured) {
      y ++;
      x = (x + 2) % n;
    } else {
      conflictOccured = false;
    }
  }
  console.table(solution.rows());
  return solution.rows();
};



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  if (n === 2 || n === 3) {
    return 0;
  }
  var solutionSet = _.uniq(findAllNQueens(n));


  console.log('Number of solutions for ' + n + ' queens:', solutionSet.length);
  return solutionSet.length;
};
