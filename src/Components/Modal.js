export default function Modal(props){
    let discordImg = require("./images/discord.png")
    let googleImg = require("./images/google_resize3.png")

    // let googleImg =``
    return(
        <>
            <h2 id="modal--title">Get Notified</h2>
            <div id="modal--container"style={{display:"flex", justifyContent:"center"}}>
                <a href="https://www.w3schools.com" target="_blank">
                    <img src={googleImg} />
                    <h3>Google</h3>
                </a>
                <a href="https://www.w3schools.com" target="_blank">
                    <img src={discordImg}  />
                    <h3>Discord</h3>
                </a>
            </div>
        </>
    )
}