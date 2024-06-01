const url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

if (obj.items && obj.items.length > 0) {
    let i = obj.items.length;
    while (i--) {
        if (isAd(obj.items[i])) {
            obj.items.splice(i, 1);
        }
    }
}

function isAd(item) {
    if (item.items) {
        let n = item.items.length
        for (let i = 0; i < n; i++) {
            let cur = item.items[i];
            if (cur.data && cur.data.title_extra_text && cur.data.title_extra_text == "\u5e7f\u544a") {
                return true;
            }
        }
    }
    return false;
}

body = JSON.stringify(obj);
$done({ body });
