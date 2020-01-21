import {Avatar, Divider} from 'antd';
import '../public/style/components/author.css';
//  引入头像和分割线组件 


const Author = () => {
    return (
        <div className="author-div comm-box">
        <div><Avatar size={100} src="http://b-ssl.duitang.com/uploads/item/201901/17/20190117230425_eofqv.thumb.700_0.jpg"/></div>
        <div className="author-introduction">
        天上月，人间月，负笈求学肩上月，登高凭栏眼中月，竹篮打水碎又圆。山间风，水边风，御剑远游脚下风，圣贤书斋翻书风，风吹浮萍有相逢。
            <Divider>社交账号</Divider>
            <Avatar size={28} icon="github" className="account"/>
            <Avatar size={28} icon="qq" className="account"/>
            <Avatar size={28} icon="wechat" className="account"/>
        </div>
        </div>
    )
}
export default Author;