import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import api from "../utils/axios";

const courses = [
  "Administração",
  "Biomedicina",
  "Direito",
  "Educação Física",
  "Enfermagem",
  "Farmácia",
  "Fisioterapia",
  "Nutrição",
  "Odontologia",
  "Psicologia",
  "Sistema de Informação",
];

// Máscara da matrícula
const formatRegistration = (value) => {
  value = value.replace(/\D/g, "");

  if (value.length > 3 && value.length <= 6) {
    value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
  } else if (value.length > 6) {
    value = value.replace(/(\d{3})(\d{3})(\d{1,2}).*/, "$1.$2.$3");
  }

  return value;
};

const EditProfile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    registration: "",
    course: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Impedir edição de outros usuários
  useEffect(() => {
    if (user && user.id !== Number(id)) {
      navigate(`/profile/${user.id}`);
    }
  }, [user, id]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        registration: user.registration || "",
        course: user.course || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.put(`/users/${user.id}`, formData);

      // Atualiza o usuário no localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);

      setSuccess("Perfil atualizado com sucesso!");

      setTimeout(() => {
        navigate(`/profile/${user.id}`);
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao atualizar perfil");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={() => {}} />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Editar Perfil
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Matrícula */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Matrícula
              </label>
              <input
                type="text"
                maxLength={10}
                value={formData.registration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    registration: formatRegistration(e.target.value),
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Curso */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Curso
              </label>
              <select
                value={formData.course}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="">Selecione seu curso</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-orange to-primary-purple text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Salvar Alterações
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
