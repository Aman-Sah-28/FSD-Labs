const form = document.getElementById("registrationForm");
document.getElementById("date").min = new Date().toISOString().split("T")[0];
const API_URL = "http://localhost:5000/tourists";
let editId = null;

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const date = document.getElementById("date").value;
    const tourPackage = document.getElementById("package").value;
    const phone = document.getElementById("phone").value;
    const travellers = document.getElementById("travellers").value;
    const payment = document.querySelector('input[name="payment"]:checked').value;
    const file = document.getElementById("file").files[0];

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    let fileName = "No File Selected";

    if(file){
        fileName = file.name;
    }

    localStorage.setItem("Name",name);
    localStorage.setItem("Email",email);
    localStorage.setItem("Package",tourPackage);
    localStorage.setItem("Travel Date", date);
    localStorage.setItem("Phone",phone);
    localStorage.setItem("Travellers",travellers);
    localStorage.setItem("Payment",payment);
    localStorage.setItem("Uploaded File", fileName);


    const tourist = {
        name,
        email,
        phone,
        password,
        date,
        package: tourPackage,
        travellers,
        payment,
        file: fileName
    };

    if (editId == null) {

    await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(tourist)

    });

    }
    else {
        await fetch(`${API_URL}/${editId}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(tourist)

    });

    editId = null;
    document.getElementById("btn").innerHTML = "Register";

    }
    displayTourists();
    form.reset();
});

async function displayTourists() {

    const response = await fetch(API_URL);
    const tourists = await response.json();

    const touristList = document.getElementById("touristList");
    touristList.innerHTML = "";

    tourists.forEach((tourist) => {

        touristList.innerHTML += `
        <div class="tourist-card">

            <h2>Registration Details</h2>

            <p><b>Name :</b> ${tourist.name}</p>
            <p><b>Email :</b> ${tourist.email}</p>
            <p><b>Package :</b> ${tourist.package}</p>
            <p><b>Date :</b> ${tourist.date}</p>
            <p><b>Phone :</b> ${tourist.phone}</p>
            <p><b>Travellers :</b> ${tourist.travellers}</p>
            <p><b>Payment :</b> ${tourist.payment}</p>
            <p><b>File :</b> ${tourist.file}</p>

            <button onclick="editTourist('${tourist._id}')">Edit</button>
            <button onclick="deleteTourist('${tourist._id}')">Delete</button>
        </div>
        `;
    });
}


async function editTourist(id) {

    const response = await fetch(`${API_URL}/${id}`);
    const tourist = await response.json();

    document.getElementById("name").value = tourist.name;
    document.getElementById("email").value = tourist.email;
    document.getElementById("phone").value = tourist.phone;
    document.getElementById("password").value = tourist.password;
    document.getElementById("date").value = tourist.date;
    document.getElementById("package").value = tourist.package;
    document.getElementById("travellers").value = tourist.travellers;

    document.querySelector(
        `input[name="payment"][value="${tourist.payment}"]`
    ).checked = true;

    editId = id;

    document.getElementById("btn").innerHTML = "Update";

}

async function deleteTourist(id) {

    await fetch(`${API_URL}/${id}`, {

        method: "DELETE"

    });

    displayTourists();

}

displayTourists();
window.editTourist = editTourist;
window.deleteTourist = deleteTourist;