module.exports = {
  server: {
    port: 7001,
  },

  db: {
    client: 'mysql2',
    connection: {
      host: 'itdevclub.com',
      port: 33011,
      user: 'std_check_in',
      password: 'check@in',
      database: 'std_check_in',
    },
  },

  jwt: {
    secret: '123456',
    options: {
      algorithm: 'HS256',
      expiresIn: 3600000,
    },
  },
}
