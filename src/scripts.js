// DEPENDENCIES **************************************************
import Repository from "./Repository";
import { fetchData } from "./apicalls";
import Traveler from "./traveler";
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
// GLOBAL DATA ***************************************************
let travelersRepository;
let tripsRepository;
let desinationRepository;
let randomTraveler;

console.log("This is the JavaScript entry file - your code begins here.");

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
// EVENT LISTENERS ************************************************
newTripButton.addEventListener('click', displayForm)
function displayData() {
  travelerName.innerText = randomTraveler.findTravelerName();
  displayDestinations();
  totalDisplay.innerText = randomTraveler.calcTotalTripCost();
}
// EVENT HANDLERS *************************************************


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
        <img class="card-image" src="${travelerDestination.image}" alt="Cowboy ">
      </section>
     <section class = "card-bottom"> 
        <h3 class="= destination-name">${travelerDestination.destination}</h3>
        <p class="destination-date"> ${trip.date}</p>
        <p class = "destination-status "> ${status} </p> 
        <h3>  </h3>
      </section>
  </article> `;
}

function displayForm () {
  console.log('im working')
  cardSection.classList.add('hidden')
  inputBanner.classList.toggle("hidden")
}

// function diplayTripData () {
//   const displayData = randomTraveler.forEach((traveler) => {
//   cardSection.innerHTML = ' '
//   cardSections.innerHTML += "
//   <article class= "card-container">
//     <section class ="card-top">
//       <img class="card-image"src="" alt="Cowboy ">
//       <img class= "card-logo"src="" alt="A curved arrow aiming right">
//       <p class ="card-views"> Views 01</p>
//     </section>
//    <section class = "card-bottom">
//       <p class="= destination-name">Destination</p>
//       <p class="destination-date"> Monday, Jan 4th</p>
//       <h3 class="card-playlist">Playlist</h3>
//       <p class="card-playlist-name">Secrets for the Best Music!</p>
//       <h4 class="card-attachments">Attachments</h4>
//       <p class="card-number">04</p>
//     </section>
//   </article> "
// })}
