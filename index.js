// Nic Motta 
// 2021
// MURU7.8

let data;
let fileName;
let dX = [] 
let dY = []
let dZ = []

let ndX = [] 
let ndY = []
let ndZ = []


let offsetX, offsetY, offsetZ;
let nuevoindice = 0;

let gui;
var reduccion = 500;
var reduccionMin = 1;
var reduccionMax = 700;
var reduccionStep = 1;
var descargarArchivo = false;

var escala = 5;
var escalaMin = 1;
var escalaMax = 20;
var escalaStep = 1;

var nombreArchivo = '';

let nuevoCSV;

let tenemosArchivo = false;


function setup(){
    const c = createCanvas(windowWidth - 20, windowHeight - 20, WEBGL);
    c.drop(gotFile);
  
    // the simplest method to enable the camera
    createEasyCam();
  
    // suppress right-click context menu
    document.oncontextmenu = function() { return false; }

    gui = createGui('Parámetros');
    gui.addGlobals("reduccion", "escala", "nombreArchivo", "descargarArchivo");
    gui.setPosition(20, windowHeight * 0.15);

}


function gotFile(file) {
     data = loadTable(file.data, 'csv', preCarga);
   } 

    //tenemosArchivo = true;

function preCarga() {
    if (data.getColumnCount() == 3) {
    for (let index = 0; index < data.getRowCount(); index++) {
        dX[index] = data.getString(index, 0);
        dY[index] = data.getString(index, 1);
        dZ[index] = data.getString(index, 2);
        }
    }

    if (data.getColumnCount() >= 4) {
        for (let index = 0; index < data.getRowCount(); index++) {
            dX[index] = data.getString(index, 2);
            dY[index] = data.getString(index, 3);
            dZ[index] = data.getString(index, 4);
            }
        }

        //reduccionMin = parseInt((data.getRowCount() * 0.5) / 100);
        //reduccionMax = parseInt((data.getRowCount() * 5) / 100);

    tenemosArchivo = true;
}




function draw(){
    background(0);

    fill(255);
    stroke(255);


    if (tenemosArchivo == false) {
        document.getElementById("archivo").style.display = "display";
    }

    if (tenemosArchivo == true) {

    document.getElementById("archivo").style.display = "none";
    document.getElementById("filas").innerHTML = "Datos del archivo original: " + data.getRowCount();




    offsetX = dX[0];
    offsetY = dY[0];
    offsetZ = dZ[0];

    
    for (let index = 0; index < dX.length; index = index + reduccion) {

        point((dX[index] - offsetX) / escala, (dY[index] - offsetY) / escala, (dZ[index] - offsetZ) / escala);
    }
    

    nuevoindice = parseInt(dX.length / reduccion);
    document.getElementById("nuevasfilas").innerHTML = "Datos del nuevo archivo: " + nuevoindice;


    if (descargarArchivo==true & nombreArchivo != "" ) {

        guardarCSV();

        descargarArchivo = false;
    }

   nuevoCSV = new p5.Table();

   if (descargarArchivo==true & nombreArchivo == "") {
       alert("Por favor, colocar nombre al archivo.");
       descargarArchivo = false;
   }

}

}


function guardarCSV(){
    nuevoCSV.addColumn('x');
    nuevoCSV.addColumn('y');
    nuevoCSV.addColumn('z');

    

    for (let index = 0; index < dX.length; index = index + reduccion) {
        let newRow = nuevoCSV.addRow();
        newRow.setNum('x', (dX[index] - offsetX) / escala);
        newRow.setNum('y', (dY[index] - offsetY) / escala);
        newRow.setNum('z', (dZ[index] - offsetZ) / escala);
    }

    saveTable(nuevoCSV, nombreArchivo + ".csv");
    
}

