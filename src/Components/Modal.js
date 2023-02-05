export default function Modal(props){
    let discordImg = require("./images/discord.png")
    let googleImg = require("./images/google_resize3.png")

    const {google_link, discord_link}= props.links
    console.log("google_link: ", google_link)

    // console.log("Links: ", props.link)

    // let googleImg =``
    return(
        <>
            <h2 id="modal--title">Get Notified</h2>
            <div id="modal--container"style={{display:"flex", justifyContent:"center"}}>
                <a href={google_link} target="_blank">
                    <img src={googleImg} />
                    <h3>Google</h3>
                </a>
                <a href={discord_link} target="_blank">
                    <img src={discordImg}  />
                    <h3>Discord</h3>
                </a>
            </div>
        </>
    )
}