<script>
    import { currencyFlags } from '../utils/currencyFlags';

    export let currencyFilter = ''
    export let countryCurrencies = {};
    export let handleCurrencyChange;
    export let isFocused = false;
    export let focusedInput ='';
    export let listFor = '';

    const unavailableFlags = ['ANG', 'MOP']

    let filteredCurrencies = {}

    // Get country code 
    const getCountryCode = (currencyCode) => { 
        const country = currencyFlags.find(currency => currency.code === currencyCode.toUpperCase());
        return country ? country.countryCode : null;
    }

    // Filter Currencies 
    $: filteredCurrencies = Object.entries(countryCurrencies).filter(([currencyCode, currencyName]) => {
        return currencyName.toLowerCase().includes(currencyFilter.toLowerCase()) || currencyCode.toLowerCase().includes(currencyFilter.toLowerCase());
    });

  </script>
  
  <ul class={`currency__list p__absolute shadow__bottom flex flex__column ${isFocused && focusedInput === listFor ? 'open'  : ''}`}>
    {#if countryCurrencies}
        {#each filteredCurrencies as [currencyCode, currencyName]}
            {#if currencyCode && currencyName}
                <button class="currency__item flex align__center" onclick={() => handleCurrencyChange({curName: currencyName, curCode: currencyCode})}>
                    <div class="currency flex align__center">
                        {#if getCountryCode(currencyCode) && !unavailableFlags.includes(currencyCode.toUpperCase())}
                            <img src={`https://flagcdn.com/w40/${getCountryCode(currencyCode).toLowerCase()}.png`} alt={`${currencyCode} flag`}>
                        {/if}
                        <span>{currencyCode}</span>
                    </div>
                    <span class="country">{currencyName}</span>
                </button>
            {/if}
        {/each}
    {/if}
  </ul>
  
  