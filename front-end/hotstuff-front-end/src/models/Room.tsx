import { Bed, House } from '@mui/icons-material';
import { Radiator, RadiatorDTO } from './Radiator';

export type RoomDTO = {
  id: string,
  name: string,
  temperature: number,
  isOccupied: boolean,
  radiators?: RadiatorDTO[]
}

export class Room {
  name: string;
  id: string;
  temperature: number;
  isOccupied: boolean;
  radiators: Radiator[] | undefined;

  constructor(roomDTO: RoomDTO) {
    this.id = roomDTO.id
    this.name = roomDTO.name
    this.temperature = roomDTO.temperature
    this.isOccupied = roomDTO.isOccupied
    this.radiators = roomDTO.radiators?.map(radiatorDTO => new Radiator(radiatorDTO))
  }

  // public getTemp: Promise<number> = new Promise((resolve, reject) => {}) // TODO: implement getTemp
  // public getOccupants: Promise<boolean> = new Promise((resolve, reject) => {}) // TODO: implement getOccupants

  getIcon = () => {
    const lowerCaseName = this.name.toLowerCase()
    if (lowerCaseName.includes("bedroom")) {
      return <Bed/>
    } else {
      return <House/>
    }
  }

  getBackground = () => {
    const lowerCaseName = this.name.toLowerCase()
    if (lowerCaseName.includes("bedroom")) {
      return "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    } else if (lowerCaseName.includes("living room")) {
      return "https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1392&q=80"
    } else {
      return "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
    }
  }
}

export default Room