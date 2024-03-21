import { createStackNavigator } from '@react-navigation/stack';
import representatives from '../views/representatives';
import representative from '../views/representative';

const Stack = createStackNavigator();


export default RepStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Representatives" component={representatives} />
      <Stack.Screen name="Representative" component={representative} />
    </Stack.Navigator>
  )
}