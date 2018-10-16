var elasticsearch = require('elasticsearch');
var queryFactory = require('./queryFactory')

class Moloch {
    constructor(connectionDetails) {
        this.ip = connectionDetails.ip,
        this.userName = connectionDetails.userName
        this.password = connectionDetails.password
        this.client = new elasticsearch.Client({
            host: [{
                host: this.ip,
                auth: this.userName + ":" + this.password,
                protocol: 'http',
                port: 9200
            }]
        });
    }
    getOutGoingConnectionsForIP(ip, hoursBack = '24') {
        return new Promise((resolve, reject) => {
            let dstIps = new Set([])
            let results;
            let qf = new queryFactory(hoursBack)
            let query = qf.getOutGoingConnectionsForIPQuery(ip)
            this.client.search(query, (error, response) => {
                if (error) {
                    return reject(error)
                }
                results = response.hits.hits
                results.forEach(function (result) {
                    dstIps.add(result._source.dstIp + ':' + result._source.dstPort)
                })
                resolve(Array.from(dstIps))
            });
        })
    }
    getIncomingConnectionsForIP(ip, hoursBack = '24') {
        return new Promise((resolve, reject) => {
            let srcIps = new Set([])
            let results
            let qf = new queryFactory(hoursBack)
            let query = qf.getIncomingConnectionsForIPQuery(ip)
            this.client.search(query, (error, response) => {
                if (error) {
                    return reject(error)
                }
                results = response.hits.hits
                results.forEach(function (result) {
                    srcIps.add(result._source.srcIp + ':' + result._source.dstPort)
                })
                resolve(Array.from(srcIps))
            })
        })
    }
    getConnectionsByProtocol(protocol, hoursBack = '24') {
        return new Promise((resolve, reject) => {
            if (
                protocol != 'tcp' &&
                protocol != 'udp' &&
                protocol != 'ldap' &&
                protocol != 'krb5' &&
                protocol != 'smb' &&
                protocol != 'dns' &&
                protocol != 'tls' &&
                protocol != 'http' &&
                protocol != 'https' &&
                protocol != 'icmp' &&
                protocol != 'vnc' &&
                protocol != 'dhcpv4' &&
                protocol != 'dhcpv6' &&
                protocol != 'ldap' &&
                protocol != 'rdp' &&
                protocol != 'ssh' &&
                protocol != 'scp' &&
                protocol != 'rsync' &&
                protocol != 'ftp' &&
                protocol != 'sip'
            ) {
                return reject('Unknown Protocol')
            }
            let connections = new Set([])
            let results
            let qf = new queryFactory(hoursBack)
            let query = qf.getConnectionsByProtocolQuery(protocol)
            this.client.search(query, (error, response) => {
                if (error) {
                    return reject(error)
                }
                results = response.hits.hits
                results.forEach(function (result) {
                    connections.add(result._source.srcIp + ' to ' + result._source.dstIp)
                })
                resolve(Array.from(connections))
            })
        })
    }
    getOutotgoingConnectionsToCountry(countryCode, hoursBack = '24') {
        return new Promise((resolve, reject) => {
            let srcIps = new Set([])
            let results
            let qf = new queryFactory(hoursBack)
            let query = qf.getOutotgoingConnectionToCountryQuery(countryCode)
            this.client.search(query, (error, response) => {
                if (error) {
                    return reject(error)
                }
                results = response.hits.hits
                results.forEach(function (result) {
                    srcIps.add(result._source.srcIp + ':' + result._source.dstPort)
                })
                resolve(Array.from(srcIps))
            })
        })
    }

}
module.exports = Moloch