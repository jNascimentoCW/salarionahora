//Calcula o INSS
function inss(valor){
    var valorINSS = 0;

    if(valor <= 1320){
        valorINSS = valor * 0.075;
    }else if(valor <= 2571.29){
        valorINSS = (1320) * 0.075 + (valor - 1320) * 0.09;
    }else if(valor <= 3856.94){
        valorINSS = (1320) * 0.075 + (2571.29 - 1320) * 0.09 + (valor - 2571.29) * 0.12;
    }else if(valor <= 7507.49){
        valorINSS = (1320) * 0.075 + (2571.29 - 1320) * 0.09 + (3856.94 - 2571.29) * 0.12 + (valor - 3856.94) * 0.14;
    }else if(valor > 7507.49){
        valorINSS = 1320;
    }
    
    return valorINSS;
}

//Calcula o Imposto de Renda
function ir(valor){
    var valorIR = 0;

    if(valor <= 2112){
        valorIR =  0;
    }else if(valor <= 2826.65){
        valorIR = (valor - 2112) * 0.075;
    }else if(valor <= 3751.05){
        valorIR = (2826.65 - 2112) * 0.075 + (valor - 2826.65) * 0.15;
    }else if(valor <= 4664.68){
        valorIR = (2826.65 - 2112) * 0.075 + (3751.05 - 2826.65) * 0.15 + (valor - 3751.05) * 0.225;
    }else{
        valorIR = (2826.65 - 2112) * 0.075 + (3751.05 - 2826.65) * 0.15 + (4664.68 - 3751.05) * 0.225 + (valor - 4664.68) * 0.275;
    }
    return valorIR;
}

//Soma os dias da semana
function diasUteis(dataInicial, dataFinal) {
    let count = 0;
    const dataAtual = new Date(dataInicial.getTime());
    while (dataAtual <= dataFinal) {
        const diasDaSem = dataAtual.getDay();
        if(diasDaSem !== 0 && diasDaSem !== 6) count++;
        dataAtual.setDate(dataAtual.getDate() + 1);
    }

    return count;
}

document.getElementById('calcular').addEventListener('click', function(){
    const aulas = document.getElementById('aulas').value;
    const salarioBase = document.getElementById('salarioBase').value;
    let gratificacao = document.getElementById('gratificacao').value;
    let vt = document.getElementById('vt').value;
    
    const dataIni = new Date(document.getElementById('dataInicial').value);
    const diaInicial = dataIni.getUTCDate();
    const mesInicial = dataIni.getUTCMonth();
    const anoInicial = dataIni.getUTCFullYear();

    const dataFin = new Date(document.getElementById('dataFinal').value);
    const diaFinal = dataFin.getUTCDate();
    const mesFinal = dataFin.getUTCMonth();
    const anoFinal = dataFin.getUTCFullYear();
    
    let dataInicial = new Date(mesInicial + '-' + diaInicial + '-' + anoInicial);
    let dataFinal = new Date(mesFinal + '-' + diaFinal + '-' + anoFinal);

    
    const salarioBruto = (aulas/5)  * salarioBase * diasUteis(dataInicial, dataFinal);
    gratificacao *= (aulas/5) * diasUteis(dataInicial, dataFinal);
    vt *= (aulas/5) * diasUteis(dataInicial, dataFinal);

    const salarioliq = salarioBruto + gratificacao + vt - inss(salarioBruto) - ir(salarioBruto);

    document.getElementById('resultSalario').innerHTML = ('Salário Bruto: R$ ' + salarioBruto.toFixed(2));
    document.getElementById('INSS').innerHTML = ('INSS: R$ ' + inss(salarioBruto).toFixed(2));
    document.getElementById('IRPF').innerHTML = ('IRPF: R$ '+ ir(salarioBruto).toFixed(2));
    document.getElementById('grat').innerHTML = ('Gratificação: R$ '+ gratificacao.toFixed(2));
    document.getElementById('valeTransporte').innerHTML = ('Vale Transporte: R$ ' + vt.toFixed(2));
    document.getElementById('salarioLiq').innerHTML = ('Salário Líquido: R$ ' + salarioliq.toFixed(2));
});