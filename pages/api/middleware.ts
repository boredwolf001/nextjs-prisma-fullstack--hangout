import nextConnect from 'next-connect'
import multipartFormParser from '../../middleware/parse-formdata'

const middleware = nextConnect()

middleware.use(multipartFormParser)

export default middleware
