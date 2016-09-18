

var domainName = 'http://45.55.166.191';
var port = 3020

// --------------------------- start auth --------------------------------------
export function signIn(username, password){
  return fetch(`${domainName}:${port}/auth/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    })
  })
}

export function signOut(id){
  return fetch(`${domainName}:${port}/auth/signout`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    header: JSON.stringify({
      id: id,
    })
  })
}

export function signup(username, password, email){
  return fetch(`${domainName}:${port}/auth/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email
    })
  })
}

// --------------------------- end auth ----------------------------------------




// --------------------------- start markers ----------------------------------------
export function createMarker(position, userid, name, review){
  console.log("starting the createMarker");
  return fetch(`${domainName}:${port}/markers/create`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      profileid: userid,
      name: name,
      review: review,
      longitude: position.longitude,
      latitude: position.latitude,
      code: ""
    })
  }).done(function(){ console.log("finished create maker");  });
}

export function getMyMarkers(userid){
  // TODO
}

export function getAllMarkers(userid){
 // TODO
}
export function deleteMarker(markerid){
 //TODO
}
// --------------------------- end markers ----------------------------------------



// --------------------------- start social ----------------------------------------

export function followUser(userid, friendId){
  return fetch(`${domainName}:${port}/social/add`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    headers: JSON.stringify({
      userid: userid,
      friendId: friendId
    })
  })
}
// --------------------------- end social ----------------------------------------

