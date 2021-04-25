import React from 'react';
import {Screens} from '@/constants/Navigation';
import {useStores} from '@/hooks';
import {assign} from 'lodash';
const initState = {};

function useViewModel() {
  const [isInitializing, setInitializing] = React.useState(true);
  const store = useStores();

  // On Component did mount
  React.useEffect(() => {
    const init = async function () {
      try {
        await store.initialize();
        assign(initState, getInitialState(store));
      } catch (ex) {
        assign(initState, {routes: [{name: Screens.main}]});
      } finally {
        setInitializing(false);
      }
    };
    // Call init
    // noinspection JSIgnoredPromiseFromCall
    init();
  }, []);

  return {
    isInitializing,
    initState,
  };
}

// Determine the initial screen from store
export function getInitialState(store) {
  const {user} = store;
  const _getRoutes = (screenNames) => {
    return {
      routes: screenNames.map((name) => ({name})),
    };
  };
  if (user.isValid) {
    return _getRoutes([Screens.main]);
  } else {
    return _getRoutes([Screens.main]);
  }
}
export default useViewModel;
