import ducksReducer from 'ducks-reducer'
import { createStore } from "redux";
import initialState from "./initialState";
import * as convertor from '../ducks/convertor'

const reducer = ducksReducer({ convertor })

const store = createStore(reducer, initialState);

export default store;