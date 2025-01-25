<script>
    export let exchangeRates;
    export let fromCurrency;
    export let toCurrency;
    export let exchangeDate;
    import IconTablerRight from '~icons/tabler/arrow-right-dashed';
    const currencyArray = ['eur', 'jpy', 'krw', 'gbp']

    // Get date 
    const currentDate = new Date(exchangeDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);

    const getRate = (code) => {
        const entry = Object.entries(exchangeRates).find(
            ([key, value]) => key.toLowerCase() === code.toLowerCase()
        );

        return entry ? entry[1] : null;
    }
</script>

<div class="converter__rates__card max__w shadow__bottom border__card__radius flex flex__column">
    <h3 class="card__label">Exchange Rates as of {formattedDate}</h3>
    <ul class="rates_list flex flex__column">
        <li class="rate_item flex align__center space__between">
            <div class="currencies flex align__center">
                <span>{fromCurrency}</span>
                <IconTablerRight />
                <span>{toCurrency}</span>
            </div>
            <span class="rate">{parseFloat(getRate(toCurrency)).toFixed(2)}</span>
        </li>
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
</div>