import { useDispatch, useSelector } from 'react-redux'
import type { AppState, AppDispatch } from './store'

export const useIDispatch = useDispatch.withTypes<AppDispatch>()
export const useISelector = useSelector.withTypes<AppState>()