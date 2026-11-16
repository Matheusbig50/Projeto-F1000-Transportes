const conteudo = document.getElementById("conteudo");
const links = document.querySelectorAll('a[href^="paginas/"]')

links.forEach(function (link) {
    link.addEventListener("click",function(event){
        event.preventDefault();

    fetch(link.getAttribute("href"))
        .then(function (resposta) {     // then() executa uma função depois que a etapa anterior termina.
            return resposta.text()
        })
        .then(function (html) {   
            conteudo.innerHTML = html

        });
        
        
    });
    
});
    