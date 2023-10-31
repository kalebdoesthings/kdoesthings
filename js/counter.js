const countEl = document.getElementById('count');

update();

function update() {
	fetch('https://api.countapi.xyz/update/kdoesthings/90210/?amount=1')
	.then(res => res.json())
	.then(res => {
		countEl.innerHTML = res.value;
	})
}











