import express from 'express'

const app = express()

app.use(express.static('public'))

app.get("/", (req, res) => {
    res.send('funcionando!')
})

app.listen(3000, () => {
    console.log('Joguinho rodando!')
})