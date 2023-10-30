const url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

if (obj.ads) {
    obj.ads = [];
}
body = JSON.stringify(obj);
$done({body});
