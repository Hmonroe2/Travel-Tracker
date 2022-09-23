// DEPENDENCIES **************************************************
import Repository from './Repository';
import { fetchData } from './apicalls';
import Traveler from './traveler';
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
// GLOBAL DATA ***************************************************
let travelersRepository; 
let tripsRepository ;
let desinationRepository;
let randomTraveler;

console.log('This is the JavaScript entry file - your code begins here.');

// FETCH DATA *****************************************************
Promise.all([fetchData("travelers"), fetchData("trips"), fetchData("destinations")])
  .then((data) => {
    setData(data);
    console.log('this is promise' ,data[1].trips)
  });

  function setData (data) {
    travelersRepository = new Repository(data[0].travelers);
    randomTraveler = getRandomTraveler(travelersRepository.data)
    tripsRepository = new Repository(data[1].trips)
    randomTraveler.setUserData(tripsRepository, 'trips', 'userID')
    desinationRepository = new Repository(data[2].destinations)
    console.log(desinationRepository)
    randomTraveler.setTravelerDestinations(desinationRepository)
    console.log('random' ,randomTraveler)
    displayData()
    displayDestinationData()
  }



function getRandomTraveler(travelers) {
  const randomIndex = Math.floor(Math.random() * travelers.length);
  const randomUserData = travelersRepository.findUser(randomIndex, 'id');
  return new Traveler(randomUserData[0]);
}

// DOM ELEMENTS ***************************************************
const travelerName = document.querySelector(".user-name")
let cardSection = document.querySelectorAll(".card-section")
// EVENT LISTENERS ************************************************
function displayData () {
travelerName.innerText = randomTraveler.findTravelerName()
}
// EVENT HANDLERS *************************************************


// function displayDestinationData () {
//   let destData = randomTraveler.trips.forEach((traveler) =>{
//     cardSection.innerHTML = ''
//       cardSection.innerHTML +=
//       '<article class ="card-container"><section class ="card-top"><img class="card-image"src="" alt="Cowboy "><img class= "card-logo"src="" alt="A curved arrow aiming right"><p class ="card-views"> Views 01</p></section><section class = "card-bottom"> <p class="= destination-name">${traveler}</p><p class="destination-date"> Monday, Jan 4th</p><h3 class="card-playlist">Playlist</h3><p class="card-playlist-name">Secrets for the Best Music!</p><h4 class="card-attachments">Attachments</h4><p class="card-number">04</p></section></article> '
//     })
//    return destData
// }




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