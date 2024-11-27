import {configureStore} from '@reduxjs/toolkit'

import rootreducer from './Reducer';


const Store= configureStore({
   reducer: rootreducer

});
export default Store;