import { Notification } from 'element-ui';
/*token超时插件*/

let setLocalStorage= (key, value) =>{
             var curtime = new Date().getTime(); // 获取当前时间 ，转换成JSON字符串序列 
             var valueDate = JSON.stringify({
                 val: value,
                 timer: curtime
             });
             try {
                 localStorage.setItem(key, valueDate);
             } catch(e) {
                    if(isQuotaExceeded(e)) {
                        console.log("Error: 本地存储超过限制");
                        localStorage.clear();
                    } else {
                        console.log("Error: 保存到本地存储失败");
                    }
                }
            }
let isQuotaExceeded = (e) => {
                var quotaExceeded = false;
                if(e) {
                    if(e.code) {
                        switch(e.code) {
                            case 22:
                                quotaExceeded = true;
                                break;
                            case 1014: // Firefox 
                                if(e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                                    quotaExceeded = true;
                                }
                                break;
                        }
                    } else if(e.number === -2147024882) { // IE8 
                        quotaExceeded = true;
                    }
                }
                return quotaExceeded;
            }
let getLocalStorage = (key)=> {
                var exp = 1000*60*30; //30分钟的秒数
                //var exp = 5000
                if(localStorage.getItem(key)) {
                    var vals = localStorage.getItem(key); // 获取本地存储的值 
                    var dataObj = JSON.parse(vals); // 将字符串转换成JSON对象
                    // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间 
                    var isTimed = (new Date().getTime() - dataObj.timer) > exp;
                    if(isTimed) {
                        console.log("token已过期");
                        localStorage.removeItem(key);
                        Notification({
                            title: '警告',
                            message: 'Token信息已过期,请重新登录',
                            type: 'warning',
                            duration: 0
                          });
                        return null;
                    } else {
                        var newValue = dataObj.val;
                    }
                    return newValue;
                } else {
                    return null;
                }
            }

export { setLocalStorage,isQuotaExceeded,getLocalStorage }