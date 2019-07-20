const ethers = require('ethers')

const ABI = require('./abi/NFT.json')

const priv = {
  organizer: '10B66F350C67597FE95FC22971C7ED4F0E37C85AB01429E98F4A09CBF2483EB7',
  merchant: 'BEC45E8118A142DF5BB2BE9C2EB40DA6A18D8A802C1A56E96446139EBF7F0E3B',
  customer: '97EC2CD9123FD604B588220A55C891C639F45D7C8F3091A67FF5EB7C306796BA',
}

const NFT_ADDRESS = '0x96006E4552C38380Ec541d7382038064B71Ba62d'
const INFURA_ID = '0e59bd9ea109496ea14c5d3ea3982133'
const customer = '0x98e6E5416070cB5cdd2Ea9CB71ad2C89d970bAe0'
const merchant = '0x94278F998e4033c9395d4cb570A9DdA9e2916319'

const overrides = {
  // The maximum units of gas for the transaction to use
  gasLimit: 500000,

  // The price (in wei) per unit of gas
  gasPrice: ethers.utils.parseUnits('50.0', 'gwei'),
}

class NFT {
  constructor () {
    this.contractAddress = ethers.utils.getAddress(NFT_ADDRESS)
    this.provider = new ethers.providers.InfuraProvider('ropsten', INFURA_ID)

    this.organizer = new ethers.Wallet(priv.organizer, this.provider)
    this.merchant = new ethers.Wallet(priv.merchant, this.provider)
    this.customer = new ethers.Wallet(priv.customer, this.provider)
  }

  async approve (address, tokenId) {
    const contract = new ethers.Contract(NFT_ADDRESS, ABI, this.merchant)
    const { hash } = await contract.approve(address, tokenId, overrides)

    return hash
  }

  async burn (tokenId) {
    const contract = new ethers.Contract(NFT_ADDRESS, ABI, this.customer)
    const { hash } = await contract.burn(tokenId)

    return hash
  }

  async transfer (tokenId) {
    const contract = new ethers.Contract(NFT_ADDRESS, ABI, this.merchant)
    const { hash } = await contract.transferFrom(
      merchant,
      customer,
      tokenId,
      overrides
    )

    return hash
  }
  async assignEvent (couponId, eventHash) {
    const contract = new ethers.Contract(NFT_ADDRESS, ABI, this.merchant)
    const { hash } = await contract.assignEvent(couponId, eventHash, overrides)

    return hash
  }

  async viewEvent (eventHash) {
    const contract = new ethers.Contract(NFT_ADDRESS, ABI, this.merchant)

    const couponHash = await contract.viewT(eventHash)

    return couponHash
  }

  async tokensOfOwner () {
    const contract = new ethers.Contract(NFT_ADDRESS, ABI, this.merchant)

    const arr = await contract.tokensOfOwner(customer)

    return arr.map(elem => elem.toString())
  }

  async tokenUri (tokenId) {
    const contract = new ethers.Contract(NFT_ADDRESS, ABI, this.merchant)

    const uri = await contract.tokenURI(tokenId)

    return uri
  }
}

module.exports = NFT
