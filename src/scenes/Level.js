
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write more your code here
	selectCell = (currentRow, currentCol, isSameCell) => {
		let currentCell;
		currentCell = this.oGridOfCells[currentRow][currentCol].cell;
		if (currentCell.name != "blocked") {
			this.selectedcell = currentCell;
			this.isSameCell = isSameCell;
			this.selectRowOrCol(currentCell);
		}
	};
	handleKeyDown(event) {
		const [row, col] = this.selectedcell.name.split('_').map(Number);
		let currentRow = row;
		let currentCol = col;
		if (event.keyCode >= 65 && event.keyCode <= 90) {
			if (this.selectedcell.data != null) {
				this.selectedcell.data.list.cellWord.destroy();
			}
			const cellWord = this.add.text(this.selectedcell.x, this.selectedcell.y, event.key).setOrigin(0.5);
			cellWord.setStyle({ fontSize: '25px', fill: '#000' });
			this.selectedcell.setData("cellWord", cellWord);
			if (currentCol < 12 && this.isSameCell) {
				this.selectCell(currentRow, currentCol + 1, false);
			}
			if (currentRow < 12 && !this.isSameCell) {
				this.selectCell(currentRow + 1, currentCol, true);
			}
		}
		if (event.key == "Backspace") {
			if (this.selectedcell.data != null) {
				this.selectedcell.data.list.cellWord.destroy();
			}
			if (currentCol > 0 && this.isSameCell) {
				this.selectCell(currentRow, currentCol - 1, false);
			}
			if (currentRow > 0 && !this.isSameCell) {
				this.selectCell(currentRow - 1, currentCol, true);
			}
		}
		const changeCurrentRowAndCol = (changeRow, changeCol) => {
			currentRow = currentRow + changeRow;
			currentCol = currentCol + changeCol;
			console.log(currentRow);
			if (currentRow >= 0 && currentRow <= 12 && currentCol >= 0 && currentCol <= 12) {
				if (this.oGridOfCells[currentRow][currentCol].cell.name === "blocked") {
					if (changeRow == 12 || changeCol == 12) {
						changeCurrentRowAndCol(-1, 0);
					}
					else {
						changeCurrentRowAndCol(changeRow, changeCol);
					}
				} else {
					this.selectCell(currentRow, currentCol, !this.isSameCell);
				}
			}
		};
		switch (event.key) {
			case "ArrowUp":
				if (row === 0 && col === 0) {
					let newRow = 12;
					let newCol = 12;
					while (this.oGridOfCells[newRow][newCol].cell.name === "blocked") {
						newRow--;
						if (newRow < 0) {
							newRow = 12;
							newCol--;
							if (newCol < 0) {
								newCol = 12;
							}
						}
					}
					this.selectCell(newRow, newCol, !this.isSameCell);
				} else if (row > 0) {
					if (this.oGridOfCells[currentRow - 1][currentCol].cell.name === "blocked") {
						changeCurrentRowAndCol(-1, 0);
					} else {
						this.selectCell(currentRow - 1, currentCol, !this.isSameCell);
					}
				}
				break;
			case "ArrowDown":
				if (row === 12 && col === 12) {
					let newRow = 0;
					let newCol = 0;
					while (this.oGridOfCells[newRow][newCol].cell.name === "blocked") {
						newRow++;
						if (newRow > 12) {
							newRow = 0;
							newCol++;
							if (newCol > 12) {
								newCol = 0;
							}
						}
					}
					this.selectCell(newRow, newCol, !this.isSameCell);
				} else if (row < this.oGridOfCells[0].length - 1) {
					if (this.oGridOfCells[currentRow + 1][currentCol].cell.name === "blocked") {
						changeCurrentRowAndCol(1, 0);
					} else {
						this.selectCell(currentRow + 1, currentCol, !this.isSameCell);
					}
				}
				break;
			case "ArrowLeft":
				if (row === 0 && col === 0) {
					let newRow = 12;
					let newCol = 12;
					while (this.oGridOfCells[newRow][newCol].cell.name === "blocked") {
						newCol--;
						if (newCol < 0) {
							newCol = 12;
							newRow--;
							if (newRow < 0) {
								newRow = 12;
							}
						}
					}
					this.selectCell(newRow, newCol, !this.isSameCell);
				} else if (col > 0) {
					if (this.oGridOfCells[currentRow][currentCol - 1].cell.name === "blocked") {
						changeCurrentRowAndCol(0, -1);
					} else {
						this.selectCell(currentRow, currentCol - 1, !this.isSameCell);
					}
				}
				break;
			case "ArrowRight":
				if (row === 12 && col === 12) {
					let newRow = 0;
					let newCol = 0;
					while (this.oGridOfCells[newRow][newCol].cell.name === "blocked") {
						newCol++;
						if (newCol > 12) {
							newCol = 0;
							newRow++;
							if (newRow > 12) {
								newRow = 0;
							}
						}
					}
					this.selectCell(newRow, newCol, !this.isSameCell);
				} else if (col < this.oGridOfCells[0].length - 1) {
					if (this.oGridOfCells[currentRow][currentCol + 1].cell.name === "blocked") {
						changeCurrentRowAndCol(0, 1);
					} else {
						this.selectCell(currentRow, currentCol + 1, !this.isSameCell);
					}
				}
				break;
			default:
				break;
		}
	}
	create() {
		this.editorCreate();
		this.isSameCell = true;
		this.oGridOfCells = {};
		this.setBoard();
		this.selectedcell = this.oGridOfCells[0][0].cell;
		this.selectRow(this.oGridOfCells[0][0].cell);
		this.input.keyboard.on('keydown', this.handleKeyDown, this);
	}
	setBoard = () => {
		const aCells = [
			['1', '', '', 'block', '2', '3', '', '4', '', '', 'block', '5', ''],
			['6', '7', '', '', '', 'block', '', '', '8', '', '9', '', 'block'],
			['10', '', '', '11', '', 'block', '', '', '12', '', '', '', '13'],
			['', '', '', '', '', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', '', '', '', '', ''],
			['block', '', 'block', '', 'block', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', '', 'block', '', '', ''],
			['', '', '', '', '', '', '', 'block', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', '', '', '', '', ''],
			['', 'block', '', '', '', '', '', '', '', '', '', '', ''],
		]
		let count = 1;
		for (let row = 0; row < 13; row++) {
			const rowData = [];
			for (let col = 0; col < 13; col++) {
				if (aCells[row][col] != 'block') {
					const cellSprite = this.add.sprite((col * 50) + 585, (row * 50) + 165, 'white-box').setScale(0.2);
					cellSprite.setOrigin(0.5, 0.5);
					cellSprite.setName(`${row}_${col}`);
					cellSprite.setInteractive().on('pointerdown', () => {
						this.selectRowOrCol(cellSprite);
					});
					rowData.push({ cell: cellSprite });
					if (aCells[row][col] != '') {
						const numberText = this.add.text(cellSprite.x - 20, cellSprite.y - 20, count.toString()); // Display count as number
						numberText.setStyle({ fontSize: '16px', fill: '#000' });
						count++;
					}
				}
				else {
					const cellSprite = this.add.sprite((col * 50) + 585, (row * 50) + 165, 'black-box').setScale(0.2);
					cellSprite.setOrigin(0.5, 0.5);
					cellSprite.setName("blocked");
					rowData.push({ cell: cellSprite });
				}
			}
			this.oGridOfCells[row] = rowData;

		}
	}
	selectRowOrCol = (cell) => {
		Object.values(this.oGridOfCells).forEach(cellBlock => {
			cellBlock.forEach(cell => {
				cell.cell.setTint(0xffffff);
			});
		})
		if (this.selectedcell.name == cell.name) {
			this.isSameCell = !this.isSameCell;
		}
		this.selectedcell = cell;
		this.isSameCell ? this.selectRow(cell) : this.selectCol(cell);
	}
	selectRow = (cell) => {
		const [row, col] = cell.name.split('_');
		for (let i = col; i < this.oGridOfCells[row].length; i++) {
			const currentCell = this.oGridOfCells[row][i].cell;
			if (currentCell.name === 'blocked') {
				break;
			}
			currentCell.setTint(0xCCCCFF);
		}
		for (let i = col; i >= 0; i--) {
			const currentCell = this.oGridOfCells[row][i].cell;
			if (currentCell.name === 'blocked') {
				break;
			}
			currentCell.setTint(0xCCCCFF);
		}
		cell.setTint(0x9999FF);
	}
	selectCol = (cell) => {
		const [row, col] = cell.name.split('_');
		for (let i = row; i < this.oGridOfCells[col].length; i++) {
			const currentCell = this.oGridOfCells[i][col].cell;
			if (currentCell.name === 'blocked') {
				break;
			}
			currentCell.setTint(0xCCCCFF);
		}
		for (let i = row; i >= 0; i--) {
			const currentCell = this.oGridOfCells[i][col].cell;
			if (currentCell.name === 'blocked') {
				break;
			}
			currentCell.setTint(0xCCCCFF);
		}

		cell.setTint(0x9999FF);
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
