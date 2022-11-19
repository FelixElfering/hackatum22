import { Radiator } from "../entity/Radiator";
import axios from 'axios';

export class RadiatorService {
    async getTemperature(r: Radiator): Promise<number> {
        return await axios.get(`${r.ip}/api/temp`);
    }

    async hasOccupants(r: Radiator): Promise<boolean> {
        return await axios.get(`${r.ip}/api/occupancy`);
    }

    async activate(r: Radiator): Promise<void> {
        await axios.get(`${r.ip}/api/activate`);
    }

    async deactivate(r: Radiator): Promise<void> {
        await axios.get(`${r.ip}/api/deactivate`);
    }
}