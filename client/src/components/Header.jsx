import { Link, useNavigate } from 'react-router-dom'

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    onLogout()
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-orange via-primary-purple to-primary-blue bg-clip-text text-transparent">
              HubRios
            </h1>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to={`/profile/${user.id}`}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-orange to-primary-purple flex items-center justify-center text-white font-semibold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-700 font-medium">{user.name}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header


