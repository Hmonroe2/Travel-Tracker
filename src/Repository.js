class Repository {
  constructor(data) {
    this.data = data;
  }
  findUser(id, property) {
    return this.data.filter((user) => user[property] === id);
  }
  findTravelerDestinations(travelersTrips) {
    const tripDestinationIDs = travelersTrips.map((trip) => trip.destinationID);
    const trip = this.data.reduce((acc, destination) => {
      if (tripDestinationIDs.includes(destination.id)) {
        acc.push(destination);
      }
      return acc;
    }, []);
    return trip;
  }
  findAllDestinations(repo) {
    return repo.data.map((dest) => dest.destination).sort();
  }
}
export default Repository;
