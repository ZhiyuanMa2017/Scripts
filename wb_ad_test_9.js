const url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

if (obj.pageHeader.data.items && obj.pageHeader.data.items.length > 0) {
    let i = obj.pageHeader.data.items.length;
    while(i--) {
        if(obj.pageHeader.data.items[i].category && obj.pageHeader.data.items[i].category === "wboxcard") {
            obj.pageHeader.data.items.splice(i, 1);
        }
    }
}

body = JSON.stringify(obj);
$done({body});
