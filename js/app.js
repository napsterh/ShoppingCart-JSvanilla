// Variables
const carrito = document.getElementById('carrito');
const curso = document.getElementById('lista-cursos');


//Listener




//funciones
cargarEventListeners();

function cargarEventListeners(){
    // Dispara cuando se presiona agregar carrito
    curso.addEventListener('click', comprarCurso)
}



//Funciones
//Funcion que añade el curso al carrito

function comprarCurso(e){
    e.preventDefault();
// Delegation para agregar al carrito
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        //Enviamos los sursos seleccionados para tomar sus datos
        leerDatosCurso(curso);
    }
}


// Lee los datos dle curso

function leerDatosCurso(curso){
    console.log(curso);
}
