var intervalId = setInterval(function () {
    var element = document.querySelector('mds-icon[type="ico_add_circle"]');
    if (element) {
        element.click();
        setTimeout(function () {
            window.history.back();
        }, 1000);
    } else {
        clearInterval(intervalId);
    }
}, 2000);
