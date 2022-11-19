import { Room } from "../entity/Room";
import { RadiatorService } from "./radiator.service";

export class RoomService {
    constructor(private readonly radiatorService: RadiatorService) { }

    async get(): Promise<Room[]> {
        return Room.find({ relations: ['radiators'] });
    }
    
    async getTemperature(r: Room): Promise<number> {
        const tempsPromises = r.radiators.map(radiator => this.radiatorService.getTemperature(radiator));
        const temps = await Promise.all(tempsPromises);
        const sum = temps.reduce((agg, curr) => agg += curr, 0);
        const numRadiators = r.radiators.length;
        
        const avg = numRadiators > 0 ? sum / numRadiators : -1337; // if there isnt a positive number of radiators, return avg temp of -1337

        return avg;
    }

    async hasOccupants(r: Room): Promise<boolean> {
        const occupantPromises = r.radiators.map(radiator => this.radiatorService.hasOccupants(radiator));
        const radiatorsHaveOccupants = await Promise.all(occupantPromises);

        return radiatorsHaveOccupants.find(maybeHasOccupant => maybeHasOccupant === true);
    }

    async activateRadiators(r: Room): Promise<void> {
        const activatorPromises = r.radiators.map(r => this.radiatorService.activate(r));
        await Promise.all(activatorPromises);
    }

    async deactivateRadiators(r: Room): Promise<void> {
        const deactivatorPromises = r.radiators.map(r => this.radiatorService.deactivate(r));
        await Promise.all(deactivatorPromises);
    }
}