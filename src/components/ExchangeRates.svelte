<script>
    export let exchangeRates;
    export let fromCurrency;
    export let toCurrency;
    export let exchangeDate;
    export let isLoading;
    import IconTablerRight from '~icons/tabler/arrow-right-dashed';

    // array of displayed currencies
    const currencyArray = ['eur', 'jpy', 'krw', 'gbp', 'aud', 'cad', 'cny']

    // Get date 
    const currentDate = new Date(exchangeDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);

    //get the rate for the country
    const getRate = (code) => {
        const entry = Object.entries(exchangeRates).find(
            ([key, value]) => key.toLowerCase() === code.toLowerCase()
        );

        return entry ? entry[1] : null;
    }
</script>

<div class={`converter__rates__card max__w shadow__bottom border__card__radius flex flex__column ${isLoading ? 'loading__skeleton' : ''}`}>
    {#if !isLoading}
        <h3 class="card__label">Exchange Rates as of {formattedDate}</h3>
        <ul class="rates_list flex flex__column">
            <!-- Exchange rate of the two chosen currencies  -->
            <li class="rate_item flex align__center space__between">
                <div class="currencies flex align__center">
                    <span>{fromCurrency}</span>
                    <IconTablerRight />
                    <span>{toCurrency}</span>
                </div>
                <span class="rate">{parseFloat(getRate(toCurrency)).toFixed(2)}</span>
            </li>

            <!-- Exchange rate of the array of currencies  -->
            {#each currencyArray as currency}
                <li class="rate_item flex align__center space__between">
                    <div class="currencies flex align__center">
                        <span>{fromCurrency}</span>
                        <IconTablerRight />
                        <span>{currency}</span>
                    </div>
                    <span class="rate">{parseFloat(getRate(currency)).toFixed(2)}</span>
                </li>
            {/each}
        </ul>
    {/if}  
</div>