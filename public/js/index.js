async function solicitacaoAPI(url, method = "GET", data = null) {
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

        const resposta = await fetch(url, options);

        const resultado = await resposta.json();

        if (resposta.ok) {

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

async function carregarDados() {
    const url = "http://localhost:3000/lancamento";
    const resultado = await solicitacaoAPI(url);   
    console.log("Resultado da API:", resultado);
    if (resultado.ok) {
        console.log(JSON.stringify(resultado.dados, null, 2));
    } else {
        console.error("Erro ao carregar dados protegidos:", resultado.mensagem);
    }
}

await carregarDados();