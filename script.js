const selecaoVoz = document.querySelector("#selecao-voz");
const entradaTexto = document.querySelector("#entrada-de-texto");
const Ouvir = document.querySelector("#ouvir-btn");
const Upload = document.querySelector("#upload-arquivo");
const Download = document.querySelector("#baixar-texto-btn");

const fala = new SpeechSynthesisUtterance();

let vozesDisponiveis = [];

const atualizarValores = () => {
    vozesDisponiveis = window.speechSynthesis.getVoices();
    console.log(vozesDisponiveis);
    fala.voice = vozesDisponiveis[16];
    vozesDisponiveis.forEach((voz, index) => {
        const opcao = document.createElement("option");
        opcao.value = index;
        opcao.textContent = voz.name;
        if(index == 16){
            opcao.selected = true;
        }
        selecaoVoz.appendChild(opcao);
    });
}

window.speechSynthesis.onvoiceschanged = atualizarValores;

selecaoVoz.addEventListener("change", () => {
    fala.voice = vozesDisponiveis[selecaoVoz.value];
});

Ouvir.addEventListener("click", () => {
    fala.text = entradaTexto.value;
    window.speechSynthesis.speak(fala);
})

Download.addEventListener("click", () => {
    const texto = entradaTexto.value
    const blob = new Blob([texto], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    console.log(a);
    a.download = "texto.txt";
    a.click();
    URL.revokeObjectURL(url);
});

Upload.addEventListener("change", () => {
    const arquivo = event.target.files[0]
    if (arquivo){
        const leitor = new FileReader()
        leitor.onload = (e) => {
            entradaTexto.value = e.target.result;
        };
        leitor.readAsText(arquivo);
    }
})