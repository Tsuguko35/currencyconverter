<script>
    import './homepage.css'
    import CountriesList from '../components/CountriesList.svelte';
    import IconTablerArrowsExchange from '~icons/tabler/arrows-exchange';
    import IconTablerArrowDown from '~icons/tabler/square-rounded-chevron-down-filled';
    import { writable } from 'svelte/store';
    import { initialState } from '../stores/store';
    import { currencyFlags } from '../utils/currencyFlags';
    import { getCountryCode } from '../utils/getCountryCode';
	import { fetchExchangeRates } from '../utils/fetchExchangeRates';
	import { onMount } from 'svelte';
	import { convertCurrency } from '../utils/convertCurrency';
	import { handleAmmountFormat } from '../utils/handleAmmountFormat';
	import PageTitle from '../components/PageTitle.svelte';
	import ExchangeRates from '../components/ExchangeRates.svelte';
	import { getExchangeRate } from '../utils/getExchangeRate';

    // Writables 
    const inputFocused = writable('');
    const currencyInputs = writable({
        fromCurrency: {
            currencyName: 'US Dollar',
            currencyCode: 'usd'
        },
        toCurrency: {
            currencyName: 'Philippine Peso',
            currencyCode: 'php'
        },
        
    })
    const currencyAmmounts = writable({
        fromAmmount: '',
        toAmmount: ''
    })
    const fromCurrencyRate = writable({})
    const ammountFocused = writable('');
    const exchangeDay = writable($initialState.current_date)
    const isLoading = writable(true)

    // Variables 
    let currencyFilter = ''
    let delayedInputFocus = ''
    let isFocused = false
    let isMounted = false
    
    // Run if currency type is updated
    $: if(isMounted){
        const { fromCurrency } = $currencyInputs;
        isLoading.set(true)
        fetchExchangeRates(fromCurrency.currencyCode, $exchangeDay).then((data) => {
            fromCurrencyRate.set(data[fromCurrency.currencyCode])
            isLoading.set(false)
        });
    }

    onMount(() => {
        isMounted = true;
        const { fromCurrency } = $currencyInputs;
        isLoading.set(true)
        fetchExchangeRates(fromCurrency.currencyCode).then(() => {
            isLoading.set(false)
        });
    });

    const clearAmmountData = () => {
        currencyAmmounts.set({
            fromAmmount: '',
            toAmmount: ''
        })
    }

    // Clear Ammounts if date is changed
    $: {
        exchangeDay.subscribe(() => {
            clearAmmountData()
        })
    }

    // Handle blur and format the value
    function handleAmmountBlur(field) {
        ammountFocused.set('')
        currencyAmmounts.update((inputs) => {
            inputs[field] = handleAmmountFormat('blur', inputs[field]);
            return inputs;
        });
    }

    // Handle focus to remove commas
    function handleAmmountFocus(field) {
        ammountFocused.set(field)
        currencyAmmounts.update((inputs) => {
            inputs[field] = handleAmmountFormat('focus', inputs[field]);
            return inputs;
        });
    }

    // Swap Currencies 
    const swapCurrencies = () => {
        currencyInputs.update(current => {
            const tempFromCurrency = current.fromCurrency;
            current.fromCurrency = current.toCurrency;
            current.toCurrency = tempFromCurrency;
            return current;
        });
        currencyAmmounts.update(current => {
            const tempFromAmmount = current.fromAmmount
            current.fromAmmount = current.toAmmount;
            current.toAmmount = tempFromAmmount
            return current
        })
     
    }

    //handle user input on currency ammount
    const handleCurrencyConvert = (ammount, action) => {
        if(isNaN(ammount) || ammount === '') {
            if(ammount === ''){
                clearAmmountData()
            }
            return;
        }
        else{
            const { fromCurrency, toCurrency } = $currencyInputs
            if(action === 'from'){
                currencyAmmounts.update((state) => ({
                    ...state,
                    fromAmmount: ammount,
                    toAmmount: convertCurrency(parseFloat(ammount), getExchangeRate( $fromCurrencyRate, toCurrency.currencyCode), action)
                }))
             
            }
            else if(action === 'to'){
                currencyAmmounts.update((state) => ({
                    ...state,
                    fromAmmount: convertCurrency(parseFloat(ammount), getExchangeRate( $fromCurrencyRate, toCurrency.currencyCode), action),
                    toAmmount: ammount
                }))
            }
        }        
    }

    // Currency Change 
    export const handleCurrencyChange = (props) => {  
        if (delayedInputFocus === 'from') { 
            currencyInputs.update((currentState) => ({
                ...currentState,
                fromCurrency: {
                    currencyName: props.curName,
                    currencyCode: props.curCode
                },
            }));
            inputFocused.set('');
        } else if (delayedInputFocus === 'to') {
            currencyInputs.update((currentState) => ({
                ...currentState,
                toCurrency: {
                    currencyName: props.curName,
                    currencyCode: props.curCode
                },
            }));
            inputFocused.set('');
        }

        currencyAmmounts.update((currentState) => ({
            ...currentState,
            toAmmount: '',
            fromAmmount: ''
        }));
    };

    //clear filter and input focus
    const clearFilter = () => {
        setTimeout(() => {
            if(!$inputFocused){
                isFocused = false
                setTimeout(() => {
                    delayedInputFocus = ''
                }, 100)
                
            }
            currencyFilter = ''
        }, 100)
    }

    //change input focus or clear filter
    const changeFocus = (focus) => {
        if(focus){
            inputFocused.set(focus)
            delayedInputFocus = focus
            isFocused = true
        }
        else{
            inputFocused.set('')
            clearFilter()
        }
    }
