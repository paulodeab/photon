import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Grafico from '../../service/Grafico';
import { format } from 'date-fns';

const screenWidth = Dimensions.get("window").width;


const GraficoConsumoScreen = ({start, end, breaker}) => {
    const [graficoData, setGraficoData] = useState<Grafico[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchGraficoData = async () => {
            try {
                const grafico = new Grafico();
                const data = await grafico.getGraficoData(start, end, breaker);
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
        labels: graficoData.map(item => format(new Date(item.hourGroup), 'dd/MM HH:mm')),
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
                <Text style={styles.title}>Consumo do Disjuntor - KWh por Hora</Text>
                <ScrollView horizontal>
                    <View style={{ width: Math.max(screenWidth, chartData.labels.length * 50) }}>
                        <BarChart
                            verticalLabelRotation={80}
                            data={chartData}
                            width={Math.max(screenWidth, chartData.labels.length * 50)}
                            height={430}
                            yAxisLabel=""
                            yAxisSuffix=""
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
                            }}
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />
                    </View>
                </ScrollView>
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
        margin: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default GraficoConsumoScreen;
 