import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { PokemonListItem } from './src/types/pokemon';
import { HomeScreen } from './src/pages/HomePage';
import { DetailPage } from './src/pages/DetailPage';

export type RootStackParamList = {
  Home: undefined;
  Detail: { pokemon: PokemonListItem };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#f6f8fb' },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Home" component={HomeScreenWrapper} />
          <Stack.Screen name="Detail" component={DetailWrapper} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

function HomeScreenWrapper({
  navigation,
}: {
  navigation: {
    navigate: (screen: string, params: { pokemon: PokemonListItem }) => void;
  };
}) {
  return (
    <HomeScreen
      onNavigateToDetail={(pokemon) =>
        navigation.navigate('Detail', { pokemon })
      }
    />
  );
}

function DetailWrapper({
  route,
  navigation,
}: {
  route: { params: { pokemon: PokemonListItem } };
  navigation: { goBack: () => void };
}) {
  return (
    <DetailPage pokemon={route.params.pokemon} onGoBack={() => navigation.goBack()} />
  );
}
