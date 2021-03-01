
  module.exports = {
    development: {
      client: 'mssql',
      connection: {
        host : 'virtual2.febracorp.org.br',
        user : 'user_trial',
        password : '7412LIVE!@#$%¨&*()',
        database : 'CONTOSO',
        options: {
          port:1433,
          enableArithAbort: true,
          encrypt:false
        }
      },
      migrations:{
        directory: './src/database/migrations'
      }
    }
  };
  