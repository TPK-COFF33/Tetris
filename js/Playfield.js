class Playfield {

	constructor(w, h) {
		this.foreground = [240];
		this.background = [170];
		
		this.cols = w;
		this.rows = h;
		this.grid = [];
		this.resetGrid();
		
		this.cellSize = 21;
		this.borderSize = 3;

		this.gridlines = true;
	}

	addToGrid(piece) {
		
		for (let row = 0; row < piece.size; row++) {
			for (let col = 0; col < piece.size; col++) {
				
				if (piece.cells[row][col] != null) {
					let gridRow = piece.y + row;
					let gridCol = piece.x + col;

					this.grid[gridRow][gridCol] = 
						piece.cells[row][col];
				}
				
			}
		}
		
	}
	
	
	clearLines() {
		
		for (let row = this.rows-1; row >= 0; row--) {

			if (!this.grid[row].includes(this.foreground)) {
				this.grid.splice(row, 1)
				this.grid.unshift(new Array(this.cols).fill(this.foreground));
			}
			
		}
		
	}
	
	isValid(piece) {
		
		for (let row = 0; row < piece.size; row++) {
			for (let col = 0; col < piece.size; col++) {
				
				if (piece.cells[row][col] != null) {
					
					let gridRow = piece.y + row;
					let gridCol = piece.x + col;
					
					if (gridRow < 0 || gridRow >= this.rows ||
							gridCol < 0 || gridCol >= this.cols ||
							this.grid[gridRow][gridCol] != this.foreground)
						return false;
				}
				
			}
		}

		return true;
		
	}
	
	
	resetGrid() {
		for (let i = 0; i < this.rows; i++) {
			this.grid[i] = new Array(this.cols).fill(this.foreground);
		}
	}
	
	
	show() {

		let bs = this.borderSize
		let cs = this.cellSize

		if (this.gridlines) fill(this.background);
		else fill(this.foreground);
		
		stroke(this.background)
		strokeWeight(bs);

		let offset = floor(bs / 2)
		rect(offset, offset, cs * this.cols + bs - 1, cs * this.rows + bs - 1)

		for (let row = 0; row < this.grid.length; row++) {
			for (let col = 0; col < this.grid[row].length; col++) {

				let offset = this.borderSize;
				
				let cs = this.cellSize;

				fill(this.grid[row][col]);
				
				noStroke();
				rect(cs * col + offset, cs * row + offset, cs - 1, cs - 1);
			}
		}
	}
}