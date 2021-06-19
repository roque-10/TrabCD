# Boas Vindas ao nosso projeto de COMPUTAÇÃO DISTRIBUÍDA !!!

## Alunos: Thiago Fugishima e José Roque

# Link do vídeo
https://drive.google.com/file/d/1rEetupCXnwXwEUGxNdjGeJliB81lkiWy/view?usp=sharing

# Requisitos

## Postman para realizar requisições e ser o front-end do projeto.
## MongoDBCompass para visualizar o banco de dados de forma mais acessível.
## Docker para subirmos os serviços e o banco em containers.

# Instalação

## Já na pasta raiz do projeto abra o terminal (importante frisar, na pasta raiz do arquivo) e rode o comando "docker-compose up -d". Isso criará imagens dos nossos serviços e subirão eles em container.
## Para criar a conexão com o banco de dados basta abrir o MongoDBCompass e conectar pela url "mongodb://localhost:27018".
## Já com o banco conectado importante criar a tabela "turmas" e popular ela com o documento de mesmo nome. Basta cliclar em ADD DATA, selecionar a opção Impor file, selecionar o documento "turmas" e clicar em import.

# Rotas e Requisições

## MS-USUARIO:
## (POST) http://localhost:3000/cadastrar/usuario
## (POST) http://localhost:3000/excluir/usuario

## MS-ESCALA
## (POST) http://localhost:3001/escalar/aluno
## (POST) http://localhost:3001/escalar/professor
## (GET)  http://localhost:3001/visualizar/aluno
## (GET)  http://localhost:3001/visualizar/professor
## (GET)  http://localhost:3001/visualizar/gerente

## MS-PAGAMENTO
## (POST) http://localhost:3002/emitir/fatura
## (GET)  http://localhost:3002/visualizar/fatura
## (GET)  http://localhost:3002/visualizar/faturaGeral
