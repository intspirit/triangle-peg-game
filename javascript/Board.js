window.PegGame = window.PegGame || {};
(function(PG){

    var Point = function(par){
        this.num = par.num;
        this.positionX = par.positionX;
        this.positionY = par.positionY;
        this.filled = par.filled;
    }

    var Board = function(emptyNumbers){
        this.emptyPoints = [];
        this.board = [];
        this.numberOfWholes = 0;
        //Create points
        for(var i = 0, rowNum = 0; i < 15;){
            //each row is bigger than previous one to one whole
            //Number of wholes in the row is rowNum + 1
            var row = [];
            for(var count = 0; count <= rowNum; count++){
                var point = new Point({
                    num: ++i,
                    positionX: rowNum,
                    positionY: count,
                    filled: true
                })

                this.numberOfWholes += 1;
                row.push(point)
                this["point"+i+""] = point;
            }
            rowNum++;
            this.board.push(row);
        }

        //Empty points
        for(var i = 0; i < emptyNumbers.length; i++){
            this["point"+emptyNumbers[i]+""].filled = false;

            this.emptyPoints.push(this["point"+emptyNumbers[i]+""]);
        }

    }

    Board.prototype = {

    }

    PG.Board = Board;





})(PegGame)
