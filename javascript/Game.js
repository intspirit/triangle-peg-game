window.PegGame = window.PegGame || {};
(function(PG){

    var Game = function(wholeNumbers){
        this.initialSteps = [];
        this.successFound = false;
        this.successSteps = [];
        this.board = null;
        this.init.apply(this, arguments);
    }

    Game.prototype = {
        init: function(wholeNumbers){
            this.board = new PG.Board(wholeNumbers)
            this.proceed()
            this.findChildSteps(this.initialSteps);
        },

        proceed: function(){
            for(var i = 0; i < this.board.emptyPoints.length; i++){
                this.initialSteps = this.initialSteps.concat(PG.StepFinder.find(this.board, this.board.emptyPoints[i]));
            }
        },

        findChildSteps: function(steps){
            if(this.successFound){
                return;
            }
            for(var i = 0; i < steps.length; i++){
                var curStep = steps[i];
                for(var j = 0; j < curStep.newBoard.emptyPoints.length; j++){
                    var foundedChilds = PG.StepFinder.find(curStep.newBoard, curStep.newBoard.emptyPoints[j], curStep);
                    curStep.childSteps = curStep.childSteps.concat(foundedChilds);

                    if(foundedChilds.sucessSteps.length){
                        this.collectSuccesSteps(foundedChilds.sucessSteps);
                        this.successFound = true;
                    }
                }

                this.findChildSteps(curStep.childSteps);
            }
        },

        collectSuccesSteps: function(sucessSteps){
            for(var i = 0; i < sucessSteps.length; i++){
                var step = sucessSteps[i];
                var successOrder = [];
                while(step.parentStep){

                    successOrder.unshift({from: step.fromNum, to: step.toNum});
                    step = step.parentStep;
                }
                successOrder.unshift({from: step.fromNum, to: step.toNum});
                this.successSteps.push(successOrder);
            }
        }

    }

    PG.Game = Game;
})(PegGame)