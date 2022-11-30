import { HOST } from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
  user: '/user',
  log: '/login',
  device: '/device'
};

function getClients(callback) {
    let request = new Request(`${HOST.backend_api}${endpoint.user}/allCLIENT`, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postClient(newUser, callback) {
    let request = new Request(`${HOST.backend_api}${endpoint.user}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function updateClient(id, userParam, callback) {
    let request = new Request(`${HOST.backend_api}${endpoint.user}/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userParam)
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}
  
function deleteClientById(id, callback) {
    let request = new Request(`${HOST.backend_api}${endpoint.user}/${id}`, {
      method: 'DELETE'
    });
  
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
  
function login(params, callback) {
    let request = new Request(`${HOST.backend_api}${endpoint.log}?username=${params.username}&password=${params.password}`, {
      method: 'GET'
    });
  
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
  
function postDevice(newDevice, callback) {
  let request = new Request(`${HOST.backend_api}${endpoint.device}`, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDevice)
  });

  console.log("URL: " + request.url);

  RestApiClient.performRequest(request, callback);
}

export {
    getClients,
    postClient,
    updateClient,
    deleteClientById,
    login,
    postDevice
};