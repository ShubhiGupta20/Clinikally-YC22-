import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import moment from 'moment';

const CountdownTimer = ({ cutoffTime }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = moment();
      const timeRemaining = moment(cutoffTime).diff(now);

      if (timeRemaining > 0) {
        const duration = moment.duration(timeRemaining);
        setTimeLeft(`${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`);
      } else {
        setTimeLeft('Cutoff time has passed');
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [cutoffTime]);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>Time Left: {timeLeft}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  timerText: { fontSize: 16, color: '#ff0000' },
});

export default CountdownTimer;
