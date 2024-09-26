const url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);


if (obj.datas && obj.datas.length > 0) {
    let i = obj.datas.length;
    while (i--) {
        const element = obj.datas[i];
        if (element.type) {
            if (element.type === 5 || element.type === 1 || element.type === 6) {
                obj.datas.splice(i, 1);
            }
        } else if (element.adType) {
            if (element.adType === '广告' || element.adType === '推荐' || element.adType === '热推') {
                obj.datas.splice(i, 1);
            }
        }
    }
}

body = JSON.stringify(obj);
$done({body});
