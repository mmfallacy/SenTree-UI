// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    SerialPort.list(function (err, ports) {
        ports.forEach(function(port) {
            console.log(port.comName,port.manufacturer);
        });
      });
})