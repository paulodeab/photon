import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Grafico from '../../service/Grafico';
import { format } from 'date-fns';

const screenWidth = Dimensions.get("window").width;

const GraficoFatorPotenciaScreen = ({start, end, breaker}) => {
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
                data: graficoData.map(item => item.phaseOnePowerFactor),
                color: (opacity = 1) => `rgb(255, 0, 0)`, // Red
                legend: 'Fase 1'
            },
            {
                data: graficoData.map(item => item.phaseTwoPowerFactor),
                color: (opacity = 1) => `rgb(0, 255, 0)`, // Green
                legend: 'Fase 2'
            },
            {
                data: graficoData.map(item => item.phaseThreePowerFactor),
                color: (opacity = 1) => `rgb(0, 0, 255)`, // Blue
                legend: 'Fase 3'
            }
        ],

    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Fator de Potência</Text>
                <View style={styles.legendContainer}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: 'red' }]} />
                        <Text>Fase 1</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: 'green' }]} />
                        <Text>Fase 2</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: 'blue' }]} />
                        <Text>Fase 3</Text>
                    </View>
                </View>
                <ScrollView horizontal>
                    <View>
                        <LineChart
                            verticalLabelRotation={80}
                            data={chartData}
                            width={Math.max(screenWidth, chartData.labels.length * 50)} // Allow horizontal scrolling
                            height={450}
                            yAxisLabel=""
                            yAxisSuffix=""
                            chartConfig={{
                                backgroundColor: '#F8F8FF',
                                backgroundGradientFrom: '#F8F8FF',
                                backgroundGradientTo: '#F8F8FF',
                                decimalPlaces: 3,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#ffa726"
                                },
                                formatXLabel: (value) => value.replace(' ', '\n')
                            }}
                            
                            style={{
                                marginVertical: 8,
                                borderRadius: 18
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
        marginTop: 30,
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
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    legendColor: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 5,
    },
});

export default GraficoFatorPotenciaScreen;
