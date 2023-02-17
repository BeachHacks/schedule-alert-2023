export default function Header(){

    const logo = require("./images/BH_7-0.png")
    const BeachHacks_link = "https://beachhacks.com/"

    return(
        <div className="header">
            <img src={logo} className="header--logo"/>
            <div id="header--link"><a href={BeachHacks_link} target="_blank"> BeachHacks </a></div>
            <br/>
        </div>
    )
}