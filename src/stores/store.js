import { writable } from 'svelte/store';

export const initialState = writable({
	currencies: []
});
