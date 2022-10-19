const button = document.getElementById('draw')
const canvas = document.getElementById('canvas')
const opacityVal = document.getElementById('opacityValue')
const imgSizeInput = document.getElementById('img-size')



const drawImageToCanvas = (maxSize, alpha) => {
    const ctx = canvas.getContext('2d')
    const image = new Image()
    const wm = new Image()
    image.src = 'img/photo2.jpg'
    wm.src = 'img/wm2.png'
    
    let width = image.width
    let height = image.height

    if (width > height) {
        if (width > maxSize) {
            height *= maxSize / width
            width = maxSize
        }
    } else {
        if (height > maxSize) {
            width *= maxSize / height
            height = maxSize
        }
    }
    canvas.width = width
    canvas.height = height

    console.log(width, height)
    ctx.drawImage(image, 0, 0, width, height)
    
    const ptrn = ctx.createPattern(wm,'repeat')

    ctx.fillStyle = ptrn;
    ctx.globalAlpha = alpha
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.drawImage(wm, 0, 0, 50, 50)
}


let minVal = imgSizeInput.value
let opacity = 1
const reDraw = ()=>{

    drawImageToCanvas(minVal,opacity)
}

button.addEventListener('click', ()=> reDraw())
opacityVal.addEventListener('input',(e)=> {
    opacity=e.target.value;
    reDraw()
})

imgSizeInput.addEventListener('change', (e)=>{
    minVal=e.target.value
    reDraw()
})
drawImageToCanvas(minVal,opacity)