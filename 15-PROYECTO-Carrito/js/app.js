// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener( 'click', eliminarCurso )


    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos el arreglo

        limpiarHTML();
    })
}


// Funciones
function agregarCurso(e) {
    e.preventDefault();


    if( e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCursos(cursoSeleccionado);
    }   

}

//Elimina un curso del carrito 
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

    // elimina del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

    carritoHTML(); // Iterar sobre el carrito y mostrar su html
    }
}

//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCursos(curso) {
    // console.log(curso);

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // revisa si un elementi ya existe en el carrito
    const existe = articulosCarrito.some ( curso => curso.id === infoCurso.id);
    if(existe) {
        // Actializamos la cantidad
        const cursos = articulosCarrito.map ( curso => {
            if( curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        } );
        articulosCarrito = [...cursos];
    } else {
        //agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    // agrega elementos al arreglo de carrito
    // articulosCarrito = [...articulosCarrito, infoCurso];

    console.log(articulosCarrito);

    carritoHTML();
}

// Muestra el carrito de compras en el html
function carritoHTML() {

    // Limpiar el html
    limpiarHTML();

    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100" >
        </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td>
                <a href="#" class= "borrar-curso" data-id="${id}" > x </a>
            </td>
            
        ` ;

        // aGREGA EL HTML DEL ARRITO EN EL BODY
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los cursos dle tbody
    function limpiarHTML() {
    //Forma lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
    }