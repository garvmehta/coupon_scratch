
import React from 'react';
import type { PropsWithChildren } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ScratchingCard from './src/components/scratchCard';






function App(): React.JSX.Element {




  return (
    <SafeAreaView style={styles.container}>
      

        <Text style={styles.heading}>Scratch Card</Text>
        <ScratchingCard
          width={330}
          height={330}
          backgroundImage={require('./src/components/scratchCard/assets/scratch_background.png')}
          foregroundImage={require('./src/components/scratchCard/assets/scratch_foreground.png')}
        />
      
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  heading:{
    
      margin:"6%",
      fontSize:30,
      fontWeight:'600'
    
  }
})


export default App;
