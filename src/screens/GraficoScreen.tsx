import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Platform } from "react-native";
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Equipamento from "../service/Equipamento";
import Disjuntor from "../service/Disjuntor";
import DateTimePicker from '@react-native-community/datetimepicker';

function GraficoScreen() {
    const [selectedEquipamento, setSelectedEquipamento] = useState<number | null>(null);
    const [listaEquipamento, setListaEquipamento] = useState<Equipamento[]>([]);
    const [selectedDisjuntor, setSelectedDisjuntor] = useState<number | null>(null);
    const [listaDisjuntor, setListaDisjuntor] = useState<Disjuntor[]>([]);
    const [dtInicial, setDtInicial] = useState<Date | undefined>(undefined);
    const [dtFinal, setDtFinal] = useState<Date | undefined>(undefined);
    const [showInicialPicker, setShowInicialPicker] = useState(false);
    const [showFinalPicker, setShowFinalPicker] = useState(false);

    useEffect(() => {
        getEquipamento();
    }, []);

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

    return (
        <View style={styles.container}>
            <View style={styles.loadingContainer}>
                <View style={styles.pickerContainer}>
                    <Text>Equipamento</Text>
                    <RNPickerSelect
                        onValueChange={(value) => {
                            setSelectedEquipamento(value);
                            getListaDisjuntor();
                        }}
                        items={listaEquipamento.map((equipamento) => ({
                            label: equipamento.getEquipmentName(),
                            value: equipamento.getIdequipment()
                        }))}
                        placeholder={{ label: "Selecione um equipamento", value: null }}
                    />
                </View>

                <View style={styles.pickerContainer}>
                    <Text style={styles.label}>Disjuntor</Text>
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

                <Text style={styles.label}>Data Inicial</Text>
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

                <Text>Data Final</Text>
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    pickerContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 0,
        borderRadius: 5,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0,
        borderRadius: 5,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

export default GraficoScreen;
