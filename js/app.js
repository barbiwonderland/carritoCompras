// Selecciono los elementos del DOM
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito")
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();

// Llamo a los events Listeners
function cargarEventListeners()  {
     listaCursos.addEventListener("click",agregarCurso);
    //  Elimina cursos del carrito
    carrito.addEventListener("click",eliminarCurso);
  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click",()=>{
     articulosCarrito=[];
     vaciarCarrito();// Eliminamos todo el html

  })
}



// Funciones de los Event Listeners

//Funcion que añade curso al carrito
function agregarCurso  (e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")){
        const cursoSeleccionado = e.target.parentElement.parentElement;
       leerDatosCurso(cursoSeleccionado);
        }   
}

// Leer contenido HTML al que le damos click
function leerDatosCurso(curso) {
// Llamo a Curso por que es la variable que se le pasa a "LeerDatosCurso"
const infoCurso ={
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio:curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad:1,
}
//Revisa si un elemento ya existe en el carrito( esta repetido)
if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
    const cursos = articulosCarrito.map( curso => {
         if( curso.id === infoCurso.id ) {
              curso.cantidad++;
               return curso;
          } else {
               return curso;
       }
    })
    articulosCarrito = [...cursos];
}  else {
    articulosCarrito = [...articulosCarrito, infoCurso];
}

console.log(articulosCarrito)

carritoHTML();
}


//Funcion elimina datos del curso
function eliminarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso') ) {
         // e.target.parentElement.parentElement.remove();
         const cursoId = e.target.getAttribute('data-id')
         
         // Eliminar del arreglo del carrito
         articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

         carritoHTML();
    }
}

// Muestra CarritoCompras en Html, llamo al arreglo al princiipio, despueés creo una variable curso para representar cada elemento.

function carritoHTML (){
// Limpiar el HTML
vaciarCarrito();

    // Recorre el Carrito y genera el HTML, también se puede hacer con un map
    articulosCarrito.forEach((curso)=>{
        // opcional, Desestucturación, no tengo que poner curso.titulo...contenedorCarrito.
        // const {imagen,titulo,precio,cantidad,id}= curso
        const row = document.createElement("tr");
        row.innerHTML =`
        <td>
        <img src="${curso.imagen}" width=100 >  </td>
        <td> ${curso.titulo}</td>
        <td> ${curso.precio}</td>
        <td>${curso.cantidad} </td>
        <td> 
        <a href"#" class="borrar-curso" data-id=${curso.id}>X</a> </td>
        `;
// Agrega el contenido del Carrito en el tbody
        contenedorCarrito.appendChild(row);

    });

}
// Elimina los cursos del tbody
function vaciarCarrito(){
    // FormaLenta
    // contenedorCarrito.innerHTML="";
    // While va a ir eliminado los hijos del elemento padre hasta que no tiene mas hijos
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}



