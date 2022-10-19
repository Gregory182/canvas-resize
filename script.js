const button = document.getElementById('draw')
const downloadBtn = document.getElementById('download')
const canvas = document.getElementById('canvas')
const opacityVal = document.getElementById('opacityValue')
const imgSizeInput = document.getElementById('img-size')


let maxSize = imgSizeInput.value
let opacity = 1

const drawImageToCanvas = async (maxSize, alpha) => {
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

    const ptrn = ctx.createPattern(wm, 'repeat')

    ctx.fillStyle = ptrn;
    ctx.globalAlpha = alpha
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.drawImage(wm, 0, 0, 50, 50)
}


const reDraw = () => {
    drawImageToCanvas(maxSize, opacity)
}

const saveAsFile = () => {
    const link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;

}

function DownloadCanvasAsImage(){
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'CanvasAsImage.png');
    let canvas = document.getElementById('canvas');
    canvas.toBlob(function(blob) {
      let url = URL.createObjectURL(blob);
      downloadLink.setAttribute('href', url);
      downloadLink.click();
    });
}

button.addEventListener('click', () => reDraw())

opacityVal.addEventListener('input', (e) => {
    opacity = e.target.value;
    reDraw()
})

imgSizeInput.addEventListener('change', (e) => {
    maxSize = e.target.value
    reDraw()
})

downloadBtn.addEventListener('click',DownloadCanvasAsImage)
drawImageToCanvas(maxSize, opacity)