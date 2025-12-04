import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const envPath = path.join(__dirname, '..', '.env')
const envExamplePath = path.join(__dirname, '..', 'env.example.txt')

// Ler senha do MySQL via argumento ou prompt
const args = process.argv.slice(2)
let mysqlPassword = ''

if (args.length > 0 && args[0] === '--password') {
  mysqlPassword = args[1] || ''
} else {
  // Tentar ler do exemplo
  if (fs.existsSync(envExamplePath)) {
    const exampleContent = fs.readFileSync(envExamplePath, 'utf8')
    const passwordMatch = exampleContent.match(/DB_PASSWORD=(.*)/)
    if (passwordMatch) {
      mysqlPassword = passwordMatch[1].trim()
    }
  }
}

// Criar conteúdo do .env
const envContent = `PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=${mysqlPassword}
DB_NAME=hubrios
JWT_SECRET=seu-secret-super-seguro-altere-isso-em-producao
`

// Escrever arquivo .env
fs.writeFileSync(envPath, envContent)

console.log('✅ Arquivo .env criado/atualizado!')
console.log('📝 Configuração:')
console.log(`   DB_PASSWORD=${mysqlPassword || '(vazio)'}`)
console.log('\n💡 Se o MySQL exigir senha, edite o arquivo server/.env e adicione a senha em DB_PASSWORD=')

