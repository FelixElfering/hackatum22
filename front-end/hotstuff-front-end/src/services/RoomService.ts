import Room, { RoomDTO } from "../models/Room"
import config from "../config"
import axios from "axios"

const baseURL = "http://" + config.backendIP + config.apiSuffix

class RoomService {
  roomApiURL = baseURL + "/rooms";

  getRooms= async (): Promise<Room[]> => {
    const roomDTOs: RoomDTO[] = (await axios.get<RoomDTO[]>(this.roomApiURL)).data
    return roomDTOs.map(roomDTO => new Room(roomDTO))
  }

  getRoom= async (id: string): Promise<Room | undefined> => {
    // let room = mockRooms.find(room => room.id == id);
    const room: Room = (await axios.get<Room>(this.roomApiURL + "/" + id)).data
    return room
  }

}

export default RoomService