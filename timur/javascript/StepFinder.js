/**
 * Created with JetBrains PhpStorm.
 * User: timur
 * Date: 6/6/13
 * Time: 5:42 PM
 * To change this template use File | Settings | File Templates.
 */
window.PegGame = window.PegGame || {};
(function(PG){
    var StepFinder = {
        find: function(board, emptyPoint, parentStep){
            var steps = [];
            steps.sucessSteps = [];
            var emptyX = emptyPoint.positionX;
            var emptyY = emptyPoint.positionY;

            //Check that the peg can do step
            //Firs we check the peg that should jump
            if(board.board[emptyX + 2] && board.board[emptyX + 2][emptyY] && board.board[emptyX + 2][emptyY].filled){
                //then we check the peg that will be removed
                if(board.board[emptyX + 1] && board.board[emptyX + 1][emptyY] && board.board[emptyX + 1][emptyY].filled){
//                    console.log(1);
                    var step = new PG.Step(board, board.board[emptyX + 2][emptyY], board.board[emptyX + 1][emptyY], emptyPoint);
                    if(parentStep){
                        step.parentStep = parentStep;
                    }
                    steps.push(step);
                    if(step.success){
                        steps.sucessSteps.push(step);
                    }
                }
            }

            if(board.board[emptyX] && board.board[emptyX][emptyY + 2] && board.board[emptyX][emptyY + 2].filled){
                if(board.board[emptyX] && board.board[emptyX][emptyY + 1] && board.board[emptyX][emptyY + 1].filled){
//                    console.log(2);
                    var step = new PG.Step(board, board.board[emptyX][emptyY + 2], board.board[emptyX][emptyY + 1], emptyPoint);
                    if(parentStep){
                        step.parentStep = parentStep;
                    }
                    steps.push(step);
                    if(step.success){
                        steps.sucessSteps.push(step);
                    }
                }
            }

            if(board.board[emptyX - 2] && board.board[emptyX - 2][emptyY] && board.board[emptyX - 2][emptyY].filled){
                if(board.board[emptyX - 1] && board.board[emptyX - 1][emptyY] && board.board[emptyX - 1][emptyY].filled){
//                    console.log(3);
                    var step = new PG.Step(board, board.board[emptyX - 2][emptyY], board.board[emptyX - 1][emptyY], emptyPoint);
                    if(parentStep){
                        step.parentStep = parentStep;
                    }
                    steps.push(step);
                    if(step.success){
                        steps.sucessSteps.push(step);
                    }
                }
            }

            if(board.board[emptyX] && board.board[emptyX][emptyY - 2] && board.board[emptyX][emptyY - 2].filled){
                if(board.board[emptyX] && board.board[emptyX][emptyY - 1] && board.board[emptyX][emptyY - 1].filled){
//                    console.log(4);
                    var step = new PG.Step(board, board.board[emptyX][emptyY - 2], board.board[emptyX][emptyY - 1], emptyPoint);
                    if(parentStep){
                        step.parentStep = parentStep;
                    }
                    steps.push(step);
                    if(step.success){
                        steps.sucessSteps.push(step);
                    }


                }
            }

            if(board.board[emptyX + 2] && board.board[emptyX + 2][emptyY + 2] && board.board[emptyX + 2][emptyY + 2].filled){
                //then we check the peg that will be removed
                if(board.board[emptyX + 1] && board.board[emptyX + 1][emptyY + 1] && board.board[emptyX + 1][emptyY + 1].filled){
//                    console.log(5);
                    var step = new PG.Step(board, board.board[emptyX + 2][emptyY + 2], board.board[emptyX + 1][emptyY + 1], emptyPoint);
                    if(parentStep){
                        step.parentStep = parentStep;
                    }
                    steps.push(step);
                    if(step.success){
                        steps.sucessSteps.push(step);
                    }
                }
            }

            if(board.board[emptyX - 2] && board.board[emptyX - 2][emptyY - 2] && board.board[emptyX - 2][emptyY - 2].filled){
                //then we check the peg that will be removed
                if(board.board[emptyX - 1] && board.board[emptyX - 1][emptyY - 1] && board.board[emptyX - 1][emptyY - 1].filled){
//                    console.log(6);
                    var step = new PG.Step(board, board.board[emptyX - 2][emptyY - 2], board.board[emptyX - 1][emptyY - 1], emptyPoint);
                    if(parentStep){
                        step.parentStep = parentStep;
                    }
                    steps.push(step);
                    if(step.success){
                        steps.sucessSteps.push(step);
                    }
                }
            }

            return steps;
        }
    }

    PG.StepFinder = StepFinder;
})(PegGame)
