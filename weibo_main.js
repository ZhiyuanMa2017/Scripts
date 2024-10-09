const version = 'v0515.1';

const mainConfig =  {

    //微博详情页配置
    removeRelate: true,			//相关推荐
    removeGood: true,			//微博主好物种草
    removeFollow: true,			//关注博主
    removeRelateItem: false,	//评论区相关内容
    removeRecommendItem: true,	//评论区推荐内容
    removeRewardItem: false,	//微博详情页打赏模块

}

const modifyCardsUrls = ['/cardlist', 'video/community_tab',];
const modifyStatusesUrls = ['statuses/friends/timeline', 'statuses/unread_friends_timeline', 'statuses/unread_hot_timeline', 'groups/timeline'];

const otherUrls = {
    '/statuses/extend': 'itemExtendHandler',					//微博详情页
    '/comments/build_comments': 'removeComments',		//微博详情页评论区相关内容
    '/profile/container_timeline': 'userHandler',					//用户主页
    '/search/finder': 'removeSearchMain',
    '/search/container_timeline': 'removeSearch',
    '/search/container_discover': 'removeSearch',
    '/2/searchall': 'removeSearch',	//搜索
    '/2/messageflow': 'removeMsgAd',
    '/statuses/container_timeline?': 'removeMain',	//首页
    '/statuses/container_timeline_unread': 'removeMain',	//首页
    '/statuses/repost_timeline': 'removeRepost',	//转发流
}


function getModifyMethod(url) {
    for (const s of modifyCardsUrls) {
        if(url.indexOf(s) > -1) {
            return 'removeCards';
        }
    }
    for (const s of modifyStatusesUrls) {
        if(url.indexOf(s) > -1) {
            return 'removeTimeLine';
        }
    }
    for(const [path, method] of Object.entries(otherUrls)) {
        if(url.indexOf(path) > -1) {
            return method;
        }
    }
    return null;
}


function isAd(data) {
    if(!data) {
        return false;
    }
    if(data.mblogtypename == '广告' || data.mblogtypename == '热推') {return true};
    if(data.promotion && data.promotion.type == 'ad') {return true};
    return false;
}

// 判断首页流 感兴趣的超话
function checkJunkTopic(item) {
    if(item.category != 'group') {
        return false;
    }
    try {
        if(['super_topic_recommend_card', 'recommend_video_card'].indexOf(item.trend_name) > -1) {
            return true;
        }
    } catch (error) {
    }
    return false;
}


function removeRepost(data) {
    if(data.reposts) {
        let newItems = [];
        for (let item of data.reposts) {
            if(!isAd(item)) {
                newItems.push(item);
            }
        }
        data.reposts = newItems;
    }

    if(data.hot_reposts) {
        let newItems = [];
        for (let item of data.hot_reposts) {
            if(!isAd(item)) {
                newItems.push(item);
            }
        }
        data.hot_reposts = newItems;
    }
    return data;
}

function removeMain(data) {
    if(!data.items) {
        return data;
    }
    let newItems = [];
    for (let item of data.items) {
        if(checkJunkTopic(item)) {
            continue;
        }
        if(!isAd(item.data)) {
            newItems.push(item);
        }
    }
    data.items = newItems;
    return data;
}

function removeSearchMain(data) {
    let channels = data.channelInfo.channels;
    if (!channels) {return data;}
    for(let channel of channels) {
        let payload = channel.payload;
        if (!payload) {continue;}
        removeSearch(payload)
    }
    return data;
}


function checkSearchWindow(item) {
    if(!mainConfig.removeSearchWindow) return false;
    if(item.category != 'card') return false;
    return item.data?.itemid == 'finder_window' || item.data?.itemid == 'more_frame';
}


//发现页
function removeSearch(data) {
    if(!data.items) {
        return data;
    }
    let newItems = [];
    for (let item of data.items) {
        if(item.category == 'feed') {
            if(!isAd(item.data)) {
                newItems.push(item);
            }
        } else {
            if(!checkSearchWindow(item)) {
                newItems.push(item);
            }
        }
    }
    data.items = newItems;
    return data;
}


