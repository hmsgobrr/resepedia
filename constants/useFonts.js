import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    "Poppins-Black": require('../assets/fonts/Poppins-Black.ttf'),
    "Poppins-Bold": require('../assets/fonts/Poppins-Bold.ttf'),
    "Poppins-SemiBold": require('../assets/fonts/Poppins-SemiBold.ttf'),
    "Poppins-Regular": require('../assets/fonts/Poppins-Regular.ttf'),
  });

  