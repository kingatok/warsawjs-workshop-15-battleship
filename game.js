'use strict';

class Component {
	getElement() {
		return this._element;
	}
}

class CellComponent extends Component {
	constructor({ location, handleCellClick }) {
		super();
		this._state = 'unknown';
		this._element = document.createElement('td');
		this._element.addEventListener('click', function() {
			handleCellClick({ location });
		});
		this._refresh();
	}

	setState(stateName) {
		this._state = stateName;
		this._refresh();
	}

	_refresh() {
		this._element.textContent = this._state;
		this._element.className = 'cell_' + this._state;
	}
}

class BoardComponent extends Component {
	constructor({ handleCellClick, size = 8 }) {
		super();
		this._element = document.createElement('table');
		/*
		References to cells.
		@type {Object.<string.CellComponent>}
		*/
		this._cells = {};
		for (let rowNumber = 0; rowNumber < size; rowNumber += 1) {
			const rowElement = document.createElement('tr');
			for (let columnNumber = 0; columnNumber < size; columnNumber += 1) {
				const cell = new CellComponent({
					handleCellClick,
					location: { row: rowNumber, column: columnNumber }
				});
				rowElement.appendChild(cell.getElement());
				// Also save a reference to the cell so that it can be addressed later
				this._cells[`${rowNumber}X${columnNumber}`] = cell;
			}
			this._element.appendChild(rowElement);
		}
	}

	setCellState(location, state) {
		const key = `${location.row}X${location.column}`;
		this._cells[key].setState(state);
	}
}

class GameController {
	constructor(board) {
		this._board = board;
	}
	handleCellClick({ location }) {
		this._board.setCellState(location, 'miss');
	}
}

let myController;
function handleCellClick(...args) {
	myController.handleCellClick.apply(myController, args);
}

const board = new BoardComponent({ handleCellClick })
myController = new GameController(board);

const boardContainer = document.getElementById('boardContainer').appendChild(board.getElement());



