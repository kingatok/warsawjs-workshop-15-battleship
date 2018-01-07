'use strict';

class Component {
	getElement() {
		return this._element;
	}
}

class CellComponent extends Component {
	constructor(handleCellClick) {
		super();
		this._state = 'unknown';
		this._element = document.createElement('td');
		this._element.addEventListener('click', function() {
			handleCellClick();
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

class GameController {
	constructor(cell) {
		this._cell = cell;
	}
	handleCellClick() {
		this._cell.setState('miss');
	}
}

let myController;
function handleCellClick() {
	myController.handleCellClick();
}

const myCell = new CellComponent(handleCellClick);
myController = new GameController(myCell);
document
	.getElementById('cellContainer')
	.appendChild(myCell.getElement());