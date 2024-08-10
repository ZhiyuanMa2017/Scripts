const url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

if (obj.reposts && obj.reposts.length > 0) {
    let i = obj.reposts.length;
    while (i--) {
        if (obj.reposts[i].mblogtype && obj.reposts[i].mblogtype === 1) {
            obj.reposts.splice(i, 1);
        }
    }
}

if (obj.hot_reposts && obj.hot_reposts.length > 0) {
    let i = obj.hot_reposts.length;
    while (i--) {
        if (obj.hot_reposts[i].mblogtype && obj.hot_reposts[i].mblogtype === 1) {
            obj.hot_reposts.splice(i, 1);
        }
    }
}

body = JSON.stringify(obj);
$done({ body });
