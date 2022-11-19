import { Radiator } from "../entity/Radiator";
import axios from 'axios';
import { Occupant } from "../entity/Occupant";

export class RadiatorService {
    private readonly THRESHOLD = 10; // 10 meters
    async getTemperature(r: Radiator): Promise<number> {
        return await axios.get(`${r.ip}/api/temp`);
    }

    async getBluetoothDevicesInVicinity(r: Radiator): Promise<string[]> {
        const allDevices: {id: string, rssi: number}[] = await axios.get(`${r.ip}/api/proximity`); // returns array of { id: string, rssi: number }
        
        const devicesInProximity = allDevices.filter(device => device.rssi >= this.THRESHOLD).map(d => d.id);

        return devicesInProximity;
    }

    async hasOccupants(r: Radiator): Promise<boolean> {
        const devices = await this.getBluetoothDevicesInVicinity(r);

        const occupants = await Occupant.find();
        const allowedBluetoothDevices = occupants.map(occ => occ.bluetoothID);

        return !!allowedBluetoothDevices.find(allowedDevice => devices.find(device => allowedDevice === device));
    }

    async activate(r: Radiator): Promise<void> {
        await axios.get(`${r.ip}/api/activate`);
    }

    async deactivate(r: Radiator): Promise<void> {
        await axios.get(`${r.ip}/api/deactivate`);
    }
}