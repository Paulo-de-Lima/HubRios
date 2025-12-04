import { Link } from 'react-router-dom'

const Sidebar = ({ user }) => {
  return (
    <aside className="w-64 bg-white shadow-lg rounded-lg p-6 h-fit sticky top-24">
      <div className="space-y-4">
        <Link
          to="/"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-primary-orange/10 hover:to-primary-purple/10 transition-colors"
        >
          <span className="text-xl">🏠</span>
          <span className="font-medium text-gray-700">Início</span>
        </Link>

        <Link
          to={`/profile/${user.id}`}
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-primary-orange/10 hover:to-primary-purple/10 transition-colors"
        >
          <span className="text-xl">👤</span>
          <span className="font-medium text-gray-700">Meu Perfil</span>
        </Link>

        <div className="pt-4 border-t border-gray-200">
          <div className="p-3 bg-gradient-to-r from-primary-blue/10 to-primary-purple/10 rounded-lg">
            <p className="text-sm font-semibold text-gray-700">Informações</p>
            <p className="text-xs text-gray-600 mt-1">Curso: {user.course || 'Não informado'}</p>
            <p className="text-xs text-gray-600">Matrícula: {user.registration || 'Não informada'}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar


