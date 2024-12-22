import Database from "../data.json";

export default function getUser (uid) {
  var user = Database.users.filter(item => item.userID === uid)[0];
  if (user == null)
      user = Database.users.filter(item => item.userID === 0)[0]
  
  return user;
}