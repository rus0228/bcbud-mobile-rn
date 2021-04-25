// Simple React Native specific changes
import Config from 'react-native-config';

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  apiEndPoint: Config.SERVER_URL,
};
