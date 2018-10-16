var moloch = require('./Moloch')

var molochClient = new moloch({
    ip: '1.1.4.1',
    userName: 'Duke',
    password: 'Nukem!'
})

molochClient.getOutGoingConnectionsForIP('10.1.43.39')
    .then((res) => {
        console.log(res)
    })
    .then(() => {
        molochClient.getIncomingConnectionsForIP('10.1.43.39').then((res) => {
            console.log(res)
        })
    })
    .then(() => {
        molochClient.getConnectionsByProtocol('smb','96').then((res) => {
            console.log(res)
        })
    }).catch((err) => {
        console.log(err)
    })
    .then(() => {
        molochClient.getOutotgoingConnectionsToCountry('US').then((res) => {
            console.log(res)
        })
    }).catch((err) => {
        console.log(err)
    })


    /*
    Response :
    [ '10.1.2.28:137', '10.1.2.28:0', '1.1.42.2:445' ]
[ '10.1.3.38:80',
  '10.1.3.37:443',
  '10.2.3.39:443',
  '123.1.3.6:443',
  '10.2.4.8:443',
  '10.2.3.7:80' ]
[ '1.17.43.3 to 1.12.35.2',
  '1.16.43.3 to 1.12.35.2',
  '1.15.42.2 to 1.13.43.251',
  '1.14.42.0 to 1.14.43.221',
  '1.13.43.6 to 1.15.43.221',
  '1.12.43.3 to 1.16.43.222' ]
  */