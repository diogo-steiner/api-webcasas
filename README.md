# api-webcasas

![GitHub](https://img.shields.io/github/license/steinerstt/api-webcasas?style=for-the-badge)

<br>

![api-webcasas](https://github.com/steinerstt/api-webcasas/assets/106714068/a3e33b9e-3a06-48f0-acac-3aa33b3d35af)

> Api desenvolvida para a aplicação <a href="https://github.com/steinerstt/webcasas">webcasas</a>
<br>

## 🛠️ Algumas tecnologias

### Esta api foi desenvolvida com as principais tecnologias

- Node.js
- Express.js
- TypeScript
- Prisma
- PostgreSQL
- Zod
- Bcrypt
- Jsonwebtoken
- Multer
- Cloudinary 

## 📌 Features

- [x] Usuários
  - [x] Cadastro de usuários
  - [x] Login de usuários
  - [x] Alterações de dados de cadastro e/ou foto de perfil
  - [x] Alteração de senha
  - [x] Desativação de conta   
  - [x] Ativação de conta   
  - [x] Deleção de conta   
- [x] Propriedades
  - [x] Anunciar propriedade
  - [x] Desativar/ativar anúncio de propriedade
  - [x] Deletar anúncio de propriedade 
  - [x] Buscar as propriedades anunciadas recentemente
  - [x] Buscar as propriedades em alta   
  - [x] Buscar as propriedades de a cordo com os filtros passados   
  - [x] Buscar propriedade por ID
  - [x] Buscar as propriedades (anunciadas) do usuário

## 🚀 Executando o projeto localmente

### 💻 Pré-requisitos

Para rodar o projeto é necessário que você tenha instalado na sua máquina as seguintes ferramentas:

- Git
- Node.js
- VSCode
- Postgresql
- Yarn

### 💿 Rodando

```bash
# Clone este repositório através do terminal
$ git clone git@github.com:steinerstt/api-webcasas.git

# Acesse a pasta do projeto
$ cd api-webcasas
```

> Crie um arquivo chamado .env na raiz do projeto e copies as informações que estão no .env.example e preencha as informações de acordo com o seu ambiente.

```bash
# Instale as dependências do projeto
$ yarn install

# Persistindo as migrations no banco de dados
$ npx prisma generate

# Rode o projeto
$ yarn dev
```

<br>

# 🔰 Url: https://api-ziti.onrender.com

# 📋 Documentação

## Cadastro de usuário

### POST/users

body

```JSON
{
  "firstName": "Diogo",
  "lastName": "Steiner",
  "username": "steiner",
  "email": "steiner@mail.com",
  "password": "123456"
}
```

Retorno esperado - 201

```JSON
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODAxOTE4MTMsImV4cCI6MTY4MDQ1MTAxMywic3ViIjoiYjYyOTFkMzQtZWZhYS00N2JkLWJmZTgtMDAwYWJhNDllYzUwIn0.wCJur0yysNOFa0cwLhO4VxaW0lj7uNqNgnloT2twuEo",
  "user": {
    "id": "b6291d34-efaa-47bd-bfe8-000aba49ec50",
    "firstName": "Diogo",
    "lastName": "Steiner",
    "username": "steiner",
    "email": "steiner@mail.com",
    "avatarUrl": null,
    "coverUrl": null,
    "updatedAt": "2023-03-30T15:56:53.315Z",
    "createdAt": "2023-03-30T15:56:53.315Z"
  }
}
```
#

Possíveis erros

400
```JSON
{
  "message": [
    "firstName is a required field",
    "lastName is a required field",
    "username is a required field",
    "email is a required field",
    "password is a required field"
  ]
}
```
#

409
```JSON
{
  "message": "Email already registered"
}
```

```JSON
{
  "message": "Username already registered"
}
```
#

## Login de usuário

### POST/sessions

body

```JSON
{
  "username": "steiner",
  "password": "123456"
}
```

Retorno esperado - 200

```JSOn
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Nzg4ODc1MzIsImV4cCI6MTY3OTE0NjczMiwic3ViIjoiMGUxMzFiZjgtNDA1MC00ZTllLWE5NDAtOTZhM2E5NjkxOGM3In0.Cs6dPrerHH4PGR9RmnAcZ7mpTyix6wyDxzAEAW864CI",
  "user": {
    "id": "0e131bf8-4050-4e9e-a940-96a3a96918c7",
    "firstName": "Diogo",
    "lastName": "Steiner",
    "username": "steinerstt",
    "email": "steiner@mail.com",
    "avatarUrl": null,
    "coverUrl": null,
    "updatedAt": "2023-03-14T17:38:16.966Z",
    "createdAt": "2023-03-14T17:38:16.966Z"
  }
}
```
#

Possíveis erros

400
```JSON
{
  "message": [
    "username is a required field",
    "password is a required field"
  ]
}
```
#

401
```JSON
{
  "message": "Username or password invalid"
}
```
#

## Buscar sessão (auto login)

### GET/sessions

#### Requer autenticação Bearer

```TS
{
  headers: {
    "Authorization": `Bearer ${token}`
  }
}
```

Retorno esperado - 200

```JSOn
{
  "id": "0e131bf8-4050-4e9e-a940-96a3a96918c7",
  "firstName": "Diogo",
  "lastName": "Steiner",
  "username": "steinerstt",
  "email": "steiner@mail.com",
  "avatarUrl": null,
  "coverUrl": null,
  "updatedAt": "2023-03-14T17:38:16.966Z",
  "createdAt": "2023-03-14T17:38:16.966Z"
}
```
#

Possíveis errors

401
```JSON
{
  "message": "Missing headers authorization"
}
```
#

## Criar postagem

### POST/posts

#### Requer autenticação Bearer

```TS
{
  headers: {
    "Authorization": `Bearer ${token}`
  }
}
```

body

```JSON
{
  "text": "Post criado por Steiner 1"
}
```
#

Retorno esperado - 200

```JSON
{
  "id": "c35ed078-7d8b-4f39-b6f1-0890f7e0561e",
  "text": "Post criado por Steiner 1",
  "updatedAt": "2023-03-17T20:32:11.264Z",
  "createdAt": "2023-03-17T20:32:11.264Z",
  "owner": {
    "id": "0e131bf8-4050-4e9e-a940-96a3a96918c7",
    "firstName": "Diogo",
    "lastName": "Steiner",
    "username": "steinerstt",
    "avatarUrl": "https://qph.cf2.quoracdn.net/main-qimg-abe63e7d84cdb85ce8bf23ad45d18dae.webp",
    "coverUrl": null
  },
  "comments": [],
  "likes": [],
  "favorites": []
}
```
#

Possíveis errors

400
```JSON
{
  "message": [
    "text is a required field"
  ]
}
```
> Mínimo 1 caracter máximo 20.000 caracteres

#
401
```JSON
{
  "message": "Missing headers authorization"
}
```
#

## Deletar postagem

### DELETE/posts

#### Requer autenticação Bearer

```TS
{
  headers: {
    "Authorization": `Bearer ${token}`
  }
}
```

Retorno esperado - 204

```JSON
```

#

Possíveis erros

401
```JSON
{
  "message": "Missing headers authorization"
}
```
```JSON
{
  "message": "It is not allowed to delete another user's post without admin permission"
}
```
#

404
```JSON
{
  "message": "Post not found"
}
```


## Buscar postagem

### GET/posts

#### Requer autenticação Bearer

```TS
{
  headers: {
    "Authorization": `Bearer ${token}`
  }
}
```

Retorno esperado - 201

```JSON
[
  {
    "id": "b36131bb-e97d-4d4c-8dae-442ac416153b",
    "text": "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus",
    "updatedAt": "2023-03-30T16:16:05.956Z",
    "createdAt": "2023-03-30T16:16:05.956Z",
    "owner": {
      "id": "598701fe-bfa8-41b7-8ab3-4f78b3af25c4",
      "firstName": "Pedro",
      "lastName": "Gouveia",
      "username": "pedrogouveia",
      "avatarUrl": null,
      "coverUrl": null
    },
    "likes": [],
    "comments": [],
    "favorites": []
  },
  {
    "id": "97d72896-8b14-476d-b074-b7bb0e88ae3a",
    "text": "Post criado por Steiner 1",
    "updatedAt": "2023-03-30T16:04:34.659Z",
    "createdAt": "2023-03-30T16:04:34.659Z",
    "owner": {
      "id": "b6291d34-efaa-47bd-bfe8-000aba49ec50",
      "firstName": "Diogo",
      "lastName": "Steiner",
      "username": "steiner",
      "avatarUrl": null,
      "coverUrl": null
    },
    "likes": [
      {
        "id": "c5f1c5e1-f043-493f-a1c8-eb122815902c",
        "owner": {
          "id": "b6291d34-efaa-47bd-bfe8-000aba49ec50",
          "firstName": "Diogo",
          "lastName": "Steiner",
          "username": "steiner",
          "avatarUrl": null,
          "coverUrl": null
        }
      },
      {
        "id": "cc5ff107-50c5-4e62-92b4-52fe1e56fb98",
        "owner": {
          "id": "fe9a39e8-33da-4bed-822c-679e40b6ac58",
          "firstName": "Amanda",
          "lastName": "Silva",
          "username": "amandasilva",
          "avatarUrl": null,
          "coverUrl": null
        }
      },
      {
        "id": "3a03dcc3-5d5d-410d-90a7-72ddebd6086f",
        "owner": {
          "id": "d28e0837-97c7-46e6-93f4-d4c14f4cd048",
          "firstName": "Gabriel",
          "lastName": "koll",
          "username": "gabrielkoll",
          "avatarUrl": null,
          "coverUrl": null
        }
      }
    ],
    "comments": [],
    "favorites": [
      {
        "id": "d4c1a25f-2d65-4350-bdac-8b29282aec75",
        "owner": {
          "id": "598701fe-bfa8-41b7-8ab3-4f78b3af25c4",
          "firstName": "Pedro",
          "lastName": "Gouveia",
          "username": "pedrogouveia",
          "avatarUrl": null,
          "coverUrl": null
        }
      },
      {
        "id": "0e9e7e5c-adba-4305-877e-23703d4375f7",
        "owner": {
          "id": "d28e0837-97c7-46e6-93f4-d4c14f4cd048",
          "firstName": "Gabriel",
          "lastName": "koll",
          "username": "gabrielkoll",
          "avatarUrl": null,
          "coverUrl": null
        }
      },
      {
        "id": "6295f8f8-6252-45ca-89b2-0b0a6293825b",
        "owner": {
          "id": "fe9a39e8-33da-4bed-822c-679e40b6ac58",
          "firstName": "Amanda",
          "lastName": "Silva",
          "username": "amandasilva",
          "avatarUrl": null,
          "coverUrl": null
        }
      }
    ]
  }
]
```
#

Possíveis erros

401
```JSON
{
  "message": "Missing headers authorization"
}
```

## Curtir postagem

### POST/posts/likes{postId}

#### Requer autenticação Bearer

```TS
{
  headers: {
    "Authorization": `Bearer ${token}`
  }
}
```

Retorno esperado - 200

```JSON
{
  "id": "cc5ff107-50c5-4e62-92b4-52fe1e56fb98",
  "post": {
    "id": "97d72896-8b14-476d-b074-b7bb0e88ae3a",
    "text": "Post criado por Steiner 1",
    "updatedAt": "2023-03-30T16:04:34.659Z",
    "createdAt": "2023-03-30T16:04:34.659Z"
  },
  "owner": {
    "id": "fe9a39e8-33da-4bed-822c-679e40b6ac58",
    "firstName": "Amanda",
    "lastName": "Silva",
    "username": "amandasilva",
    "avatarUrl": null,
    "coverUrl": null
  }
}
```
#

Possíveis erros

401
```JSON
{
  "message": "Missing headers authorization"
}
```
#

404
```JSON
{
  "message": "Post not found"
}
```
#

409
```JSON
{
	"message": "Post already liked"
}
```

## Remover curtida da postagem

### DELETE/posts/likes/{likeId}

#### Requer autenticação Bearer

```TS
{
  headers: {
    "Authorization": `Bearer ${token}`
  }
}
```

Retorno esperado - 204

```JSON
```

#

Possíveis erros

401
```JSON
{
  "message": "Missing headers authorization"
}
```
#
404
```JSON
{
  "message": "Like not found"
}
```

## Adicionar comentário em postagem

### POST/posts/comments/{postId}

#### Requer autenticação Bearer

```TS
{
  headers: {
    "Authorization": `Bearer ${token}`
  }
}
```

body
```JSON
{
  "text": "It is a long established fact that a reader will be distracted by the readable content"
}
```

Retorno esperado - 201

```JSON
{
  "id": "ed649f71-2698-4510-bbe7-74fca45cb2a8",
  "text": "Comentário no post",
  "updatedAt": "2023-03-17T20:41:05.637Z",
  "createdAt": "2023-03-17T20:41:05.637Z",
  "post": {
    "id": "d23ac0a1-ca0c-4d2c-9d32-3df2a65d0f97",
    "text": "post criado pela amanda",
    "updatedAt": "2023-03-17T11:53:27.361Z",
    "createdAt": "2023-03-17T11:53:27.361Z"
  },
  "owner": {
    "id": "0e131bf8-4050-4e9e-a940-96a3a96918c7",
    "firstName": "Diogo",
    "lastName": "Steiner",
    "username": "steinerstt",
    "avatarUrl": "https://qph.cf2.quoracdn.net/main-qimg-abe63e7d84cdb85ce8bf23ad45d18dae.webp",
    "coverUrl": null
  }
}
```
#

Possíveis erros

400
```JSON
  {
  "message": [
    "text is a required field"
  ]
}
```
#

401
```JSON
{
  "message": "Missing headers authorization"
}
```
#

404
```JSON
{
  "message": "Post not found"
}
```

## Excluir comentário de postagem

### DELETE/posts/comments/{commentId}

#### Requer autenticação Bearer

```TS
{
  headers: {
    "Authorization": `Bearer ${token}`
  }
}
```

Retorno esperado - 204

```JSON

```

#

Possíveis erros

401
```JSON
{
  "message": "Missing headers authorization"
}
```
```JSON
{
  "message": "It is not allowed to delete another user's comment without admin permission"
}
```
#

404
```JSON
{
  "message": "Comment not found"
}
```

## Adicionar postagem aos favoritos

### POST/posts/favorites/{postId}

#### Requer autenticação Bearer

```TS
{
  headers: {
    "Authorization": `Bearer ${token}`
  }
}
```

retorno esperado - 201

```JSON
{
  "id": "99112c9a-69c9-4857-b9d8-124fc1ce09f4",
  "post": {
    "id": "6da62703-a571-4ef7-8692-0f3845c5d714",
    "text": "Post criado por steiner 1",
    "updatedAt": "2023-03-14T17:38:52.334Z",
    "createdAt": "2023-03-14T17:38:52.334Z"
  },
  "owner": {
    "id": "0e131bf8-4050-4e9e-a940-96a3a96918c7",
    "firstName": "Diogo",
    "lastName": "Steiner",
    "username": "steinerstt",
    "avatarUrl": "https://qph.cf2.quoracdn.net/main-qimg-abe63e7d84cdb85ce8bf23ad45d18dae.webp",
    "coverUrl": null,
  }
}
```
#

Possíveis erros

401
```JSON
{
  "message": "Missing headers authorization"
}
```
#

404
```JSON
{
  "message": "Post not found"
}
```
#

409
```JSON
{
  "message": "Post already favorited"
}
```

## Remover postagem dos favoritos

### DELETE/posts/favorites/{favoriteId}

#### Requer autenticação Bearer

```TS
{
  headers: {
    "Authorization": `Bearer ${token}`
  }
}
```

Retorno esperado - 204
```JSON

```

#

Possíveis erros

401
```JSON
{
  "message": "Missing headers authorization"
}
```
```JSON
{
  "message": "It is not possible remove post favorite of another user without admin permission"
}
```
#

404
```JSON
{
  "message": "Post favorited not found"
}
```

## Buscar postagens favoritadas

### GET/posts/favorites

#### Requer autenticação Bearer

```TS
{
  headers: {
    "Authorization": `Bearer ${token}`
  }
}
```

Retorno esperado - 200
```JSON
[
  {
    "id": "97d72896-8b14-476d-b074-b7bb0e88ae3a",
    "text": "Post criado por Steiner 1",
    "updatedAt": "2023-03-30T16:04:34.659Z",
    "createdAt": "2023-03-30T16:04:34.659Z",
    "owner": {
      "id": "b6291d34-efaa-47bd-bfe8-000aba49ec50",
      "firstName": "Diogo",
      "lastName": "Steiner",
      "username": "steiner",
      "avatarUrl": null,
      "coverUrl": null
    },
    "likes": [
      {
        "id": "3a03dcc3-5d5d-410d-90a7-72ddebd6086f",
        "owner": {
          "id": "d28e0837-97c7-46e6-93f4-d4c14f4cd048",
          "firstName": "Gabriel",
          "lastName": "koll",
          "username": "gabrielkoll",
          "avatarUrl": null,
          "coverUrl": null
        }
      },
      {
        "id": "cc5ff107-50c5-4e62-92b4-52fe1e56fb98",
        "owner": {
          "id": "fe9a39e8-33da-4bed-822c-679e40b6ac58",
          "firstName": "Amanda",
          "lastName": "Silva",
          "username": "amandasilva",
          "avatarUrl": null,
          "coverUrl": null
        }
      },
      {
        "id": "c5f1c5e1-f043-493f-a1c8-eb122815902c",
        "owner": {
          "id": "b6291d34-efaa-47bd-bfe8-000aba49ec50",
          "firstName": "Diogo",
          "lastName": "Steiner",
          "username": "steiner",
          "avatarUrl": null,
          "coverUrl": null
        }
      }
    ],
    "comments": [],
    "favorites": [
      {
        "id": "d4c1a25f-2d65-4350-bdac-8b29282aec75",
        "owner": {
          "id": "598701fe-bfa8-41b7-8ab3-4f78b3af25c4",
          "firstName": "Pedro",
          "lastName": "Gouveia",
          "username": "pedrogouveia",
          "avatarUrl": null,
          "coverUrl": null
        }
      },
      {
        "id": "6295f8f8-6252-45ca-89b2-0b0a6293825b",
        "owner": {
          "id": "fe9a39e8-33da-4bed-822c-679e40b6ac58",
          "firstName": "Amanda",
          "lastName": "Silva",
          "username": "amandasilva",
          "avatarUrl": null,
          "coverUrl": null
        }
      },
      {
        "id": "0e9e7e5c-adba-4305-877e-23703d4375f7",
        "owner": {
          "id": "d28e0837-97c7-46e6-93f4-d4c14f4cd048",
          "firstName": "Gabriel",
          "lastName": "koll",
          "username": "gabrielkoll",
          "avatarUrl": null,
          "coverUrl": null
        }
      }
    ]
  },
]
```

#

Possíveis erros

401
```JSON
{
  "message": "Missing headers authorization"
}
```

## Seguir usuário

### POST/followers/{userForFollowId}

#### Requer autenticação Bearer

```TS
{
  headers: {
    "Authorization": `Bearer ${token}`
  }
}
```
Retorno esperado - 201

```JSON
{
  "id": "5c003cb2-6358-496d-9fc1-4c90cd573bb6",
  "following": {
    "id": "ed9fc8d4-399b-4fca-a11f-971320ff8aa8",
    "firstName": "Isabella",
    "lastName": "Show",
    "username": "isabellashow",
    "avatarUrl": null,
    "coverUrl": null,
    "updatedAt": "2023-03-30T16:01:07.227Z",
    "createdAt": "2023-03-30T16:01:07.227Z"
  },
  "follower": {
    "id": "b6291d34-efaa-47bd-bfe8-000aba49ec50",
    "firstName": "Diogo",
    "lastName": "Steiner",
    "username": "steiner",
    "avatarUrl": null,
    "coverUrl": null,
    "updatedAt": "2023-03-30T15:56:53.315Z",
    "createdAt": "2023-03-30T15:56:53.315Z"
  }
}
```
#

Possíveis erros

401
```JSON
{
  "message": "Missing headers authorization"
}
```
#

404
```JSON
{
  "message": "User not found"
}
```
#

409
```JSON
{
  "message": "User is already followed"
}
```

## Parar de seguir um usuário

### DELETE/followers/{followId}

#### Requer autenticação Bearer

```TS
{
  headers: {
    "Authorization": `Bearer ${token}`
  }
}
```

Retorno esperado - 204
```JSON

```
#

Possíveis erros

401
```JSON
{
  "message": "Missing headers authorization"
}
```
```JSON
{
  "message": "It is not possible to remove another user's follower without an admin's permission"
}
```

## Sugestões de pessoas para serem seguidas

### GET/followers/suggestions?page=1&limit=4

#### Requer autenticação Bearer

```TS
{
  headers: {
    "Authorization": `Bearer ${token}`
  }
}
```

Retorno esperado - 200
```JSON
{
  "next": "http://localhost:3001/followers/suggestions?page=2&limit=4",
  "prev": null,
  "count": 4,
  "content": [
    {
      "id": "e22cc943-7d77-4f01-a2e2-f5f1f25e15d2",
      "firstName": "Carlos",
      "lastName": "Pereira",
      "username": "carlospereira",
      "avatarUrl": null,
      "coverUrl": null,
      "updatedAt": "2023-03-15T13:33:51.264Z",
      "createdAt": "2023-03-15T13:33:51.264Z"
    },
    {
      "id": "72cad746-a785-4d84-aa95-cdfd503ee980",
      "firstName": "Amanda",
      "lastName": "Silva",
      "username": "amandasilva",
      "avatarUrl": null,
      "coverUrl": null,
      "updatedAt": "2023-03-15T13:38:43.498Z",
      "createdAt": "2023-03-15T13:38:43.498Z"
    },
    {
      "id": "2c43364c-5769-4e33-8c16-a4ab193cc6ce",
      "firstName": "Diogo",
      "lastName": "Steiner",
      "username": "steinerstts",
      "avatarUrl": null,
      "coverUrl": null,
      "updatedAt": "2023-03-15T13:50:42.254Z",
      "createdAt": "2023-03-15T13:50:42.254Z"
    },
    {
      "id": "0a94e22f-71dd-495e-b80f-aa5be27a8745",
      "firstName": "Nikolle",
      "lastName": "Pereira",
      "username": "nikollepereira",
      "avatarUrl": null,
      "coverUrl": null,
      "updatedAt": "2023-03-16T10:30:34.044Z",
      "createdAt": "2023-03-16T10:30:34.044Z"
    }
  ]
}
```

#

Possíveis erros

401
```JSON
{
  "message": "Missing headers authorization"
}
```


<br>
## 📄 Licença

Este projeto está sob a licença do MIT - veja o arquivo [LICENSE](https://github.com/steinerstt/api-ziti/blob/main/LICENSE) para detalhes.

Feito com ❤ por [Steiner](https://github.com/steinerstt)

