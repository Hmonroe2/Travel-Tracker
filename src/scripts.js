// DEPENDENCIES **************************************************
import Repository from "./Repository";
import { fetchData } from "./apicalls";
import Traveler from "./traveler";
import "./css/styles.css";
import "./images/turing-logo.png";

// GLOBAL DATA ***************************************************
let travelersRepository;
let tripsRepository;
let desinationRepository;
let randomTraveler;

// console.log("This is the JavaScript entry file - your code begins here.");

// FETCH DATA *****************************************************
Promise.all([
  fetchData("travelers"),
  fetchData("trips"),
  fetchData("destinations"),
]).then((data) => {
  setData(data);
});

function setData(data) {
  travelersRepository = new Repository(data[0].travelers);
  tripsRepository = new Repository(data[1].trips);
  desinationRepository = new Repository(data[2].destinations);
  randomTraveler = getRandomTraveler(travelersRepository.data);
  randomTraveler.setUserData(tripsRepository, "trips", "userID");
  randomTraveler.setTravelerDestinations(desinationRepository);
  console.log("random traveler", randomTraveler);
  displayData();
}

function getRandomTraveler(travelers) {
  const randomIndex = Math.floor(Math.random() * travelers.length);
  const randomUserData = travelersRepository.findUser(randomIndex, "id");
  return new Traveler(randomUserData[0]);
}

// DOM ELEMENTS ***************************************************
const travelerName = document.querySelector(".user-name");
const cardSection = document.querySelector(".card-section");
const totalDisplay = document.querySelector(".total-amount");
const newTripButton = document.querySelector('.new-trip-button')
const inputBanner = document.querySelector('.input-banner')
const cardContainer = document.querySelector(".card-container")
const inputDestOptions = document.querySelector('.data-entry-type-selection')
// EVENT LISTENERS ************************************************
newTripButton.addEventListener('click', displayForm)

// EVENT HANDLERS *************************************************


function displayData() {
  travelerName.innerText = randomTraveler.findTravelerName();
  displayDestinations();
  totalDisplay.innerText = randomTraveler.calcTotalTripCost();
  displayDropDown()
}
function displayDestinations() {
  const todaysDate = new Date().toISOString().slice(0, 10).split("-").join("/");
  randomTraveler.trips.forEach((trip) => {
    const travelerDestination = randomTraveler.destinations.find(
      (destination) => trip.destinationID === destination.id
    );
    if (trip.status === "pending") {
      displayDestinationData("Pending", travelerDestination, trip);
    } else if (trip.date < todaysDate) {
      displayDestinationData('Past Trip',travelerDestination, trip);
    }else {
      displayDestinationData('Upcoming Trip', travelerDestination, trip)
    }
  });
}
function displayDestinationData(status, travelerDestination, trip) {
  cardSection.innerHTML += `
  <article class= "card-container">
      <section class ="card-top">
        <img class="card-image" src="${travelerDestination.image}" alt="${travelerDestination.alt} ">
      </section>
     <section class = "card-bottom"> 
        <p class="= destination-name">${travelerDestination.destination}</p>
        <p class="destination-date"> ${trip.date}</p>
        <p class = "destination-status "> ${status} </p> 
        <P class = "trip status" >${trip.status} </p>
        <h3>  </h3>
      </section>
  </article> `;
  // console.log(desinationRepository.findAllDestinations())
}

function displayForm () {
  console.log('im working')
  cardSection.classList.add('hidden')
  inputBanner.classList.toggle("hidden")
}

function displayDropDown (){ 
  let destinationName = desinationRepository
  .findAllDestinations(desinationRepository)
  destinationName.forEach(dest => 
    inputDestOptions.innerHTML += ` 
    <option 
      class="destination-data" 
      value="dest-data">${dest}
    </option>`
    )
}

function retrieveInputData () {
  
}
