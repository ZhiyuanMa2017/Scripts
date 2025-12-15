const url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

if (obj.items && obj.items.length > 0) {
  let i = obj.items.length;
  while(i--) {
    if(obj.items[i].status && obj.items[i].status.mblogtype === 1) {
      obj.items.splice(i, 1);
    }
  } 
}

body = JSON.stringify(obj);
$done({ body });
