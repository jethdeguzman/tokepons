const { map } = require('awaity')
const Wew = require('./NFT')
const ipfs = require('./IPFS')

const NFT = new Wew()

class Coupon {
  /**
   *
   * Use for merchant to add coupons to an event
   * Called by merchant
   *
   * @method sponsor
   * @async
   * @param {String} couponId - coupon token id
   * @param {String} eventHash - event ipfs hash
   * @returns {Promise<Object>}
   */
  static async sponsor(couponId, eventHash) {
    return NFT.assignEvent(couponId, eventHash)
  }

  /**
   * Use for event organizer giving ownership to the customer
   * called by event organizer
   *
   * @method transfer
   * @async
   * @param {Number} couponId
   * @returns {Promise<Object>}
   */
  static async transferToCustomer(couponId) {
    const hash = await NFT.transfer(couponId)

    return { hash }
  }

  /**
   * Use to list customer coupons
   * called by customer
   *
   * @method tokensOfCustomer
   * @async
   * @returns {Promise<Array>}
   */
  static async tokensOfCustomer(couponId) {
    try {
      const str = await NFT.tokenUri(couponId)
      const obj = ipfs.cat(str)

      return [obj]
    } catch (_) {
      return []
    }
  }

  /**
   * Use for redeeming a coupon
   * called by merchant
   *
   * @method redeem
   * @async
   * @param {String} couponId - coupon NFT address
   * @returns {Promise<Object>}
   */
  static async redeem(couponId) {
    const hash = await NFT.burn(couponId)

    return { hash }
  }

  /**
   * Queries the properties of an event
   * @method event
   * @async
   * @param hash - ipfs hash
   * @returns {Promise<Object>}
   */
  static async event(hash) {
    const obj = await ipfs.cat(hash)

    return obj
  }

  /**
   * Queries the properties of a coupon
   *
   * @method coupon
   * @async
   * @param hash - ipfs hash
   * @returns {Promise<Object>}
   */
  static async coupon(hash) {
    const obj = await ipfs.cat(hash)

    return obj
  }

  /**
   * Use for querying a event's coupon
   * called by anyone
   *
   * @method eventCoupon
   * @async
   * @param {String} eventHash - eventHash
   * @returns {Promise<Object>}
   */
  static async eventCoupon(eventHash) {
    const coupon = await NFT.viewEvent(eventHash)
    const obj = await ipfs.cat(coupon)

    return obj
  }
}

module.exports = Coupon
