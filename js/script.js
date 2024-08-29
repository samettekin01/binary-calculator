const binaryDiv = document.querySelector(".binary")
const decimalDiv = document.querySelector(".decimal")
const btns = document.querySelectorAll(".btn")
let opStatus = true

const binaryCalculator = {
    total: "",
    operator: ""
}
//Buttonları dinliyor.
btns.forEach(btn => btn.addEventListener("click", e => {
    const inputString = e.target.textContent;
    
    if (inputString == "0" || inputString == "1") {
        binaryDiv.textContent += inputString
        binaryCalculator.total = binaryDiv.textContent
        decimal()
    }

    if (e.target.id == "op") {
        if (!binaryDiv.textContent == "") {
            if (opStatus) {
                binaryCalculator.operator = inputString
                binaryDiv.textContent += inputString
                opStatus = false
            } else {
                equal()
            }
        }
    }

    if (inputString == "=") equal()
    if (inputString == "C") reset()
}))
//Seçilen matematisel veya bitwise operatörüne göre işlem yapıyor
const equal = () => {
    let result = 0;
    const decimalConvert = new decimalConverter()
    const decimalFirstValue = decimalConvert.firstValue()
    const decimalSecondValue = decimalConvert.secondValue()

    switch (binaryCalculator.operator) {
        case "+":
            result = decimalFirstValue + decimalSecondValue
            break;
        case "-":
            result = decimalFirstValue - decimalSecondValue
            break;
        case "*":
            result = decimalFirstValue * decimalSecondValue
            break;
        case "/":
            result = decimalFirstValue / decimalSecondValue
            break;
        case "&":
            result = decimalFirstValue & decimalSecondValue
            break;
        case "|":
            result = decimalFirstValue | decimalSecondValue
            break;
        case "^":
            result = decimalFirstValue ^ decimalSecondValue
            break;
        case "~":
            result = ~decimalFirstValue
            break;
        case "<<":
            result = decimalFirstValue << decimalSecondValue
            break;
        case ">>":
            result = decimalFirstValue >> decimalSecondValue
            break;
        case ">>>":
            result = decimalFirstValue >>> decimalSecondValue
            break;
        default:
            result = decimalFirstValue
    }
    binaryDiv.textContent = parseInt(result).toString(2)
    decimalDiv.textContent = parseInt(result)
    binaryCalculator.total = result.toString(2)
    binaryCalculator.operator = ""
    opStatus = true
}
//Binary değeri decimal değerine çeviriyor.
const decimal = () => {
    const decimalConvert = new decimalConverter()
    const firstValue = decimalConvert.firstValue()
    const secondValue = decimalConvert.secondValue()
    decimalDiv.textContent = `${firstValue ? firstValue : ""} ${binaryCalculator.operator ? binaryCalculator.operator : ""} ${secondValue ? secondValue : ""}`
    console.log(firstValue, secondValue)
}
//tüm değerleri sıfırlıyor
const reset = () => {
    binaryDiv.textContent = ""
    binaryCalculator.total = ""
    binaryCalculator.operator = ""
    decimalDiv.textContent = ""
}
//binaryCalculator object içindeki total özelliğindeki 1. ve 2. binary değerleri buluyor.
class decimalConverter {
    constructor() {
        this.find = binaryCalculator.operator !== "" ? binaryCalculator.total.indexOf(binaryCalculator.operator) : -1
    }
    firstValue() {
        return this.find !== -1 ? parseInt(binaryCalculator.total.slice(0, this.find), 2) : parseInt(binaryCalculator.total, 2)
    }
    secondValue() {
        return binaryCalculator.operator !== "" ? parseInt(binaryCalculator.total.slice(this.find + 1, binaryCalculator.total.length).replace(/\D/g, ""), 2) : ""
    }
}