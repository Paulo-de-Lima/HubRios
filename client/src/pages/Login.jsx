import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/axios'

const Login = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    registration: '',
    course: ''
  })

  const formatRegistration = (value) => {
    value = value.replace(/\D/g, ""); // remove tudo que não for número

    // Aplica o formato XXX.XX.XXX
    if (value.length > 3 && value.length <= 5) {
      value = value.replace(/(\d{3})(\d{1,2})/, "$1.$2");
    } else if (value.length > 5) {
      value = value.replace(/(\d{3})(\d{2})(\d{1,3}).*/, "$1.$2.$3");
    }

    return value;
  };

  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      if (isLogin) {
        const response = await api.post('/auth/login', {
          email: formData.email,
          password: formData.password
        })
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        setUser(response.data.user)
        navigate('/')
      } else {
        const response = await api.post('/auth/register', formData)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        setUser(response.data.user)
        navigate('/')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao processar solicitação')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-blue via-primary-purple to-primary-orange flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-orange via-primary-purple to-primary-blue bg-clip-text text-transparent">
            HubRios
          </h1>
          <p className="text-gray-600 mt-2">Rede Social Universitária</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required={!isLogin}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Matrícula
                </label>
                <input
                  type="text"
                  maxLength={10}
                  required={!isLogin}
                  value={formData.registration}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      registration: formatRegistration(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Curso
                </label>
                <select
                  required={!isLogin}
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                >
                  <option value="">Selecione seu curso</option>

                  <option value="Administração">Administração</option>
                  <option value="Biomedicina">Biomedicina</option>
                  <option value="Direito">Direito</option>
                  <option value="Educação Física">Educação Física</option>
                  <option value="Enfermagem">Enfermagem</option>
                  <option value="Farmácia">Farmácia</option>
                  <option value="Fisioterapia">Fisioterapia</option>
                  <option value="Nutrição">Nutrição</option>
                  <option value="Odontologia">Odontologia</option>
                  <option value="Psicologia">Psicologia</option>
                  <option value="Sistema de Informação">Sistema de Informação</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary-orange to-primary-purple text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
            }}
            className="text-primary-blue hover:text-primary-purple transition-colors"
          >
            {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
