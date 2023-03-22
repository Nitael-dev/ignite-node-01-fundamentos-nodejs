const json = async (req, res) => {
  const {method} = req
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch (error) {
    req.body = null
  }
  res.setHeader('Content-type', 'application/json')
}

export default json
