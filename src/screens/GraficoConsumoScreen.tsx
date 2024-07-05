import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Grafico from '../service/Grafico';

const screenWidth = Dimensions.get("window").width;

const GraficoConsumoScreen = () => {
    const [graficoData, setGraficoData] = useState<Grafico[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchGraficoData = async () => {
            try {
                const grafico = new Grafico();
                const data = await grafico.getGraficoData();
                console.log("CHEGOU:" + data);
                setGraficoData(data);
            } catch (error) {
                console.error('Erro ao buscar dados do gráfico:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGraficoData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF4500" />
            </View>
        );
    }

    const chartData = {
        labels: graficoData.map(item => item.hourGroup),
        datasets: [
            {
                data: graficoData.map(item => item.consumeBreaker),
                color: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`, // Cor das colunas
            }
        ]
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Consumo do Breaker</Text>
                <BarChart
                    data={chartData}
                    width={screenWidth}
                    height={220}
                    yAxisLabel=""
                    yAxisSuffix="kWh"
                    chartConfig={{
                        backgroundColor: '#F8F8FF',
                        backgroundGradientFrom: '#F8F8FF',
                        backgroundGradientTo: '#F8F8FF',
                        decimalPlaces: 3, // Ajustado para 3 casas decimais
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        fillShadowGradient: "#FF8C00",
                        fillShadowGradientOpacity: 1,
                        xAxisLabelRotation: 90, // Rotação das etiquetas no eixo X
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default GraficoConsumoScreen;
