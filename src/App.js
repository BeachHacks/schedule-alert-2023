import './App.css';
import {nanoid} from "nanoid"
import {useState,useEffect} from "react"
import scheduleData from "./Components/Data/scheduleData.json"
import Schedule from './Components/Schedule';
import PopUp from './Components/PopUp';
import Header from "./Components/Header"
import Footer from './bhComponents/Footer/Footer';
// import { db } from '../../server/models/event';

function App() {
  // ! ENVIRONMENT VARIABLES FOR PRODUCTION BUILD
  const proxy = process.env.REACT_APP_PROXY // ! for production build
  // ! ENVIRONMENT VARIABLES FOR PRODUCTION BUILD

  // const proxy = "http://localhost:3001" // * for local environment

  const handleOpen_PopUp = (event) =>{ // opens pop up window
    const target = event.currentTarget // * gets target, and its attributes
    const {id} = target // ! ID of schedule
    let eventClicked = eventReferences.get(id) // gets event from hashmap
    setPopUp({
      ...eventClicked,
      isClicked: true
    })

    // Garbage Example of garbage runtime O(n) so future devs looks at thisand cringe
    // Previous attempt before using HashMap

    // ! Finds the event clicked by user
    // run time for popUp window when user clicks on event
    // sundayScheduleState.find(sundayEvent => {
    //   if (sundayEvent.id === id){
    //     eventClicked = sundayEvent
    //   }
    // })

    // saturdayScheduleState.find(saturdayEvent => {
    //   if (saturdayEvent.id === id){
    //     eventClicked = saturdayEvent
    //   }
    // })

    // workshopScheduleState.find(workshopEvent => {
    //   if (workshopEvent.id === id){
    //     eventClicked = workshopEvent
    //   }
    // })

    // setPopUp({
    //   ...eventClicked,
    //   isClicked: true
    // })
  } // handleOpen_PopUp

  const handleClose_PopUp = () =>{ // closes pop up window
    setPopUp({isClicked:false}) // * For button in popup
  } // handleClose_PopUp

  const testConnection = () =>{ // * used for testing connection between server and app
    console.log("Button clicked")
    fetch(`${proxy}/testConnection`)
    .then((res) => console.log("result: ", res))
  } // testConnection


  // * for localStorage
  const instantiateEvent_in_LocalStorage = (id) =>{ // ! returns event object in localStorage
    const isInsantiated = window.localStorage.getItem(id) === null ? false : true // see if event exists in local storage

    if (!isInsantiated){
      const objectProperties = {
        isGoogleClicked: false,
        isDiscordClicked: false
      }
      window.localStorage.setItem(id, JSON.stringify(objectProperties) )
    }

    return JSON.parse(window.localStorage.getItem(id)) // returns a parsed local storage obj
  }

  const setProperty_in_LocalStorage = (id,linkType) =>{ 
    const eventProperty = JSON.parse(window.localStorage.getItem(id))

    //  depending on link type on what obj property to change
    if (linkType === "google"){
      eventProperty.isGoogleClicked = true
    }
    else{
      eventProperty.isDiscordClicked = true
    }

    window.localStorage.setItem(id, JSON.stringify(eventProperty)) // sets new obj in local storage
  }

  // * Fetch Requests
  const incrementGoogle_click = (eventID) =>{ // inside modal component when google link is pressed
    const eventObject = instantiateEvent_in_LocalStorage(eventID)
    const isGoogleClicked = eventObject.isGoogleClicked  

    if (!isGoogleClicked){
      setProperty_in_LocalStorage(eventID, "google")
      const requestOptions ={ // *PUT request options
        method: "PUT",
        headers:{
          "Accept" : "application/json",
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({eventID: eventID})
      } // requestOptions var
  
      fetch(`${proxy}/incrementGoogle_click`,requestOptions)
    }

  } // incrementGoogle_click

  const incrementDiscord_click = (eventID) =>{ // inside modal component when discord link is pressed
    const eventObject = instantiateEvent_in_LocalStorage(eventID)
    const isDiscordClicked = eventObject.isDiscordClicked

    if (!isDiscordClicked){
      setProperty_in_LocalStorage(eventID, "discord")
      const requestOptions ={ // *PUT request options
        method: "PUT",
        headers:{
          "Accept" : "application/json",
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({eventID: eventID})
      } // requestOptions var
  
      fetch(`${proxy}/incrementDiscord_click`,requestOptions)
    }

  } // incrementGoogle_click


  
  // ! Data without ID
  const {workshopData,tentativeScheduleData} = scheduleData
  const {saturdayData, sundayData} = tentativeScheduleData

  // * States
  const [popUp,setPopUp] = useState({isClicked:false}) // * initial value
  const [workshopScheduleState,setWorkshopScheduleState] = useState(null)
  const [saturdayScheduleState,setSaturdayScheduleState] = useState(null)
  const [sundayScheduleState,setSundayScheduleState] = useState(null)
  const [isRendered, setIsRendered] = useState(false) // sees if all events have rendered

  const [eventReferences, setEventReferences] = useState(null) // used for referencing event when user clicks on event to produce popUp window: O(n) --> o(1)
  


  // useEffect( () =>{ // Fetches event data from server (Commneted due to server downgrade)
  //    // * idk why this function is being called twice; causing issues for the isRendered variable
  //   // ! turns out in development mode, useEffect is ran TWICE to check for potential problems
  //   fetch(`${proxy}/get_eventsID`)
  //   .then((res) => res.json())
  //   .then((db_array) => {

  //     // * Optimized to get object id into O(1)
  //     const nameToId = new Map() // maps event name to object id
  //     db_array.forEach( dbObj => nameToId.set(dbObj.name,dbObj._id)) 

  //     setWorkshopScheduleState( () =>{
  //       const returnData = workshopData.map( (event) =>({
  //         ...event,
  //         id: nameToId.get(event.title)
          
  //       }))
  //       return returnData
  //     })

  //     setSaturdayScheduleState( () =>{
  //       const returnData = saturdayData.map( (event) =>({
  //         ...event,
  //         id: nameToId.get(event.title)
  //       }))
  //       return returnData
  //     })

  //     setSundayScheduleState( () =>{
  //       const returnData = sundayData.map( (event) =>({
  //         ...event,
  //         id: nameToId.get(event.title)
  //       }))
  //       return returnData
  //     })

  //     setIsRendered(true)
  //   })
  // },[])

  useEffect( () =>{ // Events is not fetched from Express.js 
          setWorkshopScheduleState( () =>{
        const returnData = workshopData.map( (event) =>({
          ...event,
          id: nanoid()
          
        }))
        return returnData
      })

      setSaturdayScheduleState( () =>{
        const returnData = saturdayData.map( (event) =>({
          ...event,
          id: nanoid()
        }))
        return returnData
      })

      setSundayScheduleState( () =>{
        const returnData = sundayData.map( (event) =>({
          ...event,
          id: nanoid()
        }))
        return returnData
      })

      setIsRendered(true)



  },[])


  useEffect( () =>{ // set eventReferences here
    if (isRendered){ // failsafe because first useEffect is being called twice in dev
      let idToEvent = new Map()

      for (const workshop of workshopScheduleState){
        const eventId = workshop.id
        idToEvent.set(eventId, workshop)
      }

      for (const event of saturdayScheduleState){
        const eventId = event.id
        idToEvent.set(eventId, event)
      }

      for (const event of sundayScheduleState){
        const eventId = event.id
        idToEvent.set(eventId, event)
      }
      setEventReferences(idToEvent)
    }

  },[isRendered])

  // ! changing normal data to states
  // * data gotten from local json data
  // const sundaySchedule = sundayData.map(event => ({
  //   ...event,
  //   id:nanoid()
  // }))

  // const saturdaySchedule = saturdayData.map(event => ({
  //   ...event,
  //   id:nanoid()
  // }))

  // const workshopSchedule = workshopData.map(event => ({
  //   ...event,
  //   id:nanoid()
  // }))

  // console.log("workshop:", workshopSchedule )


  return (
    <div className="App">
      <header className="App-header">
      <Header/>
      {isRendered && 
        <Schedule 
        workshopSchedule={workshopScheduleState} 
        saturdaySchedule={saturdayScheduleState}
        sundaySchedule={sundayScheduleState}
        handleOpen_PopUp={handleOpen_PopUp}
        nanoid={nanoid}
        />
      }
      {!isRendered && <h2>Loading...</h2>}


      {popUp.isClicked &&  
      <PopUp popUpData={popUp} 
      handleClose_PopUp={handleClose_PopUp} 
      modalHandlers={[incrementGoogle_click,incrementDiscord_click]}/>}

      </header>
      <Footer />
    </div>
  );
}

export default App;
