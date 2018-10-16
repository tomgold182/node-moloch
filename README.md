# node-moloch #

Moloch is an extremely powerfull open-source packet sniffer (see https://github.com/aol/moloch )
node-moloch is a simple Node.js Moloch client which gives you the ability to query your Moloch server easily and fetch security-related information.



### About ###
* Created By Tom Goldberg

### Supported functionalities: ###
node-moloch is currently supporting the following actions: 

| Method | Description | Input | Successful Output  
| ------ | ------ | ------ | ------ |
| getOutGoingConnectionsForIP(<IP>) | Gets all of the outgoing connections for this particular IP address | IP address (string)  | An array of IP's followed by ports
| getIncomingConnectionsForIP(<IP>) | Gets all of the incoming connections to this particular IP address | IP address (string)  | An array of IP's followed by ports 
| getConnectionsByProtocol(<Protocol>) | Gets a list of all connections for a specific protocol | smb,http,https,ldap,udp,tcp,dns,tls,etc.. | an array containaing the relevant connections 
| getOutotgoingConnectionsToCountry(<IP>) | Given a country , rerieves a list  of IP addresses communicating with server hosted on hits country | CountryCode ('IL','US','IE' ,etc... | an array containaing the relevant connections

#### Important Note :
all of the queries go 24 hours back by default . If you wish to query for less/more time , just add the number of hours that you want to query as a second (optional) parameter to every action.
For example: getOutGoingConnectionsForIP('192.168.3.2','96') will search for outgoing connections made by 192.168.3.2 in the last 96 hours.



### How To ###

1. cd in to your project folder and npm install this reposotory 
~~~ 
npm install --save node-moloch
~~~
2. require the node-moloch repo.
~~~
var Moloch=require('node-moloch')
~~~
 3.Set the connection
~~~
var molochClient = new moloch({
    ip: '10.1.2.21',
    userName: 'Duke',
    password: 'Nukem'
})
~~~

 4.Use the module. For complete and detailed set of examples , see the examples.js file.
~~~
molochClient.getOutGoingConnectionsForIP('10.1.43.39')
    .then((res) => {
        console.log(res)
    })
    .then(() => {
        molochClient.getIncomingConnectionsForIP('10.1.43.39').then((res) => {
            console.log(res)
        })
    })
~~~
