const form = document.getElementById("registrationForm");
const card = document.getElementById("card");
document.getElementById("date").min = new Date().toISOString().split("T")[0];

form.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const date = document.getElementById("date").value;
    const tourPackage = document.getElementById("package").value;
    const file = document.getElementById("file").files[0];

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    localStorage.setItem("Name",name);
    localStorage.setItem("Email",email);
    localStorage.setItem("Package",tourPackage);
    localStorage.setItem("Travel Date", date);
    localStorage.setItem("Uploaded File", file);

    let fileName = "No File Selected";

    if(file){
        fileName = file.name;
    }

    card.style.display = "block";

    card.innerHTML = `
        <h2>Registration Successful</h2>

        <p><b>Name :</b> ${name}</p>
        <p><b>Email :</b> ${email}</p>
        <p><b>Password :</b> ${password}</p>
        <p><b>Date :</b> ${date}</p>
        <p><b>Package :</b> ${tourPackage}</p>
        <p><b>Uploaded File :</b> ${fileName}</p>
    `;

    form.reset();

});