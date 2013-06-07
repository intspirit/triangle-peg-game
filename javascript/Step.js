/**
 * Created with JetBrains PhpStorm.
 * User: timur
 * Date: 6/6/13
 * Time: 5:42 PM
 * To change this template use File | Settings | File Templates.
 */
window.PegGame = window.PegGame || {};
(function(PG){
    var Step = function(currBoard, jumpPeg, removedPeg, emptyPoint){
        this.parentStep = null;
        this.fromNum = null;
        this.toNum = null;
        this.childSteps = [];
        this.oldBoard = null;
        this.newBoard = null;
        this.success = false;
        this.init.apply(this, arguments);
    };

    Step.prototype = {
        init: function(currBoard, jumpPeg, removedPeg, targetEmptyPoint){
            this.fromNum = jumpPeg.num;
            this.toNum = targetEmptyPoint.num;
            this.oldBoard = currBoard;
            this.doStep(jumpPeg, removedPeg, targetEmptyPoint);
        },

        doStep: function(jumpPeg, removedPeg, targetEmptyPoint){
            var newEmptyNums = [];

            for(var i = 0; i < this.oldBoard.emptyPoints.length; i++){
                if(targetEmptyPoint.num != this.oldBoard.emptyPoints[i].num){
                    newEmptyNums.push(this.oldBoard.emptyPoints[i].num);
                }
            }
            newEmptyNums.push(jumpPeg.num);
            newEmptyNums.push(removedPeg.num);
//            console.log(newEmptyNums);
            this.newBoard = new PG.Board(newEmptyNums);
            this.success = this.checkSuccess(newEmptyNums);


        },

        checkSuccess: function(emptyNums){
//            console.log(this.newBoard.numberOfWholes);
            return emptyNums.length == this.newBoard.numberOfWholes -1;
        }
    }

    PG.Step = Step;
})(PegGame)

