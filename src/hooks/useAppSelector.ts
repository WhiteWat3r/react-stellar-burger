import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../services/reducers'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

