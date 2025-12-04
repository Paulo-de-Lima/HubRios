import { Link, useNavigate } from "react-router-dom"

const Sidebar = ({ user, onLogout }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    if (onLogout) onLogout()
    navigate("/login")
  }

  return (
    <aside className="w-64 bg-white shadow-lg rounded-lg p-6 h-fit sticky top-6">
      
      {/* ---------- PERFIL RESUMIDO (VINDO DO HEADER) ---------- */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-orange to-primary-purple flex items-center justify-center text-white font-bold text-lg">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-gray-900 font-semibold">{user?.name}</p>
          <Link 
            to={`/profile/${user?.id}`} 
            className="text-sm text-primary-blue hover:underline"
          >
            Ver perfil
          </Link>
        </div>
      </div>

      {/* ---------- LINKS DE NAVEGAÇÃO ---------- */}
      <nav className="space-y-4">
        <Link
          to="/"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-primary-orange/10 hover:to-primary-purple/10 transition-colors"
        >
          <span className="text-xl">🏠</span>
          <span className="font-medium text-gray-700">Início</span>
        </Link>

        <Link
          to={`/profile/${user?.id}`}
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-primary-orange/10 hover:to-primary-purple/10 transition-colors"
        >
          <span className="text-xl">👤</span>
          <span className="font-medium text-gray-700">Meu Perfil</span>
        </Link>
      </nav>

      {/* ---------- INFORMAÇÕES DO USUÁRIO ---------- */}
      <div className="pt-6 mt-6 border-t border-gray-200">
        <p className="text-sm font-semibold text-gray-700">Informações</p>

        <div className="mt-2 bg-gradient-to-r from-primary-blue/10 to-primary-purple/10 p-3 rounded-lg">
          <p className="text-xs text-gray-600">
            <strong>Curso:</strong> {user?.course || "Não informado"}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            <strong>Matrícula:</strong> {user?.registration || "Não informada"}
          </p>
        </div>
      </div>

      {/* ---------- BOTÃO DE SAIR ---------- */}
      <button
        onClick={handleLogout}
        className="w-full mt-6 px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-opacity-90 transition-colors"
      >
        Sair
      </button>
    </aside>
  )
}

export default Sidebar
