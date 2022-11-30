import { HOST } from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    user: '/user',
    device: '/device',
    consumption:'/consumption'
};
  
function getDeviceList(userId, callback) {
    let request = new Request(`${HOST.backend_api}${endpoint.user}${endpoint.device}/${userId}`, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getDeviceHourlyConsumptionList(deviceId, callback) {
    let request = new Request(`${HOST.backend_api}${endpoint.consumption}${endpoint.device}/${deviceId}`, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getDeviceList,
    getDeviceHourlyConsumptionList
};