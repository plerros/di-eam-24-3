import JsonDatabase from "../data.json";

export function json_to_localstorage() {
    const Database = localStorage.getItem('Database');
    if (Database === null) {
        alert("resetting database from .json")
        localStorage.setItem('Database', JSON.stringify(JsonDatabase));
    }
}

export function get() {
    return (JSON.parse(localStorage.getItem('Database')));
}

export function getUser(uid) {
    const Database = get();
    var user = Database.users.filter(item => item.userID === uid)[0];
    if (user == null)
        user = Database.users.filter(item => item.userID === 0)[0]
    
    return user;
}

export function setUser(uid) {

}

export function getUsers (props) { 
  const Database = get();
  return  (Database.users.filter(item =>
    (props.userID === undefined || (
      item.userID === props.userID
    ))
    && (props.notUserID === undefined || (
      item.userID !== props.notUserID
    ))
    && (props.listUserID === undefined || (
      props.listUserID.includes(item.userID)
    ))
    && (props.email === undefined || (
      item.email === props.email
    ))
    && (props.password === undefined || (
      item.password === props.password
    ))
    && (props.firstName === undefined || (
      item.firstName === props.firstName
    ))
    && (props.lastName === undefined || (
      item.lastName === props.lastName
    ))
    && (props.age === undefined || (
      (item.age >= props.age[0])
      && ( item.age <= props.age[1])
    ))
    && (props.gender === undefined || (
      item.gender === props.gender
    ))
    && (props.municipality === undefined || (
      item.municipality === props.municipality
    ))
    && (props.postalCode === undefined || (
      item.postalCode === props.postalCode
    ))
    && (props.role === undefined || (
      item.role === props.role
    ))
  ))

}

export function getOffers (props) {
  const Database = get();
  return  (Database.offers.filter(item =>
    (props.id === undefined || (
      item.id === props.id
    ))
    && (props.notId === undefined || (
      item.id !== props.notId
    ))
    && (props.uidNanny === undefined || (
      item.uidNanny === props.uidNanny
    ))
    && (props.published === undefined || (
      item.published === props.published
    ))
    && (props.type === undefined || (
      item.type === props.type
    ))
    && (props.availableDays === undefined || (
      (new Set(props.availableDays)).isSubsetOf(new Set(item.availableDays))
    ))
    && (props.availableHours === undefined || (
      (item.availableHours[0] >= props.availableHours[0])
      && (item.availableHours[1] <= props.availableHours[1])
    ))
    && (props.rendezvousDays === undefined || (
      item.rendezvousDays.isSubsetOf(props.rendezvousDays)
    ))
    && (props.rendezvousHours === undefined || (
      (item.rendezvousHours[0] >= props.rendezvousHours[0])
      && (item.rendezvousHours[1] <= props.rendezvousHours[1])
    ))
    && (props.requestID === undefined || (
      item.requestID === props.requestID
    ))
    && (props.notRequestID === undefined || (
      item.requestID !== props.notRequestID
    ))
  ))
}

export function getRequests (props) {
  const Database = get();
  return  (Database.requests.filter(item =>
      (props.id === undefined || (
          item.id === props.id
      ))
      && (props.notId === undefined || (
          item.id !== props.notId
      ))
      && (props.uidFamily === undefined || (
          item.uidFamily === props.uidFamily
      ))
      && (props.agreedDays === undefined || (
        item.agreedDays.isSubsetOf(props.agreedDays)
      ))
      && (props.agreedHours === undefined || (
        (item.agreedHours[0] >= props.agreedHours[0])
        && (item.agreedHours[1] <= props.agreedHours[1])
      ))
  ))
}

export function getAgreements (props) {
    const Database = get();
    return  (Database.agreements.filter(item =>
        (props.id === undefined || (
            item.id === props.id
        ))
        && (props.notId === undefined || (
            item.id !== props.notId
        ))
        && (props.requestID === undefined || (
            item.requestID === props.requestID
        ))
        && (props.listRequestIDs === undefined || (
            props.listRequestIDs.includes(item.requestID)
        ))
        && (props.accepted === undefined || (
            item.accepted === props.accepted
        ))
    ))
}

export function getReviews (props) {
  const Database = get();
  return  (Database.reviews.filter(item =>
      (props.id === undefined || (
          item.id === props.id
      ))
      && (props.notId === undefined || (
          item.id !== props.notId
      ))
      && (props.agreementID === undefined || (
          item.agreementID === props.agreementID
      ))
      && (props.listAgreementIDs === undefined || (
          props.listAgreementIDs.includes(item.agreementID)
      ))
  ))
}

export  function getStars (uid) {
  const Database = get();
  const offers = getOffers({uidNanny:uid, notRequestID:0});
  const requestIDs = offers.map((item) => (item.id));
  const agreements = getAgreements({notId:0, listRequestIDs: requestIDs});
  const agreementIDs = agreements.map((item) => (item.id));
  const reviews = getReviews({notId:0, listAgreementIDs: agreementIDs})

  var sum = 0.0;
  for (let i = 0; i < reviews.length; i++) {
    if (reviews[i].id !== 0)
      sum += reviews[i].stars;
  }

  return (sum / (1.0 * reviews.length) );
}