/**
 *操作local数据工具函数模块
 */
 const USERNAME = 'userName';
 // 全部暴露
 export default {
    //  const USERNAEME = 'userName';
     // 保存
    saveUser(user){
        localStorage.setItem(USERNAME, JSON.stringify(user));
    },
    /**
     * 获取， 返回一个user对象，如果没有返回{}
     */
    getUser(){
        return JSON.parse(localStorage.getItem(USERNAME)|| '{}');
    },
    // 清除
    removeUser(){
        localStorage.removeItem(USERNAME);
    },
 }


//  单独暴露
// export const saveUser(){

// }