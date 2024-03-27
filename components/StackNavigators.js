import { createStackNavigator } from '@react-navigation/stack';
import representatives from '../views/representatives';
import representative from '../views/representative';
import plenumList from '../views/plenumList';
import PlenumDetails from '../views/plenum';

const Stack = createStackNavigator();

const PlenumsStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Täysistunnot" component={plenumList} />
      <Stack.Screen name="PlenumDetails" component={PlenumDetails} />
    </Stack.Navigator>
  )
}

const RepresentativesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Representatives" component={representatives} />
      <Stack.Screen name="Representative" component={representative} />
    </Stack.Navigator>
  )
}

export {PlenumsStack, RepresentativesStack};