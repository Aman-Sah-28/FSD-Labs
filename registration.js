const form = document.getElementById("registrationForm");
document.getElementById("date").min = new Date().toISOString().split("T")[0];
let tourists = [];
let editId = null;

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

    let fileName = "No File Selected";

    if(file){
        fileName = file.name;
    }

    localStorage.setItem("Name",name);
    localStorage.setItem("Email",email);
    localStorage.setItem("Package",tourPackage);
    localStorage.setItem("Travel Date", date);
    localStorage.setItem("Uploaded File", fileName);


    const tourist = {

        id: Date.now(),
        name,
        email,
        password,
        date,
        package: tourPackage,
        file: fileName
    };

    if(editId==null){
        tourists.push(tourist);
    }
    else{
        const index = tourists.findIndex(t=>t.id===editId);
        tourists[index]=tourist;
        editId=null;
        document.getElementById("btn").innerHTML="Register";
    }

    console.log(tourists);
    displayTourists();

    form.reset();
});

function displayTourists(){
    const touristList=document.getElementById("touristList");
    touristList.innerHTML="";
    tourists.forEach((tourist)=>{

        touristList.innerHTML+=`
        <div class="tourist-card">
            <h2>Registration Details</h2>
            <p><b>Name :</b> ${tourist.name}</p>
            <p><b>Email :</b> ${tourist.email}</p>
            <p><b>Package :</b> ${tourist.package}</p>
            <p><b>Date :</b> ${tourist.date}</p>
            <p><b>File :</b> ${tourist.file}</p>

            <button onclick="editTourist(${tourist.id})">
            Edit
            </button>

            <button onclick="deleteTourist(${tourist.id})">
            Delete
            </button>
        </div>
        `;
    });
}


function editTourist(id){
    const tourist= tourists.find(t=>t.id===id);
    document.getElementById("name").value=tourist.name;
    document.getElementById("email").value=tourist.email;
    document.getElementById("password").value=tourist.password;
    document.getElementById("date").value=tourist.date;
    document.getElementById("package").value=tourist.package;
    editId=id;
    document.getElementById("btn").innerHTML="Update";
}

function deleteTourist(id){
    tourists=tourists.filter(t=>t.id!==id);
    displayTourists();
}