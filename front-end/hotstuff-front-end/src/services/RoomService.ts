import Room, { RoomDTO } from "../models/Room"
import config from "../config"
import axios from "axios"

const baseURL = "http://" + config.backendIP + config.apiSuffix

const mockRooms: Room[] = [
  new Room({id: "123", name: "Mock Bedroom", temperature: 21, isOccupied: false}),
  new Room({id: "123", name: "Mock Living Room", temperature: 22, isOccupied: true}),
  new Room({id: "123", name: "Mock Basement", temperature: 19, isOccupied: false}),
  new Room({id: "123", name: "Mock Bathroom", temperature: 22, isOccupied: false}),
]

class RoomService {
  roomApiURL = baseURL + "/rooms";

  getRooms= async (): Promise<Room[]> => {
    const roomDTOs: RoomDTO[] = (await axios.get<RoomDTO[]>(this.roomApiURL)).data
    return roomDTOs.map(roomDTO => new Room(roomDTO))
    // return mockRooms
  }

  getRoom= async (id: string): Promise<Room | undefined> => {
    // let room = mockRooms.find(room => room.id == id);
    const room: Room = (await axios.get<Room>(this.roomApiURL + "/" + id)).data
    return room
  }

}

export default RoomService