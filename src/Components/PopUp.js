// import image from "./Assets/"
import Modal from "./Modal"
export default function PopUp(props){
    const {popUpData} = props
    const buttonContainerStyle={
        alignSelf:"end",
        marginRight: "5px"
    }

    // const testIcon = require("./images/icon_3.png")
    const closeButtonSrc = require("./images/remove_resize1.png")

    const popUpIconsSrc = [require("./images/icon_1.png"), require("./images/icon_2.png") ] // * Stickers!
    const randomIconSrc = popUpIconsSrc[Math.floor(Math.random() * popUpIconsSrc.length)]

    return(
        <div className="popup--overlay">
            <div className="popup--container" >
                <div style={buttonContainerStyle}><button onClick={props.handleClose_PopUp}><img src={closeButtonSrc}/></button></div>
                <h1>{popUpData.title}</h1>
                <h2>Location: {popUpData.location}</h2>
                <p>{popUpData.description}</p>
                <Modal/>
                <img src={randomIconSrc}  id="popUpImg"/>
                <br/> <br/>
            </div>
        </div>
        
    )
}