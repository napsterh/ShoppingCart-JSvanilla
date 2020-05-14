// Variables
const carrito = document.getElementById('carrito');
const curso = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritobtn = document.getElementById('vaciar-carrito');


//Listener
cargarEventListeners();

function cargarEventListeners(){
    // Dispara cuando se presiona agregar carrito
    curso.addEventListener('click', comprarCurso);

    //Cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Al vaciar el carrito
    vaciarCarritobtn.addEventListener('click', vaciarCarrito);

    //Al cargar elemento, mostrar de LocalStorage
    document.addEventListener('DOMContentLoaded', leerlocalStorage);

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
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso);
}


//muestra el curso seleccionado en el carrito

function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width="100">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;

    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}


// Elimina el curso del carrito en el DOM
function eliminarCurso(e){
    e.preventDefault();

    let curso,
    cursoId;
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id'); 
    }

    eliminarCursoLocalStorage(cursoId);
}

//Elimina los cursos del DOM
function vaciarCarrito(){
    //forma lenta
    //listaCursos.innerHTML = '';

    //forma rapida y recomendada
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    return false;
}

//almacena cursos del carrito a local storage

function guardarCursoLocalStorage(curso){
    let cursos;

    //Toma el valor de un arreglo con datos de LS o vacio
    cursos = obtenerCursoslocalStorage();
    
    //curso seleccionado se agrega al carrito
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos) );
}



//comprueba que haya elementos en local storage
function obtenerCursoslocalStorage() {
    let cursosLS;

    //comprobamos si hay algo en locaStorage
    if(localStorage.getItem('cursos') === null){
        cursosLS = [];
    }else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

//Impeime los cursos de localStorage en el carrito

function leerlocalStorage(){
    let cursosLS;

    cursosLS = obtenerCursoslocalStorage();

    cursosLS.forEach(function(curso){
        //construir el template
    
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;
        listaCursos.appendChild(row);

    });
}


//Elimina el curso por ID de LocalStorage

function eliminarCursoLocalStorage(curso){
    let cursosLS;
    
    cursosLS = obtenerCursoslocalStorage();

    cursosLS.forEach(function(cursoLS, index) {
        if(cursoLS.id === curso){
            cursosLS.splice(index, 1);
        }
    });

    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}