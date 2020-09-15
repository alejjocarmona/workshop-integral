let userAdmin, password;
console.log("this is working");

showEnrolledList = (data) =>{
    console.log(data)
    let html = "";
    let usersTable = document.getElementById('enrolled');
    let r = document.createElement('tbody');
    data.forEach(enrolled => {
        html +=`
        <tr><td>${enrolled.name}</td><td>${enrolled.lastName}</td><td>${enrolled.email}</td><td>${enrolled.age}</td></tr>
        `
    });
    r.innerHTML = html;
    usersTable.appendChild(r)
}

async function login(event) {
	event.preventDefault();
	userObject = {
		userAdmin: event.target.userAdmin.value,
		password: event.target.password.value
	};
	console.log(userObject);
    await logAdmin();
    infoUsers();
}

async function logAdmin() {
	let response = await fetch('http://localhost:3000/eventech/login', {
		method: 'POST',
		body: JSON.stringify(userObject),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	let data = await response.json();
	console.log(data);
    console.log(response);
    if (data.ok) {
        localStorage.setItem("token", data.token);
    } else {
        document.body.innerHTML = `
		<div class="message-error" id="message-error">
			<img src="./static/eventech.png" alt="">
			<h1>${data.message}</h1>
			<div class="go-back cta" id="go-back" onclick="document.location.reload()">
				<p>
					Volver
				</p>
			</div>
		</div> 
        `;
        localStorage.removeItem("token");
    }
}

document.getElementById('admin').addEventListener('submit', login);

function logout() {
    localStorage.removeItem("token");
    document.location.reload();
} 

async function infoUsers() {
    let response = await fetch('http://localhost:3000/eventech/secure/all-visitors', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        },
    });
    let data = await response.json();
    console.log(data);
    if (data.ok) {
        let loginForm = document.getElementById('login');
        loginForm.remove();
        document.body.innerHTML = `
        <div class="users-list">
            <h1>¡Bienvenido!</h1>
                <table class="info-users" id="enrolled">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Edad</th>
                        </tr>
                    </thead>
                </table>
                <div class="logout cta" id="logout" onclick="logout()">
				    <p>
					    Cerrar sesión
				    </p>
			    </div>
		</div>`;
        showEnrolledList(data.data);
    }
}