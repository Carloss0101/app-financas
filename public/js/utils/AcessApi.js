//const baseAPI = "http://localhost:3000/"; 
const baseAPI = "https://financas.carlos0101.xyz/"; 

export async function acessApi(url, data, method = "POST") {
  try {
    const resposta = await fetch(`${baseAPI}${url}`, {
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

export async function solicitacaoAPI(url, method = "GET", data = null) {
    try {
        const options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        };

        if (data !== null) {
            options.body = JSON.stringify(data);
        }

        const resposta = await fetch(`${baseAPI}${url}`, options);
        const resultado = await resposta.json();
        
        if (resultado?.status == 'sucesso') {
            console.log("Resposta da api recebida: ", resultado);
            return resultado;
        } else {
            console.error("Erro da API:", resultado);
            return resultado;
        }
    } catch (error) {
        console.error("Algo deu errado na requisição: ", error);
        return {
            ok: false,
            mensagem: error.message
        };
    }
}