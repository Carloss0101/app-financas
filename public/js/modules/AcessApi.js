export default async function acessApi(url, data, method = "POST") {
  try {
    const resposta = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), 
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      console.log("Resposta da api recebida: ", resultado);
      return resultado; 
    } else {
      console.error("Erro da API:", resultado);
      return resultado; // Retorna mesmo em caso de erro
    }

  } catch (error) {
    console.error("Algo deu errado na requisição: ", error);
    return { ok: false, mensagem: error.message }; // Garante retorno
  }
}
