import axios from 'axios';
import ApiUrl from '../routes/ApiURL';


class Grafico {

    consumeBreaker: number;
    phaseOnePowerFactor: number;
    phaseTwoPowerFactor: number;
    phaseThreePowerFactor: number;
    phaseOneVoltage: number;
    phaseTwoVoltage: number;
    phaseThreeVoltage: number;
    breakerId: number;
    breakerName: string;
    equipmentName: string;
    hourGroup: string;
    API: string;

    constructor(consumeBreaker: number = 0,
        phaseOnePowerFactor: number = 0,
        phaseTwoPowerFactor: number = 0,
        phaseThreePowerFactor: number = 0,
        phaseOneVoltage: number = 0,
        phaseTwoVoltage: number = 0,
        phaseThreeVoltage: number = 0,
        breakerId: number = 0,
        breakerName: string = "",
        equipmentName: string = "",
        hourGroup: string = "") {
        this.consumeBreaker = consumeBreaker;
        this.phaseOnePowerFactor = phaseOnePowerFactor;
        this.phaseTwoPowerFactor = phaseTwoPowerFactor;
        this.phaseThreePowerFactor = phaseThreePowerFactor;
        this.phaseOneVoltage = phaseOneVoltage;
        this.phaseTwoVoltage = phaseTwoVoltage;
        this.phaseThreeVoltage = phaseThreeVoltage;
        this.breakerId = breakerId;
        this.breakerName = breakerName;
        this.equipmentName = equipmentName;
        this.hourGroup = hourGroup;
        this.API = ApiUrl.URL + 'report_consume_measures';  
    }

    async getGraficoData(): Promise<Grafico[]> {
        try {
            const parameter = {"start": '2024-06-01', "end": '2024-06-06', "breaker": 71}

            const response = await axios.get(this.API, {params:parameter}); 
            const data = response.data.map((item: any) => 
                                                    new Grafico(item.consume_breaker,
                                                                item.phase_one_power_factor,
                                                                item.phase_two_power_factor,
                                                                item.phase_three_power_factor,
                                                                item.phase_one_voltage,
                                                                item.phase_two_voltage,
                                                                item.phase_three_voltage,
                                                                item.breaker_idbreaker,
                                                                item.breaker_name,
                                                                item.equipment_name,
                                                                item.hour_group
                                                    ));
           
            return data;
        } catch (error) {
            console.error('Erro ao buscar dados do gráfico:', error);
            throw error;
        }
    }
}

export default Grafico;