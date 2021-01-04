# Healthy Check HEB
Revisión de los servicios de terceros aplicados, obtiene la valoración del estado que se encuentran.
Con el fin de obtener un auto deploy, asegurando el funcionamiento del aplicativo.

## Implement
Este paquete tiene como dependencia los siguientes modulos

* [@cloudnative/health-connect](https://www.npmjs.com/package/@cloudnative/health-connect)
* [amqplib](https://www.npmjs.com/package/amqplib)
* [pg](https://www.npmjs.com/package/pg)

```
npm install healthy-heb
```

## Use
Instanciar el check a usar, pasando la configuración correspondiente

```js
const { Health, RabbitCheck, PostgresCheck } = require('health-heb')
const healthCheck = new Health.HealthChecker()

// Todo: Implement Check ...

router.get('/live', Health.LivenessEndpoint(healthCheck))
router.get('/ready', Health.ReadinessEndpoint(healthCheck))
router.get('/health', Health.HealthEndpoint(healthCheck))
```

### Check Rabbit

```js

const { RabbitCheck } = require('health-heb')
const healthyRabbitCheck = new RabbitCheck(config)
const readinessRabbitCheck = new Health.ReadinessCheck('RabbitMQ', healthyRabbitCheck)
healthCheck.registerReadinessCheck(readinessRabbitCheck)
```

Archivo de configuración `config` object

```js
config.PROTOCOL,
config.HOST,
config.PORT_SERVICE,
config.USER,
config.PASSWORD,
config.VHOST
```

### Check Postgres

```js
const { PostgresCheck } = require('health-heb')
const healthyPostgresCheck = new PostgresCheck(config)
const readinessPostgresCheck = new Health.ReadinessCheck('PostgresDB', healthyPostgresCheck)
healthCheck.registerReadinessCheck(readinessPostgresCheck)
```

Archivo de configuración `config` object

```js
config.USER, 
config.PASSWORD,
config.HOST,
config.PORT,
config.DB
```
