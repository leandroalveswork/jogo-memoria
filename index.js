import express from 'express'

const app = express()

app.use(express.static('public'))
app.use(express.favicon('public/img/favicon.ico')); 

app.listen(process.env.PORT || 3000, () => {
    console.log('Joguinho rodando!')
})