import { VercelRequest, VercelResponse } from '@vercel/node'
import Cors from 'cors'
import initMiddleware from '../../method/middleware'
import Web3 from 'web3'

// Initialize the cors middleware
const infuraURL = 'https://mainnet.infura.io/v3/163b925860b348e186b41ee24f662ef5'
const cors = initMiddleware(
  Cors({ methods: ['GET', 'POST', 'OPTIONS'], })
)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await cors(req, res)
  if(req.method === 'POST'){
    const { address } = req.body
    const web3 = new Web3(infuraURL)
    const balance = await web3.eth.getBalance(address)
    const balanceInETH = web3.utils.fromWei(balance, 'ether')
    res.status(200).json(`Your current balance is  ${balanceInETH} ETH`)
  }else{
    res.json({ message: 'Hello Everyone!' })
  }
}
