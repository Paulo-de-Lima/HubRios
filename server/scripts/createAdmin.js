import bcrypt from 'bcryptjs'
import pool from '../config/database.js'
import dotenv from 'dotenv'

dotenv.config()

async function createAdmin() {
  try {
    const adminEmail = 'admin@hubrios.com'
    const adminPassword = 'admin123'
    const adminName = 'Administrador'
    
    // Verificar se o admin já existe
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [adminEmail]
    )

    if (existingUsers.length > 0) {
      console.log('✅ Usuário administrador já existe!')
      console.log(`📧 Email: ${adminEmail}`)
      console.log(`🔑 Senha: ${adminPassword}`)
      process.exit(0)
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    // Criar usuário administrador
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, registration, course) VALUES (?, ?, ?, ?, ?)',
      [adminName, adminEmail, hashedPassword, 'ADMIN001', 'Administração']
    )

    console.log('✅ Usuário administrador criado com sucesso!')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📧 Email:', adminEmail)
    console.log('🔑 Senha:', adminPassword)
    console.log('👤 Nome:', adminName)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('💡 Use essas credenciais para fazer login na aplicação')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Erro ao criar usuário administrador:', error)
    process.exit(1)
  }
}

createAdmin()

