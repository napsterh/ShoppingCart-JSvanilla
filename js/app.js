// Variables
const carrito = document.getElementById('carrito');
const curso = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');


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
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso);
}


//muestra el curso seleccionado en el carrito

function insertarCarrito(infoCurso){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${infoCurso.imagen}" width="100">
        </td>
        <td>${infoCurso.titulo}</td>
        <td>${infoCurso.precio}</td>
        <td>
            <a href="#" class="borrar-curso data-id=${infoCurso.id}">X</a>
        </td>
    `;

    listaCursos.appendChild(row);
}