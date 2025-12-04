import { useState, useEffect } from 'react'

import Sidebar from '../components/Sidebar'
import CreatePost from '../components/CreatePost'
import Post from '../components/Post'
import api from '../utils/axios'

const Home = ({ user, setUser }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    fetchPosts()
  }, [refreshKey])

  const fetchPosts = async () => {
    try {
      const config = {
        params: user ? { userId: user.id } : {}
      }
      const response = await api.get('/posts', config)
      setPosts(response.data)
    } catch (error) {
      console.error('Erro ao carregar posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePostCreated = () => {
    setRefreshKey(prev => prev + 1)
  }

  const handleUpdate = () => {
    fetchPosts()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <Sidebar user={user} />
          
          <main className="flex-1 max-w-2xl">
            <CreatePost onPostCreated={handlePostCreated} />
            
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-purple"></div>
                <p className="mt-4 text-gray-600">Carregando posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <p className="text-gray-600 text-lg">
                  Nenhum post ainda. Seja o primeiro a compartilhar algo!
                </p>
              </div>
            ) : (
              posts.map(post => (
                <Post
                  key={post.id}
                  post={post}
                  currentUser={user}
                  onUpdate={handleUpdate}
                />
              ))
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Home

