

const btn_adicionar = document.querySelector("#btn-adicionar");
let semana = document.querySelector('#data');
let dataHora = new Date();





/*---------- EVENTO DE CLICK (BOTÃO - ADICIONAR TAREFA) ----------*/

btn_adicionar.addEventListener("click", function(e){
    e.preventDefault();

    adicionar_tarefa();
});


/*---------- FUNÇÕES ----------*/

function adicionar_tarefa(){
    const input_tarefa = document.querySelector("#input-tarefa").value;
    
    //VERIFICAR SE O TEXTO DO INPUT NÃO É VAZIO
    if(input_tarefa){

        tocar_som_tarefa_adicionada();

        //CLONAR TEMPLATE HTML
        const template = document.querySelector(".template");
        const nova_tarefa = template.cloneNode(true);

        //ADICIONA TEXTO-TAREFA NO TEMPLATE
        nova_tarefa.querySelector(".texto-tarefa").textContent = input_tarefa.toUpperCase();

        //REMOVER CLASSES 
        nova_tarefa.classList.remove("template");
        nova_tarefa.classList.remove("invisivel");

        //ADICIONAR TAREFA NA LISTA
        const lista =  document.querySelector("#lista");
        lista.appendChild(nova_tarefa);
        //ADICIONAR EVENTO DE REMOVER TAREFA DA LISTA
        const btn_remover = nova_tarefa.querySelector(".btn-remover").addEventListener("click",function(){
            remover_tarefa(this);
        });
        //ADICIONAR EVENTO DE TAREFA COMPLETADA
        const btn_checado = nova_tarefa.querySelector(".btn-checado").addEventListener("click",function(){
            tarefa_completada(this);
        });
        
        //LIMPAR INPUT
        document.querySelector("#input-tarefa").value="";
        //FOCUS NO INPUT
        document.querySelector("#input-tarefa").focus(); 
    }
}

function remover_tarefa(tarefa){
    tarefa.parentNode.remove(true);
    tocar_som_tarefa_removida();
}

function tarefa_completada(tarefa){
    const tarefa_completada = tarefa.parentNode;
    const container_texto=tarefa_completada.children[0];
    container_texto.classList.toggle("realizado");
    tocar_som_tarefa_completada();
}

function tocar_som_tarefa_completada(){
    const audio = new Audio("assets/audios/tarefa_completada.mp3");
    audio.volume = 0.2;
    audio.play();
}

function tocar_som_tarefa_removida(){
    const audio = new Audio("assets/audios/tarefa_removida.mp3");
    audio.volume = 0.2;
    audio.play();
}

function tocar_som_tarefa_adicionada(){
    const audio = new Audio("assets/audios/tarefa_adicionada.mp3");
    audio.volume = 0.05;
    audio.play();
}

function atualiza_data() {
    let dia = dataHora.getDate();
    let mes = dataHora.getMonth()+1;
    let ano = dataHora.getFullYear();
    let strDia = new String(dia);
    let strMes = new String(mes);

    if(strDia.length == 1) {dia = '0' + dia};
    if(strMes.length == 1) {mes = '0' + mes};

    let dataAtual ='Data - ' + dia + ' - ' + mes + ' - ' + ano;

    data.textContent = dataAtual
}


//CHAMADA DE FUNÇÃO
atualiza_data();

//FOCUS NO INPUT
document.querySelector("#input-tarefa").focus(); 

