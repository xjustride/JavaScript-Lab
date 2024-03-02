const inputs = document.querySelector(`#inputs`)
const inputsAll = inputs.querySelectorAll(`input`)
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
    const min = Math.min(inputsAll[0].value.length, inputsAll[1].value, inputsAll[2].value, inputsAll[3].value)
    const max = Math.max(inputsAll[0].value, inputsAll[1].value, inputsAll[2].value, inputsAll[3].value)
    const sum = parseInt(inputsAll[0].value) + parseInt(inputsAll[1].value) + parseInt(inputsAll[2].value) + parseInt(inputsAll[3].value);
    
      
    minval.textContent = `Wartość minimalna to: ` + min
    maxval.textContent = `Wartość maksymalna to: ` + max
    sumval.textContent = `Suma wartości to: ` + sum
    avgval.textContent = `Średnia wartość to: ` + sum / inputsAll.length

})

const addBtn = document.querySelector(`#dodaj`)
addBtn.addEventListener(`click`, ()=>{
    const newInput = document.createElement(`input`)
    newInput.type = `text`
    inputs.appendChild(newInput)
})

const removeBtn = document.querySelector(`#usun`)
removeBtn.addEventListener(`click`, ()=>{
    const lastInput = inputs.lastElementChild
    if (lastInput){
        inputs.removeChild(lastInput)
    }
})