// DOCUMENT GET

//DECLARAÇÃO DE CONST E VAR

const usuarioString = localStorage.getItem("nomeCadastro");

/*
  popUp.style.display = "flex";
  */
titPub.focus();

textoPub.value = "";
titPub.value = "";
temaTpc.value = "NULO";

enviarPub.onmouseenter = function () {
  enviarPub.style.backgroundColor = "";
  enviarPub.style.color = "";
};
enviarPub.onmouseleave = function () {
  enviarPub.style.backgroundColor = "";
  enviarPub.style.color = "";

  txtCurto.textContent = "*O texto está muito curto!";
  titCurto.textContent = "*O título está muito curto!";
};

enviarPub.onmouseenter = function () {
  enviarPub.style.backgroundColor = "#gainsboro";
  enviarPub.style.color = "black";
};
enviarPub.onmouseleave = function () {
  enviarPub.style.backgroundColor = "gainsboro";
  enviarPub.style.color = "black";
};

//DESATIVA BOTAO DE PUBLICAR

function desativaPub() {
  enviarPub.style.cursor = "not-allowed";
  enviarPub.onclick = function () {
    alert("Preencha adequadamente todos os campos antes de publicar!");
  };
  enviarPub.title =
    "Preencha adequadamente todos os campos para poder publicar";

  // HOVER PARA DESATIVO
  enviarPub.onmouseenter = function () {
    enviarPub.style.backgroundColor = "";
  };
  enviarPub.onmouseleave = function () {
    enviarPub.style.backgroundColor = "";
  };
}

//ATIVA BOTAO DE PUBLICAR

function ativaPub() {
  enviarPub.style.cursor = "pointer";
  enviarPub.onclick = publicar;
  enviarPub.title = "Clique para fazer sua publicação!";

  //HOVER PARA ATIVO
  enviarPub.onmouseenter = function () {
    enviarPub.style.backgroundColor = "#41ae4f";
    enviarPub.style.color = "white";
  };
  enviarPub.onmouseleave = function () {
    enviarPub.style.backgroundColor = "gainsboro";
    enviarPub.style.color = "black";
  };
}

//VERIFICAÇÃO DE CAMPOS

//CAMPOS VAZIOS
function validaDados() {
  if (textoPub.value == "" || titPub.value == "" || temaTpc.value == "NULO") {
    desativaPub();
  } else {
    ativaPub();
  }

  //MENSAGENS VERMELHAS DE TEXTO OU TITULO CURTOS

  let valorTxt = textoPub.value;
  let valorTit = titPub.value;

  function eTxtCurto() {
    txtCurto.textContent = "*O texto está muito curto!";
  }
  function eTxtLongo() {
    txtCurto.textContent = "";
  }

  function eTitCurto() {
    titCurto.textContent = "*O título está muito curto!";
  }
  function eTitLongo() {
    titCurto.textContent = "";
  }
  function eTemaNulo() {
    opcInval.textContent = "*Você deve selecionar alguma opção!";
  }
  function eTemaCerto() {
    opcInval.textContent = "";
  }

  if (valorTxt.length < 10 && valorTxt.length !== "") {
    eTxtCurto();
    desativaPub();
  } else {
    eTxtLongo();
  }

  if (valorTit.length < 5 && valorTit.length !== "") {
    eTitCurto();
    desativaPub();
  } else {
    eTitLongo();
  }

  if (temaTpc.value == "NULO") {
    eTemaNulo();
    desativaPub();
  } else {
    eTemaCerto();
  }
}

//RECONHECENDORES DE INPUT PARA EXECUTAR A VALIDAÇÃO

textoPub.oninput = validaDados;
titPub.oninput = validaDados;
temaTpc.onchange = validaDados;

// FUNCAO PUBLICAR DE FATO

function publicar() {
  //ENVIAR DADOS AO LOCAL STORAGE E FECHAR

  var Publicacao = {
    titulo: titPub.value,
    texto: textoPub.value,
    tema: temaTpc.value,
    autor: usuarioString,
  };

  //CRIANDO NUMERO PARA CHAVE idPost

  var nPost = localStorage.length;
  nPost += 1;

  var idPost = "POST_" + temaTpc.value + "_" + nPost;

  var postString = JSON.stringify(Publicacao);

  localStorage.setItem(idPost, postString);

  popUp.style.display = "none";

  // REFRESH NA PAGINA
  setTimeout(function () {
    location.reload();
  }, 100);
}

///// CRIADORA DE DIVS /////

for (let i = 0; i < localStorage.length; i++) {
  const chaveX = localStorage.key(i);

  if (chaveX.includes("POST_")) {
    var postStr = localStorage.getItem(chaveX);
    var postJSON = JSON.parse(postStr);

    function criaDiv(postJSON) {
      // CRIA DIV DO POST
      var divPrincipal = document.createElement("div");
      divPrincipal.className = "classe" + postJSON.tema;

      //CRIA DIV DO "TEMA DO POST"
      var divQualTema = document.createElement("div");
      divQualTema.className = "qualTema";
      divQualTema.innerText = "Tema do Tópico: ";

      //CRIA DIV DO TEMA DO POST
      var divTema = document.createElement("div");
      divTema.className = "tema";
      divTema.innerText = postJSON.tema;

      // CRIA DIV DO TITULO
      var divTitulo = document.createElement("div");
      divTitulo.className = "titulo";
      divTitulo.innerText = postJSON.titulo;

      // CRIA A DIV DO TEXTO
      var divTexto = document.createElement("div");
      divTexto.className = "texto";
      divTexto.innerText = postJSON.texto;

      // CRIA A DIV "PUBLICADO POR"
      var divBy = document.createElement("div");
      divBy.className = "feitoPor";
      divBy.innerText = "Publicado por: ";

      // CRIA A DIV DO AUTOR
      var divAutor = document.createElement("div");
      divAutor.className = "autor";
      divAutor.innerText = postJSON.autor;

      // COLOCA AS DIVS COMO FILHAS DA PRINCIPAL
      divPrincipal.appendChild(divTitulo);
      divPrincipal.appendChild(divQualTema);
      divPrincipal.appendChild(divTema);
      divPrincipal.appendChild(document.createElement("br"));
      divPrincipal.appendChild(divTexto);
      divPrincipal.appendChild(document.createElement("br"));
      divPrincipal.appendChild(divBy);
      divPrincipal.appendChild(divAutor);

      // ADICIONA A DIV PRINCIPAL NA DIV mainContent
    }
    criaDiv(postJSON);
  }
}

// SUMIR ICONES DO FORUM SE NAO TIVER LOGADO

if (usuarioString !== null) {
  iconesForum.classList.remove("forumSlctOpt");
} else {
  iconesForum.style.display = "none";
}
