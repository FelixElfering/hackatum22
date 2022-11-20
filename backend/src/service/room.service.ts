const axios = require("axios");
import { Occupant } from "../entity/Occupant";
import { Radiator } from "../entity/Radiator";
import { Room } from "../entity/Room";

export class RoomService {
    private readonly THRESHOLD = -100;
    private devices = [];

    async get(): Promise<Room[]> {
        return Room.find({ relations: ['radiators'] });
    }

    async getByID(id: string): Promise<Room> {
        return Room.findOne({ where: { id }, relations: ['radiators'] });
    }

    async getRadiators(): Promise<Radiator[]> {
        return Radiator.find();
    }
    
    async getRoomTemperature(r: Room): Promise<number> {
        const tempsPromises = r.radiators.map(radiator => this.getTemperature(radiator));
        const temps = await Promise.all(tempsPromises);
        const sum = temps.reduce((agg, curr) => agg += curr, 0);
        const numRadiators = r.radiators.length;
        
        const avg = numRadiators > 0 ? sum / numRadiators : -1337; // if there isnt a positive number of radiators, return avg temp of -1337

        return avg;
    }

    async roomHasOccupants(r: Room): Promise<boolean> {
        if (!r.radiators.length) {
            return new Promise((res, _) => res(false) );
        }
        const occupantPromises = r.radiators.map(async (radiator) => await this.hasOccupants(radiator));

        return occupantPromises.find(async (maybeHasOccupant) => await maybeHasOccupant === true);
    }

    async activateRadiators(r: Room): Promise<void> {
        const activatorPromises = r.radiators.map(r => this.activate(r));
        await Promise.all(activatorPromises);
    }

    async deactivateRadiators(r: Room): Promise<void> {
        const deactivatorPromises = r.radiators.map(r => this.deactivate(r));
        await Promise.all(deactivatorPromises);
    }

    async getTemperature(r: Radiator): Promise<number> {
        // return await axios.get(`${r.ip}/api/temp`);
        return new Promise((res, rej) => res(25));
    }

    async getBluetoothDevicesInVicinity(r: Radiator): Promise<string[]> {
        const URL = `${r.ip}/api/proximity`;
        // console.log(`sending req to ${URL}`);

        // TODO: figure out why we get an empty array sometimes
        let allDevices: { addr: string, rssi: number }[] = (await axios.get(URL)).data; // returns array of { id: string, rssi: number }
        if (!allDevices.length) {
            allDevices = this.devices;
        } else {
            this.devices = allDevices;
        }
        // const allDevices = [{ addr: '1', rssi: -10 }];
        
        const devicesInProximity = allDevices
                                    .filter(device => device.rssi >= this.THRESHOLD)
                                    .map(d => d.addr);

        return devicesInProximity;
    }

    async hasOccupants(r: Radiator): Promise<boolean> {
        const devices = await this.getBluetoothDevicesInVicinity(r);

        // const occupants = await Occupant.find();
        // const allowedBluetoothDevices = occupants.map(occ => occ.bluetoothID);

        return !!devices.length;
    }

    async activate(r: Radiator): Promise<void> {
        try {
            await axios.get(`${r.ip}/api/activate`);
        } catch (e) {
            console.error(`Pi threw an error: ${e}`);
        }
    }

    async deactivate(r: Radiator): Promise<void> {
        try {
            await axios.get(`${r.ip}/api/deactivate`);
        } catch (e) {
            console.error(`Pi threw an error: ${e}`);
        }
    }

    private parseStr(s: string[]): { id: string, rssi: number }[] {
        return s.filter(el => el.includes("dev_found"))
                .map(el => el.split("dev_found: "))
                .map(e => e[1].split(" type "))
                .map(el => ({id: el[0], rssi: parseInt(el[1].split("rssi ")[1].split(' ')[0]) }));
    }
}