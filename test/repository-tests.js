import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/traveler.js'
import Repository from '../src/Repository.js'
import destinationData from '../src/data/destination-mock.js'
import tripsData from '../src/data/trip-mock.js'
import travelersData from '../src/data/traveler-mock.js'
// import trips from'../src/data/traveler-mock.js'

// console.log(trips)
describe('Repository', function() {
  let traveler1;
  let traveler2
  let travelerRepo;
  let destinationRepo;
  let tripRepo;

  beforeEach(() => {
    traveler1 = new Traveler(travelersData[0]),
    traveler2 = new Traveler(travelersData[1]),
    travelerRepo = new Repository(travelersData)
    destinationRepo = new Repository(destinationData),
    tripRepo = new Repository(tripsData)
})
  it('should be a function', () => {
    expect(Repository).to.be.a('function')
  })
  it('should be able to find user data given a user ID', () => {
  traveler1 = travelerRepo.findUser(1 ,'id')
  traveler2 = travelerRepo.findUser(2, 'id')
  expect(traveler1[0]).to.equal(travelersData[0])
  expect(traveler2[0]).to.equal(travelersData[1])
  })
  it('should be able to find destinations', () => {
    traveler1.setUserData(tripRepo, 'trips', 'userID')
    traveler2.setUserData(tripRepo, 'trips', 'userID')
    traveler1.setTravelerDestinations(destinationRepo)
    traveler2.setTravelerDestinations(destinationRepo)
   
  expect(traveler1.setTravelerDestinations(destinationRepo).to.equal(
    [
    {
      id: 2,
      destination: 'Stockholm, Sweden',
      estimatedLodgingCostPerDay: 100,
      estimatedFlightCostPerPerson: 780,
      image: 'https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      alt: 'city with boats on the water during the day time'
    }
  ]
  ))
  })

  it('should be able to get all destination and sort alphabetically', () => {
  let allDestinations =  destinationRepo.findAllDestinations(destinationRepo)
  expect(allDestinations).to.deep.equal(['Cartagena, Colombia', 'Jakarta, Indonesia', 'Lima, Peru', 'Madrid, Spain', 'Stockholm, Sweden', 'Sydney, Austrailia'])
  })
})