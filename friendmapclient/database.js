

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
      id: id
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
  return signup;
}

// --------------------------- end auth ----------------------------------------




// --------------------------- start markers ----------------------------------------
export function createMarker(marker, token){
  return fetch(`${domainName}:${port}/markers/create`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: marker.name,
      review: marker.review,
      longitude: marker.longitude,
      latitude: marker.latitude,
      code: marker.code,
      token: token
    })
  }).done(function(){ console.log("finished create maker");  });
}

export function getAllMarkers(token){
  return fetch(`${domainName}:${port}/markers/getAll`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      token: token
    }
  })
}
export function deleteMarker(markerid){
  return fetch(`${domainName}:${port}/markers/getAll`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      id: markerId
    }
  })
}
// --------------------------- end markers ----------------------------------------



// --------------------------- start social ----------------------------------------

export function followUser(token, friendId){
  return fetch(`${domainName}:${port}/social/add`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    headers: JSON.stringify({
      token: token,
      friendId: friendId
    })
  })
}
// --------------------------- end social ----------------------------------------

