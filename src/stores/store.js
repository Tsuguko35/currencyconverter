import { writable } from 'svelte/store';

// Action Types
export const SET_CURRENCIES = 'SET_CURRENCIES';

// Initial State
export const initialState = writable({
	currencies: [],
	current_date: new Date().toISOString().split('T')[0],
	unavailable_flags: ['ANG', 'MOP'],
	currency_display: ['eur', 'jpy', 'krw', 'gbp', 'aud', 'cad', 'cny']
});

// Reducer
function reducer(state, action) {
	switch (action.type) {
		case SET_CURRENCIES:
			return { ...state, currencies: action.value };
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

// Dispatch
export function dispatch(action) {
	initialState.update((currentState) => reducer(currentState, action));
}
