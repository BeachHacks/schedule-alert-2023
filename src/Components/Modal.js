export default function Modal(props){
    let discordImg = require("./images/discord.png")
    let googleImg = require("./images/google_resize3.png")

    const {google_link, discord_link}= props.links
    const [incrementGoogle_click, incrementDiscord_click] = props.modalHandlers
    const {eventID} = props

    // console.log("eventID in modal: ", eventID)

    return(
        <>
            <h2 id="modal--title">Get Notified</h2>
            <div id="modal--container"style={{display:"flex", justifyContent:"center"}}>
                <a href={google_link} target="_blank" onClick={() => incrementGoogle_click(eventID)}>
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