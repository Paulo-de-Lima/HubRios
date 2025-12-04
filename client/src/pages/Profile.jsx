import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import api from '../utils/axios'

const Profile = ({ user }) => {
  const { id } = useParams()
  const [profileUser, setProfileUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [id])

  const fetchProfile = async () => {
    try {
      const [userResponse, postsResponse] = await Promise.all([
        api.get(`/users/${id}`),
        api.get(`/posts/user/${id}`)
      ])
      setProfileUser(userResponse.data)
      setPosts(postsResponse.data)
    } catch (error) {
      console.error('Erro ao carregar perfil:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={user} onLogout={() => {}} />
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-purple"></div>
        </div>
      </div>
    )
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={user} onLogout={() => {}} />
        <div className="text-center py-12">
          <p className="text-gray-600">Usuário não encontrado</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={() => {}} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary-orange to-primary-purple flex items-center justify-center text-white font-bold text-3xl">
              {profileUser.name?.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800">{profileUser.name}</h1>

              {profileUser.course && (
                <p className="text-lg text-primary-blue mt-1">{profileUser.course}</p>
              )}

              {profileUser.registration && (
                <p className="text-sm text-gray-600 mt-1">Matrícula: {profileUser.registration}</p>
              )}

              <p className="text-sm text-gray-500 mt-2">{profileUser.email}</p>

              {/* BOTÃO CORRETO */}
              {user?.id === profileUser.id && (
                <Link
                  to={`/profile/${profileUser.id}/edit`}
                  className="inline-block mt-3 text-primary-purple font-semibold hover:underline"
                >
                  Editar Perfil
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Posts</h2>

          {posts.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              Este usuário ainda não publicou nada.
            </p>
          ) : (
            <div className="space-y-4">
              {posts.map(post => (
                <div key={post.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(post.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
