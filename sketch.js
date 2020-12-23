let playfield, fallingPiece, ghostPiece, paused;
let ghostMode = true;

const width = 10;
const height = 22;

function setup() {
	playfield = new Playfield(width, height);
	
	let totalWidth = playfield.cellSize * width + playfield.borderSize*2;
	let totalHeight = playfield.cellSize * height + playfield.borderSize*2;

	createCanvas(totalWidth, totalHeight);

	spawnNewPiece();
}


let prev = 0;
function draw() {

	let curr = millis();
	let delta = curr - prev;
	prev = curr;

	
	if (!paused)
		fallingPiece.update(delta);

	if (fallingPiece.timeToFall()) {
		fallingPiece.resetBuffer();
		fallingPiece.moveDown();
		
		if (!playfield.isValid(fallingPiece)) {
			fallingPiece.moveUp();
			spawnNewPiece();
		}
	}

	ghostPiece.copy(fallingPiece)
	hardDrop(ghostPiece, playfield);
	

	playfield.clearLines();
	
	playfield.show();
	if (ghostMode) ghostPiece.show();
	fallingPiece.show();
	
}


function spawnNewPiece() {
	if (fallingPiece) {
		playfield.addToGrid(fallingPiece);
	}
	
	const pieces = ['O', 'J', 'L', 'S', 'Z', 'T', 'I']
	const choice = random(pieces);
	fallingPiece = new Piece(choice, playfield);
	
	ghostPiece = new Piece(choice, playfield);
	ghostPiece.isghost = true;
	ghostPiece.cells = fallingPiece.cells;

	redraw();

}

function hardDrop(piece, playfield) {
	
	while (playfield.isValid(piece)) {
		piece.moveDown();
	}
	piece.moveUp();
	
}


function toggleGhost() {
	ghostMode = !ghostMode;
}


function keyPressed() {
	switch (key.toLowerCase()) {
			
		case ' ':
			hardDrop(fallingPiece, playfield);
			spawnNewPiece();
			break;
			
		case 'r':
			spawnNewPiece();
			playfield.resetGrid();
			break;
			
		case 'p':
			paused = !paused;
			break;
		
			
		
		case 'z':
			fallingPiece.rotateCCW();
			if (!playfield.isValid(fallingPiece))
				fallingPiece.rotateCW();
			break;
			
		case 'x':
			fallingPiece.rotateCW();
			if (!playfield.isValid(fallingPiece))
				fallingPiece.rotateCCW();
			break;
		
			
		case 'w':
			fallingPiece.y--;
			break;
			
		case 'n':
			spawnNewPiece();
			break;
			
	}
	
	switch (keyCode) {
			
		case UP_ARROW:
			fallingPiece.rotateCW();

			if (!playfield.isValid(fallingPiece))
				fallingPiece.rotateCCW();

			break;
			
	}



}
