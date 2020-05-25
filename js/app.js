// Variables

const getCarrito = document.getElementById('carrito');
const getCurso = document.getElementById('lista-cursos');
const getListaCursos = document.querySelector('#lista-carrito tbody');
const getVaciarCarrito = document.getElementById('vaciar-carrito');


//Listener

loadEventListener();

function loadEventListener(){
    //disparar al presionar "agregar carrito"
    getCurso.addEventListener('click', buyCurso);

    //Eliminar un curso del carrito
    getCarrito.addEventListener('click', deleteCurso);

    //Vaciar el carrito
    getVaciarCarrito.addEventListener('click', cleanCarrito);

    //Al cargar, obtener los elementos del LS
    document.addEventListener('DOMContentLoaded', writeLocalStorage);

}

//Funciones
//Funcion para añadir el producto al carrito

function buyCurso(e){
    e.preventDefault();
    //Delegation para agregar al carrito
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        //Enviar los datos del curso seleccionado
        getDatosCurso(curso);
    }
}

// Lee los datos dle curso

function getDatosCurso(curso){
    const datosCurso = {
        imagen : curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        profesor: curso.querySelector('p').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id')
    }
    insertCarrito(datosCurso);
}

//muestra el curso seleccionado en el carrito

function insertCarrito(dataCurso){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${dataCurso.imagen}" width="100">
        </td>
        <td>${dataCurso.titulo}</td>
        <td>${dataCurso.profesor}</td>
        <td>${dataCurso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id=${dataCurso.id}>X</a>
        </td>
    `;

    getListaCursos.appendChild(row);

    //Giuardar en local Storage
    saveCourseLocalStorage(dataCurso);
}

// Elimina el curso del carrito en el DOM

function deleteCurso(e){
    e.preventDefault();

    let course;
    let idCurso;
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
    }

    deleteCourseLocalStorage(cursoId);
}

//Elimina los cursos del DOM
function cleanCarrito(){
    //forma rapida
    while(getListaCursos.firstChild){
        getListaCursos.removeChild(getListaCursos.firstChild);
    }

    //clean Local Storage
    cleanCourseLocalStorage();

    return false;

}

//almacena cursos del carrito a local storage
function saveCourseLocalStorage(dataCurso){

    let courses;

    //Tomar valores de local storage: vacio o con valores
    courses = getCourseLocalStorage();

    //curso seleciconado se agrega al carrito
    courses.push(dataCurso);

    localStorage.setItem('courses', JSON.stringify(courses) );

}

//comprueba que haya elementos en local storage
function getCourseLocalStorage(){
    let cursosLS;

    //comprobar si hay algo en localStorage
    if(localStorage.getItem('courses') === null){
        cursosLS = [];
    }else {
        cursosLS = JSON.parse(localStorage.getItem('courses'));
    }
    return cursosLS;
}

//Impeime los cursos de localStorage en el carrito

function writeLocalStorage(){
    let coursesLS;

    coursesLS = getCourseLocalStorage();

    coursesLS.forEach(function(courseLS) {
        // building template
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${courseLS.imagen}" width="100">
            </td>
            <td>${courseLS.titulo}</td>
            <td>${courseLS.profesor}</td>
            <td>${courseLS.precio}</td>
            <td>
            <a href="#" class="borrar-curso" data-id=${courseLS.id}>X</a>
            </td>
        `;
        getListaCursos.appendChild(row);
    })


}

//Elimina el curso por ID de LocalStorage

function deleteCourseLocalStorage(courseId){
    let coursesLS;

    //obetener el arreglo de cursos
    coursesLS = getCourseLocalStorage();

    //Iteramos comparando el curso a aliminar de DOM con el de LS
    coursesLS.forEach(function(courseLS, index) {
        if(courseLS.id === courseId){
            coursesLS.splice(index, 1);
        }
    });
    //Añadir valor actual a Local Storage
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}

//Elimina todos los cursos de loccalStorage

function cleanCourseLocalStorage(){
    localStorage.clear();
}
