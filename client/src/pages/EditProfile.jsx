import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import Header from "../components/Header";

const EditProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    registration: "",
    course: "",
    bio: "",
    location: "",
    website: "",
    instagram: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =============================
  //   Carrega dados do usuário
  // =============================
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        registration: user.registration || "",
        course: user.course || "",
        bio: user.bio || "",
        location: user.location || "",
        website: user.website || "",
        instagram: user.instagram || "",
      });

      setProfilePreview(user.profile_image || null);
    }
  }, [user]);

  // =============================
  //   Input de texto
  // =============================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // =============================
  //   Input da foto de perfil
  // =============================
  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  // =============================
  //   Enviar formulário
  // =============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const data = new FormData();

      // Anexa os campos normais
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      // Anexa imagem de perfil se houver
      if (profileImage) {
        data.append("profile_image", profileImage);
      }

      const response = await api.put(`/users/${user.id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Atualiza localStorage
      localStorage.setItem("user", JSON.stringify(response.data));

      setSuccess("Perfil atualizado com sucesso!");

      setTimeout(() => {
        navigate(`/profile/${user.id}`);
      }, 1200);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Erro ao atualizar perfil");
    }
  };

  return (
    <>
      <Header />

      <div className="edit-profile-container">
        <h1>Editar Perfil</h1>

        <form onSubmit={handleSubmit} className="edit-form">

          {/* Foto de perfil */}
          <div className="profile-image-section">
            <img
              src={profilePreview || "/default-avatar.png"}
              alt="Foto de perfil"
              className="profile-preview"
            />

            <label className="upload-btn">
              Selecionar Foto
              <input type="file" accept="image/*" onChange={handleProfileImage} hidden />
            </label>
          </div>

          {/* Inputs */}
          {Object.keys(formData).map((key) => (
            <div className="input-group" key={key}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
              />
            </div>
          ))}

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <button type="submit" className="btn-save">Salvar Alterações</button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
