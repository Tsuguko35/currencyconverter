<script>
    import '../styles/style.css'
    import { onMount } from 'svelte';
    import { initialState } from '../stores/store';
	import { fetchCurrencies } from '../utils/fetchCurrencies';

    //fetch all currencies available
    onMount(async () => {
        const countries = await fetchCurrencies()

        initialState.update(state => ({
            ...state,
            currencies: countries
        }))
    })
</script>

<!-- Content  -->
<slot />