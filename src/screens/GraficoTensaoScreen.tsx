import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Grafico from '../service/Grafico';
import { format } from 'date-fns';

const screenWidth = Dimensions.get("window").width;

const GraficoTensaoScreen = () => {
    const [graficoData, setGraficoData] = useState<Grafico[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchGraficoData = async () => {
            try {
                const grafico = new Grafico();
                const data = await grafico.getGraficoData();
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
                data: graficoData.map(item => item.phaseOneVoltage),
                color: (opacity = 1) => `rgb(255, 0, 0)`, // Red
                label: 'Fase 1'
            },
            {
                data: graficoData.map(item => item.phaseTwoVoltage),
                color: (opacity = 1) => `rgb(0, 255, 0)`, // Green
                label: 'Fase 2'
            },
            {
                data: graficoData.map(item => item.phaseThreeVoltage),
                color: (opacity = 1) => `rgb(0, 0, 255)`, // Blue
                label: 'Fase 3'
            }
        ],
        legend: ['Fase 1', 'Fase 2', 'Fase 3']
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Tensão das Fases</Text>
                <ScrollView horizontal>
                    <View>
                        <LineChart
                            verticalLabelRotation={80}
                            data={chartData}
                            width={Math.max(screenWidth, chartData.labels.length * 50)} // Allow horizontal scrolling
                            height={450}
                            yAxisLabel=""
                            yAxisSuffix="V"
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
                            bezier
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
});

export default GraficoTensaoScreen;
