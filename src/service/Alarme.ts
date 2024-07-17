import axios from "axios";
import ApiUrl from "../routes/ApiURL";

class Alarme {
    date: Date;
    alarmType: string;
    breakerId: number;
    breakerName: string;
    status: boolean;
    equipmentName: string;
    idAlarms: number;
    api: string;

    constructor(
        date: Date = new Date(),
        alarmType: string = "",
        breakerId: number = 0,
        breakerName: string = "",
        status: boolean = true,
        equipmentName: string = "",
        idAlarms: number = 0  
    ) {
        this.date = date;
        this.alarmType = alarmType;
        this.breakerId = breakerId;
        this.breakerName = breakerName;
        this.status = status;
        this.equipmentName = equipmentName;
        this.idAlarms = idAlarms;
        this.api = ApiUrl.URL + "all_alarms_open";
    }

    async fetchAlarms(): Promise<Alarme[]> {
        try {
            const response = await axios.get(this.api); // Substitua pela URL da sua API
            const alarmData = response.data;
          
            return alarmData.map((alarm: any) => new Alarme(
                new Date(alarm.date),
                alarm.alarm_type,
                alarm.breaker_idbreaker,
                alarm.breaker_name,
                alarm.status,
                alarm.equipment_name,
                alarm.idalarms
            ));
        } catch (error) {
            console.error('Erro ao buscar alarmes:', error);
            throw error;
        }
    }

    public async getHistoricoAlarmes(start: string, end: string, breaker: number): Promise<Alarme[]>{

        try{
            const parameter = {"start": start, "end": end, "breaker": breaker};
        
            const result = await axios.get(ApiUrl.URL+'history_alarms', {params: parameter});
            const alarmData = result.data;
            return alarmData.map((alarm: any) => new Alarme(
                new Date(alarm.date),
                alarm.alarm_type,
                alarm.breaker_idbreaker,
                alarm.breaker_name,
                alarm.status,
                alarm.equipment_name,
                alarm.idalarms
            ));

        } catch (error){
            console.error('Erro ao buscar alarmes:', error);
            throw error;
        }

    }
}


export default Alarme;