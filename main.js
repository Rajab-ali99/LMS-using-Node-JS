const express = require('express')
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url)
const dbName = 'LMS';
const app = express()
const port = 3000
app.use(express.static('public'))

app.get('/', (req, res) => {
  
  res.sendFile("index.html", {root:__dirname})
})
app.get('/send', (req, res) => {
  
  res.sendFile("/public/my.html", {root:__dirname})
})
app.get('/form-submit', async(req, res) => {
  async function main(){
    
    await  client.connect()
    const db = client.db(dbName);
    const info = db.collection('documents');
    await info.insertOne(req.query)
    
  }
  main()
  res.send(req.query)

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})