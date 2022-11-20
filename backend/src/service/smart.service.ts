import { RadiatorService } from "./radiator.service";
import { RoomService } from "./room.service";

export class SmartService {
    private locationHistory: { [timestamp: number]: { [id: string]: boolean} };
    constructor(private readonly roomService: RoomService) { 
                    this.locationHistory = {};
    }
    
    async start(interval: number) {
        setInterval(async () => {
            const timestamp = Date.now();

            const rooms = await this.roomService.get();

            const radiators = rooms.map(r => r.radiators).flatMap(arr => arr);

            const hasPeople = await Promise.all(radiators.map(async (radiator) => ({ id: radiator.id, hasOccupants: await this.roomService.hasOccupants(radiator) })));
            this.locationHistory[timestamp] = {};

            hasPeople.forEach(radiatorHasOccupants => this.locationHistory[timestamp][radiatorHasOccupants.id] = radiatorHasOccupants.hasOccupants);

            let hasPreviousTimestamps = this.hasPreviousTimestamps(timestamp, interval);

            radiators.forEach(async radiator => {
                if (hasPreviousTimestamps) {
                    if (this.previousTimestampsAllTrue(radiator.id, timestamp, interval)) {
                        await this.radiatorService.activate(radiator);
                    }
                    if (this.previousTimestampsAllFalse(radiator.id, timestamp, interval)) {
                        await this.radiatorService.deactivate(radiator);
                    }
                }
            });
        }, interval);
    }
    
    previousTimestampsAllTrue(radiatorID: string, timestamp: number, interval: number): boolean {
        const previousTimestamp = timestamp - interval;
        const secondPreviousTimestamp = timestamp - 2 * interval;
        const thirdPreviousTimestamp = timestamp - 3 * interval;

        if (radiatorID in this.locationHistory[thirdPreviousTimestamp]) {
            // radiator existed since beginnings, check if it was on at previous timestamps, keep on

            const wasOnAtFirstTS  = this.locationHistory[thirdPreviousTimestamp][radiatorID];
            const wasOnAtSecondTS = this.locationHistory[secondPreviousTimestamp][radiatorID];
            const wasOnAtThirdTS  = this.locationHistory[previousTimestamp][radiatorID];

            return wasOnAtFirstTS && wasOnAtSecondTS && wasOnAtThirdTS;
        }

        return false;
    }

    previousTimestampsAllFalse(radiatorID: string, timestamp: number, interval: number): boolean {
        const previousTimestamp = timestamp - interval;
        const secondPreviousTimestamp = timestamp - 2 * interval;
        const thirdPreviousTimestamp = timestamp - 3 * interval;

        if (radiatorID in this.locationHistory[thirdPreviousTimestamp]) {
            // radiator existed since beginnings, check if it was on at previous timestamps, keep on

            const wasOnAtFirstTS  = this.locationHistory[thirdPreviousTimestamp][radiatorID];
            const wasOnAtSecondTS = this.locationHistory[secondPreviousTimestamp][radiatorID];
            const wasOnAtThirdTS  = this.locationHistory[previousTimestamp][radiatorID];

            return !wasOnAtFirstTS && !wasOnAtSecondTS && !wasOnAtThirdTS;
        }

        return false;
    }

    hasPreviousTimestamps(timestamp: number, interval: number) {
        const previousTimestamp = timestamp - interval;
        const hasPrevious = this.locationHistory.hasOwnProperty(previousTimestamp);

        if (hasPrevious) {
            const secondPreviousTimestamp = timestamp - 2 * interval;
            const hasSecondPrevious = this.locationHistory.hasOwnProperty(secondPreviousTimestamp);

            if (hasSecondPrevious) {
                const thirdPreviousTimestamp = timestamp - 3 * interval;
                const hasThirdPrevious = this.locationHistory.hasOwnProperty(thirdPreviousTimestamp);

                if (hasThirdPrevious) {
                    return true;
                }
            }
        }

        return false;
    }
}