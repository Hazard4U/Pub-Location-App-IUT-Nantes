function getCookies() {
    const cookies = document.cookie.split('; ');
    let result = {};
    for (var i = 0; i < cookies.length; i++) {
        var cur = cookies[i].split('=');
        result[cur[0]] = cur[1];
    }
    return result;
}

export {getCookies};