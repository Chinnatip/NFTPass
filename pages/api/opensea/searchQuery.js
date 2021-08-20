import Cors from 'cors'
import axios from 'axios'
import { queryFinder } from '../../../method/opensea/graph'
import initMiddleware from '../../../method/middleware'

// Initialize the cors middleware
const cors = initMiddleware( Cors({ methods: ['GET', 'POST', 'OPTIONS'], }))

export default async function handler(req, res) {
  await cors(req, res)
  if(req.method === 'GET'){
    const address = req.query.address
    // const parse_url = `https://api.opensea.io/graphql/`
    // const parcel = JSON.stringify({
    //   id: "NavSearchQuery",
    //   variables:{
    //     query: address
    //   },
    //   query: queryFinder
    // })
    // const response = await axios.post(parse_url, parcel, { headers: {
    //   'Content-Type': 'application/json',
    //   'Cookie': 'csrftoken=K7Aj3O03FgBZ4fIN2HUe8mzUIHldWpAGkSO3NNs5ssCgrYcXhbX7VPxFLr36dRsC; __cf_bm=141055757519a6758ad6cd5b937203f176628170-1629295148-1800-AUnTjl1Zb3hxxCHzrDz9aK/Fivnfut+u9PZqfBsRa28gnVeZIALE87RF4u8cZcppZNpodxIP3lBZJzaUHb2zQI4='
    //  }})

    console.log('1>>>>')
    var data = JSON.stringify({
      "id": "NavSearchQuery",
      "query": "query NavSearchQuery(\n  $query: String!\n) {\n  accounts(first: 4, query: $query) {\n    edges {\n      node {\n        address\n        chain {\n          identifier\n          id\n        }\n        config\n        discordId\n        imageUrl\n        relayId\n        user {\n          publicUsername\n          id\n        }\n        ...accounts_url\n        id\n      }\n    }\n  }\n  collections(first: 4, query: $query, sortBy: SEVEN_DAY_VOLUME, includeHidden: true) {\n    edges {\n      node {\n        assetContracts(first: 100) {\n          edges {\n            node {\n              account {\n                address\n                id\n              }\n              id\n            }\n          }\n        }\n        imageUrl\n        name\n        relayId\n        slug\n        stats {\n          totalSupply\n          id\n        }\n        ...verification_data\n        id\n      }\n    }\n  }\n}\n\nfragment accounts_url on AccountType {\n  address\n  user {\n    publicUsername\n    id\n  }\n}\n\nfragment verification_data on CollectionType {\n  isMintable\n  isSafelisted\n  isVerified\n}\n",
      "variables":{
        "query": "0x0cfe3e0c1c24fdc272000683b7d4478af6b25d28"
      }
    });

    var config = {
      method: 'post',
      url: 'https://api.opensea.io/graphql/',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'csrftoken=K7Aj3O03FgBZ4fIN2HUe8mzUIHldWpAGkSO3NNs5ssCgrYcXhbX7VPxFLr36dRsC; __cf_bm=141055757519a6758ad6cd5b937203f176628170-1629295148-1800-AUnTjl1Zb3hxxCHzrDz9aK/Fivnfut+u9PZqfBsRa28gnVeZIALE87RF4u8cZcppZNpodxIP3lBZJzaUHb2zQI4='
      },
      data : data
    };
    console.log('2>>>>')

    const response = await axios(config)
    let result
    console.log(response)


    if(response.status == 200){
      const accountLists = response.data.data.accounts.edges
      if( accountLists.length > 0 ){
        const { /*chain: { identifier },*/ imageUrl, user: { publicUsername }} = accountLists[0].node
        result = {
          status:  true,
          pic:   imageUrl,
          username: publicUsername,
          address: address,
          description: '',
          // chain:   identifier // not existed
        }
      }else{
        result = { status: false }
      }
      res.status(200).json(result)
    }else{
      res.status(500).json({ message: 'Some error occurred' })
    }
  }else{
    res.json({ message: 'Hello Everyone!' })
  }
}

