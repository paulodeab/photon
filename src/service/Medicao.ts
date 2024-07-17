import axios from "axios"
import ApiUrl from "../routes/ApiURL";

class Medicao{

    dateMeasure: Date = new Date();
    consumeBreaker: number = 0;
    demandBreaker: number = 0;
    phaseOnePowerFactor: number = 0;
    phaseTwoPowerFactor: number = 0;
    phaseThreePowerFactor: number = 0;
    phaseOneVoltage: number = 0;
    phaseTwoVoltage: number = 0;
    phaseThreeVoltage: number = 0;
    temperatureMeasurement: number = 0;
    gatewayNumber: string = '';
    breakerIdBreaker: number = 0;
    overvoltage: number = 0.99;
    undervoltage: number = 0.1;
    measureDataArray: Medicao[] = [];
    start: string = '';
    end: string = '';
    vlrComponenteTarifario: number = 0.0
    breakerName: string = '';
    equipmentName: string = '';
    dscComponenteTarifario: string = '';
    dscUnidade: string = '';
    URL: string = ApiUrl.URL;


    constructor(data: Partial<Medicao> = {}) {
        Object.assign(this, data);
    }

  public async getMedicao(start: string, end: string, breaker: number): Promise<Medicao[]> {
    
    try {
      const parameter = {"start": start, "end": end, "breaker": breaker}
      const result = await axios.post(this.URL + 'measures', parameter);
      const rawData = result.data;

      if (Array.isArray(rawData)) {
         this.measureDataArray = rawData.map((data: any) => {
            return new Medicao({
                        dateMeasure: data.date_measure,
                        consumeBreaker: data.consume_breaker,
                        demandBreaker: data.demand_breaker,
                        phaseOnePowerFactor: data.phase_one_power_factor,
                        phaseTwoPowerFactor: data.phase_two_power_factor,
                        phaseThreePowerFactor: data.phase_three_power_factor,
                        phaseOneVoltage: data.phase_one_voltage,
                        phaseTwoVoltage: data.phase_two_voltage,
                        phaseThreeVoltage: data.phase_three_voltage,
                        temperatureMeasurement: data.temperature_measurement,
                        gatewayNumber: data.gateway_number,
                        breakerIdBreaker: data.breaker_idbreaker,
                        overvoltage: data.overvoltage,
                        undervoltage: data.undervoltage,
                        vlrComponenteTarifario: data.VlrComponenteTarifario,
                        breakerName: data.breaker_name,
                        equipmentName: data.equipment_name,
                        dscComponenteTarifario: data.DscComponenteTarifario,
                        dscUnidade: data.DscUnidade,
                        start: start,
                        end: end,

                });
      
        });
        console.log(this.measureDataArray);
        return this.measureDataArray;
      } else {
        throw new Error('Dados não estão em formato de array.');
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error;
    }
  }

}

export default Medicao;