import { useState } from 'react'
import api from '../utils/axios'

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    try {
      await api.post('/posts', { content })
      setContent('')
      if (onPostCreated) onPostCreated()
    } catch (error) {
      console.error('Erro ao criar post:', error)
      alert('Erro ao criar post. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="O que você está pensando?"
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent resize-none"
        />
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="px-6 py-2 bg-gradient-to-r from-primary-orange to-primary-purple text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost

