import { solicitacaoAPI } from "../utils/AcessApi.js";
import { renderizarMes } from "../index.js";

export function renderizarModalReceita(id = null, descricao = null, valor = null, categoria = null, data = null) {
    let isEdit = false
    if(descricao != null && valor != null && categoria != null && data != null) {
        console.log("Dados recebidos para edição:", {id, descricao, valor, categoria, data });
        isEdit = true;
    }

    if (document.getElementById('modalReceita')) return;

    const modal = document.createElement('div');
    modal.id = 'modalReceita';
    modal.className = 'modal';

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Nova Receita</h2>
                <span class="close" id="btnFecharModal">&times;</span>
            </div>
            <form id="formReceita">
                <div class="form-group">
                    <label>Descrição</label>
                    <input type="text" id="desc" placeholder="Ex: Mercado" required value="${descricao ?? ""}">
                </div>
                <div class="form-group">
                    <label>Valor (R$)</label>
                    <input type="number" id="vlr" step="0.01" placeholder="0,00" required value="${valor ?? ""}">
                </div>
                <div class="form-group">
                    <label>Categoria</label>
                    <select id="cat">
                        <option value="Salário" ${categoria === "Salário" ? "selected" : ""}>Salário</option>
                        <option value="Freelancer" ${categoria === "Freelancer" ? "selected" : ""}>Freelancer</option>
                        <option value="Investimentos" ${categoria === "Investimentos" ? "selected" : ""}>Investimentos</option>
                        <option value="Outros" ${categoria === "Outros" ? "selected" : ""}>Outros</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Data</label>
                    <input type="date" id="dt" required value="${data ? new Date(data).toISOString().split('T')[0] : ""}">
                </div>
                <button type="submit" class="btn-salvar">Salvar Receita</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    const fechar = () => {
        modal.style.display = 'none';
        modal.remove(); 
    };

    document.getElementById('formReceita').onsubmit = async (e) => {
        e.preventDefault();
        
        const payload = {
            id: id,
            descricao: document.getElementById('desc').value,
            valor: parseFloat(document.getElementById('vlr').value),
            categoria: document.getElementById('cat').value,
            data: document.getElementById('dt').value,
            tipo: "receita"
        };

        let resultado;
        if(isEdit) {
            resultado = await solicitacaoAPI("http://localhost:3000/lancamento", "PUT", payload);
        } else {
            resultado = await solicitacaoAPI("http://localhost:3000/lancamento", "POST", payload);
        }

        if(resultado.status === "sucesso") { await renderizarMes(); fechar(); }
    };

    document.getElementById('btnFecharModal').onclick = fechar;
    
    window.onclick = (event) => {
        if (event.target == modal) fechar();
    };

    modal.style.display = 'flex';
    document.getElementById('dt').valueAsDate = new Date();
}

