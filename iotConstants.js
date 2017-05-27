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
    keyPath: __dirname + '/keys/e349f42bca-private.pem.key',
    certPath: __dirname + '/keys/e349f42bca-certificate.pem.crt',
    caPath: __dirname + '/keys/rootCA.crt',
    clientId: "PiWeather",
    region: "us-east-1",
  }
}
