# Scripts

- [harryhare / 1point3acres](https://github.com/harryhare/1point3acres)
- [wbt5 / real-url](https://github.com/wbt5/real-url)

### Quantumult X
Weibo去广告 
```properties
[rewrite_local]
^https?://(sdk|wb)app\.uve\.weibo\.com(/interface/sdk/sdkad.php|/wbapplua/wbpullad.lua) url script-response-body https://raw.githubusercontent.com/yichahucha/surge/master/wb_launch.js

^https://api.weibo.cn/2/searchall url script-response-body https://raw.githubusercontent.com/ZhiyuanMa2017/Scripts/master/wb_ad_test_6.js

^https://api.weibo.cn/2/searchall url script-response-body https://raw.githubusercontent.com/ZhiyuanMa2017/Scripts/master/wb_ad_test_2.js

^https://api.weibo.cn/2/statuses/extend  url script-response-body https://raw.githubusercontent.com/ZhiyuanMa2017/Scripts/master/wb_ad_test_4.js

^https://api.weibo.cn/2/statuses/repost_timeline url script-response-body https://raw.githubusercontent.com/ZhiyuanMa2017/Scripts/master/wb_ad_test_5.js

^https?://m?api\.weibo\.c(n|om)/2/(messageflow/notice|search/(container_timeline|finder)|statuses/(container_timeline_hot|container_timeline_unread|container_timeline|unread|extend|positives/get|(friends|video)(/|_)(mix)?timeline)|stories/(video_stream|home_list)|(groups|fangle)/timeline|profile/statuses|comments/build_comments|photo/recommend_list|service/picfeed|searchall|cardlist|page|!/(photos/pic_recommend_status|live/media_homelist)|video/tiny_stream_video_list|photo/info|remind/unread_count) url script-response-body https://raw.githubusercontent.com/yichahucha/surge/master/wb_ad.js

^https://api.weibo.cn/2/ad/weibointl url script-response-body https://raw.githubusercontent.com/ZhiyuanMa2017/Scripts/master/wb_ad_test.js

^https://api.weibo.cn/2/statuses/container_timeline url script-response-body https://raw.githubusercontent.com/ZhiyuanMa2017/Scripts/master/wb_ad_test_2.js

^https://api.weibo.cn/2/profile/container_timeline url script-response-body https://raw.githubusercontent.com/ZhiyuanMa2017/Scripts/master/wb_ad_test_2.js

^https://bootpreload.uve.weibo.com/v1/ad/preload url script-response-body https://raw.githubusercontent.com/ZhiyuanMa2017/Scripts/master/wb_ad_test_3.js

^https://bootpreload.uve.weibo.com/v2/ad/preload url script-response-body https://raw.githubusercontent.com/ZhiyuanMa2017/Scripts/master/wb_ad_test_3.js

[mitm]
hostname = api.weibo.cn, mapi.weibo.com, *.uve.weibo.com
```
