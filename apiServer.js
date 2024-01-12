// server.js
const jsonServer = require('json-server')
const path =  require('path');
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, './public/assets/db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running on port 3001')
})