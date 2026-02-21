import { solicitacaoAPI } from "../utils/AcessApi.js";
import { carregarDados } from "../index.js";

export function renderizarModalReceita() {

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
                    <input type="text" id="desc" placeholder="Ex: Salário" required>
                </div>
                <div class="form-group">
                    <label>Valor (R$)</label>
                    <input type="number" id="vlr" step="0.01" placeholder="0,00" required>
                </div>
                <div class="form-group">
                    <label>Categoria</label>
                    <select id="cat">
                        <option value="Salario">Salário</option>
                        <option value="Vale">Vale</option>
                        <option value="Auxilio">Auxilio</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Data</label>
                    <input type="date" id="dt" required>
                </div>
                <button type="submit" class="btn-salvar">Salvar Despesa</button>
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
            descricao: document.getElementById('desc').value,
            valor: parseFloat(document.getElementById('vlr').value),
            categoria: document.getElementById('cat').value,
            data: document.getElementById('dt').value,
            tipo: "receita"
        };

        const resultado = await solicitacaoAPI("http://localhost:3000/lancamento", "POST", payload);

        if(resultado.status === "sucesso") { await carregarDados(); fechar(); }
    };

    document.getElementById('btnFecharModal').onclick = fechar;
    
    window.onclick = (event) => {
        if (event.target == modal) fechar();
    };

    modal.style.display = 'flex';
    document.getElementById('dt').valueAsDate = new Date();
}

