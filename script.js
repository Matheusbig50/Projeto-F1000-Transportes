const link = document.querySelector('[href="paginas/clientes.html"]')

link.addEventListener("click", function(event){
    event.preventDefault();
    
    fetch("paginas/clientes.html")
        .then(function(resposta){
            return resposta.text()
})
.then(function(html){
    conteudo.innerHTML = html
})

});