function removeMsgAd(data) {
    if(!data.messages) {
        return;
    }
    let newMsgs = [];
    for (let msg of data.messages) {
        if(msg.msg_card?.ad_tag) {
            continue;
        }
        newMsgs.push(msg)
    }
    data.messages = newMsgs;
    return data;
}


function removeCards(data) {
    if(!data.cards) {
        return;
    }
    let newCards = [];
    for (const card of data.cards) {
        let cardGroup = card.card_group;
        if(cardGroup && cardGroup.length > 0) {
            let newGroup = [];
            for (const group of cardGroup) {
                let cardType = group.card_type;
                if(cardType != 118) {
                    newGroup.push(group);
                }
            }
            card.card_group = newGroup;
            newCards.push(card);
        } else {
            let cardType = card.card_type;
            if([9,165].indexOf(cardType) > -1) {
                if(!isAd(card.mblog)) {
                    newCards.push(card);
                }
            } else {
                newCards.push(card);
            }
        }
    }
    data.cards = newCards;
}

function isBlock(data) {
    let blockIds = mainConfig.blockIds || [];
    if(blockIds.length === 0) {
        return false;
    }
    let uid = data.user.id;
    for (const blockId of blockIds) {
        if(blockId == uid) {
            return true;
        }
    }
    return false;
}

function removeTimeLine(data) {
    for (const s of ["ad", "advertises", "trends"]) {
        if(data[s]) {
            delete data[s];
        }
    }
    if(!data.statuses) {
        return;
    }
    let newStatuses = [];
    for (const s of data.statuses) {
        if(!isAd(s)) {
            if(!isBlock(s)) {
                newStatuses.push(s);
            }
        }
    }
    data.statuses = newStatuses;
}


//微博详情页
function itemExtendHandler(data) {
    if(mainConfig.removeRelate || mainConfig.removeGood) {
        if(data.trend && data.trend.titles) {
            let title = data.trend.titles.title;
            if(mainConfig.removeRelate && title === '相关推荐') {
                delete data.trend;
            } else if (mainConfig.removeGood && title === '博主好物种草') {
                delete data.trend;
            }
        }
    }
    if(mainConfig.removeFollow) {
        if(data.follow_data) {
            data.follow_data = null;
        }
    }

    if(mainConfig.removeRewardItem) {
        if(data.reward_info) {
            data.reward_info = null;
        }
    }

    //删除超话新帖和新用户通知
    if(data.page_alerts) {
        data.page_alerts = null;
    }

    // 06.29 删除新版广告
    if(data.head_cards) {
        data.head_cards = null;
    }

    //广告 暂时判断逻辑根据图片	https://h5.sinaimg.cn/upload/1007/25/2018/05/03/timeline_icon_ad_delete.png
    try {
        let picUrl = data.trend.extra_struct.extBtnInfo.btn_picurl;
        if(picUrl.indexOf('timeline_icon_ad_delete') > -1) {
            delete data.trend;
        }
    } catch (error) {

    }
}

//评论区相关和推荐内容
function removeComments(data) {
    let delType = ['广告'];
    if(mainConfig.removeRelateItem) delType.push('相关内容');
    if(mainConfig.removeRecommendItem) delType.push(...['推荐', '热推']);
    // if(delType.length === 0) return;
    let items = data.datas || [];
    if(items.length === 0) return;
    let newItems = [];
    for (const item of items) {
        let adType = item.adType || '';
        if(delType.indexOf(adType) == -1) {
            newItems.push(item);
        }
    }
    data.datas = newItems;
}

function userHandler(data) {
    data = removeMain(data);
    return data;
}

const url = $request.url;
let body = $response.body;

let method = getModifyMethod(url);
if(method) {
    var func = eval(method);
    let data = JSON.parse(body);
    new func(data);
    body = JSON.stringify(data);
}

$done({ body });
