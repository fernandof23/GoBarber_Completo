# GoBarber
> App para controle de Barbearia, controle dos prestadores de serviço, dos clientes, e dos agendamentos.



### App de Barbearia com controle total sobre:

- Controle e cadastro dos Barbeiros/Providers.
- Cadastro dos Clientes.
- Solicitação de agendamento de Horario pelo cliente, para um barbeiro escolhido.
- Notificação para o barbeiro dos agendamentos feitos no dia, ou na data escolhida.
- Cancelamento do agendamento com ate 2 horas de antecedência.
- Envio de e-mail para o barbeiro em caso de cancelamento de agendamento.


## API desenvolvida com as tecnologias:

- NodeJs.
- Express.
- Postgres.
- MongoDB.
- RedisDB.
- Nodemailer.
- Entre outros...


## Instalação

Adicionando Repositorios:

```sh
yarn
```

> Precisamos instalar o Postgres, o MongoDb, e o redis

Rodando as migration para cria o banco:

```js
yarn sequelize db:migrate

```

> crie na raiz o arquivo .env e replique os dados do .envExemple, preenchendo com os dados dos seus DB.

Iniciando o app:

```sh
yarn dev
yarn queue
```

### Adicionando Variaveis
 


## Criado por:

Fernando Santos – [@Fernando](https://www.linkedin.com/in/fernando-santos-686632122/) – fernandorato.0@hotmail.com

Faz Parte do bootcamp GoStack 9 da [RocketSeat](https://rocketseat.com.br/bootcamp)



## Contributing

1. Faça o _fork_ do projeto 
2. Crie uma _branch_ para sua modificação (`git checkout -b feature/gobarber`)
3. Faça o _commit_ (`git commit -am 'Add some feature'`)
4. _Push_ (`git push origin feature/gobarber`)
5. Crie um novo _Pull Request_

