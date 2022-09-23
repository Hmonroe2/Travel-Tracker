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
}
export default Traveler 