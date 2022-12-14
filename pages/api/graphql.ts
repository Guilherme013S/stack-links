import Cors from 'micro-cors'
import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../graphql/schema'
import { resolvers } from '../../graphql/resolvers'
import { createContext } from '../../graphql/context'

const cors = Cors()

const apolloServer = new ApolloServer({
  schema,
  resolvers,
  context: createContext,
})

const serverStart = apolloServer.start()

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await serverStart
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
})

export const config = {
  api: {
    bodyParser: false,
  },
}
