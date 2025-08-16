# Scripts

- [harryhare / 1point3acres](https://github.com/harryhare/1point3acres)
- [wbt5 / real-url](https://github.com/wbt5/real-url)
- [yichahucha / surge](https://github.com/yichahucha/surge)

### Quantumult X
Weibo去广告 
```properties
[rewrite_local]
#^https?://m?api\.weibo\.c(n|om)/2/(cardlist|searchall|page|messageflow|statuses/(unread_)?friends(/|_)timeline|groups/timeline|statuses/(container_timeline|unread_hot_timeline|extend|video_mixtimeline|repost_timeline)|profile/(me|container_timeline)|video/(community_tab|remind_info|tiny_stream_video_list)|checkin/show|\!/live/media_homelist|comments/build_comments|container/get_item|search/(finder|container_timeline|container_discover)) url script-response-body https://raw.githubusercontent.com/zmqcherish/proxy-script/main/weibo_main.js

^https?://(sdk|wb)app\.uve\.weibo\.com(/interface/sdk/sdkad.php|/wbapplua/wbpullad.lua) url script-response-body https://raw.githubusercontent.com/yichahucha/surge/master/wb_launch.js

^https://api.weibo.cn/2/statuses/container_detail_comment url script-response-body https://raw.githubusercontent.com/ZhiyuanMa2017/Scripts/master/wb_ad_test_8.js

^https://api.weibo.cn/2/statuses/container_detail url script-response-body https://raw.githubusercontent.com/ZhiyuanMa2017/Scripts/master/wb_ad_test_9.js

^https://api.weibo.cn/2/profile/container_timeline url script-response-body https://raw.githubusercontent.com/ZhiyuanMa2017/Scripts/master/wb_ad_test_2.js

^https://api.weibo.cn/2/searchall url script-response-body https://raw.githubusercontent.com/ZhiyuanMa2017/Scripts/master/wb_ad_test_2.js

^https://api.weibo.cn/2/statuses/repost_timeline url script-response-body https://raw.githubusercontent.com/ZhiyuanMa2017/Scripts/master/wb_ad_test_5.js

^https://api.weibo.cn/2/statuses/extend url script-response-body https://raw.githubusercontent.com/ZhiyuanMa2017/Scripts/master/wb_ad_test_4.js

^https?://m?api\.weibo\.c(n|om)/2/(messageflow/notice|search/(container_timeline|finder)|statuses/(container_timeline_hot|container_timeline_unread|container_timeline|unread|extend|positives/get|(friends|video)(/|_)(mix)?timeline)|stories/(video_stream|home_list)|(groups|fangle)/timeline|profile/statuses|comments/build_comments|photo/recommend_list|service/picfeed|searchall|cardlist|page|!/(photos/pic_recommend_status|live/media_homelist)|video/tiny_stream_video_list|photo/info|remind/unread_count) url script-response-body https://raw.githubusercontent.com/yichahucha/surge/master/wb_ad.js

^https://api.weibo.cn/2/ad/weibointl url script-response-body https://raw.githubusercontent.com/ZhiyuanMa2017/Scripts/master/wb_ad_test.js

^https://bootpreload.uve.weibo.com/v1/ad/preload url script-response-body https://raw.githubusercontent.com/ZhiyuanMa2017/Scripts/master/wb_ad_test_3.js

^https://bootpreload.uve.weibo.com/v2/ad/preload url script-response-body https://raw.githubusercontent.com/ZhiyuanMa2017/Scripts/master/wb_ad_test_3.js

[mitm]
hostname = api.weibo.cn, mapi.weibo.com, *.uve.weibo.com
```

### Instagram profile picture HD url
1. Log in to your instagram account on chrome
2. Open the developer tools by pressing `F12`
3. Visit https://www.instagram.com/api/v1/users/web_profile_info/?username={username}
4. Go to Network conditions and change the user agent to
>Mozilla/5.0 (Linux; Android 9; GM1903 Build/PKQ1.190110.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3770.143 Mobile Safari/537.36 Instagram 103.1.0.15.119 Android (28/9; 420dpi; 1080x2260; OnePlus; GM1903; OnePlus7; qcom; sv_SE; 164094539)
5. Refresh the page and find `"id:"` in the json response
6. Copy the id and paste it in the following url: https://i.instagram.com/api/v1/users/{id}/info/
7. Visit the url using the same user agent as before
8. Search for `"hd_profile_pic_url_info":` in the json response  

source: https://stackoverflow.com/a/61797158
