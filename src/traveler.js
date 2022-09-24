class Traveler {
  constructor(data) {
    this.id = data.id,
    this.name = data.name
    this.travelerType = data.travelerType;
  }
  findTravelerName() {
    return this.name;
  }
  setUserData(repo, dataArray, property) {
    this[dataArray] = repo.findUser(this.id, property);
  }
  setTravelerDestinations(dataset) {
    this.destinations = dataset.findTravelerDestinations(this.trips);
  }
  calcTotalTripCost(){
    // const todaysDate = new Date().toISOString().slice(0, 10).split("-").join("/");
    const thisYearsTrips = this.trips.filter((trip) => trip.date > '2022/01/01').map(trip => trip.destinationID)
    const total = this.destinations.reduce((acc, destination) =>{
      if(thisYearsTrips.includes(destination.id)){
        const thisYearsTrips = this.trips.find((trip) => trip.destinationID === destination.id)
        const flightCost = thisYearsTrips.travelers * destination.estimatedFlightCostPerPerson
        const lodgingCost = thisYearsTrips.duration * destination.estimatedLodgingCostPerDay
        acc = flightCost + lodgingCost
      }
      return acc
    },0)
      const fee = total * .10
      const totalWithFee = total + fee

      return`The Total Cost of all your Trips this year is $${totalWithFee}.`
  }
  calcIndiviualTripCost(){
    const total = this.destinations.reduce((acc, destination) =>{
        const thisYearsTrips = this.trips.find((trip) => trip.destinationID === destination.id)
        const flightCost = thisYearsTrips.travelers * destination.estimatedFlightCostPerPerson
        const lodgingCost = thisYearsTrips.duration * destination.estimatedLodgingCostPerDay
        acc = flightCost + lodgingCost
      
      return acc
    },0)
      const fee = total * .10
      const totalWithFee = total + fee
      console.log(totalWithFee)
  }
  
}
export default Traveler 