video = ""
statusIF = ""
objects = []

function preload() {
    video = createVideo("video.mp4")
    video.hide()
}

function setup() {
    canvas = createCanvas(480, 300)
    canvas.center()
}
function draw() {
    image(video, 0, 0, 480, 300)
    if (statusIF != " ") {
        objectDetector.detect(video, gotResults)
        for (i = 0; i < objects.lenght; i++) {
            document.getElementById("status").innerHTML = "status igual: objetos detectados"
            document.getElementById("numberOfObject").innerHTML = "quantidade de objetos detectados: " + objects.lenght
            fill("#FF0000")
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill()
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width)
        }
    }
}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    }
    console.log(results)
    objects = results
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoad)
    document.getElementById("status").innerHTML = "status detectando objetos"
}
function modelLoad() {
    console.log("modelo carregado")
    status1 = true
    video.loop()
    video.speed(1)
    video.volume(0)
}