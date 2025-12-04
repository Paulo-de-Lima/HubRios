import express from 'express'
import pool from '../config/database.js'
import multer from 'multer'

const router = express.Router()

// =========================
// Multer (upload de imagens)
// =========================
const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      const unique = Date.now() + "-" + file.originalname
      cb(null, unique)
    }
  })
})

// ===============================
// GET USER BY ID  (IMPORTANTE!)
// ===============================
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id

    const [users] = await pool.execute(
      `SELECT id, name, email, registration, course, bio, location, website,
              instagram, profile_image, created_at
       FROM users WHERE id = ?`,
      [userId]
    )

    if (users.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    res.json(users[0])

  } catch (error) {
    console.error("Erro ao buscar usuário:", error)
    res.status(500).json({ message: "Erro ao buscar usuário" })
  }
})

// ===============================
// UPDATE USER (com foto)
// ===============================
router.put('/:id', upload.single("profile_image"), async (req, res) => {
  try {
    const userId = req.params.id

    const {
      name,
      email,
      registration,
      course,
      bio,
      location,
      website,
      instagram
    } = req.body

    // Se tiver foto nova
    let profileImagePath = null
    if (req.file) {
      profileImagePath = `/uploads/${req.file.filename}`
    }

    await pool.execute(
      `UPDATE users SET
        name = ?,
        email = ?,
        registration = ?,
        course = ?,
        bio = ?,
        location = ?,
        website = ?,
        instagram = ?,
        profile_image = COALESCE(?, profile_image)
      WHERE id = ?`,
      [
        name,
        email,
        registration,
        course,
        bio,
        location,
        website,
        instagram,
        profileImagePath,
        userId
      ]
    )

    // Retornar usuário atualizado
    const [updated] = await pool.execute(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    )

    res.json(updated[0])

  } catch (error) {
    console.error("Erro ao atualizar usuário:", error)
    res.status(500).json({ message: "Erro ao atualizar usuário" })
  }
})

export default router
