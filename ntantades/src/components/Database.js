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

export function set(JsonDatabase) {
  localStorage.setItem('Database', JSON.stringify(JsonDatabase));
}

export function getUser(uid) {
    const Database = get();
    var user = Database.users.filter(item => item.userID === uid)[0];
    if (user == null)
        user = Database.users.filter(item => item.userID === 0)[0]
    
    return user;
}

export function setUser(props) {
  const Database = get();
  if (props.userID === undefined)
    return;

  if (props.userID > Database.users.length)
    return;

  var userID = props.userID;

  if (props.userID < 0) {
    userID = Database.users.length;
    Database.users.push({});
    Database.users[userID].userID = userID;
  }

  if (props.email !== undefined)
    Database.users[userID].email = props.email;

  if (props.password !== undefined)
    Database.users[userID].password = props.password;

  if (props.firstName !== undefined)
    Database.users[userID].firstName = props.firstName;

  if (props.lastName !== undefined)
    Database.users[userID].lastName = props.lastName;

  if (props.age !== undefined)
    Database.users[userID].age = props.age;

  if (props.gender !== undefined)
    Database.users[userID].gender = props.gender;

  if (props.phone !== undefined)
    Database.users[userID].phone = props.phone;

  if (props.address !== undefined)
    Database.users[userID].address = props.address;

  if (props.municipality !== undefined)
    Database.users[userID].municipality = props.municipality;

  if (props.postalCode !== undefined)
    Database.users[userID].postalCode = props.postalCode;

  if (props.role !== undefined)
    Database.users[userID].role = props.role;

  if (props.picture !== undefined)
    Database.users[userID].picture = props.picture;

  if (props.description !== undefined)
    Database.users[userID].description = props.description;
  
  set(Database);
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

export function setOffer (props) {
  const Database = get();
  if (props.id === undefined)
    return false;

  if (props.id > Database.offers.length)
    return false;

  var id = props.id;
  if (props.id < 0) {
    id = Database.offers.length;
    Database.offers.push({});
    Database.offers[id].id = id;
  }

  if (props.uidNanny !== undefined)
    Database.offers[id].uidNanny = props.uidNanny;
  if (props.published !== undefined)
    Database.offers[id].published = props.published;
  if (props.type !== undefined)
    Database.offers[id].type = props.type;
  if (props.availableDays !== undefined)
    Database.offers[id].availableDays = props.availableDays;
  if (props.availableHours !== undefined)
    Database.offers[id].availableHours = props.availableHours;
  if (props.rendezvousDays !== undefined)
    Database.offers[id].rendezvousDays = props.rendezvousDays;
  if (props.rendezvousHours !== undefined)
    Database.offers[id].rendezvousHours = props.rendezvousHours;
  if (props.requestID !== undefined)
    Database.offers[id].requestID = props.requestID;

  set(Database);
  return true;
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

export function getStars (uid) {
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