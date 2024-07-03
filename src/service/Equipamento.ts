import axios from "axios";
import ApiUrl from "../routes/ApiURL";

class Equipamento {
    private idequipment: number;
    private equipment_name: string;
    private serie_number: string;
    private numberIdTaxe: number;
    private underVoltage: number;
    private overVoltage: number;
    private active: boolean;
    private api: string;
  
    constructor(
      idequipment: number = 0,
      equipment_name: string = "",
      serie_number: string = "",
      numberIdTaxe: number = 0,
      underVoltage: number = 0.0,
      overVoltage: number = 0.0,
      active: boolean = true
    ) {
      this.idequipment = idequipment;
      this.equipment_name = equipment_name;
      this.serie_number = serie_number;
      this.numberIdTaxe = numberIdTaxe;
      this.underVoltage = underVoltage;
      this.overVoltage = overVoltage;
      this.active = active;
      this.api = ApiUrl.URL + "equipment";
    }
  
    public getIdequipment(): number {
      return this.idequipment;
    }
  
    public getEquipmentName(): string {
      return this.equipment_name;
    }
  
    public getSerieNumber(): string {
      return this.serie_number;
    }
  
    public getNumberIdTaxe(): number {
      return this.numberIdTaxe;
    }
  
    public getUnderVoltage(): number {
      return this.underVoltage;
    }
  
    public getOverVoltage(): number {
      return this.overVoltage;
    }
  
    public isActive(): boolean {
      return this.active;
    }
  
    public async getListEquipamento(): Promise<Equipamento[]> {
        try {
            const response = await axios.get(this.api);
            const data = response.data;
            return data.map((item: any) => new Equipamento(
              item.idequipment,
              item.equipment_name,
              item.serie_number,
              item.numberIdTaxe,
              item.underVoltage,
              item.overVoltage,
              item.active
            ));
          } catch (error) {
            throw new Error('Failed to fetch equipment: ');
          }
    }
}


export default Equipamento;
  