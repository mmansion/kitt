var udp   = require('dgram');
var osc   = require('osc-min');

console.log(osc);

var sock = udp.createSocket("udp4", function(msg, rinfo) {
  var error;
  try {
    return console.log(osc.fromBuffer(msg));
  } catch (_error) {
    error = _error;
    return console.log("invalid OSC packet");
  }
});

sock.bind("9999");