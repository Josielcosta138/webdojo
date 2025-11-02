const express = require('express')
const cors = require('cors') 

const app = express()
const port = 3333


app.use(cors())

app.use(express.json())

app.use((err, request, response, next) => {
  
  if(err instanceof SyntaxError){
      return response.status(400).json(
        { success: false,
          error: `JSON inválido.`
        }
      )
  }

  next()  
})

app.get('/', (request, response) => {
  response.json({message: 'Atualizado teste'})
})

app.post('/api/users/register', (request, response) => {
    const {name, email, password} = request.body

    if(!name){
        return response.status(400).json(
          { 
            success: false,
            message: `Nome é obrigatório.`
          }
        )
    }
    if(!email){
        return response.status(400).json(
          { success: false,
            message: `Email é obrigatório.`
          }
        )
    }
    if(!password){
        return response.status(400).json(
          {
            success: false,
            message: `Password é obrigatório.`
          }
        )
    }

    console.log(request.body)

    const id = Math.floor(Math.random() * 10000)

    //SE TIVESSE BANCO FAZIA A PERSISTENCIA AQUI

    return response.status(201).json(
      { success: true,
        message: 'Usuário cadastrado verificado pela - Automação',
        user: { 
          id, 
          name, 
          email 
        }
      })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
