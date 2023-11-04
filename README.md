<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Esta aplicação utiliza o framework NestJS que abstrar as funcionalidades do <a href="http://nodejs.org" target="_blank">Node.js</a>, com o fim de construir uma API eficiente e escalável.</p>
    <p align="center">
    
## Descrição

Este repositório codifica uma RESTful API com as seguintes funcionalidades:
### 1) Gerenciamento de entidade Usuário, com privilégio de acesso para Admins
Nesta aplicação é possível criar, editar, realizar exclusão lógica (desativar) e receber uma lista com todos os Usuários cadastrados na plataforma. Há também privilégio de acesso para usuários com a função `Admin`, sendo possível apenas para estes últimos o cadastro de novos usuários.
### 2) Autenticação Bearer Token para endpoints sensíveis
Alguns endoints, como os disponíveis para o gerenciamento de Usuários e também os relativos a cadastro, edição e deleção de Filmes são protegidos por autenticação simples, na modalidade `Bearer Token`.
### 2) Gerenciamento de entidade Filme
Filmes podem ser cadastrados nesta API, além de serem editados ou deletados. A leitura da lista de filmes e o acesso a maiores detalhes de cada filme são endpoints públicos.
### 3) Pontuação de filmes em uma escala de 0 a 4
Usuários cadastrados e logados podem votar nos filmes em uma classificação que varia de 0 a 4 pontos. Há a disponibilidade também de um endpoint com a pontuação média de cada filme.

## Como instalar este repositório?
Primeiramente você deve possuir um banco de dados `postgres` local (ou na nuvem) que possa receber a conexão do `PrismaORM` deste projeto. A recomendação é utilizar [docker](https://hub.docker.com/_/postgres) para encapsular a lógica do banco dentro de um container.

Após clonar este repositório para seu ambiente local, deve instalar todas as bibliotecas através do seguinte comando:
```bash
$ npm install
```
Importante também criar um arquivo `.env` na raiz do projeto e preencher as variáveis de ambiente dentro dele:
```bash
DATABASE_URL= url no seguinte formato: postgresql://janedoe:mypassword@localhost:5432/mydb?schema=sample
JWT_SECRET= um hash aleatório que servirá como secret da criação de tokens JWT
```
## Iniciando o APP

```bash
# Após o build, localmente
$ npm run start

# Com o Watch Mode
$ npm run start:dev

# Em produção
$ npm run start:prod
```

## Para testar

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Tecnologias utilizadas

 1. [NestJS](https://nestjs.com/): um framework robusto que utiliza NodeJS e [ExpressJS](https://expressjs.com/pt-br/) por debaixo dos panos, misturando toda a versatilidade do Node com a segurança de uma arquitetura voltada para a [Injeção de Dependência](https://en.wikipedia.org/wiki/Dependency_injection). O Nest lembra muito a forma de trabalhar de grandes frameworks já consolidados como o .NET.
 2. [PrismaORM](https://www.prisma.io/): uma library para NodeJS que nos auxilia na conexão com um banco de dados, além da criação e utilização de queries e mutations, pensando sempre na segurança e escalabilidade da aplicação. Já vem com built-ins de segurança para prever SQL Injection, dentre outras funcionalidades.
 3. [bcrypt](https://www.npmjs.com/package/bcrypt): biblioteca consolidada para a encriptação de caracteres, utilizada para encriptar senhas que serão salvas no Banco de Dados.
 4. Zod
 5. Typescript
 6. Jest
 7. Postegres

## Swagger/documentação
Após startar a aplicação, está disponível o swagger (OpenAPI) da API no seguinte endereço:
```bash
 localhost:3000/api/swagger
```
