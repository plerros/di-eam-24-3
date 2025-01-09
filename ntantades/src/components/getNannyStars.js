import Database from "../data.json";

export default function getNannyStars (uid) {
  var offers = Database.offers.filter(item => item.uidNanny === uid);
  const requestIDs = [];
  for (let i = 0; i < offers.length; i++) {
    if (offers[i].requestID !== 0)
      requestIDs.push(offers[i].requestID)
  }

  var agreements = Database.agreements.filter(item => requestIDs.includes(item.requestID));
  const agreementIDs = [];
  for (let i = 0; i < agreements.length; i++) {
    if (agreements[i].id !== 0)
      agreementIDs.push(agreements[i].id)
  }

  var reviews = Database.reviews.filter(item => agreementIDs.includes(item.agreementID));
  var sum = 0.0;
  for (let i = 0; i < reviews.length; i++) {
    if (reviews[i].id !== 0)
      sum += reviews[i].stars;
  }

  return (sum / (1.0 * reviews.length) );
}