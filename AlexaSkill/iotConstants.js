/**
* The IotConstants.js
*
* This module is responsible for providing the IoT device connection configuration.
*
* Author - Sze Yick
* Last Updated - 15/4/2017
*/
var iotConstants = module.exports = {
  configuration: {
    keyPath: __dirname + '/keys/private.pem.key',
    certPath: __dirname + '/keys/certificate.pem.crt',
    caPath: __dirname + '/keys/rootCA.crt',
    clientId: "PiWeather",
    region: "us-east-1",
  }
}
