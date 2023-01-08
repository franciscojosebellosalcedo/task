/*CODIGO DE TAREAS*/
export function actualizarCantidadTareasHechas(tareas) {
  const cantidad_tareas_hechas = document.querySelector(".cantidad_tareas_hechas");
  cantidad_tareas_hechas.innerText = tareas.filter((tarea) => tarea.estado === true).length;
}
export function validarCamposNuevaTarea(selector, input_titulo, textarea_descripcion) {
  if (selector.value.toLowerCase() === "categoria".toLowerCase() || input_titulo.value === "" || textarea_descripcion.value === "") {
    return true;
  } else {
    return false;
  }
}
export function organizarTareas(tareas) {
  const btn_tareas_hechas = document.querySelector(".btn_tareas_hechas");
  const selector_modo_vista_tarea = document.getElementById("selector_categoria_tarea");
  const container_tareas = document.querySelector(".tareas");

  let filtro = [];
  if (btn_tareas_hechas.innerText === "Hechas") {
    if (selector_modo_vista_tarea.value === "todas") {
      filtro = tareas.filter((tarea) => tarea.estado === false);
      mostrarTareas(filtro, container_tareas);
      tareasNoEncontradas(filtro, "No hay tareas sin hacer", container_tareas);
    } else {
      filtro = tareas.filter((tarea) => tarea.estado === false && tarea.categoria === selector_modo_vista_tarea.value);
      mostrarTareas(filtro, container_tareas);
      tareasNoEncontradas(filtro, "No hay tareas sin hacer con esta categoria", container_tareas);
    }
  } else {
    if (selector_modo_vista_tarea.value === "todas") {
      filtro = tareas.filter((tarea) => tarea.estado === true);
      mostrarTareas(filtro, container_tareas);
      tareasNoEncontradas(filtro, "No hay tareas hechas", container_tareas);
    } else {
      filtro = tareas.filter((tarea) => tarea.estado === true && tarea.categoria === selector_modo_vista_tarea.value);
      mostrarTareas(filtro, container_tareas);
      tareasNoEncontradas(filtro, "No hay tareas hechas con esta categoria", container_tareas);
    }
  }
}
export function limpiarCamposTareaNueva(selector, input_titulo, textarea_descripcion) {
  selector.selectedIndex = 0;
  input_titulo.value = "";
  textarea_descripcion.value = "";
}
export function tareaNoRepetida(tareas, id_tarea_nueva) {
  return tareas.some((tarea) => tarea.id.toLowerCase() === id_tarea_nueva.toLowerCase());
}
export function agregarTarea(tareas, tarea_nueva) {
  let tamanioPrevio = tareas.length;
  tareas.unshift(tarea_nueva);
  if (tareas.length > tamanioPrevio) {
    return true;
  } else {
    return false;
  }
}
export function cambioEstadoChecked(tareas, btn_listar, selector) {
  const modal_editar = document.querySelector(".modal_editar");
  const modal_eliminar = document.querySelector(".modal_eliminar");
  const container_tareas = document.querySelector(".tareas");
  const input_checked = [...document.querySelectorAll(".tarea_marcada")];
  let filtro = [];
  input_checked.forEach((input) => {
    input.addEventListener("change", (e) => {
      let idInput = e.currentTarget.id;
      let indiceTareaEncontrada = tareas.findIndex((tarea) => tarea.id === idInput);
      tareas[indiceTareaEncontrada].estado = input.checked;
      guardarLocalStorage(tareas,"tareas");
      setTimeout(() => {
        if (btn_listar.innerText === "Hechas") {
          if (selector.value === "todas") {
            filtro = tareas.filter((tarea) => tarea.estado === false);
            mostrarTareas(filtro, container_tareas);
            tareasNoEncontradas(filtro, "No hay tareas sin hacer", container_tareas);
          }
          else {
            filtro = tareas.filter((tarea) => tarea.estado === false && selector.value === tarea.categoria);
            mostrarTareas(filtro, container_tareas);
            tareasNoEncontradas(filtro, "No hay tareas sin hacer con esta categoria", container_tareas);
          }
        } else {
          if (selector.value === "todas") {
            filtro = tareas.filter((tarea) => tarea.estado === true);
            mostrarTareas(filtro, container_tareas);
            tareasNoEncontradas(filtro, "No hay tareas hechas", container_tareas);
          } else {
            filtro = tareas.filter((tarea) => tarea.estado === true && selector.value === tarea.categoria);
            mostrarTareas(filtro, container_tareas);
            tareasNoEncontradas(filtro, "No hay tareas hechas con esta categoria", container_tareas);
          }
        }
        cambioEstadoChecked(tareas, btn_listar, selector);
        actualizarCantidadTareasHechas(tareas);
        eventoBotonesTarea(tareas, modal_editar, modal_eliminar);
      }, 110)
    });
  });
}
export function tareasNoEncontradas(array, mensaje, container_tareas) {
  if (array.length === 0) {
    const h1 = document.createElement("H1");
    h1.setAttribute("class", "aviso");
    h1.textContent = mensaje;
    container_tareas.appendChild(h1);
  }
}
export function mostrarTareas(tareas, contenedor) {
  contenedor.innerHTML = "";
  const fragmento = document.createDocumentFragment();
  tareas.map((tarea, i) => {
    const elementoTarea = document.createElement("LABEL");
    elementoTarea.setAttribute("class", "tarea")
    elementoTarea.setAttribute("indice", i)
    elementoTarea.setAttribute("id", tarea.descripcion.split(" ").join(""));
    elementoTarea.innerHTML = `
            <div class="tarea_info">
              <input for="tarea" type="checkbox" ${tarea.estado === true ? "checked" : ""}  class="tarea_marcada" id="${tarea.descripcion.split(" ").join("")}">
              <div class="container_info">
              <div class="tarea_titulos_info">
                  <h4 class="tarea_titulo info_tarea">${tarea.titulo}</h4>
                  <h4 class="tarea_fecha info_tarea">${tarea.fecha}</h4>
                  <h4 class="tarea_categoria info_tarea">${tarea.categoria}</h4>
              </div>
              <p class="descripcion">
                  ${tarea.descripcion}
              </p>
            </div>
        </div>
        <div class="tarea_acciones">
            <button class="btn btn_acciones btn_editar_tarea" id="${tarea.id}">
            <div class="btn_figura">
                <figure class="icon icon_acciones icon_editar"></figure>
            </div>
            
            </button>
            <button class="btn btn_acciones btn_eliminar_tarea" id="${tarea.id}">
            <div class="btn_figura">
                <figure class="icon icon_acciones icon_eliminar"></figure>
            </div>
            
            </button>
        </div>
        `;
    fragmento.appendChild(elementoTarea);
  });
  contenedor.appendChild(fragmento);
}
export function eventoBotonesTarea(tareas, modal_editar, modal_eliminar) {
  const arrayBotonesEditar = [...document.querySelectorAll(".btn_editar_tarea")];
  const btn_actualizar_tarea = document.querySelector(".btn_actualizar_tarea");
  const input_titulo_tarea_editar = document.getElementById("input_titulo_tarea_editar");
  const descripcion_tarea_editar = document.getElementById("descripcion_tarea_editar");

  const arrayBotonesEliminarTarea = [...document.querySelectorAll(".btn_eliminar_tarea")];
  const btn_modal_eliminar_tarea = document.querySelector(".btn_modal_eliminar_tarea");
  arrayBotonesEditar.map((boton) => {
    boton.addEventListener("click", (e) => {
      let tareaEncontrada = tareas.find((tarea) => tarea.id === e.currentTarget.id);
      input_titulo_tarea_editar.value = tareaEncontrada.titulo;
      descripcion_tarea_editar.value = tareaEncontrada.descripcion;
      btn_actualizar_tarea.setAttribute("id", e.currentTarget.id);
      mostrarModal(modal_editar);
    });
  });

  arrayBotonesEliminarTarea.map((boton) => {
    boton.addEventListener("click", (e) => {
      btn_modal_eliminar_tarea.setAttribute("id", e.currentTarget.id);
      mostrarModal(modal_eliminar);
    });
  });

}
export function validarCamposEditar(input_titulo, textarea_descripcion) {
  if (input_titulo.value === "" || textarea_descripcion.value === "") {
    return true;
  } else {
    return false;
  }
}
export function editarTarea(tareas, id_tarea, id_nuevo, titulo_nuevo, descripcion_nueva) {
  let filaAfectada = 0;
  tareas.map((tarea) => {
    if (id_tarea === tarea.id) {
      tarea.id = id_nuevo.split(" ").join("");
      tarea.titulo = titulo_nuevo.value;
      tarea.descripcion = descripcion_nueva.value;
      filaAfectada++;
      console.log(tareas);
    }
  });
  if (filaAfectada > 0) {
    return true;
  } else {
    return false;
  }
}
export function eliminarTarea(tareas, id_tarea) {
  let tamanioPrevio = tareas.length;
  tareas.map((tarea, i) => {
    if (tarea.id === id_tarea) {
      tareas.splice(i, 1);
    }
  });
  if (tareas.length < tamanioPrevio) {
    return true;
  } else {
    return false;
  }
};
/* CODIGO PARA EL RECICLAJE DE LAS TAREAS*/
export function agregarTareaAlReciclaje(reciclajeTareas, tarea) {
  reciclajeTareas.push(tarea);
}
export function cantidadTareasReciclas(reciclaje, nodoTexto) {
  nodoTexto.innerText = reciclaje.length;
}
export function mostrarTareasRecicladas(contenedor, tareasRecicladas) {
  contenedor.innerHTML = "";
  const fragmento = document.createDocumentFragment();
  tareasRecicladas.map((tarea) => {
    const elementoTarea = document.createElement("LABEL");
    elementoTarea.setAttribute("class", "tarea")
    elementoTarea.setAttribute("id", tarea.descripcion.split(" ").join(""));
    elementoTarea.innerHTML = `
    <div class="tarea_info">
    <input for="tarea" type="checkbox"  ${tarea.estado === true ? "checked" : ""}  class="tarea_marcada" id="${tarea.descripcion.split(" ").join("")}">
    <div class="container_info">
    <div class="tarea_titulos_info">
    <h4 class="tarea_titulo">${tarea.titulo}</h4>
    <h4 class="tarea_fecha">${tarea.fecha}</h4>
    <h4 class="tarea_categoria">${tarea.categoria}</h4>
    </div>
    <p class="descripcion">
    ${tarea.descripcion}
    </p>
    </div>
    </div>
    <div class="tarea_acciones">
    <button class="btn btn_acciones btn_restaurar_tarea" id="${tarea.id}">
    <div class="btn_figura">
    <figure class="icon icon_acciones icon_restaurar"></figure>
    </div>
    </div>
    `;
    fragmento.appendChild(elementoTarea);
  });
  contenedor.appendChild(fragmento);
}
export function restaurarTareas(reciclajeTareas, tareas) {
  for (let i = reciclajeTareas.length - 1; i >= 0; i--) {
    tareas.push(reciclajeTareas[i]);
    reciclajeTareas.splice(i, 1);
  }
  console.log(reciclajeTareas);
  console.log(reciclajeTareas.length);
  if (reciclajeTareas.length === 0) {
    return true;
  } else {
    return false;
  }
}
export function eliminarTareasPermanente(reciclajeTareas) {
  for (let i = reciclajeTareas.length - 1; i >= 0; i--) {
    reciclajeTareas.splice(i, 1);
  }
  if (reciclajeTareas.length === 0) {
    return true;
  } else {
    return false;
  }
}
export function eventoBotonesRestaurarTarea(reciclajeTareas, tareas) {
  const arrayBotones = [...document.querySelectorAll(".btn_restaurar_tarea")];
  const modal_mensaje = document.querySelector(".modal_mensaje");
  const modal_mensaje_mensaje = document.querySelector(".modal_mensaje_mensaje");
  const cantidad_tareas_recicladas = document.querySelector(".cantidad_tareas_recicladas");
  const reciclaje = document.querySelector(".reciclaje");
  const btn_tareas_hechas = document.querySelector(".btn_tareas_hechas");
  const selector_modo_vista_tarea = document.getElementById("selector_categoria_tarea");
  const container_tareas = document.querySelector(".tareas");
  const modal_eliminar = document.querySelector(".modal_eliminar");
  const modal_editar = document.querySelector(".modal_editar");

  arrayBotones.map((boton) => {
    boton.addEventListener("click", (e) => {
      let tamanioActual = reciclajeTareas.length;
      reciclajeTareas.map((tareaR, i) => {
        if (tareaR.id === e.currentTarget.id) {
          tareas.push(tareaR);
          reciclajeTareas.splice(i, 1);
        }
      });

      if (tamanioActual > reciclajeTareas.length) {
        modal_mensaje_mensaje.innerText = "Tarea restaurada exitosamente";
        mostrarModal(modal_mensaje);
        guardarLocalStorage(tareas,"tareas");
        guardarLocalStorage(reciclajeTareas,"reciclajeTareas");
        let filtro = [];
        if (btn_tareas_hechas.innerText === "Hechas") {
          if (selector_modo_vista_tarea.value === "todas") {
            filtro = tareas.filter((tarea) => tarea.estado === false);
            mostrarTareas(filtro, container_tareas);
            tareasNoEncontradas(filtro, "No hay tareas sin hacer", container_tareas);
          } else {
            filtro = tareas.filter((tarea) => tarea.estado === false && tarea.categoria === selector_modo_vista_tarea.value);
            mostrarTareas(filtro, container_tareas);
            tareasNoEncontradas(filtro, "No hay tareas sin hacer con esta categoria", container_tareas);
          }
        } else {
          if (selector_modo_vista_tarea.value === "todas") {
            filtro = tareas.filter((tarea) => tarea.estado === true);
            mostrarTareas(filtro, container_tareas);
            tareasNoEncontradas(filtro, "No hay tareas hechas", container_tareas);
          } else {
            filtro = tareas.filter((tarea) => tarea.estado === true && tarea.categoria === selector_modo_vista_tarea.value);
            mostrarTareas(filtro, container_tareas);
            tareasNoEncontradas(filtro, "No hay tareas hechas con esta categoria", container_tareas);
          }
        }
      } else {
        modal_mensaje_mensaje.innerText = "No se pudo restaurar la tarea";
        mostrarModal(modal_mensaje);
      }

      cambioEstadoChecked(tareas, btn_tareas_hechas, selector_modo_vista_tarea);
      eventoBotonesTarea(tareas, modal_editar, modal_eliminar);
      actualizarCantidadTareasHechas(tareas);
      cantidadTareasReciclas(reciclajeTareas, cantidad_tareas_recicladas);
      mostrarTareasRecicladas(reciclaje, reciclajeTareas);
      eventoBotonesRestaurarTarea(reciclajeTareas, tareas);
    });
  });
}
/* CODIGO PARA EL RECICLAJE DE LAS CATEGORIAS*/
export function agregarCategoriaAlReciclaje(reciclajeCategorias, categoria) {
  reciclajeCategorias.push(categoria);
}
export function mostrarCategoriasRecicladas(contenedor, reciclajeCategorias) {
  contenedor.innerHTML = "";
  const fragmento = document.createDocumentFragment();
  reciclajeCategorias.map((cat) => {
    const divCategoria = document.createElement("DIV");
    divCategoria.setAttribute("class", "cat");
    divCategoria.innerHTML = `
      <p class="categoria_titulo">${cat}</p>
      <div class="categoria_acciones">
        <button title="btn" class="btn btn_acciones btn_acciones_categorias btn_restaurar_categoria" id="${cat}" type="button">
          <figure class="icon icon_acciones icon_restaurar"></figure>
        </button>
      </div>
    `;
    fragmento.appendChild(divCategoria);
  });
  contenedor.appendChild(fragmento);
}
export function restablecerCategorias(reciclajeCategorias, categorias) {
  reciclajeCategorias.map((cat) => {
    categorias.push(cat);
  });
  reciclajeCategorias.length = 0;
  if (reciclajeCategorias.length === 0) {
    return true;
  } else {
    return false;
  }
}
export function eliminarCategoriasPermanente(reciclajeCategorias) {
  reciclajeCategorias.length = 0;
  if(reciclajeCategorias.length===0) return true;
  else return false;
}
export function eventoBotonesRestaurarCategoria(reciclajeCategorias, categorias) {
  const arrayBotones = [...document.querySelectorAll(".btn_restaurar_categoria")];
  const selector_modo_vista_tarea = document.getElementById("selector_categoria_tarea");
  const container_categorias = document.querySelector(".categorias");
  const selector_formulario = document.getElementById("selector_categoria");
  const cantidad_categorias_recicladas = document.querySelector(".cantidad_categorias_recicladas");
  const reciclaje = document.querySelector(".reciclaje");
  const modal_mensaje = document.querySelector(".modal_mensaje");
  const modal_mensaje_mensaje = document.querySelector(".modal_mensaje_mensaje");

  arrayBotones.map((boton) => {
    boton.addEventListener("click", (e) => {
      reciclajeCategorias.map((cat, i) => {
        if (cat.toLowerCase() === e.currentTarget.id.toLowerCase()) {
          categorias.push(cat);
          reciclajeCategorias.splice(i, 1);
          modal_mensaje_mensaje.innerText = "Categoria restaurada exitosamente";
          mostrarModal(modal_mensaje);
          mostrarCategorias(filtroCategorias(categorias).filter((categoria) => categoria !== "categoria"), container_categorias);
          agregarOptionSelectores(categorias, selector_modo_vista_tarea);
          agregarOptionSelectores(filtroCategorias(categorias), selector_formulario);
          mostrarCategoriasRecicladas(reciclaje, reciclajeCategorias);
          cantidadCategoriasRecicladas(reciclajeCategorias, cantidad_categorias_recicladas);
          eventoBotonesEliminarCategoria();
          guardarLocalStorage(reciclajeCategorias,"reciclajeCategorias");
          guardarLocalStorage(categorias,"categorias");
        }
      });
      eventoBotonesRestaurarCategoria(reciclajeCategorias, categorias);
    });
  });
}
export function cantidadCategoriasRecicladas(reciclajeCategorias, nodoCantidadCategoias) {
  nodoCantidadCategoias.innerText = reciclajeCategorias.length;
}
/* CODIGO PARA ELIMINAR Y RESTABLECER TODO  DEL RECICLAJE */
export function eliminarTodo(reciclajeTareas, reciclajeCategorias) {
  reciclajeTareas.length=0;
  reciclajeCategorias.length=0;

  if(reciclajeTareas.length===0 && reciclajeCategorias.length===0) return true;
  else return false;
}
export function restaurarTodo(reciclajeTareas, reciclajeCategorias, tareas, categorias) {
  reciclajeTareas.map((tareaReciclada)=>{
    tareas.push(tareaReciclada);
  });
  reciclajeCategorias.map((categoriaReciclada)=>{
    categorias.push(categoriaReciclada);
  });
  reciclajeTareas.length=0;
  reciclajeCategorias.length=0;
  
  if(reciclajeTareas.length===0 && reciclajeCategorias.length===0) return true;
  else return false;
}
/*MENU RECICLAJE*/
export function mostrarMenuReciclaje(menu) {
  menu.classList.toggle("mostrar_menu_reciclaje");
}
/*CODIGO PARA MOSTRAR LA FECHA */
export function mostrarFechaActual(nodoFecha) {
  let dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
  let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  setInterval(() => {
    const fecha = new Date();
    let dia = dias[fecha.getDay() - 1];
    let diaNumero = fecha.getDate().toString();
    let mes = meses[fecha.getMonth()];
    let anio = fecha.getFullYear();
    if (diaNumero.length < 2) {
      diaNumero = diaNumero.padStart(2, "0");
    }
    nodoFecha.innerText = dia + " " + diaNumero + " " + mes + " del " + anio;
  }, 1000);
}
/*CODIGO DE LAS CATEGORIAS*/
export function agregarCategoria(categorias, nombre_categoria_nueva) {
  let tamañoPrevio = categorias.length;
  nombre_categoria_nueva = nombre_categoria_nueva.trim();
  categorias.push(nombre_categoria_nueva);
  if (categorias.length > tamañoPrevio) {
    return true;
  } else {
    return false;
  }
}
export function limpiarCampoCategoriaNueva(input_nueva_categoria) {
  input_nueva_categoria.value = "";
}
export function categoriaNoRepetida(categorias, nombre_categoria_nueva) {
  nombre_categoria_nueva = nombre_categoria_nueva.trim();
  return categorias.some((categoria) => categoria.toLowerCase() === nombre_categoria_nueva.toLowerCase());
}
export function validarCampoNuevaCategoria(input_nueva_categoria) {
  if (input_nueva_categoria.value === "") {
    return true;
  } else {
    return false;
  }
}
export function filtroCategorias(categorias) {
  let filtroCategoria = categorias.filter((categoria) => categoria !== "todas");
  filtroCategoria.unshift("categoria");
  return filtroCategoria;
}
export function agregarOptionSelectores(categorias, selector) {
  selector.innerHTML = "";
  categorias.map((categoria) => {
    const option = document.createElement("OPTION");
    option.innerText = categoria;
    option.setAttribute("value", categoria);
    selector.appendChild(option);
  });
}
export function mostrarCategorias(categorias, container_categorias) {
  container_categorias.innerHTML = "";
  categorias.map((categoria) => {
    const nodoCategoria = document.createElement("DIV");
    nodoCategoria.setAttribute("class", "categoria");
    nodoCategoria.innerHTML = `
      <p class="categoria_nombre">${categoria}</p>
      <button class="btn btn_acciones  btn_eliminar_categoria" id="${categoria}">
        <figure class="icon icon_acciones icon_eliminar"></figure>
      </button>
    `;
    container_categorias.appendChild(nodoCategoria);
  });
}
export function eliminarCategoria(categorias, cat) {
  let tamanioActual = categorias.length;
  categorias.map((categoria, i) => {
    if (categoria.toLowerCase() === cat.toLowerCase()) {
      categorias.splice(i, 1);
    }
  });
  if (categorias.length < tamanioActual) {
    return true;
  } else {
    return false;
  }
}
export function eventoBotonesEliminarCategoria() {
  const arrayBotones = [...document.querySelectorAll(".btn_eliminar_categoria")];
  const btn_modal_eliminar_categoria = document.querySelector(".btn_modal_eliminar_categoria");
  const modal_eliminar_categoria = document.querySelector(".modal_eliminar_categoria");

  arrayBotones.map((boton) => {
    boton.addEventListener("click", (e) => {
      btn_modal_eliminar_categoria.setAttribute("id", e.currentTarget.id);
      mostrarModal(modal_eliminar_categoria);
    });
  });
}
/*CODIGO MODALES */
export function mostrarModal(modal) {
  modal.classList.add("mostrar_modal");
}
export function cerrarModal(modal) {
  modal.classList.remove("mostrar_modal");
}
/*CODIGO LOCAL STORANGE */
export function guardarLocalStorage(array,nombrePropiedad) {
  localStorage.setItem(nombrePropiedad,JSON.stringify(array));
}
export function obtenerLocalStorage(propiedad) {
  let data=localStorage.getItem(propiedad);
  if(data){
    return JSON.parse(data);
    
  }
}
export function existenciaDeDatosLocal(propiedad) {
  const data=localStorage.getItem(propiedad);
  if(data){
    return true;
  }else{
    return false;
  }
}