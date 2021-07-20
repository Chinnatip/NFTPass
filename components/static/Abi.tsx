export const URI_ABI = {
  inputs: [
    {
      internalType: 'uint256',
      name: '',
      type: 'uint256',
    },
  ],
  name: 'uri',
  outputs: [
    {
      internalType: 'string',
      name: '',
      type: 'string',
    },
  ],
  stateMutability: 'view',
  type: 'function',
}

export const SUPPORT_INTERFACE_ABI = {
  inputs: [
    {
      internalType: 'bytes4',
      name: 'interfaceId',
      type: 'bytes4',
    },
  ],
  name: 'supportsInterface',
  outputs: [
    {
      internalType: 'bool',
      name: '',
      type: 'bool',
    },
  ],
  stateMutability: 'view',
  type: 'function',
}

export const TOKEN_URI_ABI = {
  inputs: [
    {
      internalType: 'uint256',
      name: 'tokenId',
      type: 'uint256',
    },
  ],
  name: 'tokenURI',
  outputs: [
    {
      internalType: 'string',
      name: '',
      type: 'string',
    },
  ],
  stateMutability: 'view',
  type: 'function',
}

// prettier-ignore
export const REQUIRED_ABIs = [
  SUPPORT_INTERFACE_ABI, // ERC-165  -> supportsInterface(bytes4 interfaceID)
  TOKEN_URI_ABI,         // ERC-721  -> tokenURI(uint256 _tokenId)
  URI_ABI                // ERC-1155 -> uri(uint256 _id)
]
