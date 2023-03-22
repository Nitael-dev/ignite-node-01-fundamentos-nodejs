import {Database} from "./database.js"
import {randomUUID} from 'node:crypto'
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const {search} = req.query
      const users = database.select('users', search && {
        name: search,
        email: search
      })
      return res
      .writeHead(200)
      .end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      return res.writeHead(201).end(undefined, () => {
        const {name, email} = req.body
        const user = {
          id: randomUUID(),
          name,
          email,
        }
        database.insert('users', user)
      })
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const {id} = req.params
      database.update('users', id, {
        name: req.body?.name,
        email: req.body?.email
      })
      return res.writeHead(201).end(JSON.stringify({
        name: req.body?.name,
        email: req.body?.email
      }))
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const {id} = req.params
      database.delete('users', id)
      return res.writeHead(204).end()
    }
  },
]