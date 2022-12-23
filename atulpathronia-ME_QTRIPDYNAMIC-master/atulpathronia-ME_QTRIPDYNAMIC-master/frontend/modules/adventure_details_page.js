import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  // console.log(search);
  const params = new URLSearchParams(search);
  const tourID = params.get("adventure");
  return tourID;
  // const tourID = params.get("city");
  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const res = await fetch(
      `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    );
    const adventureDetails = await res.json();
    // console.log(adventureDetails);
    return adventureDetails;
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // console.log(adventure)
  const adventureName = document.getElementById("adventure-name")
  const adventureSubTitle = document.getElementById("adventure-subtitle")
  const photoGallery = document.getElementById("photo-gallery")
  const adventureContent  = document.getElementById("adventure-content")

  adventureName.textContent = adventure.name
  adventureSubTitle.textContent = adventure.subtitle
  adventure.images.forEach((image)=>{
    const photo = document.createElement("div")
    photo.innerHTML = `<img src=${image} class="activity-card-image"/>`
    photoGallery.appendChild(photo)
  })
  adventureContent.textContent = adventure.content 
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

const photo = `<div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
<div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
<div class="carousel-inner">
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`

document.getElementById("photo-gallery").innerHTML = photo

images.forEach((image,index)=>{
    const CarouselItem = document.createElement("div")
    CarouselItem.classList = "carousel-item activity-card-image"
    if(index === 0){
      CarouselItem.classList = "carousel-item active activity-card-image"
    } 
    CarouselItem.innerHTML = `<img src=${image} class="d-block w-100" alt="...">`
    document.querySelector(".carousel-inner").appendChild(CarouselItem)
  })  
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // console.log(adventure)
  const soldOut = document.getElementById("reservation-panel-sold-out")
  const available = document.getElementById("reservation-panel-available")
  const costPerHead = document.getElementById("reservation-person-cost")


  if(adventure.available){
    available.style.display = "block"
    soldOut.style.display = "none"
    costPerHead.textContent = adventure.costPerHead
  } else {
  available.style.display = "none"
  soldOut.style.display = "block"
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const reservationCost = document.getElementById("reservation-cost")
  reservationCost.textContent = adventure.costPerHead * persons   
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const reservationForm = document.getElementById("myForm")
  const inputs =  document.querySelectorAll(".form-control")

  reservationForm.addEventListener("submit", function(e){ 
    e.preventDefault()

    let name;
    let date;
    let person;

    inputs.forEach((input)=>{
      if(input.name === "name"){
        name = input.value
        console.log(name)
      } if(input.name === "date"){
        date = input.value
      } if(input.name === "person"){
        person = input.value
      }
    })

    
    let booking = {
      "name": name,
      "date": date,
      "person": person,
      "adventure": adventure.id, 
    }


    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
      };

      fetch(config.backendEndpoint + '/reservations/new',options).then(res=>{
        if(res.status){
          alert("Success")
          window.location.reload()  
        } else {
          alert("Failed")
        }
      })
      // console.log(booking)
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const reservedBanner = document.getElementById("reserved-banner")
  if(!adventure.reserved){
    reservedBanner.style.display = "none"
  } else {
    reservedBanner.style.display = "block"
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
