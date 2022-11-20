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
      return (<div className="flex-container-item">
        <CircularProgress />
        <br></br>Currently Loading Rooms</div>)
    } else {
      return (
        rooms.map((room: Room) => (
            <div className="flex-container-item" style={{background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.7) 0%,rgba(255, 255, 255, 0.7) 100%), url('${room.getBackground()}') cover 0 0` }}>
              {room.name}
              <br></br>
              {room.getIcon()}
              <br></br>
              {room.isOccupied ? "Occupied" : "Vacant"}
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