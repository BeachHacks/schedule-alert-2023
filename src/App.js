import './App.css';
import {nanoid} from "nanoid"
import {useState,useEffect, Component} from "react"
import scheduleData from "./Components/Data/scheduleData.json"
import Schedule from './Components/Schedule';
import PopUp from './Components/PopUp';
import Footer from './bhComponents/Footer/Footer';

function App() {
  const testProxy = "http://localhost:3001"
  // const fs = require("fs")

  const handleOpen_PopUp = (event) =>{
    const target = event.currentTarget // * gets target, and its attributes
    const {id} = target // ! ID of schedule
    let eventClicked

    // ! Finds the event clicked by user

    sundayScheduleState.find(sundayEvent => {
      if (sundayEvent.id === id){
        eventClicked = sundayEvent
      }
    })

    saturdayScheduleState.find(saturdayEvent => {
      if (saturdayEvent.id === id){
        eventClicked = saturdayEvent
      }
    })

    workshopScheduleState.find(workshopEvent => {
      if (workshopEvent.id === id){
        eventClicked = workshopEvent
      }
    })

    setPopUp({
      ...eventClicked,
      isClicked: true
    })


  } // handleOpen_PopUp

  const handleClose_PopUp = () =>{
    setPopUp((prevPopUp) => ({isClicked:false})) // * For button in popup
  } // handleClose_PopUp

  const testConnection = () =>{ // * used for testing connection between server and app
    console.log("Button clicked")
    fetch(`${testProxy}/testConnection`)
    .then((res) => console.log("result: ", res))
  } // testConnection
  
  const get_EventsID = () =>{ // * testing for api fetch 
    fetch(`${testProxy}/get_eventsID`)
    .then((res) => res.json())
    .then((db_array) => {
      
      const workshopDB_Array = db_array[0].data
      const saturdayDB_Array= db_array[1]
      const sundayDB_Array = db_array[2]

      console.log("workshop data: ", workshopDB_Array)

      setWorkshopScheduleState( () =>{
        const returnData = workshopData.map( (event,index) =>({
          ...event,
          id: workshopDB_Array[index].id,
          dbTag:"workshopData" // used for querying 
        }))

        console.log("Return Data: ", returnData)
        return returnData
      })
      
    })
    // .then((data) => console.log("Data: ", data))
  }

  // * API calls

  
  const incrementGoogle_click = (eventID) =>{ // inside modal component when google link is pressed
    console.log("Anchor tag clicked")
    // console.log("Event id", eventID)
    const requestOptions ={ // *PUT request options
      method: "PUT",
      headers:{
        "Accept" : "application/json",
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({id: eventID})
    }
    fetch(`${testProxy}/incrementGoogle_click`,requestOptions)
    .then((response) => console.log("Response from server: ", response) )
  } // incrementGoogle_click

  const incrementDiscord_click = () =>{
    fetch(`${testProxy}/incrementGoogle_click`,{
      method: "PUT",
      headers:{
        "Accept" : "application/json",
        "Content-Type" : "application/json"
      }
    } )
  } // incrementGoogle_click
  // ! Data without ID
  const {workshopData,tentativeScheduleData} = scheduleData
  const {saturdayData, sundayData} = tentativeScheduleData

  // * States
  const [popUp,setPopUp] = useState({isClicked:false}) // * initial value
  const [workshopScheduleState,setWorkshopScheduleState] = useState(null)
  const [saturdayScheduleState,setSaturdayScheduleState] = useState(null)
  const [sundayScheduleState,setSundayScheduleState] = useState(null)

  const [isRendered, setIsRendered] = useState(false)


  useEffect( () =>{ // Fetches event data from server
    console.log("API request ")
    fetch(`${testProxy}/get_eventsID`)
    .then((res) => res.json())
    .then((db_array) => {
      const workshopDB_Array = db_array[0].data
      const saturdayDB_Array= db_array[1].data
      const sundayDB_Array = db_array[2].data

      // console.log("workshop data: ", workshopDB_Array)

      setWorkshopScheduleState( () =>{
        const returnData = workshopData.map( (event,index) =>({
          ...event,
          id: workshopDB_Array[index].id
        }))
        return returnData
      })

      setSaturdayScheduleState( () =>{
        const returnData = saturdayData.map( (event,index) =>({
          ...event,
          id: saturdayDB_Array[index].id
        }))
        return returnData
      })

      setSundayScheduleState( () =>{
        const returnData = sundayData.map( (event,index) =>({
          ...event,
          id: sundayDB_Array[index].id
        }))
        return returnData
      })

      setIsRendered(true)
    })
  },[])

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

  



  return (
    <div className="App">
      <header className="App-header">
      <h1>Schedule Alerts</h1>
      {isRendered && 
        <Schedule 
        workshopSchedule={workshopScheduleState} 
        saturdaySchedule={saturdayScheduleState}
        sundaySchedule={sundayScheduleState}
        handleOpen_PopUp={handleOpen_PopUp}
        nanoid={nanoid}
        />
      }


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
