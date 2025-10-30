const express = require('express')
const cors = require('cors') 

const app = express()
const port = 3333


app.use(cors())

app.use(express.json())

app.get('/', (request, response) => {
  response.json({message: 'Atualizado teste'})
})

app.post('/api/users/register', (request, response) => {
    const {name, email, password} = request.body

    if(!name){
        return response.status(400).json({message: `Nome é obrigatório.`})
    }
    if(!email){
        return response.status(400).json({message: `Email é obrigatório.`})
    }
    if(!password){
        return response.status(400).json({message: `Password é obrigatório.`})
    }

    console.log(request.body)

    return response.status(201).json({message: 'Usuário cadastrado verificado pela - Automação'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
