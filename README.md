# Sobre o Projeto

Neste projeto, foi desenvolvida uma API _RESTful_ em _Node.js_, que é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar(CRUD) produtos.

O projeto foi desenvolvido utilizando as camadas _Models_, _Services_ e _Controllers_(_MSC_).

Foram criados alguns _endpoints_ que irão ler e escrever em um banco de dados, utilizando o **MySQL**.

Foram feitos alguns testes testes unitários nas três camadas utilizando as ferramentas _Mocha_, _Chai_ e _Sinon_.

# Rodando o Projeto

### Requisitos:
- Node.js 16
- Docker
- Docker Compose

Depois de clonar o repositório instale as dependências do npm com o comando:
```
npm install
```
Inicie o docker utilizando o comando:
```
docker-compose up -d
```
Crie o banco de dados com o comando:
```
docker exec -it store_manager npm run restore
```
E por fim, inicie o servidor back-end com o comando:
```
docker exec -it store_manager npm start
```
