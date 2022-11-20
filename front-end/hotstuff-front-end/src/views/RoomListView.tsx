import React, { useState, useEffect } from "react";
import Room from "../models/Room";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import RoomService from "../services/RoomService";
import { useInterval } from 'usehooks-ts'
import CircularProgress from "@mui/material/CircularProgress";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

let RoomListView = () => {

  const roomService = new RoomService()

  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    const fetchRooms = async () => {
      const responseData = await roomService.getRooms()
      setRooms(responseData)
    }
    fetchRooms()
  }, [])

  useInterval(async () => {
    setRooms(await roomService.getRooms())
  }, 10000)

  console.log("HERE ARE ROOMS: " + JSON.stringify(rooms))

  let roomList = () => {
    if (rooms.length == 0) {
      return (<div className="loading-">
        <CircularProgress />
        <br></br>Currently Loading Rooms</div>)
    } else {
      return (
        rooms.map((room: Room) => (
          <div className="flex-container-item">
            <img className="flex-container-img" src={`${room.getBackground()}`}></img>
            <div className="flex-container-text-overlay">
              <div className="flex-container-item-title">
                {room.name}
              </div>
              <br></br>
              <div className="flex-container-item-info">
                <div>{room.temperature}°C</div>
                <div>{room.isOccupied ? "Occupied" : "Vacant"}</div>
              </div>
            </div>
          </div>))
      )
    }
  }

  return (
    <>
      <div className="flex-container">
        {roomList()}
      </div>
    </>
  )

}

export default RoomListView