import { recoverTypedSignature_v4 } from 'eth-sig-util'
import { VercelRequest, VercelResponse } from '@vercel/node'
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  // variables
  const { chainId } = req.body
  const params: any = {
    domain: {
      chainId,
      name: 'Galleryst',
      version: '0.1',
    },
    message: {
      contents: 'Signature is requested to verify your Ethereum address ownership',
    },
    primaryType: 'Payload',
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
      ],
      Payload: [{ name: 'contents', type: 'string' }],
    },
  }
  // handlers
  switch (req.method) {
    case 'GET': {
      res.status(200).send(params)
      break
    }
    case 'POST': {
      const { addressToVerify, typedSignature } = req.body
      const recoveredAddr = recoverTypedSignature_v4({
        data: params,
        sig: typedSignature,
      })
      const verified = addressToVerify.toLowerCase() === recoveredAddr.toLowerCase()
      res.status(200).send({ verified })
      break
    }
    default: {
      res.status(404).send('Not found')
    }
  }
}
