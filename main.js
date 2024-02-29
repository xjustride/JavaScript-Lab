const input1 = document.querySelector('#val1')
const input2 = document.querySelector('#val2')
const input3 = document.querySelector('#val3')
const input4 = document.querySelector('#val4')
const inputs = document.querySelector(`#inputs`)
// console.dir(input1)
// console.log(input1.value)


//pobierz div-a
const pojemnikNaWyniki = document.querySelector(`.wyniki`)
const minval = document.querySelector(`#min`)
const maxval = document.querySelector(`#max`)
const sumval = document.querySelector(`#sum`)
const avgval = document.querySelector(`#avg`)

// reagowanie na klikniecie
const przeliczBtn = document.querySelector(`#przelicz`)
inputs.addEventListener(`change`, ()=>{
    const min = Math.min(input1.value, input2.value, input3.value, input4.value)
    const max = Math.max(input1.value, input2.value, input3.value, input4.value)
    const sum = parseInt(input1.value) + parseInt(input2.value) + parseInt(input3.value) + parseInt(input4.value)
    
      
    minval.textContent = `Wartość minimalna to: ` + min
    maxval.textContent = `Wartość maksymalna to: ` + max
    sumval.textContent = `Suma wartości to: ` + sum
    avgval.textContent = `Średnia wartość to: ` + sum / 4

})