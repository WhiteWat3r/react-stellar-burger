import { useDispatch } from 'react-redux'
import { AppDispatch } from '../services/reducers'






export type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
