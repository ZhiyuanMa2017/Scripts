const url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

if (obj.head_cards) {
    delete obj.head_cards;
}
if (obj.trend) {
    delete obj.trend;
}

body = JSON.stringify(obj);
$done({body});
