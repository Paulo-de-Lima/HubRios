import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import Sidebar from '../components/Sidebar'
import api from '../utils/axios'

const Profile = ({ user }) => {
  const { id } = useParams()
  const [profileUser, setProfileUser] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setProfileUser(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">

          {/* Sidebar */}
          <Sidebar user={user} />

          {/* Conteúdo principal */}
          <div className="flex-1">

            {/* Usuário não encontrado */}
            {!profileUser && (
              <div className="text-center py-12">
                <p className="text-gray-600">Usuário não encontrado</p>
              </div>
            )}

            {/* Só renderiza se o usuário existir */}
            {profileUser && (
              <>
                {/* Card do Perfil */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                  <div className="flex items-start space-x-6">

                    {/* Avatar */}
                    <div className="w-28 h-28 rounded-full bg-gradient-to-r from-primary-orange to-primary-purple flex items-center justify-center text-white font-bold text-4xl">
                      {profileUser.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                            {profileUser.name}
                          </h1>

                          {profileUser.course && (
                            <p className="text-sm text-primary-blue mt-1">
                              {profileUser.course}
                            </p>
                          )}

                          <p className="text-sm text-gray-500 mt-2">{profileUser.email}</p>
                        </div>

                        {/* Editar perfil */}
                        {user?.id === profileUser.id && (
                          <Link
                            to={`/profile/${profileUser.id}/edit`}
                            className="inline-block text-primary-purple font-semibold hover:underline"
                          >
                            Editar Perfil
                          </Link>
                        )}
                      </div>

                      {/* Bio */}
                      {profileUser.bio && (
                        <p className="mt-4 text-gray-700">{profileUser.bio}</p>
                      )}

                      {/* Infos */}
                      <div className="mt-3 text-sm text-gray-600 space-y-1">
                        {profileUser.location && <div>📍 {profileUser.location}</div>}
                        {profileUser.website && (
                          <div>
                            🔗{' '}
                            <a
                              href={profileUser.website}
                              target="_blank"
                              rel="noreferrer"
                              className="text-primary-purple hover:underline"
                            >
                              {profileUser.website}
                            </a>
                          </div>
                        )}
                        {profileUser.instagram && (
                          <div>
                            📸{' '}
                            <a
                              href={profileUser.instagram}
                              target="_blank"
                              rel="noreferrer"
                              className="text-primary-purple hover:underline"
                            >
                              {profileUser.instagram}
                            </a>
                          </div>
                        )}
                        <div>
                          🕒 Entrou em:{' '}
                          {new Date(profileUser.created_at).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Posts */}
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
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
