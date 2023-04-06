// ==UserScript==
// @name         YouTube自动点击最新视频选项
// @namespace    your-namespace
// @version      1.0
// @description  自动点击YouTube所有视频页面的“最新”选项
// @author       Your name
// @run-at       document-end
// @match        https://www.youtube.com/*/videos
// @grant        none
// ==/UserScript==


(function () {
    'use strict';
   console.log(222222222222);
    const runScript = function() {
        const chipsWrapper = document.getElementById("chips-wrapper");

        if (chipsWrapper) {
             console.log(11111111);
            const ironSelector = chipsWrapper.querySelector("iron-selector");

            const chips = ironSelector.querySelectorAll("yt-chip-cloud-chip-renderer");

            chips.forEach(chip => {

                if (chip.innerText === "最新") {
                    chip.click();
                }
            });
        }
    }

    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver(function (mutations) {
        runScript();
    });

    // 配置观察器选项
    const config = {childList: true, subtree: true};

    // 选择要观察的目标节点
    const targetNode = document.documentElement;

    // 传入目标节点和观察器选项
    observer.observe(targetNode, config);

    window.addEventListener('load', function() {
        runScript();
    });
})();
