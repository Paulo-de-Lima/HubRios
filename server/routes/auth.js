import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../config/database.js'

const router = express.Router()

// Registro
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, registration, course } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Campos obrigatórios faltando' })
    }

    // Verificar se email já existe
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    )

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado' })
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Criar usuário
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, registration, course) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, registration || null, course || null]
    )

    const userId = result.insertId

    // Buscar usuário criado
    const [users] = await pool.execute(
      'SELECT id, name, email, registration, course FROM users WHERE id = ?',
      [userId]
    )

    const user = users[0]

    // Gerar token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'seu-secret-super-seguro',
      { expiresIn: '7d' }
    )

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      token,
      user
    })
  } catch (error) {
    console.error('Erro no registro:', error)
    res.status(500).json({ message: 'Erro ao criar usuário' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' })
    }

    // Buscar usuário
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )

    if (users.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' })
    }

    const user = users[0]

    // Verificar senha
    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciais inválidas' })
    }

    // Gerar token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'seu-secret-super-seguro',
      { expiresIn: '7d' }
    )

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        registration: user.registration,
        course: user.course
      }
    })
  } catch (error) {
    console.error('Erro no login:', error)
    res.status(500).json({ message: 'Erro ao fazer login' })
  }
})

export default router


