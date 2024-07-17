import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import Medicao from '../../service/Medicao';
import { format } from 'date-fns';

const ReportConsumeScreen = ({ start, end, breaker }) => {
    const [consumeData, setConsumeData] = useState<Medicao[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalConsume, setTotalConsume] = useState<number>(0);
    const [totalValue, setTotalValue] = useState<number>(0);
    const [breakerName, setBreakerName]  = useState<String>("");
    const [equipmentName, setEquipmentName] = useState<String>("");

    useEffect(() => {
        const fetchConsumeData = async () => {
            try {
                const medicao = new Medicao();
                const data = await medicao.getMedicao(start, end, breaker);
                setConsumeData(data);
                calculateTotals(data); 
                setBreakerName(data[0].breakerName);
                setEquipmentName(data[0].equipmentName);
                 
            } catch (error) {
                console.error('Erro ao buscar dados de consumo:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchConsumeData();
    }, [start, end, breaker]);

    function convertToMWh(valueInKWh: number | null, vlrComponenteTarifario: number | 0, unidade: string) {
        
        if (valueInKWh === null) return "N/A";
        /* if (measureData.length === 0) return "N/A";
            const vlrComponenteTarifario = measureData[0].vlrComponenteTarifario || 0; 
        */

        let result;
        if (unidade === 'R$/MWh') {
            // Converte de KWh para MWh
            result = (valueInKWh / 1000) * vlrComponenteTarifario;
        } else {
            // Mantém o valor como está
            result = valueInKWh * vlrComponenteTarifario;
        }

        return result.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    const calculateTotals = (data: Medicao[]) => {
       
        let totalConsume = 0;
        let totalValue = 0;

        data.forEach(item => {
            totalConsume += item.consumeBreaker;
            totalValue += item.vlrComponenteTarifario * item.consumeBreaker;
        });

        setTotalConsume(totalConsume);
        setTotalValue(totalValue);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Data: {format(new Date(item.dateMeasure), 'dd/MM/yyyy')}</Text>
            <Text style={styles.itemText}>Descrição Unidade: {item.dscUnidade}</Text>
            <Text style={styles.itemText}>Consumo: {item.consumeBreaker.toFixed(8)}  KWh</Text>
            <Text style={styles.itemText}>Componente Tarifária: {item.dscComponenteTarifario}</Text>
            <Text style={styles.itemText}>Valor Componente Tarifário: {item.vlrComponenteTarifario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
            <Text style={styles.itemText}>Subtotal: {convertToMWh(item.consumeBreaker, item.vlrComponenteTarifario, item.dscComponenteTarifario )}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Relatório de Consumo Por Período</Text>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Período: {format(new Date(start), 'dd/MM/yyyy')} até {format(new Date(end), 'dd/MM/yyyy')}</Text>
                <Text style={styles.headerText}>Equipamento: {equipmentName} -  Disjuntor: {breakerName}</Text>
            </View>
            <FlatList
                data={consumeData}
                keyExtractor={(item) => item.dateMeasure.toString()}
                renderItem={renderItem}
            />
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total de Consumo: {totalConsume.toFixed(8)} {consumeData[0].dscUnidade === 'R$/MWh' ? 'MWh': 'KW'} </Text>
                <Text style={styles.totalText}>Total do Período: {totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    headerContainer: {
        marginBottom: 20,
        textAlign: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    itemContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 16,
    },
    totalContainer: {
        marginTop: 20,
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default ReportConsumeScreen;

