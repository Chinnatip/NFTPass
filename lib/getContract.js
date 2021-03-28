const getContractInstance = async (web3, contractDefinition) => {
  // get network ID and the deployed address
  const networkId = await web3.eth.net.getId()
  console.log(networkId)
  console.log(contractDefinition.networks)

  const network_id = Object.keys(contractDefinition.networks)[0]
  const deployedAddress = contractDefinition.networks[network_id].address
  // create the instance
  const instance = new web3.eth.Contract(
    contractDefinition.abi,
    deployedAddress
  )
  return instance
}

export default getContractInstance
