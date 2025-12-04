import express from 'express'
import pool from '../config/database.js'

const router = express.Router()

// Obter usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id

    const [users] = await pool.execute(
      'SELECT id, name, email, registration, course, created_at FROM users WHERE id = ?',
      [userId]
    )

    if (users.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    res.json(users[0])
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    res.status(500).json({ message: 'Erro ao buscar usuário' })
  }
})

export default router


