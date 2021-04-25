import {types} from 'mobx-state-tree';
import User from './User';
import Notification from './Notification';
import Hud from './Hud';

const Store = types.model({
  user: User,
  notification: Notification,
  hud: Hud,
});
export default Store;
