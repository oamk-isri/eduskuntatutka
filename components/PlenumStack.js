import { createStackNavigator } from '@react-navigation/stack';
import PlenumDetails from '../views/plenum'
import plenumList from '../views/plenumList';

const Stack = createStackNavigator();


export default PlenumStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="PlenumList" component={plenumList} />
      <Stack.Screen name="PlenumDetails" component={PlenumDetails} />
    </Stack.Navigator>
  )
}