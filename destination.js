// Destination Array

let destinations = [

    {
        name: "Goa",
        location: "India",
        price: 12000,
        duration: "5 Days",
        image: "https://assets.serenity.co.uk/58000-58999/58779/1296x864.jpg",
        description: "Famous for beaches and nightlife."
    },

    {
        name: "Kashmir",
        location: "India",
        price: 18000,
        duration: "6 Days",
        image: "https://s7ap1.scene7.com/is/image/incredibleindia/1-amarnath-yatra-pahalgam-jammu-kashmir-city-hero?qlt=82&ts=1726816087141",
        description: "Known as Paradise on Earth."
    },

    {
        name: "Kerala",
        location: "India",
        price: 15000,
        duration: "5 Days",
        image: "https://media.cntravellerme.com/photos/65f7d2fe6dc13f3de7946c00/3:2/w_5616,h_3744,c_limit/GettyImages-110051777.jpg",
        description: "Backwaters and greenery."
    },

    {
        name: "Jaipur",
        location: "India",
        price: 10000,
        duration: "4 Days",
        image: "https://assets.vogue.in/photos/5ce41ea8b803113d138f5cd2/16:9/w_1920,h_1080,c_limit/Jaipur-Travel-Shopping-Restaurants.jpg",
        description: "The Pink City known for its forts and palaces."
    },

    {
        name: "Dubai",
        location: "UAE",
        price: 45000,
        duration: "7 Days",
        image: "https://thumbs.dreamstime.com/b/aerial-view-dubai-palm-jumeirah-island-united-arab-emirates-aerial-view-dubai-palm-jumeirah-island-uae-137295592.jpg",
        description: "Luxury shopping, skyscrapers, and desert adventures."
    },

    {
        name: "Manali",
        location: "India",
        price: 13000,
        duration: "5 Days",
        image: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/11/Top-4-Indian-skiing-destinations-Solang.webp",
        description: "A beautiful hill station surrounded by mountains."
    },

    {
        name: "Agra",
        location: "India",
        price: 9000,
        duration: "3 Days",
        image: "https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=",
        description: "Home to the world-famous Taj Mahal."
    },

    {
        name: "Ladakh",
        location: "India",
        price: 22000,
        duration: "6 Days",
        image: "https://cdn.pixabay.com/photo/2022/10/25/13/41/ladakh-7545887_640.jpg",
        description: "Known for stunning landscapes and high mountain passes."
    },

    {
        name: "Andaman Islands",
        location: "India",
        price: 28000,
        duration: "6 Days",
        image: "https://media.istockphoto.com/id/622418868/photo/aerial-view-of-cinque-island-andaman.jpg?s=612x612&w=0&k=20&c=cC1cgSKC8U3ZFswuxcJuovywisKn0JH-n9C5Og3hyYg=",
        description: "Crystal-clear beaches and exciting water sports."
    }

];

let editIndex = -1;


// Display Destinations

function displayDestinations(){

    const destinationCards = document.getElementById("destinationCards");

    destinationCards.innerHTML = "";

    destinations.forEach((destination, index)=>{

        destinationCards.innerHTML += `

        <div class="card">

            <img src="${destination.image}">

            <h3>${destination.name}</h3>

            <p><strong>Location:</strong> ${destination.location}</p>

            <p><strong>Price:</strong> ₹${destination.price}</p>

            <p><strong>Duration:</strong> ${destination.duration}</p>

            <p>${destination.description}</p>

            <button onclick="editDestination(${index})" class="edit-btn">
                Edit
            </button>

            <button onclick="deleteDestination(${index})" class="delete-btn">
                Delete
            </button>

        </div>

        `;

    });

}

// Call Function

displayDestinations();

// Form Reference

const form = document.getElementById("destinationForm");

// Add Destination

form.addEventListener("submit", function(e){

    e.preventDefault();

    const newDestination = {

        name: document.getElementById("name").value,
        location: document.getElementById("location").value,
        price: document.getElementById("price").value,
        duration: document.getElementById("duration").value,
        image: document.getElementById("image").value,
        description: document.getElementById("description").value

    };

    if(editIndex === -1){

        destinations.push(newDestination);

    }
    else{

        destinations[editIndex] = newDestination;
        editIndex = -1;
        document.querySelector("#destinationForm button").innerText = "Add Destination";

    }

    displayDestinations();

    form.reset();

});


// Delete Destination

function deleteDestination(index){

    if(confirm("Are you sure you want to delete this destination?")){

        destinations.splice(index,1);
        displayDestinations();

    }

}


// Edit Destination

function editDestination(index){

    const destination = destinations[index];

    document.getElementById("name").value = destination.name;
    document.getElementById("location").value = destination.location;
    document.getElementById("price").value = destination.price;
    document.getElementById("duration").value = destination.duration;
    document.getElementById("image").value = destination.image;
    document.getElementById("description").value = destination.description;

    editIndex = index;

    document.querySelector("#destinationForm button").innerText = "Update Destination";

}