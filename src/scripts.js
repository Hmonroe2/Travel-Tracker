// DEPENDENCIES **************************************************
import Repository from "./Repository";
import { fetchData, postData} from "./apicalls";
import Traveler from "./traveler";
import "./css/styles.css";
import "./images/turing-logo.png";

// GLOBAL DATA ***************************************************
let travelersRepository;
let tripsRepository;
let destinationRepository;
let randomTraveler;
let currentTraveler; 

// FETCH DATA *****************************************************
function getData(num){
  Promise.all([
  fetchData(`travelers/${num}`),
  fetchData("trips"),
  fetchData("destinations"),
]).then((data) => {
  setData(data);
  console.log(data)
});
}
 const navBar = document.querySelector('.nav-bar')
 const mainPage = document.querySelector('.main')
 const loginContainer = document.querySelector('.log-in-container')
 const loginName = document.querySelector('.login-name')
 const loginPassword = document.querySelector('#password')
 const loginBtn= document.querySelector('.submit-login')
 const logInError = document.querySelector('.error')

 loginBtn.addEventListener('click', confirmLogin)

function confirmLogin(){
  let userID = loginName.value.slice(8)
  console.log(userID)
  if(loginPassword.value === 'travel'){
    getData(userID)
    loginContainer.classList.add('hidden')
    navBar.classList.remove('hidden')
    mainPage.classList.remove('hidden')
  } else{
    logInError.innerHTML = "Incorrect UserName or Password"
  }
}
 function loginScreen(){
loginContainer.classList.remove('hidden')
navBar.classList.add('hidden')
mainPage.classList.add('hidden')
}

function setData(data) {
  randomTraveler = new Traveler(data[0])
  tripsRepository = new Repository(data[1].trips);
  destinationRepository = new Repository(data[2].destinations);
  randomTraveler.setUserData(tripsRepository, "trips", "userID");
  randomTraveler.setTravelerDestinations(destinationRepository);
  console.log("random traveler", randomTraveler);
  displayData();
}

// function getRandomTraveler(travelers) {
//   const randomIndex = Math.floor(Math.random() * travelers.length);
//   const randomUserData = travelersRepository.findUser(randomIndex, "id");
//   return new Traveler(randomUserData[0]);
// }

// DOM ELEMENTS ***************************************************
const travelerName = document.querySelector(".user-name");
const cardSection = document.querySelector(".card-section");
const totalDisplay = document.querySelector(".total-amount");
const newTripButton = document.querySelector('.new-trip-button')
const inputBanner = document.querySelector('.input-banner')
const cardContainer = document.querySelector(".card-container")
const inputDestOptions = document.querySelector('.data-entry-type-selection')
const userDateInput = document.querySelector('.date-input')
const userDurationInput = document.querySelector(".duration-amount")
const userNumTravelers = document.querySelector('.traveler-amount')
const bookTripBtn = document.querySelector('.select-dest-btn')
const inputForm = document.querySelector('.input-form')
const showEstimateBtn = document.querySelector('.show-estimate')
const displayEst = document.querySelector('.estimate')

// EVENT LISTENERS ************************************************
newTripButton.addEventListener('click', displayForm)
bookTripBtn.addEventListener('click', bookTrip)
window.addEventListener('load', loginScreen)
showEstimateBtn.addEventListener('click', retrieveInputData)
// window.addEventListener('load', getRandomTravelerData)
// EVENT HANDLERS *************************************************

function retrieveInputData (event) {
  event.preventDefault()
  const destSelect = inputDestOptions.options[inputDestOptions.selectedIndex].value
  const destID = destinationRepository.data.find(destination => destination.destination === destSelect)
  const tripId = tripsRepository.data.length + 1
  const travelerData = {
    id: tripId,
    userID: randomTraveler.id, 
    destinationID: destID.id,
    travelers: parseInt(userDurationInput.value), 
    date: userDateInput.value.split('-').join('/'), 
    duration: parseInt(userDurationInput.value) , 
    status:'pending', 
    suggestedActivities: []
  }
  tripsRepository.data.push(travelerData)
  currentTraveler = travelerData
  calcSingleTrip(travelerData)
}
function bookTrip (event){
  event.preventDefault()
  const destSelect = inputDestOptions.options[inputDestOptions.selectedIndex].value
  const destID = destinationRepository.data.find(destination => destination.destination === destSelect)
  postData('trips', currentTraveler)
  displayDestinationData('pending', destID, currentTraveler)
  inputBanner.classList.add("hidden")
  inputForm.reset()
  displayEst.innerText = " "
}

function calcSingleTrip(inputData) {
  const currentDestinationID = inputData.destinationID
  const total = destinationRepository.data.reduce((acc, destination) => {
    if (currentDestinationID === destination.id) {
      const currentFlightCost = inputData.travelers * destination.estimatedFlightCostPerPerson
      const currentLodgingCost = inputData.duration * destination.estimatedLodgingCostPerDay
      acc += currentFlightCost + currentLodgingCost
    }
    return acc
  },0)
  const fee = total * .10
  const totalPlusFee = total + fee
  console.log(totalPlusFee)
  const estimate = totalPlusFee.toFixed(2)
   return displayEst.innerText += `Your Trip Estimate is $${estimate}`
}

function displayData() {
  travelerName.innerText = randomTraveler.findTravelerName();
  totalDisplay.innerText = ''
  totalDisplay.innerText = randomTraveler.calcTotalTripCost();
  displayDestinations();
  displayDropDown();
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
  console.log('im working')
  inputBanner.classList.toggle("hidden")
}

function displayDropDown () { 
  let destinationName = destinationRepository
  .findAllDestinations(destinationRepository)
  destinationName.forEach(dest => 
    inputDestOptions.innerHTML += ` 
    <option 
      class="destination-data" 
      value = "${dest}">${dest}
    </option>`
    )
}


