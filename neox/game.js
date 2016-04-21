/**
 * Date: 06.06.13
 */
(function() {
	var grid = []; // [[0], [1,2], [3,4,5],...]
	var index = []; // [[0,0], [1,0], [1,1],...]
	var successfulRoute;

	var lis = [];

	/* View -> */
	function initGamePad() {
		var gp = document.getElementById("game_pad");

		var ul, li;
		var gridRow;
		var pos = 0;
		var n = 5;
		for (var i=0 ; i<n ; i++) {
			ul = document.createElement('ul');
			gridRow = [];
			for (var j=0 ; j<=i ; j++, pos++) {
				li = document.createElement('li');
				li.onclick = start;

				li.appendChild(document.createTextNode(pos+1));
				li._pos = pos;
				ul.appendChild(li);
				lis.push(li);

				index[pos] = [i, j]; // fill index
				gridRow.push(pos);
			}
			gp.appendChild(ul);

			grid[i] = gridRow; // fill grid
		}
	}

	function showResult(route) {
		var rs = document.getElementById('result');
		rs.innerHTML = '';
		var ul = document.createElement('ul');
		var li;
		for(var i=0 ; i<route.length ; i++) {
			li = document.createElement('li');
			li.appendChild(document.createTextNode('from: ' + (route[i].from+1) + ' - to: ' + (route[i].to+1)));
			ul.appendChild(li);
		}
		rs.appendChild(ul);
	}

	function startPlacing(startPos) {
		var li;
		for(var i=0, len=lis.length ; i<len ; i++) {
			li = lis[i];
			if(i != startPos) {
				li.className = 'filled';
			}
			else {
				li.className = '';
			}
		}
	}
	/* <- View */

	function start() {
		var pos = +this._pos;

		startPlacing(pos);

		// clone the 'grid' array and set val 1 for each element
		var startGrid = grid.map(function(row, x) {
			return row.map(function(cell, y) {
				if(grid[x][y] != pos) {
					return 1;
				}
				else {
					return 0;
				}
			});
		});

		startGrid._steps = []; // [{from: 3, to: 2}, ...]

		successfulRoute = null;
		findRoute(startGrid);
		showResult(successfulRoute);
	}

	function findRoute(curGrid) {
		var row, cell;
		for(var x=0 ; (x<curGrid.length && !successfulRoute) ; x++) {
			row = curGrid[x];
			for(var y=0 ; (y<row.length && !successfulRoute) ; y++) {
				cell = row[y];
				var from, to, over;
				if(cell === 0) {
					to = {x: x, y: y};
					//1
					if((curGrid[x][y-2]==1) && (curGrid[x][y-1]==1)) {
						from = {x: x, y: y-2};
						over = {x: x, y: y-1};
						setStep(curGrid, from, to, over);
					}
					//2
					if((curGrid[x][y+2]==1) && (curGrid[x][y+1]==1)) {
						from = {x: x, y: y+2};
						over = {x: x, y: y+1};
						setStep(curGrid, from, to, over);
					}
					//3
					if(curGrid[x-2] && curGrid[x-1] && (curGrid[x-2][y]==1) && (curGrid[x-1][y]==1)) {
						from = {x: x-2, y: y};
						over = {x: x-1, y: y};
						setStep(curGrid, from, to, over);
					}
					//4
					if(curGrid[x+2] && curGrid[x+1] && (curGrid[x+2][y]==1) && (curGrid[x+1][y]==1)) {
						from = {x: x+2, y: y};
						over = {x: x+1, y: y};
						setStep(curGrid, from, to, over);
					}
					//5
					if(curGrid[x-2] && curGrid[x-1] && (curGrid[x-2][y-2]==1) && (curGrid[x-1][y-1]==1)) {
						from = {x: x-2, y: y-2};
						over = {x: x-1, y: y-1};
						setStep(curGrid, from, to, over);
					}
					//6
					if(curGrid[x+2] && curGrid[x+1] && (curGrid[x+2][y+2]==1) && (curGrid[x+1][y+1]==1)) {
						from = {x: x+2, y: y+2};
						over = {x: x+1, y: y+1};
						setStep(curGrid, from, to, over);
					}
				}
			}
		}
	}

	function setStep(curGrid, from, to, over) {
		if(successfulRoute) {
			return;
		}
		var gridTree = curGrid.map(function(row){
			return row.slice(0);
		});
		gridTree[from.x][from.y] = 0;
		gridTree[to.x][to.y] = 1;
		gridTree[over.x][over.y] = 0;
		gridTree._steps = curGrid._steps.slice(0);
		gridTree._steps.push({from: grid[from.x][from.y], to: grid[to.x][to.y]});

		var pegsCount = getPegsCount(gridTree);
		if(pegsCount == 1) {
			successfulRoute = gridTree._steps;
		}
		else {
			findRoute(gridTree);
		}
	}

	function getPegsCount(curGrid) {
		var pegsCount = 0;
		curGrid.forEach(function(row) {
			row.forEach(function(cell) {
				if(cell == 1) {
					pegsCount++;
				}
			});
		});
		return pegsCount;
	}


	initGamePad();
})();