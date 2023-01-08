let tareas = [];
let categorias = [
  "todas",
]
let reciclajeTareas = [];
let reciclajeCategorias = [];
let aux = 0;
/*
importamos las funciones que exportamos en el archivo controles.js para ejecurtalas en el index.js en cada evento
*/
import {
  mostrarTareas, actualizarCantidadTareasHechas, cambioEstadoChecked, agregarOptionSelectores, filtroCategorias,
  mostrarCategorias, mostrarModal, cerrarModal, agregarCategoria, limpiarCampoCategoriaNueva, validarCampoNuevaCategoria,
  categoriaNoRepetida, mostrarFechaActual, agregarTarea, limpiarCamposTareaNueva, tareaNoRepetida, validarCamposNuevaTarea,
  eventoBotonesTarea, editarTarea, validarCamposEditar, tareasNoEncontradas, eliminarTarea, agregarTareaAlReciclaje,
  mostrarTareasRecicladas, cantidadTareasReciclas, mostrarMenuReciclaje, eventoBotonesRestaurarTarea, restaurarTareas, organizarTareas,
  eliminarTareasPermanente, eventoBotonesEliminarCategoria, eliminarCategoria, agregarCategoriaAlReciclaje, 
  mostrarCategoriasRecicladas,cantidadCategoriasRecicladas, eventoBotonesRestaurarCategoria, restablecerCategorias, 
  eliminarCategoriasPermanente, eliminarTodo, restaurarTodo,guardarLocalStorage, obtenerLocalStorage,existenciaDeDatosLocal
} from "./controles.js";

