function getCookies() {
    const cookies = document.cookie.split('; ');
    let result = {};
    for (var i = 0; i < cookies.length; i++) {
        var cur = cookies[i].split('=');
        result[cur[0]] = cur[1];
    }
    return result;
}

function addScript(src){
    let script = document.createElement('script');
    script.setAttribute('src',src);
    document.head.appendChild(script);
}

function redirectPost(url, data) {
    var form = document.createElement('form');
    document.body.appendChild(form);
    form.method = 'post';
    form.action = url;
    for (var name in data) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = data[name];
        form.appendChild(input);
    }
    form.submit();
}

export {getCookies, redirectPost,addScript};