</script>

<section class="homepage container flex flex__column">
    <!-- Page Title -->
    <PageTitle title={'Currency Converter'} subtitle ={'Reliable Exchange Rates for Every Currency'}/>
    
    
    <!-- Page Content  -->
    <div class="content__container flex">
        <!-- Converter  -->
        <div class={`converter__card max__w shadow__bottom border__card__radius ${$isLoading ? 'loading__skeleton' : ''}`}>
            {#if !$isLoading}
                <!-- Date for exchange rate  -->
                <div class="date__input flex flex__column">
                    <span class="label">Date</span>
                    <input class="converter__date" type="date" value={$exchangeDay} oninput={(e) => exchangeDay.set(e.target.value)}>
                </div>


                <div class="currency__inputs align__center flex max__w justify__center">

                    <!-- First Currency  -->
                    <div class="currency__in__out max__w flex flex__column">
                        <!-- label  -->
                        <span class="label">From {$currencyInputs.fromCurrency.currencyName}</span>
                        <div class="currency__type__input flex align__center space__between p__relative max__w">
                            <!-- Flag and Currency Name  -->
                            <div class="currency flex align__center">
                                {#if getCountryCode($currencyInputs.fromCurrency.currencyCode) && !$initialState.unavailable_flags.includes($currencyInputs.fromCurrency.currencyCode.toUpperCase())}
                                    <img src={`https://flagcdn.com/w40/${getCountryCode($currencyInputs.fromCurrency.currencyCode)}.png`} alt="currency flag">
                                {/if}
                                <span>{$currencyInputs.fromCurrency.currencyCode}</span>
                            </div>

                            <!-- Currency Name Input  -->
                            <input 
                                class="p__absolute max__h max__w" 
                                type="text" 
                                name="fromCurrency" 
                                onfocus={() => changeFocus('from')}
                                onblur={() => changeFocus('')}
                                value={$inputFocused === 'from' ? currencyFilter : $currencyInputs.fromCurrency.currencyName} 
                                oninput={(e) => currencyFilter = e.target.value} 
                                autocomplete={false}
                            />
                            <IconTablerArrowDown />

                            <!-- Countries List  -->
                            <CountriesList 
                                currencyFilter={currencyFilter} 
                                countryCurrencies={$initialState.currencies} 
                                handleCurrencyChange={handleCurrencyChange}
                                isFocused={isFocused} 
                                focusedInput={delayedInputFocus} 
                                listFor={'from'} 
                            />
                        </div>

                        <!-- Currency Ammount Input  -->
                        <input 
                            class="currency__ammount" 
                            name="fromAmmount" 
                            placeholder="0"
                            type={$ammountFocused === 'fromAmmount' ? "number" : "text"}
                            inputmode="numeric"
                            onfocus={() => handleAmmountFocus('fromAmmount')}
                            onblur={() => handleAmmountBlur('fromAmmount')}
                            value={$currencyAmmounts.fromAmmount} 
                            oninput={(e) => handleCurrencyConvert(e.target.value, 'from')} 
                        >
                    </div>

                    <!-- Exchange button  -->
                    <button class="swap__button" title="Swap Currencies" onclick={() => swapCurrencies()}>
                        <IconTablerArrowsExchange/>
                    </button>
                    

                    <!-- Second Currency  -->
                    <div class="currency__in__out max__w flex flex__column">
                        <!-- label  -->
                        <span class="label">To {$currencyInputs.toCurrency.currencyName}</span>
                        <div class="currency__type__input flex align__center space__between p__relative max__w">
                            <!-- Flag and Currency Name  -->
                            <div class="currency flex align__center">
                                {#if getCountryCode($currencyInputs.toCurrency.currencyCode) && !$initialState.unavailable_flags.includes($currencyInputs.toCurrency.currencyCode.toUpperCase())}
                                    <img src={`https://flagcdn.com/w40/${getCountryCode($currencyInputs.toCurrency.currencyCode)}.png`} alt="currency flag">
                                {/if}
                                <span>{$currencyInputs.toCurrency.currencyCode}</span>
                            </div>

                            <!-- Currency Name Input  -->
                            <input 
                                class="p__absolute max__h max__w" 
                                type="text" 
                                name="toCurrency" 
                                onfocus={() => changeFocus('to')}
                                onblur={() => changeFocus('')}
                                value={$inputFocused === 'to' ? currencyFilter : $currencyInputs.toCurrency.currencyName} 
                                oninput={(e) => currencyFilter = e.target.value} 
                                autocomplete={false}
                            />
                            <IconTablerArrowDown />

                            <!-- Countries List  -->
                            <CountriesList 
                                currencyFilter={currencyFilter} 
                                countryCurrencies={$initialState.currencies} 
                                handleCurrencyChange={handleCurrencyChange} 
                                isFocused={isFocused} 
                                focusedInput={delayedInputFocus} 
                                listFor={'to'}
                            />
                        </div>

                        <!-- Currency Ammount Input  -->
                        <input 
                            class="currency__ammount" 
                            name="toAmmount" 
                            placeholder="0"
                            type="text"
                            inputmode="numeric"
                            onfocus={() => handleAmmountFocus('toAmmount')}
                            onblur={() => handleAmmountBlur('toAmmount')}
                            value={$currencyAmmounts.toAmmount} 
                            oninput={(e) => handleCurrencyConvert(e.target.value, 'to')} 
                        >
                    </div>

                    <!-- Exchange button  -->
                    <button class="swap__button justify__end align__center mobile" title="Swap Currencies" onclick={() => swapCurrencies()}>
                        Swap <IconTablerArrowsExchange/>
                    </button>
                </div>
            {/if}
            
        </div>

        <!-- Charts  -->
        <ExchangeRates 
            exchangeRates={$fromCurrencyRate} 
            fromCurrency={$currencyInputs.fromCurrency.currencyCode} 
            toCurrency={$currencyInputs.toCurrency.currencyCode} 
            exchangeDate={$exchangeDay} 
            isLoading={$isLoading}
        />
    </div>
    
</section>
