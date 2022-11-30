import { HOST } from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
  device: '/device',
  consumption: '/consumption'
};

function getDevices(callback) {
    let request = new Request(`${HOST.backend_api}${endpoint.device}`, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function updateDevice(id, deviceParam, callback) {
    let request = new Request(`${HOST.backend_api}${endpoint.device}/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(deviceParam)
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}
  
function deleteDeviceById(id, callback) {
    let request = new Request(`${HOST.backend_api}${endpoint.device}/${id}`, {
      method: 'DELETE'
    });
  
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postEnergyConsumption(newEnergyConsumption, callback) {
  let request = new Request(`${HOST.backend_api}${endpoint.consumption}`, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEnergyConsumption)
  });

  console.log("URL: " + request.url);

  RestApiClient.performRequest(request, callback);
}

export {
    getDevices,
    updateDevice,
    deleteDeviceById,
    postEnergyConsumption
};