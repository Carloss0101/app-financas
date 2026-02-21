let dataAtual = new Date();

export function getDataAtual() {
    return dataAtual;
}

export function avancarMes() {
    dataAtual.setMonth(dataAtual.getMonth() + 1);
}

export function voltarMes() {
    dataAtual.setMonth(dataAtual.getMonth() - 1);
}

export function formatarMesAno(data) {

    const meses = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ];

    return `${meses[data.getMonth()]} ${data.getFullYear()}`;
}