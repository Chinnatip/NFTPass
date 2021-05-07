export default function handler(req, res) {
  if (req.method === 'POST') {
    // const { payload, set_day, file_name } = req.body
    // Handle any other HTTP method
    res.status(200).json({ name: req.body })
  } else {
    // Handle any other HTTP method
    res.status(200).json({ name: 'sorry other method is disable for now' })
  }
}