document.addEventListener("DOMContentLoaded", () => {
  /*ELEMENTOS DEL DOCUMENTO HTML 
  los obtnemos todos para hacaer su respectivo uso
  */
  //elemento o nodo donde se muestra la fecha actual
  const nodo_fecha = document.querySelector(".fecha");
  //nodos o elementos del formulario de tareas 
  const btn_agregar_tarea = document.querySelector(".btn_agregar_tarea");
  const selector_categoria = document.getElementById("selector_categoria");
  const input_titulo_tarea = document.getElementById("input_titulo_tarea");
  const textarea_descripcion_tarea = document.getElementById("textarea_descripcion_tarea");
  //nods o elementos donde el usuario podra visualizar las tareas 
  const container_tareas = document.querySelector(".tareas");
  const btn_tareas_hechas = document.querySelector(".btn_tareas_hechas");
  const selector_modo_vista_tarea = document.getElementById("selector_categoria_tarea");
  const selector_formulario = document.getElementById("selector_categoria");
  //nodos o elementos donde se administran las categorias (modal)
  const container_categorias = document.querySelector(".categorias");
  const modal_categorias = document.querySelector(".modal_categorias");
  const btn_ver_categorias = document.querySelector(".btn_ver_categorias");
  const salir_modal_categorias = document.querySelector(".salir_modal_categorias");
  //nodos o elementos donde mostrar mensaje de las operaciones (modal)
  const modal_mensaje = document.querySelector(".modal_mensaje");
  const modal_mensaje_mensaje = document.querySelector(".modal_mensaje_mensaje");
  const salir_modal_mensaje = document.querySelector(".salir_modal_mensaje");
  //nodos o elementos donde se podra editar un tarea (modal)
  const modal_editar = document.querySelector(".modal_editar");
  const salir_modal_editar_tarea = document.querySelector(".salir_modal_editar_tarea");
  const btn_cancelar_editar = document.querySelector(".btn_cancelar_editar");
  const btn_actualizar_tarea = document.querySelector(".btn_actualizar_tarea");
  //nodos o elementos donde se podra eliminar una tarea (modal)
  const modal_eliminar = document.querySelector(".modal_eliminar");
  const btn_cancelar_eliminar = document.querySelector(".btn_cancelar_eliminar");
  const btn_cancelar_eliminar_categoria = document.querySelector(".btn_cancelar_eliminar_categoria");
  const salir_modal_eliminar = document.querySelector(".salir_modal_eliminar");
  const salir_modal_eliminar_categoria = document.querySelector(".salir_modal_eliminar_categoria");
  const btn_modal_eliminar_tarea = document.querySelector(".btn_modal_eliminar_tarea");
  //nodos o elementos donde podremos agregar nueva tarea
  const btn_agregar_categoria = document.querySelector(".btn_agregar_categoria");
  const input_categoria_nueva = document.getElementById("input_categoria_nueva");

  const input_titulo_tarea_editar = document.getElementById("input_titulo_tarea_editar");
  const descripcion_tarea_editar = document.getElementById("descripcion_tarea_editar");

  const btn_reciclaje = document.querySelector(".btn_reciclaje");
  const modal_reciclaje = document.querySelector(".modal_reciclaje");
  const modal_eliminar_categoria = document.querySelector(".modal_eliminar_categoria");
  const salir_modal_reciclaje = document.querySelector(".salir_modal_reciclaje");
  const icon_menu_admin = document.querySelector(".icon_menu_admin");
  const menu_administracion = document.querySelector(".menu_administracion");
  const reciclaje = document.querySelector(".reciclaje");
  const cantidad_tareas_recicladas = document.querySelector(".cantidad_tareas_recicladas");
  const btn_eliminar_tareas = document.querySelector(".btn_eliminar_tareas");
  const btn_restablecer_tareas = document.querySelector(".btn_restablecer_tareas");
  const btn_mostrar_tareas_reciclaje = document.querySelector(".btn_mostrar_tareas_reciclaje");
  const btn_mostrar_categoria_reciclaje = document.querySelector(".btn_mostrar_categoria_reciclaje");
  const btn_modal_eliminar_categoria = document.querySelector(".btn_modal_eliminar_categoria");
  const cantidad_categorias_recicladas = document.querySelector(".cantidad_categorias_recicladas");
  const btn_restablecer_categorias = document.querySelector(".btn_restablecer_categorias");
  const btn_eliminar_categorias = document.querySelector(".btn_eliminar_categorias");
  const btn_restablecer_todo = document.querySelector(".btn_restablecer_todo");
  const btn_eliminar_todo = document.querySelector(".btn_eliminar_todo");

  if(existenciaDeDatosLocal("tareas")===true){
    tareas = obtenerLocalStorage("tareas");
  }else{
    guardarLocalStorage(tareas, "tareas");
    tareas = obtenerLocalStorage("tareas");
  }

  if(existenciaDeDatosLocal("reciclajeTareas")===true){
    reciclajeTareas = obtenerLocalStorage("reciclajeTareas");
  }else{
    guardarLocalStorage(reciclajeTareas, "reciclajeTareas");
    reciclajeTareas = obtenerLocalStorage("reciclajeTareas");
  }

  if(existenciaDeDatosLocal("categorias")===true){
    categorias = obtenerLocalStorage("categorias");
  }else{
    guardarLocalStorage(categorias, "categorias");
    categorias = obtenerLocalStorage("categorias");
  }

  if(existenciaDeDatosLocal("reciclajeCategorias")===true){
    reciclajeCategorias = obtenerLocalStorage("reciclajeCategorias");
  }else{
    guardarLocalStorage(reciclajeCategorias, "reciclajeCategorias");
    reciclajeCategorias = obtenerLocalStorage("reciclajeCategorias");
  }
  
  
  
  //se muestra la fecha actual 
  mostrarFechaActual(nodo_fecha);
  mostrarTareasRecicladas(reciclaje, reciclajeTareas);
  cantidadTareasReciclas(reciclajeTareas, cantidad_tareas_recicladas);
  //se muestran todas las tareas actuales
  mostrarTareas(tareas.filter((tarea) => tarea.estado === false), container_tareas);
  //se muestras las categorias actuales menos la de valor categoria
  mostrarCategorias(filtroCategorias(categorias).filter((categoria) => categoria !== "categoria"), container_categorias);
  //se agregaran los elementos option a el select de la seleccion de tareas por categoria
  agregarOptionSelectores(categorias, selector_modo_vista_tarea);
  //se agregaran los elementos option a el select del formulario
  agregarOptionSelectores(filtroCategorias(categorias), selector_formulario);
  //actuliza la cantidad de tareas hechas actualmente
  actualizarCantidadTareasHechas(tareas);
  //cambia l estado de la tarea , si esta en true (hecha) la pasa a false (no hecha)
  cambioEstadoChecked(tareas, btn_tareas_hechas, selector_modo_vista_tarea);
  cantidadCategoriasRecicladas(reciclajeCategorias, cantidad_categorias_recicladas);
  eventoBotonesTarea(tareas, modal_editar, modal_eliminar);
  eventoBotonesRestaurarTarea(reciclajeTareas, tareas);
  eventoBotonesEliminarCategoria();

  /*EVENTOS DE LOS ELEMENTOS*/
  btn_mostrar_tareas_reciclaje.addEventListener("click", () => {
    aux = 0;
    if (aux === 0) {
      mostrarTareasRecicladas(reciclaje, reciclajeTareas);
      eventoBotonesRestaurarTarea(reciclajeTareas, tareas);
      cantidadTareasReciclas(reciclajeTareas, cantidad_tareas_recicladas);
    }
  });

  btn_mostrar_categoria_reciclaje.addEventListener("click", () => {
    aux = 1;
    if (aux === 1) {
      mostrarCategoriasRecicladas(reciclaje, reciclajeCategorias);
      cantidadCategoriasRecicladas(reciclajeCategorias, cantidad_categorias_recicladas);
      eventoBotonesRestaurarCategoria(reciclajeCategorias, categorias);
    }
  });

  btn_restablecer_todo.addEventListener("click", () => {
    if (reciclajeCategorias.length === 0 && reciclajeTareas.length === 0) {
      modal_mensaje_mensaje.innerText = "No hay nada en el reciclaje";
      mostrarModal(modal_mensaje);
    } else {
      if (restaurarTodo(reciclajeTareas, reciclajeCategorias, tareas, categorias) === true) {
        modal_mensaje_mensaje.innerText = "Todas las tareas y categorias fueron restablecidas";
        mostrarModal(modal_mensaje);
        cantidadCategoriasRecicladas(reciclajeCategorias, cantidad_categorias_recicladas);
        cantidadTareasReciclas(reciclajeTareas, cantidad_tareas_recicladas);
        if (aux === 0) {
          mostrarTareasRecicladas(reciclaje, reciclajeTareas);
        } else {
          mostrarCategoriasRecicladas(reciclaje, reciclajeCategorias);
        }
        guardarLocalStorage(reciclajeCategorias, "reciclajeCategorias");
        guardarLocalStorage(categorias, "categorias");
        guardarLocalStorage(tareas,"tareas");
        guardarLocalStorage(reciclajeTareas,"reciclajeTareas");
      } else {
        modal_mensaje_mensaje.innerText = "No se pudo restablecer nada";
        mostrarModal(modal_mensaje);
      }
    }
    mostrarCategorias(filtroCategorias(categorias).filter((categoria) => categoria !== "categoria"), container_categorias);
    agregarOptionSelectores(categorias, selector_modo_vista_tarea);
    agregarOptionSelectores(filtroCategorias(categorias), selector_formulario);
    actualizarCantidadTareasHechas(tareas);
    organizarTareas(tareas);
    cambioEstadoChecked(tareas, btn_tareas_hechas, selector_modo_vista_tarea);
    eventoBotonesTarea(tareas, modal_editar, modal_eliminar);
    eventoBotonesEliminarCategoria();
  });

  btn_eliminar_todo.addEventListener("click", () => {
    if (reciclajeCategorias.length === 0 && reciclajeTareas.length === 0) {
      modal_mensaje_mensaje.innerText = "No hay nada en el reciclaje";
      mostrarModal(modal_mensaje);
    } else {
      if (eliminarTodo(reciclajeTareas, reciclajeCategorias) === true) {
        modal_mensaje_mensaje.innerText = "Todas las tareas y categorias fueron eliminadas";
        mostrarModal(modal_mensaje);
        if (aux === 0) {
          mostrarTareasRecicladas(reciclaje, reciclajeTareas);
        } else {
          mostrarCategoriasRecicladas(reciclaje, reciclajeCategorias);
        }
        guardarLocalStorage(reciclajeCategorias, "reciclajeCategorias");
        guardarLocalStorage(categorias, "categorias");
        guardarLocalStorage(tareas,"tareas");
        guardarLocalStorage(reciclajeTareas,"reciclajeTareas");
      } else {
        modal_mensaje_mensaje.innerText = "No se pudo eliminar nada";
        mostrarModal(modal_mensaje);
      }
    }
    cantidadCategoriasRecicladas(reciclajeCategorias, cantidad_categorias_recicladas);
    cantidadTareasReciclas(reciclajeTareas, cantidad_tareas_recicladas);
  });

  btn_restablecer_categorias.addEventListener("click", () => {
    if (reciclajeCategorias.length === 0) {
      modal_mensaje_mensaje.innerText = "No hay categorias recicladas";
      mostrarModal(modal_mensaje);
    } else {
      if (restablecerCategorias(reciclajeCategorias, categorias) === true) {
        modal_mensaje_mensaje.innerText = "Todas la categorias fueron restablecidas";
        mostrarModal(modal_mensaje);
        mostrarCategorias(filtroCategorias(categorias).filter((categoria) => categoria !== "categoria"), container_categorias);
        agregarOptionSelectores(categorias, selector_modo_vista_tarea);
        agregarOptionSelectores(filtroCategorias(categorias), selector_formulario);
        eventoBotonesEliminarCategoria();
        cantidadCategoriasRecicladas(reciclajeCategorias, cantidad_categorias_recicladas);
        if (aux === 1) {
          mostrarCategoriasRecicladas(reciclaje, reciclajeCategorias);
        }
        guardarLocalStorage(reciclajeCategorias, "reciclajeCategorias");
        guardarLocalStorage(categorias, "categorias");
      } else {
        modal_mensaje_mensaje.innerText = "Categorias no restablecidas";
        mostrarModal(modal_mensaje);
      }
    }
  });

  btn_eliminar_categorias.addEventListener("click", () => {
    if (reciclajeCategorias.length === 0) {
      modal_mensaje_mensaje.innerText = "No hay categorias recicladas";
      mostrarModal(modal_mensaje);
    } else {
      if (eliminarCategoriasPermanente(reciclajeCategorias) === true) {
        modal_mensaje_mensaje.innerText = "Categorias eliminadas permanentemente";
        mostrarModal(modal_mensaje);
        cantidadCategoriasRecicladas(reciclajeCategorias, cantidad_categorias_recicladas);
        if (aux === 1) {
          mostrarCategoriasRecicladas(reciclaje, reciclajeCategorias);
        }
        guardarLocalStorage(reciclajeCategorias, "reciclajeCategorias");
        guardarLocalStorage(categorias, "categorias");
      } else {
        modal_mensaje_mensaje.innerText = "No se pudieron eliminar las categorias";
        mostrarModal(modal_mensaje);
      }
    }
  });

  btn_restablecer_tareas.addEventListener("click", () => {
    if (reciclajeTareas.length === 0) {
      modal_mensaje_mensaje.innerText = "No hay tareas recicladas";
      mostrarModal(modal_mensaje);
    } else {
      if (restaurarTareas(reciclajeTareas, tareas) === true) {
        modal_mensaje_mensaje.innerText = "Todas las tareas fueron restablecidas";
        mostrarModal(modal_mensaje);
        organizarTareas(tareas);
        mostrarTareasRecicladas(reciclaje, reciclajeTareas);
        actualizarCantidadTareasHechas(tareas);
        cambioEstadoChecked(tareas, btn_tareas_hechas, selector_modo_vista_tarea);
        eventoBotonesRestaurarTarea(reciclajeTareas, tareas);
        eventoBotonesTarea(tareas, modal_editar, modal_eliminar);
        guardarLocalStorage(tareas, "tareas");
        guardarLocalStorage(reciclajeTareas, "reciclajeTareas");
      } else {
        modal_mensaje_mensaje.innerText = "Tareas no restablecidas";
        mostrarModal(modal_mensaje);
      }
    }
    cantidadTareasReciclas(reciclajeTareas, cantidad_tareas_recicladas);
  });

  btn_eliminar_tareas.addEventListener("click", () => {
    if (reciclajeTareas.length === 0) {
      modal_mensaje_mensaje.innerText = "No hay tareas recicladas";
      mostrarModal(modal_mensaje);
    } else {
      if (eliminarTareasPermanente(reciclajeTareas) === true) {
        modal_mensaje_mensaje.innerText = "Tareas eliminadas permanentemente";
        mostrarModal(modal_mensaje);
        if (aux === 1) {
          mostrarCategoriasRecicladas(reciclaje, reciclajeCategorias);
          cantidadCategoriasRecicladas(reciclajeCategorias, cantidad_categorias_recicladas);
        } else {
          mostrarTareasRecicladas(reciclaje, reciclajeTareas);
          eventoBotonesRestaurarTarea(reciclajeTareas, tareas);
        }
        guardarLocalStorage(tareas, "tareas");
        guardarLocalStorage(reciclajeTareas, "reciclajeTareas");
      }
    }
    cantidadTareasReciclas(reciclajeTareas, cantidad_tareas_recicladas);
  });

  btn_modal_eliminar_categoria.addEventListener("click", (e) => {
    let categoriaAEliminar = categorias.find((cat) => cat.toLowerCase() === e.currentTarget.id.toLowerCase());
    agregarCategoriaAlReciclaje(reciclajeCategorias, categoriaAEliminar);
    if (eliminarCategoria(categorias, e.currentTarget.id)) {
      mostrarCategorias(filtroCategorias(categorias).filter((categoria) => categoria !== "categoria"), container_categorias);
      agregarOptionSelectores(categorias, selector_modo_vista_tarea);
      agregarOptionSelectores(filtroCategorias(categorias), selector_formulario);
      eventoBotonesEliminarCategoria();
      cerrarModal(modal_eliminar_categoria);
      modal_mensaje_mensaje.innerText = "Categoria eliminada exitosamente";
      mostrarModal(modal_mensaje);
      guardarLocalStorage(categorias, "categorias");
      guardarLocalStorage(reciclajeCategorias, "reciclajeCategorias");
    }
    if (aux === 1) {
      mostrarCategoriasRecicladas(reciclaje, reciclajeCategorias);
      eventoBotonesRestaurarCategoria(reciclajeCategorias, categorias);
    } else {
      mostrarTareasRecicladas(reciclaje, reciclajeTareas);
      eventoBotonesRestaurarTarea(reciclajeTareas, tareas);
      cantidadTareasReciclas(reciclajeTareas, cantidad_tareas_recicladas);
    }
    cantidadCategoriasRecicladas(reciclajeCategorias, cantidad_categorias_recicladas);
  });

  btn_reciclaje.addEventListener("click", () => {
    mostrarModal(modal_reciclaje);
  });
  btn_cancelar_eliminar_categoria.addEventListener("click", () => {
    cerrarModal(modal_eliminar_categoria);
  });
  salir_modal_reciclaje.addEventListener("click", () => {
    cerrarModal(modal_reciclaje);
  });
  salir_modal_eliminar_categoria.addEventListener("click", () => {
    cerrarModal(modal_eliminar_categoria);
  });
  icon_menu_admin.addEventListener("click", () => {
    mostrarMenuReciclaje(menu_administracion);
  });

  btn_modal_eliminar_tarea.addEventListener("click", (e) => {
    let tarea = tareas.find((t) => t.id === e.currentTarget.id);
    agregarTareaAlReciclaje(reciclajeTareas, tarea);
    if (eliminarTarea(tareas, e.currentTarget.id) === true) {
      modal_mensaje_mensaje.textContent = "Tarea eliminada con exito";
      mostrarModal(modal_mensaje);
      cerrarModal(modal_eliminar);
      mostrarTareasRecicladas(reciclaje, reciclajeTareas);
      cantidadTareasReciclas(reciclajeTareas, cantidad_tareas_recicladas);
      organizarTareas(tareas);
      guardarLocalStorage(tareas, "tareas");
      guardarLocalStorage(reciclajeTareas, "reciclajeTareas");
    } else {
      modal_mensaje_mensaje.textContent = "No se pudo eliminar la tarea";
      mostrarModal(modal_mensaje);
      cerrarModal(modal_eliminar);
    }
    cambioEstadoChecked(tareas, btn_tareas_hechas, selector_modo_vista_tarea);
    eventoBotonesTarea(tareas, modal_editar, modal_eliminar);
    actualizarCantidadTareasHechas(tareas);

    eventoBotonesRestaurarTarea(reciclajeTareas, tareas);
    if (aux === 1) {
      mostrarCategoriasRecicladas(reciclaje, reciclajeCategorias);
      cantidadCategoriasRecicladas(reciclajeCategorias, cantidad_categorias_recicladas);
    } else {
      mostrarTareasRecicladas(reciclaje, reciclajeTareas);
      eventoBotonesRestaurarTarea(reciclajeTareas, tareas);
      cantidadTareasReciclas(reciclajeTareas, cantidad_tareas_recicladas);
    }
    console.log(reciclajeTareas);
    console.log(tareas);
  });

  btn_actualizar_tarea.addEventListener("click", (e) => {
    let id_nuevo = descripcion_tarea_editar.value.split(" ").join("");
    if (tareaNoRepetida(tareas, id_nuevo) === true) {
      modal_mensaje_mensaje.textContent = "Ya esta tarea existe";
      mostrarModal(modal_mensaje);
    } else if (validarCamposEditar(input_titulo_tarea_editar, descripcion_tarea_editar) === true) {
      modal_mensaje_mensaje.textContent = "Por favor llene los campos";
      mostrarModal(modal_mensaje);
    } else if (editarTarea(tareas, e.currentTarget.id, id_nuevo, input_titulo_tarea_editar, descripcion_tarea_editar) === true) {
      cerrarModal(modal_editar);
      organizarTareas(tareas);
      modal_mensaje_mensaje.textContent = "Tarea editada con exito";
      mostrarModal(modal_mensaje);
      guardarLocalStorage(tareas, "tareas");
    }
    cambioEstadoChecked(tareas, btn_tareas_hechas, selector_modo_vista_tarea);
    eventoBotonesTarea(tareas, modal_editar, modal_eliminar);
  });

  btn_agregar_tarea.addEventListener("click", (e) => {
    e.preventDefault();
    if (validarCamposNuevaTarea(selector_categoria, input_titulo_tarea, textarea_descripcion_tarea) === true) {
      modal_mensaje_mensaje.textContent = "Por favor llene los campos";
      mostrarModal(modal_mensaje);
    } else {
      const fecha = new Date();
      let diaNumero = fecha.getDate().toString();
      let mes = fecha.getMonth() + 1;
      mes = mes.toString();
      let anio = fecha.getFullYear().toString();
      if (diaNumero.length < 2) {
        diaNumero = diaNumero.padStart(2, "0");
      }
      if (mes.length < 2) {
        mes = mes.padStart(2, "0");
      }

      let tareaNueva = {
        titulo: input_titulo_tarea.value,
        descripcion: textarea_descripcion_tarea.value,
        fecha: `${diaNumero}/${mes}/${anio}`,
        categoria: selector_categoria.value,
        estado: false,
        id: textarea_descripcion_tarea.value.split(" ").join("")
      }
      console.log(selector_modo_vista_tarea.value)
      if (tareaNoRepetida(tareas, tareaNueva.id) === true) {
        modal_mensaje_mensaje.textContent = "Esta tarea ya existe";
        mostrarModal(modal_mensaje);
      } else if (agregarTarea(tareas, tareaNueva) === true) {
        organizarTareas(tareas);
        actualizarCantidadTareasHechas(tareas);
        cambioEstadoChecked(tareas, btn_tareas_hechas, selector_modo_vista_tarea);
        modal_mensaje_mensaje.textContent = "Tarea agregada con exito";
        mostrarModal(modal_mensaje);
        limpiarCamposTareaNueva(selector_categoria, input_titulo_tarea, textarea_descripcion_tarea)
        guardarLocalStorage(tareas, "tareas");
      }
    }
    eventoBotonesTarea(tareas, modal_editar, modal_eliminar);
  });

  btn_agregar_categoria.addEventListener("click", (e) => {
    e.preventDefault();
    if (validarCampoNuevaCategoria(input_categoria_nueva) === true) {
      modal_mensaje_mensaje.textContent = "Por favor llene el campo";
      mostrarModal(modal_mensaje);
    } else {
      if (categoriaNoRepetida(categorias, input_categoria_nueva.value)) {
        modal_mensaje_mensaje.textContent = "Esta categoria ya existe";
        mostrarModal(modal_mensaje);
      } else {
        if (agregarCategoria(categorias, input_categoria_nueva.value)) {
          mostrarCategorias(filtroCategorias(categorias).filter((categoria) => categoria !== "categoria"), container_categorias);
          agregarOptionSelectores(categorias, selector_modo_vista_tarea);
          agregarOptionSelectores(filtroCategorias(categorias), selector_formulario);
          limpiarCampoCategoriaNueva(input_categoria_nueva)
          modal_mensaje_mensaje.textContent = "Categoria agregada con exito";
          mostrarModal(modal_mensaje);
          guardarLocalStorage(categorias, "categorias");
        }
      }
    }
  });

  btn_ver_categorias.addEventListener("click", () => {
    mostrarModal(modal_categorias);
  });

  salir_modal_categorias.addEventListener("click", () => {
    cerrarModal(modal_categorias);
  });
  salir_modal_eliminar.addEventListener("click", () => {
    cerrarModal(modal_eliminar);
  });
  salir_modal_mensaje.addEventListener("click", () => {
    cerrarModal(modal_mensaje);
  });
  salir_modal_editar_tarea.addEventListener("click", () => {
    cerrarModal(modal_editar);
  });
  btn_cancelar_editar.addEventListener("click", () => {
    cerrarModal(modal_editar);
  })
  btn_cancelar_eliminar.addEventListener("click", () => {
    cerrarModal(modal_eliminar);
  });

  selector_modo_vista_tarea.addEventListener("change", (e) => {
    organizarTareas(tareas);
    cambioEstadoChecked(tareas, btn_tareas_hechas, selector_modo_vista_tarea);
    eventoBotonesTarea(tareas, modal_editar, modal_eliminar);
  });

  btn_tareas_hechas.addEventListener("click", () => {
    let filtro = [];
    if (btn_tareas_hechas.innerText === "Hechas") {
      if (selector_modo_vista_tarea.value === "todas") {
        filtro = tareas.filter((tarea) => tarea.estado === true);
        mostrarTareas(filtro, container_tareas);
        btn_tareas_hechas.innerHTML = `
        <figure class="icon icon_hechas"></figure>Sin hacer
        `;
        tareasNoEncontradas(filtro, "No hay tareas hechas", container_tareas);
      } else {
        filtro = tareas.filter((tarea) => tarea.estado === true && tarea.categoria === selector_modo_vista_tarea.value);
        mostrarTareas(filtro, container_tareas);
        btn_tareas_hechas.innerHTML = `
          <figure class="icon icon_hechas"></figure>Sin hacer
        `;
        tareasNoEncontradas(filtro, "No hay tareas hechas con esta categoria", container_tareas);
      }
    } else {
      if (selector_modo_vista_tarea.value === "todas") {
        filtro = tareas.filter((tarea) => tarea.estado === false);
        mostrarTareas(filtro, container_tareas);
        btn_tareas_hechas.innerHTML = `
          <figure class="icon icon_hechas"></figure>Hechas
        `;
        tareasNoEncontradas(filtro, "No hay tareas sin hacer", container_tareas);
      } else {
        filtro = tareas.filter((tarea) => tarea.estado === false && tarea.categoria === selector_modo_vista_tarea.value)
        mostrarTareas(filtro, container_tareas);
        btn_tareas_hechas.innerHTML = `
          <figure class="icon icon_hechas"></figure>Hechas
        `;
        filtro = tareas.filter((tarea) => tarea.estado === false && tarea.categoria === selector_modo_vista_tarea.value);
        mostrarTareas(filtro, container_tareas);
        btn_tareas_hechas.innerHTML = `
          <figure class="icon icon_hechas"></figure>Hechas
        `;
        tareasNoEncontradas(filtro, "No hay tareas sin hacer con esta categoria", container_tareas);
      }
    }
    cambioEstadoChecked(tareas, btn_tareas_hechas, selector_modo_vista_tarea);
    actualizarCantidadTareasHechas(tareas);
    eventoBotonesTarea(tareas, modal_editar, modal_eliminar);
  });
})