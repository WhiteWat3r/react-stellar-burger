import { modalReducer, initialState } from './modal';
import * as types from '../../actions/modal';


describe('Modal reducer', () => {
    test('Открытие модального окна', () => {
        const action = { type: types.OPEN_MODAL };
        const nextState = modalReducer(initialState, action);
        expect(nextState.isModalOpen).toBe(true)
    })

    test('Закрытие', () => {
        const action = { type: types.CLOSE_MODAL };
        const nextState = modalReducer(initialState, action);
        expect(nextState.isModalOpen).toBe(false)
    })
})