// DEPENDENCIES **************************************************
import Repository from "./Repository";
import { fetchData, postData} from "./apiCalls";
import Traveler from "./traveler";
import "./css/styles.css";
import "./images/turing-logo.png";

// GLOBAL DATA ***************************************************
let tripsRepository;
let destinationRepository;
let randomTraveler;
let currentTrip; 

// FETCH DATA *****************************************************
function getData(num){
  Promise.all([
  fetchData(`travelers/${num}`),
  fetchData("trips"),
  fetchData("destinations"),
]).then((data) => {
  setData(data);
});
}

function setData(data) {
  randomTraveler = new Traveler(data[0]);
  tripsRepository = new Repository(data[1].trips);
  destinationRepository = new Repository(data[2].destinations);
  randomTraveler.setUserData(tripsRepository, "trips", "userID");
  randomTraveler.setTravelerDestinations(destinationRepository);
  displayData();
}

// DOM ELEMENTS ***************************************************
const travelerName = document.querySelector(".user-name");
const cardSection = document.querySelector(".card-section");
const totalDisplay = document.querySelector(".total-amount");
const newTripButton = document.querySelector('.new-trip-button');
const inputBanner = document.querySelector('.input-banner');
const inputDestOptions = document.querySelector('.data-entry-type-selection');
const userDateInput = document.querySelector('.date-input');
const userDurationInput = document.querySelector(".duration-amount");
const bookTripBtn = document.querySelector('.select-dest-btn');
const inputForm = document.querySelector('.input-form');
const showEstimateBtn = document.querySelector('.show-estimate');
const displayEst = document.querySelector('.estimate');
const navBar = document.querySelector('.nav-bar');
const mainPage = document.querySelector('.main');
const loginContainer = document.querySelector('.log-in-container');
const loginName = document.querySelector('.login-name');
const loginPassword = document.querySelector('#password');
const loginBtn= document.querySelector('.submit-login');
const logInError = document.querySelector('.error');


// EVENT LISTENERS ************************************************
newTripButton.addEventListener('click', displayForm);
bookTripBtn.addEventListener('click', bookTrip);
showEstimateBtn.addEventListener('click', retrieveInputData);
loginBtn.addEventListener('click', confirmLogin);

// EVENT HANDLERS *************************************************
function displayData() {
  randomTraveler.calcTotalTripCost();
  displayDestinations();
  displayDropDown();
  displayUserData();
}

function addHidden (element) {
  element.classList.add('hidden');
}

function removeHidden(element) {
  element.classList.remove('hidden');
}

function confirmLogin(){
  let userID = loginName.value.slice(8)
  if(loginName.value !== "" && loginPassword.value === 'travel' && loginName.value.includes('Traveler')){
    getData(userID);
    addHidden(loginContainer);
    removeHidden(navBar);
    removeHidden(mainPage);
  } else {
    logInError.innerHTML = "Incorrect UserName or Password";
  }
}

function retrieveInputData (event) {
  event.preventDefault();
  const destSelect = inputDestOptions.options[inputDestOptions.selectedIndex].value;
  const destID = destinationRepository.data.find(destination => destination.destination === destSelect);
  const tripId = tripsRepository.data.length + 1;
  const tripData = {
    id: tripId,
    userID: randomTraveler.id, 
    destinationID: destID.id,
    travelers: parseInt(userDurationInput.value), 
    date: userDateInput.value.split('-').join('/'), 
    duration: parseInt(userDurationInput.value) , 
    status:'pending', 
    suggestedActivities: []
  }
  currentTrip = tripData;
  calcSingleTrip(tripData);
}

function bookTrip (event){
  event.preventDefault();
  const destSelect = inputDestOptions.options[inputDestOptions.selectedIndex].value;
  const destID = destinationRepository.data.find(destination => destination.destination === destSelect);
  inputForm.reset();
  displayEst.innerText = " ";
  postData('trips', currentTrip);
  displayDestinationData('pending', destID, currentTrip);
  addHidden(inputBanner);
}

function calcSingleTrip(inputData) {
  const currentDestinationID = inputData.destinationID;
  const total = destinationRepository.data.reduce((acc, destination) => {
    if (currentDestinationID === destination.id) {
      const currentFlightCost = inputData.travelers * destination.estimatedFlightCostPerPerson;
      const currentLodgingCost = inputData.duration * destination.estimatedLodgingCostPerDay;
      acc += currentFlightCost + currentLodgingCost;
    }
    return acc;
  },0);
  const fee = total * .10;
  const totalPlusFee = total + fee;
  const estimate = totalPlusFee;
  return displayEst.innerText += `Your Trip Estimate is $${estimate}`;
}

function displayUserData () {
  travelerName.innerText = randomTraveler.findTravelerName();
  totalDisplay.innerText = randomTraveler.calcTotalTripCost();
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
      displayDestinationData('Upcoming Trip', travelerDestination, trip);
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
        <p class ="card-label"> Destination </p>
        <p class="= destination-name">${travelerDestination.destination}</p>
        <p class ="card-label"> Date </p>
        <p class="destination-date"> ${trip.date}</p>
        <p class ="card-label"> Status </p>
        <p class = "destination-status "> ${status} </p> 
      </section>
  </article> `;
}

function displayForm () {
  inputBanner.classList.toggle("hidden")
}

function displayDropDown () { 
  let destinationName = destinationRepository
  .findAllDestinations(destinationRepository);
  destinationName.forEach(dest => 
    inputDestOptions.innerHTML += ` 
    <option 
      class="destination-data" 
      value = "${dest}">${dest}
    </option>`
    );
}

