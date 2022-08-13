

window.onload = () => {
    mainFn()
}
const audio = new Audio('./audio/tune.wav')
let color_array = [
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

const presetArray = new Array(8)

const mainFn = () => {
    const randonBtn = document.querySelector('#randomBtn')
    const bg_color_display = document.querySelector('#bg_color')
    const rgb_input = document.querySelector('#rgb_input')
    const hex_input = document.querySelector('#hex_input')
    const copyBtn = document.querySelector('#copyBtn')
    const node = document.getElementsByName('radio-mode')
    const red_range = document.querySelector('#red_range')
    const green_range = document.querySelector('#green_range')
    const blue_range = document.querySelector('#blue_range')
    const preset_mainDiv = document.querySelector('#preset_mainDiv')
    const savePreset = document.querySelector('#savePreset')
    const saveBtn = document.querySelector('#saveBtn')



    randonBtn.addEventListener('click', display_handelar(bg_color_display, hex_input, rgb_input))
    copyBtn.addEventListener('click', copyBtn_handelar(node))
    hex_input.addEventListener('keyup', hex_input_handelar(bg_color_display, rgb_input))
    saveBtn.addEventListener('click', presetHandelar(savePreset))

    red_range.addEventListener('change', rangeHandelarFn)
    green_range.addEventListener('change', rangeHandelarFn)
    blue_range.addEventListener('change', rangeHandelarFn)

    default_utility(bg_color_display, savePreset)
    generate_preset(preset_mainDiv, color_array)

}

const presetHandelar = (savePreset) => {
    return () => {
        const hex_input = `#${ document.querySelector('#hex_input').value }`

        if (presetArray.includes(hex_input)) {
            alert('The color is alrady assigned')
            return
        } else {
            presetArray.unshift(hex_input)
            if (presetArray.length >= 8) {
                presetArray.pop()
            }

            removeElement(savePreset)
            generate_preset(savePreset, presetArray)
            localStorage.setItem('color', JSON.stringify(presetArray))
        }
    }
}

/**
 * remove all elemenChild from parent div
 * @param {node} parent 
 */
const removeElement = (parent) => {
    let child = parent.lastElementChild
    while (child) {
        parent.removeChild(child)
        child = parent.lastElementChild
    }
}

/**
 * generate color preset single div 
 * @param {array} color 
 */
const createDiv = (color) => {
    let div = document.createElement('div')
    div.setAttribute('data-color', color)
    div.style.backgroundColor = color
    div.className = 'setColor'


    div.addEventListener('click', () => {
        navigator.clipboard.writeText(color)
        audio.volume = .4
        audio.play()
    })
    return div
}

/**
 * 
 * @param {object} parent 
 * @param {array} color 
 */
const generate_preset = (parent, color) => {
    color.forEach((color) => {
        if (color) {
            let make_div = createDiv(color)
            parent.appendChild(make_div)
        }
    })
}




/**
 * range handelar with object
 */
let rangeHandelarFn = () => {
    let color = {
        red: parseInt(red_range.value),
        green: parseInt(green_range.value),
        blue: parseInt(blue_range.value)
    }
    update_color_label(color)
}

const update_color_label = ({ red, green, blue }) => {
    document.querySelector('.red_label').innerHTML = red
    document.querySelector('.green_label').innerHTML = green
    document.querySelector('.blue_label').innerHTML = blue

    let rgb = `(${ red }, ${ green }, ${ blue })`
    document.querySelector('#rgb_input').value = rgb


    let hex = `${ red.toString(16) }${ green.toString(16) }${ blue.toString(16) }`

    document.querySelector('#hex_input').value = hex
    document.querySelector('#bg_color').style.backgroundColor = `#${ hex }`

}

/**
 * hax input handelar
 * @param {string} bg_color_display 
 * @param {string} rgb_input 
 * @returns 
 */
const hex_input_handelar = (bg_color_display, rgb_input) => {
    return (e) => {
        let hex_color = e.target.value

        if (isValid(hex_color)) {
            bg_color_display.style.backgroundColor = `#${ hex_color }`
            rgb_input.value = `(${ generate_decimol_color(hex_color) })`
        }
    }
}
/**
 * copy color handelar
 * @param {node} node 
 * @returns (hex or rgb)
 */
const copyBtn_handelar = (node) => {
    return () => {
        let checkValue = null
        for (let i = 0; i < node.length; i++) {
            if (node[i].checked) {
                checkValue = node[i].value
            }
        }

        copy_color(checkValue)
    }
}

/**
 * 
 * @param {string} checkValue 
 */
const copy_color = (checkValue) => {
    const rgb_input = document.querySelector('#rgb_input')
    const hex_input = document.querySelector('#hex_input')

    if (!checkValue) alert('please select color mode')

    if (checkValue === 'rgb') {
        if (rgb_input.value) {
            navigator.clipboard.writeText(`rgb${ rgb_input.value }`)
            audio.volume = .4
            audio.play()
        }
    }

    if (checkValue === 'hex') {
        if (hex_input.value) {
            navigator.clipboard.writeText(`#${ hex_input.value }`)
            audio.volume = .4
            audio.play()
        }
    }
}

const display_handelar = (bg_color_display, hex_color, rgb_input) => {
    return function () {
        const color = genarate_Hex()

        if (isValid(color)) {
            bg_color_display.style.backgroundColor = `#${ color }`
            hex_color.value = color
            rgb_input.value = `(${ generate_decimol_color(color) })`

        }
    }
}

/**
 * generate hex color 
 * @return (valid color with validation)
 */
let genarate_Hex = () => {
    const red = Math.round(Math.random() * 255)
    const green = Math.round(Math.random() * 255)
    const blue = Math.round(Math.random() * 255)


    const color = `${ red.toString(16) }${ green.toString(16) }${ blue.toString(16) }`
    const check_color = color.length !== 6 ? `0${ color }` : `${ color }`

    return check_color.toUpperCase()
}

//generate decimal color code
/**
 * 
 * @param {string} color 
 */
const generate_decimol_color = (color) => {
    const red = parseInt(color.slice(0, 2), 16)
    const green = parseInt(color.slice(2, 4), 16)
    const blue = parseInt(color.slice(4, 6), 16)

    const decimal_color = `${ red }, ${ green }, ${ blue }`

    return decimal_color
}

/**
 * all default system will done here
 * @param {string} bg_color_display 
 */
const default_utility = (bg_color_display, savePreset) => {
    const storageColor = JSON.parse(localStorage.getItem('color'))
    generate_preset(savePreset, storageColor)
    bg_color_display.style.backgroundColor = `#F19F68`
}


/**
 * 
 * @param {string} color 
 * @returns 
 */
let isValid = (color) => {
    if (color.length !== 6) return false
    return /^[0-9A-Fa-f]{6}$/i.test(color)
}