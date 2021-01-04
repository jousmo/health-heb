const { Pool } = require('pg')

class PostgresCheck {
  constructor (config) {

    const CONFIG_POSTGRES = {
      user: config.USER,
      password: config.PASSWORD,
      host: config.HOST,
      port: config.PORT,
      database: config.DB
    }

    return () => new Promise(async (resolve, reject) => {
      try {
        const pool = new Pool(CONFIG_POSTGRES)
        await pool.query('SELECT NOW()')
        await pool.end()
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }
}

module.exports = PostgresCheck
