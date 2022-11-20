import Room from "./Room";

type Occupant = {
  id: string;
  name: string;
  bluetoothId: string;
  room: Room;
}

export default Occupant