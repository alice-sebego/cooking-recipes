const ajaxGet = (url, callback)=>{

    // Création d'une requête HTTP
    let req = new XMLHttpRequest();
    // Requête HTTP GET synchrone vers le fichier langages.txt publié localement
    req.open("GET", url);
    // Affiche la réponse reçue pour la requête
    req.addEventListener('load', ()=>{
        if(req.status >= 200 && req.status < 400){
            callback(req.responseText);
        } else {
            console.error( req.status + " " + req.statusText + " " + url);
        }
    });

    req.addEventListener('error', ()=>{
        console.error("erreur réseau avec l'URL" + url)
    });

    // Envoi de la requête
    req.send(null);
}
