import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Alarme from '../service/Alarme'; // Substitua pelo caminho correto da sua classe Alarme

const AlarmeScreen = () => {
    const [alarmes, setAlarmes] = useState<Alarme[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchAlarmes = async () => {
        try {
            const alarme = new Alarme();
            const data = await alarme.fetchAlarms();
            setAlarmes(data);
        } catch (error) {
            console.error('Erro ao buscar alarmes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlarmes();

        const interval = setInterval(fetchAlarmes, 10000); // Atualiza a cada 10 segundos

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const renderItem = ({ item }: { item: Alarme }) => (
        <View key={item.idAlarms} style={[styles.itemContainer, !item.status && styles.inactiveItem]}>
            <Text style={styles.itemText}>Data: {new Date(item.date).toLocaleString()}</Text>
            <Text style={styles.itemText}>Desc: {item.alarmType}</Text>
            <Text style={styles.itemText}>Disjuntor: {item.breakerName}</Text>
            <Text style={styles.itemText}>Nome do Equipamento: {item.equipmentName}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={alarmes}
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
    itemContainer: {
        padding: 20,
        fontSize: 18,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#F58634',
        borderRadius: 10,
       // opacity: 0.4, // Define a opacidade dos cards ativos
    },
    inactiveItem: {
        backgroundColor: '#f8d7da',
        borderColor: '#f5c6cb',
        opacity: 0.3, // Define a opacidade dos cards inativos
    },
    itemText: {
        fontSize: 19,
        color: '#00000',
        fontWeight: 'bold'
    },
});

export default AlarmeScreen;
