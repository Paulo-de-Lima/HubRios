import pool from '../config/database.js'
import dotenv from 'dotenv'

dotenv.config()

async function testConnection() {
  try {
    console.log('🔍 Testando conexão com o banco de dados...')
    console.log('Configuração:', {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      database: process.env.DB_NAME || 'hubrios',
      password: process.env.DB_PASSWORD ? '***' : '(vazio)'
    })

    // Testar conexão
    const [rows] = await pool.execute('SELECT 1 as test')
    console.log('✅ Conexão com banco de dados estabelecida com sucesso!')
    console.log('Teste:', rows)

    // Verificar se o banco existe
    const [databases] = await pool.execute('SHOW DATABASES LIKE ?', [process.env.DB_NAME || 'hubrios'])
    if (databases.length === 0) {
      console.log('⚠️  Banco de dados não encontrado! Execute o schema.sql primeiro.')
    } else {
      console.log('✅ Banco de dados encontrado!')
    }

    // Verificar tabelas
    const [tables] = await pool.execute('SHOW TABLES')
    console.log('📊 Tabelas encontradas:', tables.length)
    tables.forEach(table => {
      console.log(`   - ${Object.values(table)[0]}`)
    })

    // Verificar usuários
    const [users] = await pool.execute('SELECT COUNT(*) as count FROM users')
    console.log(`👥 Total de usuários: ${users[0].count}`)

    if (users[0].count > 0) {
      const [allUsers] = await pool.execute('SELECT id, name, email FROM users LIMIT 5')
      console.log('📋 Usuários cadastrados:')
      allUsers.forEach(user => {
        console.log(`   - ${user.name} (${user.email})`)
      })
    }

    process.exit(0)
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:')
    console.error('Mensagem:', error.message)
    console.error('Código:', error.code)
    console.error('SQL State:', error.sqlState)
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n💡 SOLUÇÃO:')
      console.error('   1. Abra o arquivo server/.env')
      console.error('   2. Encontre a linha: DB_PASSWORD=')
      console.error('   3. Adicione sua senha do MySQL: DB_PASSWORD=sua_senha_aqui')
      console.error('   4. Salve o arquivo')
      console.error('   5. Execute este teste novamente')
      console.error('\n   Se não sabe a senha do MySQL:')
      console.error('   - Tente conectar: mysql -u root -p')
      console.error('   - Ou consulte: CONFIGURAR_SENHA_MYSQL.md')
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Dica: Verifique se o MySQL está rodando')
      console.error('   No Windows: Verifique no "Serviços" se MySQL está ativo')
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('\n💡 Dica: O banco de dados não existe. Execute o schema.sql primeiro')
    }
    
    process.exit(1)
  }
}

testConnection()

