const Health = require('@cloudnative/health-connect')
const { RabbitCheck, PostgresCheck } = require('./checks')

module.exports = {
  Health,
  RabbitCheck,
  PostgresCheck
}
