// document.getElementById('');
const gameCointainer = document.querySelector('#game');
const cell = document.createElement('div');
const textNode = document.createTextNode('Hello, world!');
// cell.textContent = 'Hello, world';
cell.appendChild(textNode);
gameCointainer.appendChild(cell);


cell.addEventListener('click', function() {
	cell.textContent = 'Clicked';
});

// &lt;script&gt; wyświetli w html <script>