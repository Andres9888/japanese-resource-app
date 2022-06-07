import { configureStore } from '@reduxjs/toolkit';

import viewerReducer from '~features/viewer/viewerSlice';

export default configureStore({
  reducer: {
    counter: viewerReducer,
  },
});
