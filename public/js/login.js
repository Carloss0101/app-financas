import acessApi from "./modules/AcessApi.js";

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); 

    const {status, accessToken, usuario} = await acessApi(
      "http://localhost:3000/auth/login",
      data
    );
    
    if (status) {
      //Salva o token no localStorage
      localStorage.setItem('token', JSON.stringify(accessToken));

      //Salva os dados do usuário no localStorage
      localStorage.setItem('userId', usuario._id);
      localStorage.setItem('name', usuario.username);
      localStorage.setItem('email', usuario.email);
      
      //Redireciona para index após o login de sucesso
      window.location.href = 'http://localhost:3000/index';
    } else {
        console.error(`[${status}] Ocorreu um erro no login.`);
    }
  });
});