import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Platform, StyleSheet, TouchableOpacity } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import Equipamento from "../service/Equipamento";
import Disjuntor from "../service/Disjuntor";
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GraficoConsumoScreen from "./graphics/GraficoConsumoScreen";
import GraficoFatorPotencia from "./graphics/GraficoFatorPotenciaScreen"; 
import GraficoTensaoScreen from "./graphics/GraficoTensaoScreen";


function GraficoScreen() {
    const [selectedEquipamento, setSelectedEquipamento] = useState<number | null>(null);
    const [listaEquipamento, setListaEquipamento] = useState<Equipamento[]>([]);
    const [selectedDisjuntor, setSelectedDisjuntor] = useState<number | null>(null);
    const [listaDisjuntor, setListaDisjuntor] = useState<Disjuntor[]>([]);
    const [dtInicial, setDtInicial] = useState<Date | undefined>(undefined);
    const [dtFinal, setDtFinal] = useState<Date | undefined>(undefined);
    const [showInicialPicker, setShowInicialPicker] = useState(false);
    const [showFinalPicker, setShowFinalPicker] = useState(false);
    const [selectedTipo, setSelectedTipo] = useState<string | null>(null);
    const [showGrafico, setShowGrafico] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getEquipamento();
    }, []);

    useEffect(() => {
        getListaDisjuntor();
    }, [selectedEquipamento]);

    async function getEquipamento() {
        try {
            const equipamentos = await new Equipamento().getListEquipamento();
            setListaEquipamento(equipamentos);
        } catch (error) {
            console.error('Failed to fetch equipamentos:', error);
        }
    }

    async function getListaDisjuntor() {
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
                            nome : "Consumo KWh"       
                        },
                        {
                            codigo : 2,
                            nome : "Fator de Potência" 
                        },
                        {
                            codigo : 3,
                            nome: "Tensão por Corrente"
                        }
    ];

    const handleGraficoChange = (value: string | null) => {
        if (!dtInicial || !dtFinal || !selectedEquipamento || !selectedDisjuntor) {
            setError("Todos os campos devem ser preenchidos antes de selecionar o tipo.");
            return;
        }
        setError(null);
        setSelectedTipo(value);
        setShowGrafico(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={[styles.pickerContainer, styles.flex1]}>
                    <View style={styles.row}>
                        <Text style={styles.label}>EQUIPAMENTO</Text>
                        <Icon name="settings" size={24} color="#FF8C00"/>
                    </View>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedEquipamento(value)}
                        items={listaEquipamento.map((equipamento) => ({
                            label: equipamento.getEquipmentName(),
                            value: equipamento.getIdequipment()
                        }))}
                        placeholder={{ label: "Selecione um equipamento", value: null }}
                        style={pickerSelectStyles}
                    />
                </View>
                <View style={[styles.pickerContainer, styles.flex1]}>
                    <View style={styles.row}>
                        <Text style={styles.label}>DISJUNTOR</Text>
                        <Icon name="electrical-services" size={24} color="#FF8C00"/>
                    </View>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedDisjuntor(value)}
                        items={listaDisjuntor.map((disjuntor) => ({
                            label: disjuntor.getBreakerName(),
                            value: disjuntor.getIdbreaker()
                        }))}
                        placeholder={{ label: "Selecione um disjuntor", value: null }}
                        style={pickerSelectStyles}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={[styles.flex1, styles.inputContainer]}>
                    <Text style={styles.label}>DATA INICIAL</Text>
                    <View style={styles.datePickerContainer}>
                        <TextInput
                            value={dtInicial ? dtInicial.toLocaleDateString() : ""}
                            onFocus={() => setShowInicialPicker(true)}
                            style={styles.input}
                        />
                        <TouchableOpacity onPress={() => setShowInicialPicker(true)}>
                            <Icon name="calendar-today" size={24} color="#FF8C00" />
                        </TouchableOpacity>
                    </View>
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
                    <Text style={styles.label}>DATA FINAL</Text>
                    <View style={styles.datePickerContainer}>
                        <TextInput
                            value={dtFinal ? dtFinal.toLocaleDateString() : ""}
                            onFocus={() => setShowFinalPicker(true)}
                            style={styles.input}
                        />
                        <TouchableOpacity onPress={() => setShowFinalPicker(true)}>
                            <Icon name="calendar-today" size={24} color="#FF8C00" />
                        </TouchableOpacity>
                    </View>
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
                <View style={styles.row}>
                    <Text style={styles.label}>TIPO</Text>
                    <Icon name="bar-chart" size={24} color="#FF8C00" />
                </View>
                <RNPickerSelect
                    onValueChange={handleGraficoChange}
                    items={tipoGrafico().map((tipo) => ({
                        label: tipo.nome,
                        value: tipo.codigo.toString()
                    }))}
                    placeholder={{ label: "Selecione um tipo", value: "1" }}
                    style={pickerSelectStyles}
                    disabled={!dtInicial || !dtFinal || !selectedEquipamento || !selectedDisjuntor}
                />
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <View style={styles.container}>
                {showGrafico && selectedTipo === "1" && (
                    <GraficoConsumoScreen start={dtInicial} end={dtFinal} breaker={selectedDisjuntor}/>
                )}
                {showGrafico && selectedTipo === "2" && (
                    <GraficoFatorPotencia start={dtInicial} end={dtFinal} breaker={selectedDisjuntor} />
                )}
                {showGrafico && selectedTipo === "3" && (
                    <GraficoTensaoScreen  start={dtInicial} end={dtFinal} breaker={selectedDisjuntor}/>
                )}
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
        width: '48%',
        backgroundColor: '#f9f9f9',
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '48%',
        backgroundColor: '#f9f9f9',
    },
    flex1: {
        flex: 1,
    },
    input: {
        width: '60%',
        height: 40,
        padding: 8,
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
        fontWeight: 'bold'
    },
    datePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        borderColor: '#ccc',
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        borderColor: '#ccc',
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});


export default GraficoScreen;
