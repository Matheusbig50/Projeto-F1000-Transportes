
const calculo = document.getElementById('calculo');
const resultadoFrete = document.getElementById('resultadoFrete');


// 1. CONVERSÃO DE MOEDA BRASILEIRA

function converterMoeda(valor) {

    let texto = String(valor).trim();

    if (texto === '') {
        return 0;
    }

    // Aceita: 200, 1500,50 e 1.500,50
    const formatoValido = /^\d+(?:\.\d{3})*(?:,\d{1,2})?$/;

    if (!formatoValido.test(texto)) {
        return NaN;
    }

    let numero = texto
        .replace(/\./g, '')
        .replace(',', '.');

    return Number(numero);
}


// 2. MÁSCARA MONETÁRIA


function aplicarMascaraMoeda(valor) {

    let texto = String(valor).trim();

    if (texto === '') {
        return '';
    }

    // Aceita números com até duas casas decimais
    const formatoValido = /^\d+(?:\.\d{3})*(?:,\d{0,2})?$/;

    if (!formatoValido.test(texto)) {
        return null;
    }

    let numero = Number(
        texto.replace(/\./g, '').replace(',', '.')
    );

    if (!Number.isFinite(numero)) {
        return null;
    }

    // Formata com milhar e duas casas decimais
    return numero.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


// 3. ATIVA A MÁSCARA NOS INPUTS


const camposMoeda = [
    'vmotorista',
    'vnota',
    'vcoleta',
    'vpedagio'
];

camposMoeda.forEach(function(id) {

    const campo = document.getElementById(id);

    // Formata quando o usuário sai do campo
    campo.addEventListener('blur', function() {

        const valorFormatado = aplicarMascaraMoeda(campo.value);

        if (valorFormatado === null) {

            campo.setCustomValidity(
                'Digite um valor válido. Ex.: 1.500,50'
            );

            campo.reportValidity();
            return;
        }

        campo.setCustomValidity('');
        campo.value = valorFormatado;

    });

    // Limpa mensagens antigas durante a edição
    campo.addEventListener('input', function() {
        campo.setCustomValidity('');
    });

});


// 4. FUNÇÃO PRINCIPAL DE CÁLCULO


function calcularfrete(vmotorista, vnota, vcoleta, vpedagio) {

    let motorista = converterMoeda(vmotorista);
    let nota = converterMoeda(vnota);
    let coleta = converterMoeda(vcoleta);
    let pedagio = converterMoeda(vpedagio);

    // Verifica valores inválidos
    if (![motorista, nota, coleta, pedagio].every(Number.isFinite)) {
        throw new Error(
            'Valor inválido. Utilize o formato 1.500,00'
        );
    }

    // Seguro: 0,08% da nota fiscal
    let seguro = nota * 0.0008;

    // Soma dos custos operacionais
    let custoTotal = motorista + seguro + coleta + pedagio;

    // Multiplicador provisório de 1,45
    let valorFrete = custoTotal * 1.67;

    // Diagnóstico no console
    console.log('Motorista:', motorista);
    console.log('Nota fiscal:', nota);
    console.log('Seguro:', seguro);
    console.log('Coleta:', coleta);
    console.log('Pedágio:', pedagio);
    console.log('Custo total:', custoTotal);
    console.log('Frete final:', valorFrete);

    return valorFrete;
}


// 5. EVENTO DO BOTÃO CALCULAR FRETE


calculo.addEventListener('click', function(event) {

    event.preventDefault();

    let fretemotorista = document.getElementById('vmotorista').value;
    let valordenota = document.getElementById('vnota').value;
    let valordecoleta = document.getElementById('vcoleta').value;
    let valordopedagio = document.getElementById('vpedagio').value;

    try {

        let resultado = calcularfrete(
            fretemotorista,
            valordenota,
            valordecoleta,
            valordopedagio
        );

        resultadoFrete.textContent = resultado.toLocaleString(
            'pt-BR',
            {
                style: 'currency',
                currency: 'BRL'
            }
        );

    } catch (erro) {

        console.error(erro.message);

        resultadoFrete.textContent = 'Verifique os valores';

    }

});
