import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import Alarme from "../../service/Alarme"; // Certifique-se de que o caminho esteja correto
import { format } from "date-fns";

const ReportAlarmeHistoricoScreen = ({ start, end, breaker }) => {
    const [historicoAlarmes, setHistoricoAlarmes] = useState<Alarme[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistoricoAlarmes = async () => {
            try {
                const alarmeService = new Alarme();
                const data = await alarmeService.getHistoricoAlarmes(start, end, breaker);
                setHistoricoAlarmes(data);
            } catch (error) {
                console.error('Erro ao buscar dados de alarmes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistoricoAlarmes();
    }, [start, end, breaker]);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Data: {item.date.toLocaleString()}</Text>
            <Text style={styles.itemText}>Tipo de Alarme: {item.alarmType}</Text>
            <Text style={styles.itemText}>Nome do Disjuntor: {item.breakerName}</Text>
            <View style={styles.statusContainer}>
                <Text style={styles.itemText}>Status: {item.status == 1 ? 'Aberto': 'Resolvido'}</Text>
                <View style={[styles.statusCircle, { backgroundColor: item.status ? 'red' : 'green' }]} />
            </View>
            <Text style={styles.itemText}>Nome do Equipamento: {item.equipmentName}</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Relatório de Histórico de Alarmes</Text>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Período: {format(start, 'dd/MM/yyyy')} até {format(end, 'dd/MM/yyyy')}</Text>
                <Text style={styles.headerText}>Equipamento: {historicoAlarmes[0].equipmentName}</Text>
                <Text style={styles.headerText}>Disjuntor: {historicoAlarmes[0].breakerName}</Text>
            </View>
            <FlatList
                data={historicoAlarmes}
                keyExtractor={(item) => item.idAlarms.toString()}
                renderItem={renderItem}
            />
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
        textAlign: 'center',
    },
    itemContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 16,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    statusCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginLeft: 10,
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
        textAlign: 'center',
    },
});

export default ReportAlarmeHistoricoScreen;
