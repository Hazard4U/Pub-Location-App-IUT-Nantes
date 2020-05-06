//Récupère tous les cookies sous forme d'un objet key:value
function getCookies() {
    const cookies = document.cookie.split('; ');
    let result = {};
    for (var i = 0; i < cookies.length; i++) {
        var cur = cookies[i].split('=');
        result[cur[0]] = cur[1];
    }
    return result;
}

// offset en heure, permet de récupérer l'heure locale d'une timezone
function calcDate(offset) {
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000*offset));
}

export {getCookies,calcDate};