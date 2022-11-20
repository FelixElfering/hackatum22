import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Room from "../models/Room"
import RoomService from "../services/RoomService"
import Grid from '@mui/material/Unstable_Grid2';

let RoomDetailView = () => {
  const { id } = useParams()

  const roomService = new RoomService()

  const [room, setRoom] = useState<Room>()

  useEffect(() => {
    roomService.getRoom(id!).then(val => setRoom(val))  // TODO: dealing with room id's that do not exist
  }, [])

  return (
    <>
      <h2>{room?.name}</h2>

      <h3>Radiators</h3>
      <div className="flex-container">
        {room?.radiators?.map(radiator =>
          <>
            <div className="flex-container-item">
              <h4>{radiator.id}</h4>
            </div>
          </>)}
      </div>
    </>
  )
}

export default RoomDetailView