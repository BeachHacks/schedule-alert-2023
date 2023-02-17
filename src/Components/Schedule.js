import PopUp from "./PopUp"

export default function Schedule(props){
    const generateTentativeSchedule = () =>{

        const saturdayEvents = props.saturdaySchedule.map(event =>(
            <div className="event--table" key={event.id} onClick={props.handleOpen_PopUp} id={event.id} name="saturday" >
                <div className="event--container">
                    <div className="event--time">{event.time}</div>
                    <div className="event--title"><b>{event.title}</b> <br/> {event.category}</div>
                    <div className="event--location"> <h3> {event.location} </h3></div>
                </div>
                {event.isClicked && <PopUp/>}
            </div>
        ))
        const sundayEvents = props.sundaySchedule.map(event =>(
            <div className="event--table" key={event.id} onClick={props.handleOpen_PopUp} id={event.id} name="sunday" >
                <div className="event--container">
                    <div className="event--time">{event.time}</div>
                    <div className="event--title"><b>{event.title}</b> <br/> {event.category}</div>
                    <div className="event--location" id="small"> <h3> {event.location} </h3></div>
            </div>
            {event.isClicked && <PopUp/>}
        </div>
        ))


        
        return (
        <div className="tentativeSchedule--container"> 
            <div className="tentativeSchedule--column">
                <h2>Saturday</h2>
                {saturdayEvents}
            </div> 
            
            <div className="tentativeSchedule--column">
                <h2>Sunday</h2>
                {sundayEvents}
            </div>
        </div>
        )
    }
    
    const workshopEvents = props.workshopSchedule.map(event => (
        <div className="event--table"  key={event.id} onClick={props.handleOpen_PopUp} id={event.id} >
            <div className="grid--container">
                <div className="event--time">{event.time} <br/> {event.day}</div>
                <div className="event--title"><b>{event.title}</b> <br/> {event.category}</div>
                <div className="event--description">{event.description} </div>
                <div className="event--location"> <h3>{event.location}</h3></div>
            </div>
        </div> 
    ))

    const tentativeSchedule = generateTentativeSchedule()

    
    return (
        <div>
            {/* <h2>Tentative Schedule</h2> */} 
            {tentativeSchedule}

            <h2>Workshop Events</h2>
            {workshopEvents}
        </div>
    )
  }
