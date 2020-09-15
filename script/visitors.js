let name, lastName, email, age, data;
interests = [];
userObject = {};

function removeElements(pageSection) {
	let element = document.getElementById(pageSection);
	element.parentNode.removeChild(element);
}

async function createUser(event) {
	event.preventDefault();
	userObject = {
		name: event.target.name.value,
		lastName: event.target.lastName.value,
		email: event.target.email.value,
		age: Number(event.target.age.value),
	};
	await addUser();
	infoMessage();
}

document.getElementById('formulary').addEventListener('submit', createUser);

async function addUser() {
	let response = await fetch('http://localhost:3000/eventech/visitors', {
		method: 'POST',
		body: JSON.stringify(userObject),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	data = await response.json();
	return data;
}

function infoMessage() {
	removeElements('new-registry');
	if (data.ok) {
		document.body.innerHTML = `
		<div class="message-ok" id="message-ok">
			<img src="./static/eventech.png" alt="">
			<h1>${data.message}</h1>
			<div class="go-home cta" id="go-home" onclick="registrySuccess()">
				<p>
					OK
				</p>
			</div>
		</div>
		`;
	} else {
		document.body.innerHTML = `
		<div class="message-error" id="message-error">
			<img src="./static/eventech.png" alt="">
			<h1>${data.message}</h1>
			<div class="go-back cta" id="go-back" onclick="registryError()">
				<p>
					Volver al formulario
				</p>
			</div>
		</div> 
		`;
	}
}

function registrySuccess() {
	removeElements('message-ok');
	window.location="index.html";
}

function registryError() {
	removeElements('message-error');
	document.location.reload();
}