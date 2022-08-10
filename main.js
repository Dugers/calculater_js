const result = document.querySelector('.calculater__result')

const numberClick = e => {
    const num = Number(e.target.textContent)
    if (Number(result.textContent) == 0 && result.textContent[result.textContent.length - 1] != '.') {
        if (num != 0 && (!isNaN(result.textContent.slice(-1)))) {
            result.textContent = num
        }
    }
    else if (result.textContent.indexOf('|') == -1 || result.textContent.split('|').length % 2 == 0 || result.textContent.slice(-1) != '|'){
        result.textContent += num
    }
}

const actionClick = e => {
    const action = e.target.textContent
    const literals = ['+', '-', '*', '/']
    if (action == 'C') {
        result.textContent = "0"
    } else if (result.textContent != '0' && literals.indexOf(action) != -1) {
        if (literals.indexOf(result.textContent.slice(-1)) == -1) {
            result.textContent[result.textContent.length - 1] == '|' && ['*', '/'].indexOf(action) != -1 ? NaN : result.textContent += action
    }
    } else if (action == '|x|' && (literals.indexOf(result.textContent.slice(-1)) != -1 || (result.textContent.split('|').length % 2 == 0 && result.textContent.slice(-1) != '|')) && result.textContent.slice(-1) != '.') {
        result.textContent += '|'
    } else if (action == '.'){
        const words = result.textContent.replaceAll('-', '+').replaceAll('*', '+').replaceAll('/', '+').split('+')
        if (words[words.length - 1] != '' && words[words.length - 1].indexOf('.') == -1 && ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(result.textContent[result.textContent.length - 1]) != -1) {
            result.textContent += '.'
        }
    } else if (action == '='){
        const splitedToModules = result.textContent.split('|')
        let textForEval = ''
        if (splitedToModules.length % 2 == 0 && splitedToModules.length != 1) {
            isNaN(Number(result.textContent[result.textContent.length - 1])) ? splitedToModules.pop() : splitedToModules.push('')
        }
        splitedToModules.forEach((value, index) => {
            if (index != 0) {
                if (index % 2 == 1) {
                    textForEval += `Math.abs(${value}`
                } else {
                    textForEval += `)${value}`
                }
            } else {
                textForEval = value
            }
        })
        result.textContent = eval(textForEval)
    }
}

for (let i = 0; i < 10; i++) {
    const num = document.querySelector(`.calculater__numbers-${i}`)
    num.addEventListener('click', numberClick)
}

document.querySelectorAll('.calculater__actions').forEach(value => {
    value.addEventListener('click', actionClick)
})