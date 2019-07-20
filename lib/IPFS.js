const ipfsClient = require('ipfs-http-client')
var ipfs = ipfsClient('ipfs.infura.io', '5001', { protocol: 'https' })

// example https://ipfs.infura.io:5001/api/v0/cat?arg=QmcpNxTSZt9VuqMNr9y3KVhmw1UTgw3nD6353MHToQjatY
/**
 * @class IPFS
 */
class IPFS {
  /**
   * Returns an IPFS hash
   *
   * @param {Object} obj - Stringified json
   * @returns {Promise<String>}
   */
  static add (obj) {
    return new Promise((resolve, reject) => {
      const data = Buffer.from(JSON.stringify(obj))
      ipfs.add(data, {}, (error, result) => {
        if (error) reject(error)
        resolve(result[0].path)
      })
    })
  }

  /**
   * Returns the data in string
   *
   * @param {String} text
   * @returns {Promise<String>}
   */
  static cat (hash) {
    return new Promise((resolve, reject) => {
      ipfs.cat(hash, {}, (error, result) => {
        if (error) reject(error)
        resolve(result.toString())
      })
    })
  }
}

module.exports = IPFS
