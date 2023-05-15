# api-webcasas

![GitHub](https://img.shields.io/github/license/steinerstt/api-webcasas?style=for-the-badge)

<br>

![api-webcasas](https://github.com/steinerstt/api-webcasas/assets/106714068/a3e33b9e-3a06-48f0-acac-3aa33b3d35af)

> Api desenvolvida para a aplicação <a href="https://github.com/steinerstt/webcasas">webcasas</a> > 

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

## 📋 Documentação

### Usuários

#### POST/users

Cadastrar usuário

body

```JSON
{
  "firstName": "Diogo",
  "lastName": "Steiner",
  "email": "steiner11@mail.com",
  "password": "123456",
  "confirmPassword": "123456"
}
```

Retorno esperado - 201

```JSON
{
  "id": "4c5907ea-4e8f-489d-9688-bb0bb420130b",
  "firstName": "Diogo",
  "lastName": "Steiner",
  "email": "steiner11@mail.com",
  "avatarUrl": null,
  "isActive": true,
  "updatedAt": "2023-04-18T16:50:09.595Z",
  "createdAt": "2023-04-18T16:50:09.595Z"
}
```

#

Possíveis erros

400

```JSON
{
  "firstName": [
    "Required"
  ],
  "lastName": [
    "Required"
  ],
  "email": [
    "Required"
  ],
  "password": [
    "Required"
  ],
  "confirmPassword": [
    "Required"
  ]
}
```

409

```JSON
{
  "message": "Email already registered"
}
```

#

#### POST/sessions

Iniciar sessão/login

body

```JSON
{
  "email": "steiner11@mail.com",
  "password": "123456"
}
```

Retorno esperado - 200

```JSOn
  {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODE4MzgzMzYsImV4cCI6MTY4MTkyNDczNiwic3ViIjoiNGM1OTA3ZWEtNGU4Zi00ODlkLTk2ODgtYmIwYmI0MjAxMzBiIn0.7n5YCwPwNWGmOb5CuPZxD9BSsaMOLaXz2BrAy5Kbgtc",
  "user": {
    "id": "4c5907ea-4e8f-489d-9688-bb0bb420130b",
    "firstName": "Diogo",
    "lastName": "Steiner",
    "email": "steiner11@mail.com",
    "avatarUrl": null,
    "isActive": true,
    "updatedAt": "2023-04-18T16:50:09.595Z",
    "createdAt": "2023-04-18T16:50:09.595Z"
  }
  }
```

#

Possíveis erros

400

```JSON
 {
  "email": [
    "Required"
  ],
  "password": [
    "Required"
  ]
}
```

401

```JSON
{
  "message": "Username or password invalid"
}
```

403

```JSON
{
  "message": "User account desabled",
  "user": {
    "id": "4c5907ea-4e8f-489d-9688-bb0bb420130b",
    "isActive": false
  }
}
```

#

#### GET/sessions

Buscar dados do usuário

> Requer autenticação Bearer

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
  "id": "bcf92420-24f8-47a7-8a86-a654f9dcddcc",
  "firstName": "Diogo",
  "lastName": "Steiner",
  "email": "steiner11@mail.com",
  "avatarUrl": "https://res.cloudinary.com/ddx0hsa8o/image/upload/v1683019554/bec85eayh03ojsmd9h40.jpg",
  "isActive": true,
  "updatedAt": "2023-05-02T09:25:55.105Z",
  "createdAt": "2023-05-02T09:21:48.311Z"
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

#### PATCH/users

Atualizar dados do usuário

> Requer autenticação Bearer

> Pode ser alterado os seguintes dados: [firstName, lastName, email]

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
  "firstName": "Diogo Alt",
  "lastName": "Steiner Alt",
  "email": "steiner11alt@mail.com"
}
```

Retorno esperado - 200

```JSON
{
  "id": "2658091e-2fb3-4f39-8efb-b83c47d80763",
  "firstName": "Diogo Alt",
  "lastName": "Steiner Alt",
  "email": "steiner11alt@mail.com",
  "avatarUrl": null,
  "isActive": true,
  "updatedAt": "2023-04-18T22:46:04.428Z",
  "createdAt": "2023-04-18T22:40:01.833Z"
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

409

```JSON
{
    "message": "Email already registered"
}
```

#

#### PATCH/users/avatar

Adicionar/Atualiza foto de perfil

> Requer autenticação Bearer

> Formulário no formato multpart com o fieldname "avatar"

> Tamanho máximo da imagem 4mb

> Tipos de imagens suportados: JPEG, JPG ou PNG

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

400

```JSON
{
  "message": "File avatar is required"
}
```

```JSON
{
  "message": "File too large"
}
```

```JSON
{
  "message": "Unsupported file format"
}
```

401

```JSON
{
  "message": "Missing headers authorization"
}
```

#

#### PATCH//users/password

> Requer autenticação Bearer

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
	"currentPassword": "123456",
	"newPassword": "12345678",
	"confirmNewPassword": "12345678"
}
```

#

Possíveis erros

400

```JSON
{
  "currentPassword": [
    "Required"
  ],
  "newPassword": [
    "Required"
  ],
  "confirmNewPassword": [
    "Required"
  ]
}
```

401

```JSON
{
  "message": "Missing headers authorization"
}
```

403

```JSON
{
  "message": "Password invalid"
}
```
#

#### DELETE/users

Deletar conta de usuário

> Requer autenticação Bearer

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

400

```JSON
{
  "password": [
    "Required"
  ]
}
```

401

```JSON
{
  "message": "Missing headers authorization"
}
```

403

```JSON
{
  "message": "Password invalid"
}
```

#

#### PATCH/users/deactivate

Desativar conta de usuário

> Requer autenticação Bearer

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
  "message": "User account deativate sucess"
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

#### PATCH/users/activate/{userId}

Ativar conta de usuário

Retorno esperado - 200

```JSON
{
  "message": "user account activate sucess"
}
```

#

Possíveis erros

404

```JSON
{
  "message": "User not found"
}
```

---

### Propriedades

#### POST/properties

Criação de anúncio da propriedade

> Requer autenticação Bearer

> Chaves opcionais:
> "isSale" | "isInCondo" | "hasPoolProperty" | "hasAirConditioningProperty" | "hasGrillProperty" | "hasFurnitureProperty" | "hasPollCondo" | "hasSecurity24hCondo" "hasGymCondo" | "hasPartyHallCondo" | "priceCondo" | "isCondoPriceIncluded" | "isDisplayContact"

```TS
{
  headers: {
    "Authorization": `Bearer ${token}`
  }
}
```

body básico

```JSON
{
  "title": "Título",
  "description": "Descrição",
  "numberRooms": 4,
  "numberBathrooms": 3,
  "numberGarage": 8,
  "propertyType": "Casa",
  "price": "2198311",
  "state": "Rio de Janeiro",
  "city": "Rio de Janeiro",
  "contact": "(21) 9 8888-9999"
}
```

body Completo

```JSON
{
  "title": "Título",
  "description": "Descrição",
  "numberRooms": 4,
  "numberBathrooms": 3,
  "numberGarage": 8,
  "propertyType": "Apartamento",
  "isSale": false,
  "isInCondo": true, 
  "hasPoolProperty": true,
  "hasAirConditioningProperty": true,
  "hasGrillProperty": false,
  "hasFurnitureProperty": false,
  "hasPollCondo": true,
  "hasSecurity24hCondo": true,
  "hasGymCondo": false,
  "hasPartyHallCondo": false,
  "price": "2198311",
  "priceCondo": "4000",
  "isCondoPriceIncluded": true,
  "state": "São Paulo",
  "city": "São Paulo",
  "contact": "(21) 9 8888-9999",
  "isDisplayContact": false
}
```

Retorno esperado

201

```JSON
{
  "id": "2a0cc022-a4f6-48e1-ba6f-1bfd8a615a47",
  "title": "Título",
  "description": "Descrição",
  "numberRooms": 4,
  "numberBathrooms": 3,
  "numberGarage": 8,
  "propertyType": "Casa",
  "isSale": true,
  "isInCondo": true,
  "hasPoolProperty": true,
  "hasAirConditioningProperty": true,
  "hasGrillProperty": true,
  "hasFurnitureProperty": false,
  "hasPollCondo": true,
  "hasSecurity24hCondo": true,
  "hasGymCondo": false,
  "hasPartyHallCondo": false,
  "price": 2198311,
  "priceCondo": 4000,
  "isCondoPriceIncluded": true,
  "state": "Rio de Janeiro",
  "city": "Rio de Janeiro",
  "contact": "21988889999",
  "isDisplayContact": false,
  "isActive": true,
  "viewsCounter": 0,
  "updatedAt": "2023-04-21T18:32:52.772Z",
  "createdAt": "2023-04-21T18:32:52.772Z"
}
```

#

Possíveis erros

400

```JSON
{
  "title": [
    "Required"
  ],
  "description": [
    "Required"
  ],
  "numberRooms": [
    "Required"
  ],
  "numberBathrooms": [
    "Required"
  ],
  "numberGarage": [
    "Required"
  ],
  "propertyType": [
    "Required"
  ],
  "price": [
    "Required"
  ],
  "state": [
    "Required"
  ],
  "city": [
    "Required"
  ],
  "contact": [
    "Required"
  ]
}
```

401

```JSON
{
  "message": "Missing headers authorization"
}
```

#

#### POST/properties/photos/{propertyId}

Adicionar fotos da propriedade

> Requer autenticação Bearer

> Formulário no formato Multipart com o fieldname "photo"

> Máximo 4 fotos

```TS
{
  headers: {
    "Authorization": `Bearer ${token}`
  }
}
```

Retorno esperado - 201

```JSON
  "count": `${quantidade de fotos adicionadas}`
```

#

Possíveis erros

401

```JSON
{
  "message": "Missing headers authorization"
}
```

403

```JSON
{
  "message": "The property has already reached the maximum number of photos"
}
```

404

```JSON
{
  "message": "Property not found"
}
```

#

#### PATCH/properties/deactivate/{propertyId}

Desativar anúncio da propriedade

> Requer autenticação Bearer

> Ao desativar um anúncio ele irá desaparececr da listagem total e individual, mas será possível encontrar ele na listagem dos anúncios do vendedor.

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

404

```JSON
{
  "message": "Property not found"
}
```

#

### PATCH/properties/activate/{propertyId}

Ativar anúncio da propriedade

> Requer autenticação Bearer

> Ao ativar um anúncio ele irá volta para a listagem total e individual

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

404

```JSON
{
  "message": "Property not found"
}
```

#

#### DELETE/properties/{propertyId}

Deletar anúncio da propriedade

> Requer autenticação Bearer

> O anúncio será excluído permanentemente

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

404

```JSON
{
  "message": "Property not found"
}
```

#

#### GET/properties

Buscar todos os anúncios recentes

> Possível de paginação Ex: ?page=2&limit=10

Retorno esperado - 200

```JSON
{
  "nextPage": null,
  "prevPage": null,
  "count": 39,
  "content": [
    {
      "id": "b784451a-aae2-4160-b047-bbe413fec771",
      "title": "Título",
      "description": "Descrição",
      "numberRooms": 4,
      "numberBathrooms": 3,
      "numberGarage": 8,
      "propertyType": "Apartamento",
      "isSale": true,
      "isInCondo": true,
      "hasPoolProperty": true,
      "hasAirConditioningProperty": true,
      "hasGrillProperty": true,
      "hasFurnitureProperty": false,
      "hasPollCondo": true,
      "hasSecurity24hCondo": true,
      "hasGymCondo": false,
      "hasPartyHallCondo": false,
      "price": 2198311,
      "priceCondo": 4000,
      "isCondoPriceIncluded": true,
      "state": "São Paulo",
      "city": "São Paulo",
      "isDisplayContact": false,
      "isActive": true,
      "viewsCounter": 0,
      "updatedAt": "2023-04-22T19:40:57.348Z",
      "createdAt": "2023-04-22T19:40:57.348Z",
      "photos": []
    },
    {
      "id": "f599f891-55c4-48d9-ad4b-711ab4014d0c",
      "title": "Título",
      "description": "Descrição",
      "numberRooms": 4,
      "numberBathrooms": 3,
      "numberGarage": 8,
      "propertyType": "Casa",
      "isSale": true,
      "isInCondo": true,
      "hasPoolProperty": true,
      "hasAirConditioningProperty": true,
      "hasGrillProperty": true,
      "hasFurnitureProperty": false,
      "hasPollCondo": true,
      "hasSecurity24hCondo": true,
      "hasGymCondo": false,
      "hasPartyHallCondo": false,
      "price": 2198311,
      "priceCondo": 4000,
      "isCondoPriceIncluded": true,
      "state": "São Paulo",
      "city": "São Paulo",
      "isDisplayContact": false,
      "isActive": true,
      "viewsCounter": 0,
      "updatedAt": "2023-04-22T19:38:23.703Z",
      "createdAt": "2023-04-22T19:38:23.703Z",
      "photos": []
    },
    {
      "id": "5dae7d8d-9c88-4a30-b3c8-283a599a2f66",
      "title": "Título",
      "description": "Descrição",
      "numberRooms": 4,
      "numberBathrooms": 3,
      "numberGarage": 8,
      "propertyType": "Casa",
      "isSale": true,
      "isInCondo": true,
      "hasPoolProperty": true,
      "hasAirConditioningProperty": true,
      "hasGrillProperty": true,
      "hasFurnitureProperty": false,
      "hasPollCondo": true,
      "hasSecurity24hCondo": true,
      "hasGymCondo": false,
      "hasPartyHallCondo": false,
      "price": 2198311,
      "priceCondo": 4000,
      "isCondoPriceIncluded": true,
      "state": "São Paulo",
      "city": "Rio de Janeiro",
      "isDisplayContact": false,
      "isActive": true,
      "viewsCounter": 0,
      "updatedAt": "2023-04-22T19:32:00.188Z",
      "createdAt": "2023-04-22T19:32:00.188Z",
      "photos": []
    },
  ]
}
```

#

#### GET/properties/inHight

Buscar todos os anúncios em alta (maior visualização)

> Possível de paginação Ex: ?page=2&limit=10

Retorno esperado - 200

```JSON
{
  "nextPage": null,
  "prevPage": null,
  "count": 39,
  "content": [
    {
      "id": "80145b27-4d9d-48f1-a527-bb13ae540b2a",
      "title": "Título",
      "description": "Descrição",
      "numberRooms": 4,
      "numberBathrooms": 3,
      "numberGarage": 8,
      "propertyType": "Casa",
      "isSale": true,
      "isInCondo": true,
      "hasPoolProperty": true,
      "hasAirConditioningProperty": true,
      "hasGrillProperty": true,
      "hasFurnitureProperty": false,
      "hasPollCondo": true,
      "hasSecurity24hCondo": true,
      "hasGymCondo": false,
      "hasPartyHallCondo": false,
      "price": 2198311,
      "priceCondo": 4000,
      "isCondoPriceIncluded": true,
      "state": "Rio de Janeiro",
      "city": "Rio de Janeiro",
      "isDisplayContact": false,
      "isActive": true,
      "viewsCounter": 47,
      "updatedAt": "2023-04-23T11:53:47.099Z",
      "createdAt": "2023-04-21T23:36:17.424Z",
      "photos": [
        {
          "id": "9e3ce3ee-3a92-4e51-ba23-ebe5ab53c72a",
          "photoUrl": "https://res.cloudinary.com/dhomn9ckx/image/upload/v1682120414/phpwohqbsrvxzvlwandp.jpg"
        },
        {
          "id": "8fd82bf8-7dba-484d-9dbd-d4bd9d7462d5",
          "photoUrl": "https://res.cloudinary.com/dhomn9ckx/image/upload/v1682120415/dz4vqlnychoqjrovmhcr.jpg"
        },
        {
          "id": "62d8089d-22ca-4a06-a06d-a539f06b2a1f",
          "photoUrl": "https://res.cloudinary.com/dhomn9ckx/image/upload/v1682120415/hrgfgbx5kkbs1f0lfdlv.jpg"
        },
        {
          "id": "0e387dc4-96e7-4adb-ba83-8437ce1bb976",
          "photoUrl": "https://res.cloudinary.com/dhomn9ckx/image/upload/v1682120415/ytwq3dmfuokaoelvo7to.jpg"
        }
      ]
    },
    {
      "id": "9913f7df-46a5-4a64-8358-cbca8bd18b83",
      "title": "Título",
      "description": "Descr1",
      "numberRooms": 4,
      "numberBathrooms": 3,
      "numberGarage": 8,
      "propertyType": "Casa",
      "isSale": true,
      "isInCondo": false,
      "hasPoolProperty": false,
      "hasAirConditioningProperty": false,
      "hasGrillProperty": false,
      "hasFurnitureProperty": false,
      "hasPollCondo": false,
      "hasSecurity24hCondo": false,
      "hasGymCondo": false,
      "hasPartyHallCondo": false,
      "price": 2198311,
      "priceCondo": null,
      "isCondoPriceIncluded": false,
      "state": "RIo de Janeiro",
      "city": "Rio de Janeiro",
      "isDisplayContact": true,
      "isActive": true,
      "viewsCounter": 9,
      "updatedAt": "2023-04-23T11:53:36.771Z",
      "createdAt": "2023-04-21T17:03:03.117Z",
      "photos": [],
      "contact": "21988889999"
      },
    {
      "id": "05f440a0-d827-486b-a8a7-8715c57dd4bf",
      "title": "Título",
      "description": "Descr1",
      "numberRooms": 4,
      "numberBathrooms": 3,
      "numberGarage": 8,
      "propertyType": "Casa",
      "isSale": true,
      "isInCondo": false,
      "hasPoolProperty": false,
      "hasAirConditioningProperty": false,
      "hasGrillProperty": false,
      "hasFurnitureProperty": false,
      "hasPollCondo": false,
      "hasSecurity24hCondo": false,
      "hasGymCondo": false,
      "hasPartyHallCondo": false,
      "price": 2198311,
      "priceCondo": null,
      "isCondoPriceIncluded": false,
      "state": "RIo de Janeiro",
      "city": "Rio de Janeiro",
      "isDisplayContact": true,
      "isActive": true,
      "viewsCounter": 1,
      "updatedAt": "2023-04-22T19:04:12.347Z",
      "createdAt": "2023-04-21T17:01:06.296Z",
      "photos": [],
      "contact": "21988889999"
    },
...
  ]
}
```

#

#### GET/properties/filter?

Filtragem de anúncios

> Possível de paginação Ex: ?page=2&limit=10

- [x] É possível filtar os anúncios com as seguintes querys
  - [x] state=state
  - [x] city=city
  - [x] propertyType=propertyType
  - [x] isSale= true || false
  - [x] isInCondo= true || false
  - [x] hasPoolProperty= true || false
  - [x] hasFurnitureProperty= true || false
  - [x] hasGrillProperty= true || false
  - [x] hasAirConditioningProperty= true || false

> Exemplo de filtragem avançada:

> properties/filter?state=São Paulo&city=São paulo&propertyType=apartamento&isSale=false&isInCondo=true&hasPoolProperty=true&hasFurnitureProperty=false&hasAirConditioningProperty=true&hasGrillProperty=false

Retorno esperado - 200

```JSON
{
  "nextPage": null,
  "prevPage": null,
  "count": 1,
  "content": [
    {
      "id": "f7734346-257f-450c-aa6a-76c9a31c4a6d",
      "title": "Título",
      "description": "Descrição",
      "numberRooms": 4,
      "numberBathrooms": 3,
      "numberGarage": 8,
      "propertyType": "Apartamento",
      "isSale": false,
      "isInCondo": true,
      "hasPoolProperty": true,
      "hasAirConditioningProperty": true,
      "hasGrillProperty": false,
      "hasFurnitureProperty": false,
      "hasPollCondo": true,
      "hasSecurity24hCondo": true,
      "hasGymCondo": false,
      "hasPartyHallCondo": false,
      "price": 2198311,
      "priceCondo": 4000,
      "isCondoPriceIncluded": true,
      "state": "São Paulo",
      "city": "São Paulo",
      "isDisplayContact": false,
      "isActive": true,
      "viewsCounter": 0,
      "updatedAt": "2023-04-23T15:03:12.637Z",
      "createdAt": "2023-04-23T15:03:12.637Z",
      "photos": []
    }
  ]
}
```

#

#### GET/properties/user

Buscas todos os anúncios do usuário

> Requer autenticação Bearer

```TS
{
  headers: {
    "Authorization": `Bearer ${token}`
  }
}
```

> Possível de paginação Ex: ?page=2&limit=10

Retorno esperado - 200

```JSON
{
  "nextPage": "http://localhost:3001/properties?page=3&limit=2",
  "prevPage": "http://localhost:3001/properties?page=1&limit=2",
  "count": 2,
  "content": [
    {
      "id": "5d9ae18a-5311-423c-b936-b0350ff9cca5",
      "title": "Casa com 2 dormitórios para alugar, 188 m² por R$ 5.500,01/mês",
      "description": "Casa com 02 dormitórios para locação Boqueirão - Santos/SP Ref.: CA1777Casa estilo sobrado com área total 214m2 bairro do Boqueirão em SantosImóvel com dois dormitórios, 02 salas, varanda para a rua, cozinha ampla, banheiro social, lavanderia, um bom quintal com edícula com dormitório e banheiro e mais um banheiro no térreo. (salas, dormitórios e edícula, todos com ar-condicionado)Garagem para no mínimo 02 carros.Valor do Pacote: R$ 5.500Garantias aceitas pelo proprietário: 03(três) meses de deposito caução,fiador ou seguro fiançaNão operamos negociações em prazos inferiores ou para temporadas, feriados e afins. Agende uma visita. Entre em contato com um de nossos corretores.Os valores, disponibilidade e condições de pagamento estão sujeitos a confirmação com o proprietário, podendo sofrer alterações a qualquer tempo..",
      "numberRooms": 2,
      "numberBathrooms": 3,
      "numberGarage": 2,
      "propertyType": "Casa",
      "isSale": false,
      "isInCondo": false,
      "hasPoolProperty": true,
      "hasAirConditioningProperty": true,
      "hasGrillProperty": true,
      "hasFurnitureProperty": true,
      "hasPollCondo": true,
      "hasSecurity24hCondo": true,
      "hasGymCondo": false,
      "hasPartyHallCondo": false,
      "price": 5500,
      "priceCondo": 4000,
      "isCondoPriceIncluded": false,
      "state": "SP",
      "city": "Santos",
      "isDisplayContact": false,
      "isActive": true,
      "viewsCounter": 3,
      "updatedAt": "2023-05-14T14:29:45.877Z",
      "createdAt": "2023-05-04T14:55:44.718Z",
      "photos": [
        {
          "id": "50badbbf-53cc-4080-acb3-fec3c39e61fa",
          "photoUrl": "https://res.cloudinary.com/ddx0hsa8o/image/upload/v1683212145/onthlbshn8r4bfvjlnwp.jpg"
        },
        {
          "id": "243a254e-5c25-4f3c-a2ab-e968b1ecac22",
          "photoUrl": "https://res.cloudinary.com/ddx0hsa8o/image/upload/v1683212145/uwsrinqa2acrbemoatrs.jpg"
        },
        {
          "id": "2d095c7a-e1b5-45d3-ae3d-24e8515f0e4e",
          "photoUrl": "https://res.cloudinary.com/ddx0hsa8o/image/upload/v1683212145/nijbpv1t8ddfb3wsm4vx.jpg"
        }
      ]
    },
    {
      "id": "2c300c09-bfdc-45be-9626-157242a4828d",
      "title": "casa - Loteamento Residencial Vila Bella - Campinas",
      "description": "Excelente sobrado, em condomínio fechado, próximo ao Shopping Dom Pedro e ao lado do The Mall, uma espaço de compras, com supermercado, farmácias, restaurantes, papelaria e padaria, com portaria 24 horas, piscina, salão de festas, um espaço kids, ao ar livre, garagem descoberta para 2 veículos. O sobrado tem sala p 2 ambientes, com lavabo, cozinha integrada para a área externa, lavanderia, no andar superior, banheiro, 3 dormitórios, todos com armários, sendo uma suíte. Excelente oportunidade, condomínio muito desejado por ser um dos poucos com portaria 24 horas. Agende sua visita! -",
      "numberRooms": 3,
      "numberBathrooms": 3,
      "numberGarage": 2,
      "propertyType": "Casa",
      "isSale": false,
      "isInCondo": true,
      "hasPoolProperty": true,
      "hasAirConditioningProperty": true,
      "hasGrillProperty": true,
      "hasFurnitureProperty": true,
      "hasPollCondo": true,
      "hasSecurity24hCondo": true,
      "hasGymCondo": false,
      "hasPartyHallCondo": false,
      "price": 4200,
      "priceCondo": 4000,
      "isCondoPriceIncluded": false,
      "state": "SP",
      "city": "Campinas",
      "isDisplayContact": true,
      "isActive": true,
      "viewsCounter": 99,
      "updatedAt": "2023-05-14T17:33:25.985Z",
      "createdAt": "2023-05-04T14:52:47.893Z",
      "photos": [
        {
          "id": "5701f784-31c6-44b7-b748-ca5e7f1cbedd",
          "photoUrl": "https://res.cloudinary.com/ddx0hsa8o/image/upload/v1683211968/gqgwkk3pft8xbrj5j4ss.jpg"
        },
        {
          "id": "c6ee2f10-de93-4043-8ebf-5744e4366ed5",
          "photoUrl": "https://res.cloudinary.com/ddx0hsa8o/image/upload/v1683211968/wj6yomtb30x5wsw8tx3h.jpg"
        }
      ],
      "contact": "21999999999"
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

#

#### GET/properties/{propertyId}

Buscar propriedade/anúncio

> Ao buscar o anúncio, a quantidade visualizações(viewsCounter) é atualizada para +1

> Só é possível buscar as pripriedades que estejam com o isActive == true

Retorno esperado - 200

```JSON
{
  "id": "80145b27-4d9d-48f1-a527-bb13ae540b2a",
  "title": "Título",
  "description": "Descrição",
  "numberRooms": 4,
  "numberBathrooms": 3,
  "numberGarage": 8,
  "propertyType": "Casa",
  "isSale": true,
  "isInCondo": true,
  "hasPoolProperty": true,
  "hasAirConditioningProperty": true,
  "hasGrillProperty": true,
  "hasFurnitureProperty": false,
  "hasPollCondo": true,
  "hasSecurity24hCondo": true,
  "hasGymCondo": false,
  "hasPartyHallCondo": false,
  "price": 2198311,
  "priceCondo": 4000,
  "isCondoPriceIncluded": true,
  "state": "Rio de Janeiro",
  "city": "Rio de Janeiro",
  "contact": "21988889999",
  "isDisplayContact": false,
  "isActive": true,
  "viewsCounter": 2,
  "updatedAt": "2023-04-21T23:40:00.251Z",
  "createdAt": "2023-04-21T23:36:17.424Z",
  "photos": [
    {
      "id": "9e3ce3ee-3a92-4e51-ba23-ebe5ab53c72a",
      "photoUrl": "https://res.cloudinary.com/dhomn9ckx/image/upload/v1682120414/phpwohqbsrvxzvlwandp.jpg"
    },
    {
      "id": "8fd82bf8-7dba-484d-9dbd-d4bd9d7462d5",
      "photoUrl": "https://res.cloudinary.com/dhomn9ckx/image/upload/v1682120415/dz4vqlnychoqjrovmhcr.jpg"
    },
    {
      "id": "62d8089d-22ca-4a06-a06d-a539f06b2a1f",
      "photoUrl": "https://res.cloudinary.com/dhomn9ckx/image/upload/v1682120415/hrgfgbx5kkbs1f0lfdlv.jpg"
    },
    {
      "id": "0e387dc4-96e7-4adb-ba83-8437ce1bb976",
      "photoUrl": "https://res.cloudinary.com/dhomn9ckx/image/upload/v1682120415/ytwq3dmfuokaoelvo7to.jpg"
    }
  ]
}

```

#

Possíveis erros

404

```JSON
{
  "message": "Property not found"
}
```

<br>

## 📄 Licença

Este projeto está sob a licença do MIT - veja o arquivo [LICENSE](https://github.com/steinerstt/api-webcasas/blob/main/LICENSE) para detalhes.

Feito com ❤ por [Steiner](https://github.com/steinerstt)
