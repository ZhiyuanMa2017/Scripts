function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function findButtons(str) {
    let btns = [];
    for (let btn of document.querySelectorAll('button')) {
        if (btn.textContent.includes(str)) {
            btns.push(btn);
        }
    }
    return btns;
}

async function runSelect() {
    for (let i = 0; i < 10; ++i) {
        let btns = findButtons('Show More');
        if (!btns.length) break;
        let btn = btns[0];
        btn.scrollIntoView();
        btn.click();
        await sleep(1000);
    }
    let btns = findButtons('Clip Coupon');
    let clicked = 0;
    for (let btn of Array.from(btns).reverse()) {
        btn.scrollIntoView();
        btn.click();
        clicked++;
        await sleep(1000);
    }
}

runSelect();
