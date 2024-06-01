const url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

if (obj.items && obj.items.length > 0) {
    let i = obj.reposts.length;
    while (i--) {
        if (isAd(obj.items[i])) {
            obj.reposts.splice(i, 1);
        }
    }
}

function isAd(item) {
    if (item.items) {
        let n = item.items.length
        for (let i = 0; i < n; i++) {
            let cur = item.items[i];
            if (cur.data && cur.data.card_type && cur.data.card_type == 22) {
                return true;
            }
        }
    }
    return false;
}

body = JSON.stringify(obj);
$done({ body });
