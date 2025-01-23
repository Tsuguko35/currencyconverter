<script>
    import './homepage.css'
    import CountriesList from '../components/CountriesList.svelte';
    import IconTablerArrowsExchange from '~icons/tabler/arrows-exchange';
    import IconTablerArrowDown from '~icons/tabler/square-rounded-chevron-down-filled';
    import { writable } from 'svelte/store';
    import { initialState } from '../stores/store';
    import { currencyFlags } from '../utils/currencyFlags';

    // Writables 
    const inputFocused = writable('');
    const currencyInputs = writable({
        fromCurrency: {
            currencyName: 'Philippine Peso',
            currencyCode: 'PHP'
        },
        toCurrency: {
            currencyName: 'United States Dollar',
            currencyCode: 'USD'
        },
        fromAmmount: '',
        toAmmount: ''
    })

    // Variables 
    let currencyFilter = ''
    let delayedInputFocus = ''
    let isFocused = false

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
    };

    // Get country code for flag src
    const getCountryCode = (currencyCode) => {
        const country = currencyFlags.find(currency => currency.code === currencyCode);
        return country ? country.countryCode.toLowerCase() : null;
    }

    //handle filter change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        currencyFilter = value
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

<div class="homepage container flex flex__column">
    <!-- Page Title -->
    <div class="page__title">
        <h1 class="title">Currency Converter</h1>
        <h3 class="subtitle">Reliable Exchange Rates for Every Currency</h3>
    </div>
    
    
    <!-- Page Content  -->
    <div class="content__container flex align__center">
        <!-- Converter  -->
        <div class="converter__card max__w shadow__bottom border__card__radius">
            <div class="currency__inputs align__center flex max__w justify__center">
                <!-- First Currency  -->
                 <div class="currency__in__out max__w flex flex__column">
                    <!-- label  -->
                    <span class="label">From {$currencyInputs.fromCurrency.currencyName}</span>
                    <div class="currency__type__input flex align__center space__between p__relative max__w">
                        <!-- Flag and Currency Name  -->
                        <div class="currency flex align__center">
                            <img src={`https://flagcdn.com/w40/${getCountryCode($currencyInputs.fromCurrency.currencyCode)}.png`} alt="currency flag">
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
                            oninput={handleInputChange} 
                            autocomplete={false}
                        />
                        <IconTablerArrowDown />

                        <!-- Countries List  -->
                        <CountriesList currencyFilter={currencyFilter} countryCurrencies={$initialState.currencies} handleCurrencyChange={handleCurrencyChange} isFocused={isFocused} focusedInput={delayedInputFocus} listFor={'from'}/>
                     </div>

                     <!-- Currency Ammount Input  -->
                     <input 
                        class="currency__ammount" 
                        name="fromAmmount" 
                        type="number"
                        value={$currencyInputs.fromAmmount} 
                        oninput={handleInputChange} 
                     >
                 </div>

                <!-- Exchange button  -->
                 <button class="swap__button">
                    <IconTablerArrowsExchange/>
                 </button>
                

                <!-- Second Currency  -->
                <div class="currency__in__out max__w flex flex__column">
                    <!-- label  -->
                    <span class="label">To {$currencyInputs.toCurrency.currencyName}</span>
                    <div class="currency__type__input flex align__center space__between p__relative max__w">
                        <!-- Flag and Currency Name  -->
                        <div class="currency flex align__center">
                            <img src={`https://flagcdn.com/w40/${getCountryCode($currencyInputs.toCurrency.currencyCode)}.png`} alt="currency flag">
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
                            oninput={handleInputChange} 
                            autocomplete={false}
                        />
                        <IconTablerArrowDown />

                        <!-- Countries List  -->
                        <CountriesList currencyFilter={currencyFilter} countryCurrencies={$initialState.currencies} handleCurrencyChange={handleCurrencyChange} isFocused={isFocused} focusedInput={delayedInputFocus} listFor={'to'}/>
                     </div>

                     <!-- Currency Ammount Input  -->
                     <input 
                        class="currency__ammount" 
                        name="toAmmount" 
                        type="number"
                        value={$currencyInputs.toAmmount} 
                        oninput={handleInputChange} 
                     >
                 </div>

                 <!-- Exchange button  -->
                 <button class="swap__button justify__end align__center mobile">
                    Swap <IconTablerArrowsExchange/>
                 </button>
            </div>
        </div>

        <!-- Charts  -->
        <div class="converter__chart__card max__w shadow__bottom border__card__radius">

        </div>
    </div>
    
</div>
