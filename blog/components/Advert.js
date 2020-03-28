import { Progress } from 'antd';
import '../public/style/components/advert.css';


const Advert = () => {
    return (
        <div className="ad-div comm-box">
        <p>HTML5</p>
        <Progress percent={30} size="small" />
        <p>CSS3</p>
        <Progress percent={50} size="small" status="active" />
        <p>React</p>
        <Progress percent={70} size="small" status="exception" />
        <p>Vue</p>
        <Progress percent={100} size="small" />
        </div>
    )
}
export default Advert;
// <div><img src="http://blogimages.jspang.com/flutter_ad2.jpg" width="100%" /></div>
// <div><img src="http://blogimages.jspang.com/Vue_koa_ad1.jpg" width="100%" /></div>
// <div><img src="http://blogimages.jspang.com/WechatIMG12.jpeg" width="100%" /></div>
// <div><img src="https://jspang.com/images/ad_4.jpg" width="100%" /></div>