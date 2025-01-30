<script>
    import '../styles/style.css'
    import { onMount } from 'svelte';
    import { dispatch, SET_CURRENCIES } from '../stores/store';
	import { fetchCurrencies } from '../utils/fetchCurrencies';

    //fetch all currencies available
    onMount(async () => {
        const countries = await fetchCurrencies()

        dispatch({ type: SET_CURRENCIES, value: countries})
    })
</script>


<!-- Content  -->
<main>
    <slot />
</main>
