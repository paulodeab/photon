import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Platform, SafeAreaView } from "react-native";
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Equipamento from "../service/Equipamento";
import Disjuntor from "../service/Disjuntor";
import DateTimePicker from '@react-native-community/datetimepicker';
import ReportConsumeScreen from "./reports/ReportConsumeScreen";
import ReportAlarmeHistoricoScreen from "./reports/ReportAlarmeHistoricoScreen";


function RelatorioScreen() {

    const [selectedEquipamento, setSelectedEquipamento] = useState<number | null>(null);
    const [listaEquipamento, setListaEquipamento] = useState<Equipamento[]>([]);
    const [selectedDisjuntor, setSelectedDisjuntor] = useState<number | null>(null);
    const [listaDisjuntor, setListaDisjuntor] = useState<Disjuntor[]>([]);
    const [dtInicial, setDtInicial] = useState<Date | undefined>(undefined);
    const [dtFinal, setDtFinal] = useState<Date | undefined>(undefined);
    const [showInicialPicker, setShowInicialPicker] = useState(false);
    const [showFinalPicker, setShowFinalPicker] = useState(false);
    const [selectedTipo, setSelectedTipo] = useState<string | null>(null);
    const [showRelatorio, setShowRelatorio] = useState<boolean>(false);


    useEffect(() => {
        getEquipamento();
    }, []);

    useEffect(() => {
        getListaDisjuntor();
    }, [selectedEquipamento]); // Chama getListaDisjuntor quando selectedEquipamento muda

    async function getEquipamento() {
        try {
            const equipamentos = await new Equipamento().getListEquipamento();
            setListaEquipamento(equipamentos);
        } catch (error) {
            console.error('Failed to fetch equipamentos:', error);
        }
    }

    async function getListaDisjuntor() {
        console.log("Equipamento", selectedEquipamento);
        try {
            if (selectedEquipamento !== null) {
                const disjuntores = await new Disjuntor().getListaDisjuntor(selectedEquipamento);
                setListaDisjuntor(disjuntores);
            }
        } catch (error) {
            console.error('Failed to fetch disjuntores:', error);
        }
    }

    const onDtInicialChange = (event: any, selectedDate?: Date) => {
        setShowInicialPicker(Platform.OS === 'ios');
        if (selectedDate) {
            setDtInicial(selectedDate);
        }
    };

    const onDtFinalChange = (event: any, selectedDate?: Date) => {
        setShowFinalPicker(Platform.OS === 'ios');
        if (selectedDate) {
            setDtFinal(selectedDate);
        }
    };

    const tipoGrafico = () => [{
                            codigo : 1,
                            nome : "Consumo Por Período"       
                        },
                        {
                            codigo : 2,
                            nome : "Histórico de Alarmes" 
                        }];

    const handleGraficoChange = (value: string | null) => {
        setSelectedTipo(value);
        setShowRelatorio(true);
    };


    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={[styles.pickerContainer, styles.flex1]}>
                    <Text>EQUIPAMENTO</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedEquipamento(value)}
                        items={listaEquipamento.map((equipamento) => ({
                            label: equipamento.getEquipmentName(),
                            value: equipamento.getIdequipment()
                        }))}
                        placeholder={{ label: "Selecione um equipamento", value: null }}
                    />
                </View>
                <View style={[styles.pickerContainer, styles.flex1]}>
                    <Text>DISJUNTOR</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedDisjuntor(value)}
                        items={listaDisjuntor.map((disjuntor) => ({
                            label: disjuntor.getBreakerName(),
                            value: disjuntor.getIdbreaker()
                        }))}
                        placeholder={{ label: "Selecione um disjuntor", value: null }}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={[styles.flex1, styles.inputContainer]}>
                    <Text>DATA INICIAL</Text>
                    <TextInput
                        value={dtInicial ? dtInicial.toLocaleDateString() : ""}
                        onFocus={() => setShowInicialPicker(true)}
                        style={styles.input}
                    />
                    {showInicialPicker && (
                        <DateTimePicker
                            value={dtInicial || new Date()}
                            mode="date"
                            display="default"
                            onChange={onDtInicialChange}
                        />
                    )}
                </View>
                <View style={[styles.flex1, styles.inputContainer]}>
                    <Text>DATA FINAL</Text>
                    <TextInput
                        value={dtFinal ? dtFinal.toLocaleDateString() : ""}
                        onFocus={() => setShowFinalPicker(true)}
                        style={styles.input}
                    />
                    {showFinalPicker && (
                        <DateTimePicker
                            value={dtFinal || new Date()}
                            mode="date"
                            display="default"
                            onChange={onDtFinalChange}    
                        />
                    )}
                </View>
            </View>

            <View style={styles.pickerContainer}>
                <Text>TIPO</Text>
                <RNPickerSelect
                    onValueChange={(value) => handleGraficoChange(value)}
                    items={tipoGrafico().map((tipo) => ({
                        label: tipo.nome,
                        value: tipo.codigo.toString()
                    }))}
                    placeholder={{ label: "Selecione um tipo", value: "1" }}
                    style={pickerSelectStyles}
                />
            </View>
            <View style={styles.container}>

                {showRelatorio && selectedTipo === "1" && (
                     <SafeAreaView style={{ flex: 1 }}>
                        <ReportConsumeScreen start={dtInicial} end={dtFinal} breaker={selectedDisjuntor}/>
                    </SafeAreaView>
                )}
                 {showRelatorio && selectedTipo === "2" && (
                    <ReportAlarmeHistoricoScreen start={dtInicial} end={dtFinal} breaker={selectedDisjuntor} />
                )}
                
                {/*
                {showGrafico && selectedTipo === "2" && (
                    <GraficoFatorPotencia start={dtInicial} end={dtFinal} breaker={selectedDisjuntor} />
                )}
                {showGrafico && selectedTipo === "3" && (
                    <GraficoTensaoScreen  start={dtInicial} end={dtFinal} breaker={selectedDisjuntor}/>
                )} */}
            </View>                   
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        marginTop: 50
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '48%', // Ajuste conforme necessário
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '48%', // Ajuste conforme necessário
    },
    flex1: {
        flex: 1,
    },
    input: {
        width: '100%',
    },
   
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderRadius: 5,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});


export default RelatorioScreen;