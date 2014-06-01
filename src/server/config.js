module.exports = {

  //http server port
  httpPort: 9001,

  portConfig : {
    // parser: require('serialport').parsers.readline("\n"), //readline parser
    // baudrate: 9600,
    // dataBits: 8,
    // parity: 'none',
    // stopBits: 1,
    // flowControl: false
  },

  arduino: function() {
    return {

    };
  }
};