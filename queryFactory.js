class QueryFactory {
  constructor(hoursBack = '24') {
    this.hoursBack = hoursBack
  }
  getOutGoingConnectionsForIPQuery(ip) {
    return {
      index: 'sess*',
      body: {
        "_source": ["dstIp", "dstPort"],
        "query": {
          "bool": {
            "must": [{
                "term": {
                  "srcIp": ip
                }
              },
              {
                "range": {
                  "timestamp": {
                    "gte": `now-${this.hoursBack}h`,
                    "lte": "now"
                  }
                }
              }
            ]
          }
        }
      }
    }
  }
  getIncomingConnectionsForIPQuery(ip) {
    return {
      index: 'sess*',
      body: {
        "_source": ["srcIp", "dstPort"],
        "query": {
          "bool": {
            "must": [{
                "term": {
                  "dstIp": ip
                }
              },
              {
                "range": {
                  "timestamp": {
                    "gte": `now-${this.hoursBack}h`,
                    "lte": "now"
                  }
                }
              }
            ]
          }
        }
      }
    }
  }
  getConnectionsByProtocolQuery(protocol) {
    return {
      index: 'sess*',
      body: {
        "_source": ["srcIp", "dstIp"],
        "query": {
          "bool": {
            "must": [{
                "term": {
                  "protocol": protocol
                }
              },
              {
                "range": {
                  "timestamp": {
                    "gte": `now-${this.hoursBack}h`,
                    "lte": "now"
                  }
                }
              }
            ]
          }
        }
      }
    }
  }
  getOutotgoingConnectionToCountryQuery(countryCode) {
    return {
      index: 'sess*',
      body: {
        "_source": ["srcIp", "dstPort"],
        "query": {
          "bool": {
            "must": [{
                "term": {
                  "dstGEO": countryCode
                }
              },
              {
                "range": {
                  "timestamp": {
                    "gte": `now-${this.hoursBack}h`,
                    "lte": "now"
                  }
                }
              }
            ]
          }
        }
      }
    }
  }
}

module.exports = QueryFactory