// export default function handler(req, res) {
//   if (req.method === 'POST') {
//     // const { payload, set_day, file_name } = req.body
//     // Handle any other HTTP method
//     res.status(200).json({ name: req.body })
//   } else {
//     // Handle any other HTTP method
//     res.status(200).json({ name: 'sorry other method is disable for now' })
//   }
// }



import Cors from 'cors'
import initMiddleware from '../../method/middleware'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

export default async function handler(req, res) {
  // Run cors
  await cors(req, res)

  // Rest of the API logic
  res.json({ message: 'Hello Everyone!' })
}
