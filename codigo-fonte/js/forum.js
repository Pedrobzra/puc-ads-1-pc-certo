// DOCUMENT GET

document.getElementById("novoTpc");
document.getElementById("popUp");
document.getElementById("btFechar");
document.getElementById("textoPub");
document.getElementById("titPub");
document.getElementById("enviarPub");
document.getElementById("h2");
document.getElementById("txtCurto");
document.getElementById("temaTpc");
document.getElementById("opcInval");

// RETIRAR VALOR DO LOCAL STORAGE E CONVERTER COM JSON

const usuarioString = localStorage.getItem("nomeCadastro");



// FUNÇÃO ABRIR E FECHAR POP UP NOVO TOPICO

function abrirPU () {
    popUp.style.display= "flex";
    titPub.focus();

    textoPub.value = "";
    titPub.value = "";
    temaTpc.value= "NULO";

    
    enviarPub.onmouseenter = function () {
        enviarPub.style.backgroundColor= "";
        enviarPub.style.color= "";
}
    enviarPub.onmouseleave = function () {
        enviarPub.style.backgroundColor= "";
        enviarPub.style.color= "";

        txtCurto.textContent = "*O texto está muito curto!"
        titCurto.textContent = "*O título está muito curto!"
};
}

function fecharPU () {


    if (textoPub.value !== "" || titPub.value !== ""){
        const confirmar = confirm("Descartar publicação e sair?");
        if (!confirmar) {
            return;
        }
    }
    popUp.style.display= "none";
};

novoTpc.onclick = function () {
    if (usuarioString === null) {
        alert("É necessário criar uma conta para fazer uma publicação!");
    } else {
        abrirPU ();
    desativaPub ();
    validaDados ();
    }
} 
btFechar.onclick = fecharPU;

// FUNÇÃO DO BOTAO DE PUBLICAR

    //FUNCOES EXECUTADAS AO ABRIR

        //HOVER
        enviarPub.onmouseenter = function () {
            enviarPub.style.backgroundColor= "#gainsboro";
            enviarPub.style.color= "black";
}
        enviarPub.onmouseleave = function () {
            enviarPub.style.backgroundColor= "gainsboro";
            enviarPub.style.color= "black";
}
    //DESATIVA BOTAO DE PUBLICAR

function desativaPub () {
    enviarPub.style.cursor= "not-allowed"
    enviarPub.onclick= function () {
        alert("Preencha adequadamente todos os campos antes de publicar!")
    }
    enviarPub.title= "Preencha adequadamente todos os campos para poder publicar";

        // HOVER PARA DESATIVO
    enviarPub.onmouseenter = function () {enviarPub.style.backgroundColor= "";}
    enviarPub.onmouseleave = function () {enviarPub.style.backgroundColor= "";}
};

    //ATIVA BOTAO DE PUBLICAR

function ativaPub () {
    enviarPub.style.cursor= "pointer";
    enviarPub.onclick= publicar;
    enviarPub.title= "Clique para fazer sua publicação!";
    
        //HOVER PARA ATIVO
    enviarPub.onmouseenter = function () {
        enviarPub.style.backgroundColor= "#41ae4f";
        enviarPub.style.color= "white";
    }
    enviarPub.onmouseleave = function () {
        enviarPub.style.backgroundColor= "gainsboro";
        enviarPub.style.color= "black";
    }
};

    //VERIFICAÇÃO DE CAMPOS

        //CAMPOS VAZIOS
function validaDados () {
    if (textoPub.value == "" || titPub.value == "" || temaTpc.value == "NULO"){
        desativaPub ();
    } else {
    ativaPub ();
    }
           
        //MENSAGENS VERMELHAS DE TEXTO OU TITULO CURTOS

    let valorTxt = textoPub.value;
    let valorTit = titPub.value;

    function eTxtCurto () {
        txtCurto.textContent = "*O texto está muito curto!"
    }
    function eTxtLongo () {
        txtCurto.textContent = ""
    }

    function eTitCurto () {
        titCurto.textContent = "*O título está muito curto!"
    }
    function eTitLongo () {
        titCurto.textContent = ""
    }
    function eTemaNulo () {
        opcInval.textContent = "*Você deve selecionar alguma opção!"
    }
    function eTemaCerto () {
        opcInval.textContent = ""
    }


    if(valorTxt.length < 10 && valorTxt.length !== ""){
        eTxtCurto ();
        desativaPub ();
    } else {
        eTxtLongo ();
    }

    if(valorTit.length < 5 && valorTit.length !== ""){
        eTitCurto ();
        desativaPub ();
    } else {
        eTitLongo ();
    }

    if(temaTpc.value == "NULO"){
        eTemaNulo ();
        desativaPub ();
    } else {
        eTemaCerto ();
    }
 }

//RECONHECENDORES DE INPUT PARA EXECUTAR A VALIDAÇÃO

textoPub.oninput= validaDados;
titPub.oninput= validaDados;
temaTpc.onchange= validaDados;

    // FUNCAO PUBLICAR DE FATO    

function publicar (){

        //ENVIAR DADOS AO LOCAL STORAGE E FECHAR

var Publicacao = {
    titulo: titPub.value,
    texto: textoPub.value,
    tema: temaTpc.value,
    autor: usuarioString
};

    //CRIANDO NUMERO PARA CHAVE idPost

    var nPost = localStorage.length
    nPost += 1;

var idPost = "POST_" + temaTpc.value + "_"+ nPost;

var postString = JSON.stringify(Publicacao);

localStorage.setItem(idPost, postString)

popUp.style.display= "none";

        // CRIAR NOVA ESTRUTURA --EM PROGRESSO--

}


