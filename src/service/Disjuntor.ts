import axios from "axios";
import ApiUrl from "../routes/ApiURL";

class Disjuntor {
    private idbreaker: number;
    private breaker_name: string;
    private serial_number: string;
    private equipment_idequipment: number;
    private equipment_name: string;
    private api: string;

    constructor(
        idbreaker: number = 0,
        breaker_name: string = "",
        serial_number: string = "",
        equipment_idequipment: number = 0,
        equipment_name: string = "",
        api: string = ""
    ) {
        this.idbreaker = idbreaker;
        this.breaker_name = breaker_name;
        this.serial_number = serial_number;
        this.equipment_idequipment = equipment_idequipment;
        this.equipment_name = equipment_name;
        this.api = ApiUrl.URL + "breaker";
    }

    public getIdbreaker(): number {
        return this.idbreaker;
    }

    public getBreakerName(): string {
        return this.breaker_name;
    }

    public getSerialNumber(): string {
        return this.serial_number;
    }

    public getEquipmentIdequipment(): number {
        return this.equipment_idequipment;
    }

    public getEquipmentName(): string {
        return this.equipment_name;
    }

    public async getListaDisjuntor(idequipment: number): Promise<Disjuntor[]> {
        try {
            console.log("Chegou" + idequipment)
            const url = this.api+"/"+idequipment;
            console.log(url);
            const response = await axios.get(url);
            const data: Disjuntor[] = response.data;
            console.log(data)
            return data.map((item: Disjuntor) => new Disjuntor(
                item.idbreaker,
                item.breaker_name,
                item.serial_number,
                item.equipment_idequipment,
                item.equipment_name
            ));
        } catch (error) {
            throw new Error('Failed to fetch disjuntores: ');
        }
    }
}

export default Disjuntor;