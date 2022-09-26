class Traveler {
  constructor(data) {
    (this.id = data.id), (this.name = data.name);
    this.travelerType = data.travelerType;
  }
  findTravelerName() {
    return `Hello, ${this.name}`;
  }
  setUserData(repo, dataArray, property) {
    this[dataArray] = repo.findUser(this.id, property);
  }
  setTravelerDestinations(dataset) {
    this.destinations = dataset.findTravelerDestinations(this.trips);
    return this.trips;
  }
  calcTotalTripCost() {
    const thisYearsTrips = this.trips
      .filter((trip) => trip.date >= "2022/01/01")
      .map((trip) => trip.destinationID);
    const total = this.destinations.reduce((acc, destination) => {
      if (thisYearsTrips.includes(destination.id)) {
        const trips = this.trips.find(
          (trip) => trip.destinationID === destination.id
        );
        const flightCost =
          trips.travelers * destination.estimatedFlightCostPerPerson;
        const lodgingCost =
          trips.duration * destination.estimatedLodgingCostPerDay;
        acc = flightCost + lodgingCost;
      }
      return acc;
    }, 0);
    const fee = total * 0.1;
    const totalWithFee = total + fee;
    return `The Total Cost of all your Trips this year 2022 is $${totalWithFee}.`;
  }
}
export default Traveler;
