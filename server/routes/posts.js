import express from 'express'
import { authenticateToken, optionalAuth } from '../middleware/auth.js'
import pool from '../config/database.js'

const router = express.Router()

// Obter todos os posts
router.get('/', optionalAuth, async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId || null
    
    let query = `
      SELECT 
        p.*,
        u.name as user_name,
        u.course as user_course,
        COUNT(DISTINCT l.id) as likes_count,
        COUNT(DISTINCT c.id) as comments_count
    `
    
    if (userId) {
      query += `,
        EXISTS(SELECT 1 FROM likes WHERE post_id = p.id AND user_id = ?) as liked
      `
    } else {
      query += `,
        0 as liked
      `
    }
    
    query += `
      FROM posts p
      INNER JOIN users u ON p.user_id = u.id
      LEFT JOIN likes l ON p.id = l.post_id
      LEFT JOIN comments c ON p.id = c.post_id
      GROUP BY p.id
      ORDER BY p.created_at DESC
      LIMIT 50
    `
    
    const params = userId ? [userId] : []
    const [posts] = await pool.execute(query, params)

    res.json(posts.map(post => ({
      ...post,
      liked: post.liked === 1 || post.liked === true
    })))
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    res.status(500).json({ message: 'Erro ao buscar posts' })
  }
})

// Criar post
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { content } = req.body

    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Conteúdo do post é obrigatório' })
    }

    const [result] = await pool.execute(
      'INSERT INTO posts (user_id, content) VALUES (?, ?)',
      [req.user.id, content.trim()]
    )

    const [posts] = await pool.execute(`
      SELECT 
        p.*,
        u.name as user_name,
        u.course as user_course,
        0 as likes_count,
        0 as comments_count,
        0 as liked
      FROM posts p
      INNER JOIN users u ON p.user_id = u.id
      WHERE p.id = ?
    `, [result.insertId])

    res.status(201).json(posts[0])
  } catch (error) {
    console.error('Erro ao criar post:', error)
    res.status(500).json({ message: 'Erro ao criar post' })
  }
})

// Curtir/descurtir post
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const postId = req.params.id
    const userId = req.user.id

    // Verificar se já curtiu
    const [existingLikes] = await pool.execute(
      'SELECT id FROM likes WHERE post_id = ? AND user_id = ?',
      [postId, userId]
    )

    if (existingLikes.length > 0) {
      // Remover curtida
      await pool.execute(
        'DELETE FROM likes WHERE post_id = ? AND user_id = ?',
        [postId, userId]
      )
    } else {
      // Adicionar curtida
      await pool.execute(
        'INSERT INTO likes (post_id, user_id) VALUES (?, ?)',
        [postId, userId]
      )
    }

    // Contar curtidas
    const [likes] = await pool.execute(
      'SELECT COUNT(*) as count FROM likes WHERE post_id = ?',
      [postId]
    )

    // Verificar se usuário curtiu
    const [userLike] = await pool.execute(
      'SELECT id FROM likes WHERE post_id = ? AND user_id = ?',
      [postId, userId]
    )

    res.json({
      liked: userLike.length > 0,
      likes_count: likes[0].count
    })
  } catch (error) {
    console.error('Erro ao curtir post:', error)
    res.status(500).json({ message: 'Erro ao curtir post' })
  }
})

// Comentar post
router.post('/:id/comments', authenticateToken, async (req, res) => {
  try {
    const postId = req.params.id
    const { content } = req.body

    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Conteúdo do comentário é obrigatório' })
    }

    await pool.execute(
      'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
      [postId, req.user.id, content.trim()]
    )

    res.status(201).json({ message: 'Comentário adicionado com sucesso' })
  } catch (error) {
    console.error('Erro ao comentar:', error)
    res.status(500).json({ message: 'Erro ao adicionar comentário' })
  }
})

// Obter posts de um usuário
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId

    const [posts] = await pool.execute(`
      SELECT 
        p.*,
        u.name as user_name,
        u.course as user_course,
        COUNT(DISTINCT l.id) as likes_count,
        COUNT(DISTINCT c.id) as comments_count
      FROM posts p
      INNER JOIN users u ON p.user_id = u.id
      LEFT JOIN likes l ON p.id = l.post_id
      LEFT JOIN comments c ON p.id = c.post_id
      WHERE p.user_id = ?
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `, [userId])

    res.json(posts)
  } catch (error) {
    console.error('Erro ao buscar posts do usuário:', error)
    res.status(500).json({ message: 'Erro ao buscar posts' })
  }
})

export default router

