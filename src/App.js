import './App.css';
import {nanoid} from "nanoid"
import {useState,useEffect, Component} from "react"
import scheduleData from "./Components/Data/scheduleData.json"
import Schedule from './Components/Schedule';
import PopUp from './Components/PopUp';

function App() {
  const testProxy = "http://localhost:3001"
  // const fs = require("fs")

  const handleOpen_PopUp = (event) =>{
    const target = event.currentTarget // * gets target, and its attributes
    const {id} = target // ! ID of schedule
    let eventClicked

    // ! Finds the event clicked by user

    sundaySchedule.find(sundayEvent => {
      if (sundayEvent.id === id){
        eventClicked = sundayEvent
      }
    })

    saturdaySchedule.find(saturdayEvent => {
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
  
  const get_EventsID = () =>{
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
          id: workshopDB_Array[index].id
        }))

        console.log("Return Data: ", returnData)
        return returnData
      })
      
    })
    // .then((data) => console.log("Data: ", data))
  }



  const testPut = () =>{
    fetch("/test",{
      method: "PUT",
      headers:{
        "Accept" : "application/json",
        "Content-Type" : "application/json"
      }
    } )
  } // testPut
  
  // ! Data without ID
  const {workshopData,tentativeScheduleData} = scheduleData
  const {saturdayData, sundayData} = tentativeScheduleData

  // * States
  const [popUp,setPopUp] = useState({isClicked:false}) // * initial value
  const [workshopScheduleState,setWorkshopScheduleState] = useState(null)


  useEffect( () =>{
    console.log("API request ")
    fetch(`${testProxy}/get_eventsID`)
    .then((res) => res.json())
    .then((db_array) => {
      const workshopDB_Array = db_array[0].data
      const saturdayDB_Array= db_array[1]
      const sundayDB_Array = db_array[2]

      // console.log("workshop data: ", workshopDB_Array)

      setWorkshopScheduleState( () =>{
        const returnData = workshopData.map( (event,index) =>({
          ...event,
          id: workshopDB_Array[index].id
        }))
        return returnData
      })
    })
  },[])

  // ! changing normal data to states
  // const [saturdaySchedule,setSaturdaySchedule] = useState()
  // const [sundaySchedule, setSundaySchedule] = useState()


  // useEffect( () =>{

  // })


  


  // * Adds and id for each event
  // ! NEED to attatch id from DB to here; use useEffect() here when attatching the id
  const sundaySchedule = sundayData.map(event => ({
    ...event,
    id:nanoid()
  }))

  const saturdaySchedule = saturdayData.map(event => ({
    ...event,
    id:nanoid()
  }))

  const workshopSchedule = workshopData.map(event => ({
    ...event,
    id:nanoid()
  }))

  // console.log("Workshop data: ", workshopSchedule)

  // console.log("state workshop:", workshopScheduleState)
  // console.log("regualr workshop: ", workshopSchedule)

  return (
    <div className="App">

      <button onClick={get_EventsID}>Click me</button>
      <header className="App-header">
      <h1>Schedule Alerts</h1>
      {workshopScheduleState &&
        <Schedule 
        workshopSchedule={workshopScheduleState} 
        saturdaySchedule={saturdaySchedule}
        sundaySchedule={sundaySchedule}
        handleOpen_PopUp={handleOpen_PopUp}
        nanoid={nanoid}
        />
      }


      {popUp.isClicked &&  <PopUp popUpData={popUp} handleClose_PopUp={handleClose_PopUp}/>}

      </header>
    </div>
  );
}

export default App;
