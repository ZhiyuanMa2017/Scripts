const url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

if (obj.head_cards) {
  delete obj.head_cards;
}
body = JSON.stringify(obj);
$done({body});
