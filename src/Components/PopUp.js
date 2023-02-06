// import image from "./Assets/"
import Modal from "./Modal"
export default function PopUp(props){
    const {popUpData} = props
    const {eventType, links} = popUpData


    const buttonContainerStyle={
        alignSelf:"end",
        marginRight: "5px"
    }

    const closeButtonSrc = require("./images/remove_resize1.png")
    let popUpSticker


    switch (eventType){
        case "Registration":
            popUpSticker = require("./images/judge_sharks.png")
            break

        case "Ceremony":
            popUpSticker = require("./images/computer_sharks.png")
            break

        case "Hackathon":
            popUpSticker = require("./images/dressed_up_shark.png")
            break

        case "Hacking":
            popUpSticker = require("./images/computer_sharks.png")
            break

        case "Food":
            popUpSticker = require("./images/donut_shark.png")
            break

        case "Keynote-Speaker":
            popUpSticker = require("./images/glasses_shark.png")
            break

        case "Social":
            popUpSticker = require("./images/sharks_conversating.png")
            break

        case "Career-Panel":
            popUpSticker = require("./images/questionmark_shark.png")
            break
        case "LinkedIn":
            popUpSticker = require("./images/linkedin_shark.png")
            break

        case "Judging":
            popUpSticker = require("./images/judge_sharks.png")
            break

        case "Workshop":
            popUpSticker = require("./images/boba_sharks.png")
            break

        default:
            popUpSticker =  require("./images/icon_2.png")
    }

    return(
        <div className="popup--overlay">
            <div className="popup--container" >
                <div style={buttonContainerStyle}><button onClick={props.handleClose_PopUp}><img src={closeButtonSrc}/></button></div>
                <h1>{popUpData.title}</h1>
                <h2>Location: {popUpData.location}</h2>
                <p>{popUpData.description}</p>
                <Modal links={links}/>
                <img src={popUpSticker}  id="popUpImg"/>
                <br/> <br/>
            </div>
        </div>
        
    )
}