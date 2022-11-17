const url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

if (obj.data) {
    obj.data = [];
}
body = JSON.stringify(obj);
$done({ body });
