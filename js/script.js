const binaryDiv = document.querySelector(".binary")
const decimalDiv = document.querySelector(".decimal")
const btns = document.querySelectorAll(".btn")
let opStatus = true
const binaryCalculator = [{
    total: "",
    operator: ""
}]
const regOpControlEnd = /[+\/*-]$/
btns.forEach(btn => btn.addEventListener("click", e => {
    const inputString = e.target.textContent;
    if (inputString == "0" || inputString == "1") {
        binaryDiv.textContent += inputString
        binaryCalculator[0].total = binaryDiv.textContent
        decimal()
    }
    if (inputString == "C") {
        reset()
    }
    if (e.target.id == "op") {
        if (!binaryDiv.textContent == "") {
            if (opStatus) {
                binaryCalculator[0].operator = inputString
                binaryDiv.textContent += inputString
                opStatus = false
            } else {
                equal()
            }
        }
    }
    if (inputString == "=") {
        equal()
    }
}))

const equal = () => {
    let result = 0;
    const find = binaryCalculator[0].total.indexOf(binaryCalculator[0].operator)
    const firstValue = parseInt(binaryCalculator[0].total.slice(0, find), 2)
    const secondValue = parseInt(binaryCalculator[0].total.slice(find + 1, binaryCalculator[0].total.length), 2)

    binaryCalculator[0].operator == "+" ? result = Number(firstValue) + Number(secondValue) : ""
    binaryCalculator[0].operator == "-" ? result = Number(firstValue) - Number(secondValue) : ""
    binaryCalculator[0].operator == "*" ? result = Number(firstValue) * Number(secondValue) : ""
    binaryCalculator[0].operator == "/" ? result = Number(firstValue) / Number(secondValue) : ""

    binaryDiv.textContent = result.toString(2)
    decimalDiv.textContent = result
    opStatus = true

}
const reset = () => {
    binaryDiv.textContent = ""
    binaryCalculator[0].total = ""
    binaryCalculator[0].operator = ""
    decimalDiv.textContent = ""
}

const decimal = () => {
    const find = binaryCalculator[0].total.indexOf(binaryCalculator[0].operator)
    const firstValue = parseInt(binaryCalculator[0].total.slice(0, find), 2)
    const secondValue = parseInt(binaryCalculator[0].total.slice(find + 1, binaryCalculator[0].total.length), 2)
    decimalDiv.textContent = `${firstValue ? firstValue : ""} ${binaryCalculator[0].operator ? binaryCalculator[0].operator : ""} ${secondValue ? secondValue : ""}`
}