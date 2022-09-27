import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/traveler.js'
import Repository from '../src/Repository.js'
import destinationData from '../src/data/destination-mock.js'
import tripsData from '../src/data/trip-mock.js'
import travelersData from '../src/data/traveler-mock.js'
// import trips from'../src/data/traveler-mock.js'

// console.log(trips)
describe('Traveler', function() {
  let traveler1;
  let traveler2;
  let destinationRepo;
  let tripRepo;

beforeEach(() => {
    traveler1 = new Traveler(travelersData[0]),
    traveler2 = new Traveler(travelersData[1]),
    destinationRepo = new Repository(destinationData),
    tripRepo = new Repository(tripsData)
})

  it('should be a function', () => {
    expect(Traveler).to.be.a('function')
  });
  it('should be an instance of traveler', () => {
    expect(traveler1).to.be.instanceOf(Traveler)
    expect(traveler2).to.be.instanceOf(Traveler)
  });
  it('should have an id for traveler', () => {
    expect(traveler1.id).to.equal(1)
    expect(traveler2.id).to.equal(2)
  });
  it('should have a name for traveler', () => {
    expect(traveler1.name).to.equal('Ham Leadbeater')
    expect(traveler2.name).to.equal('Rachael Vaughten')
  });
  it('should have a travelerType', () => {
    expect(traveler1.travelerType).to.equal('relaxer')
    expect(traveler2.travelerType).to.equal('thrill-seeker')
  });
  it('should return a traveler name', () => {
    expect(traveler1.findTravelerName()).to.equal('Hello, Ham Leadbeater')
    expect(traveler2.findTravelerName()).to.equal('Hello, Rachael Vaughten')
  });
  it("should have a property that stores trip data", () => {
    traveler1.setUserData(tripRepo, 'trips', 'userID')
    traveler2.setUserData(tripRepo, 'trips', 'userID')

    expect(traveler1).to.have.property('trips')
    expect(traveler2).to.have.property('trips')
  });

  it('should have a property that stores destination data', () => {
    traveler1.setUserData(tripRepo, 'trips', 'userID')
    traveler2.setUserData(tripRepo, 'trips', 'userID')
    traveler1.setTravelerDestinations(destinationRepo)
    traveler2.setTravelerDestinations(destinationRepo)

    expect(traveler1).to.have.property('destinations')
    expect(traveler2).to.have.property('destinations')
  })
  it('should calculate an average for trips this year', () => {
    traveler1.setUserData(tripRepo, 'trips', 'userID')
    traveler2.setUserData(tripRepo, 'trips', 'userID')
    traveler1.setTravelerDestinations(destinationRepo)
    traveler2.setTravelerDestinations(destinationRepo)

    expect(traveler1.calcTotalTripCost()).to.equal('The Total Cost of all your Trips this year 2022 is $0.00.')
    expect(traveler2.calcTotalTripCost()).to.equal('The Total Cost of all your Trips this year 2022 is $6270.00.')
  })
  
});