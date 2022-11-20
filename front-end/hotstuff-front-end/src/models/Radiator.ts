export type RadiatorDTO = {
  id: string,
  ip: string
}

export class Radiator{

  id: string;
  ip: string;

  constructor(radiatorDTO: RadiatorDTO){
    this.id = radiatorDTO.id
    this.ip = radiatorDTO.ip
  }

  
  // temperature: number;
  // occupantInProximity: boolean;
  
}

export default Radiator