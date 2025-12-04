import { useState } from 'react'
import api from '../utils/axios'

const Post = ({ post, currentUser, onUpdate }) => {
  const [liked, setLiked] = useState(post.liked || false)
  const [likesCount, setLikesCount] = useState(post.likes_count || 0)
  const [comment, setComment] = useState('')
  const [showComments, setShowComments] = useState(false)

  const handleLike = async () => {
    try {
      const response = await api.post(`/posts/${post.id}/like`)
      setLiked(response.data.liked)
      setLikesCount(response.data.likes_count)
    } catch (error) {
      console.error('Erro ao curtir post:', error)
    }
  }

  const handleComment = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return

    try {
      await api.post(`/posts/${post.id}/comments`, {
        content: comment
      })
      setComment('')
      if (onUpdate) onUpdate()
    } catch (error) {
      console.error('Erro ao comentar:', error)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-orange to-primary-purple flex items-center justify-center text-white font-semibold text-lg">
          {post.user_name?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-800">{post.user_name}</h3>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString('pt-BR')}
            </span>
          </div>
          {post.user_course && (
            <p className="text-sm text-primary-blue">{post.user_course}</p>
          )}
        </div>
      </div>

      <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>

      <div className="flex items-center space-x-6 pt-4 border-t border-gray-200">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 transition-colors ${
            liked ? 'text-primary-orange' : 'text-gray-500 hover:text-primary-orange'
          }`}
        >
          <span className="text-xl">{liked ? '❤️' : '🤍'}</span>
          <span>{likesCount}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 text-gray-500 hover:text-primary-purple transition-colors"
        >
          <span className="text-xl">💬</span>
          <span>{post.comments_count || 0}</span>
        </button>
      </div>

      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <form onSubmit={handleComment} className="mb-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escreva um comentário..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary-purple text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Comentar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Post

