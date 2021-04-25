import {CommonActions} from '@react-navigation/native';
import {Screens} from '@/constants/Navigation';

export function gotoMain(nav) {
  nav.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: Screens.main}],
    }),
  );
}

export function logOut(nav) {
  nav.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: Screens.logInEmail}],
    }),
  );
}

export function gotoWaitRoom(nav) {
  nav.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: Screens.main}, {name: Screens.waitGame}],
    }),
  );
}
