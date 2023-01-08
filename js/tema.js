document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    const rueda = document.querySelector(".rueda");
    let modo = false;
    let data = localStorage.getItem("modo");
    if (data) {
        modo = JSON.parse(data);
        if (modo === true) {
            rueda.classList.remove("mover_izquierda");
            rueda.classList.add("mover_derecha");
            cambiarTema(modo);
        } else {
            rueda.classList.remove("mover_derecha");
            rueda.classList.add("mover_izquierda");
        }
    }
    slider.addEventListener("click", () => {
        modo = !modo;
        localStorage.setItem("modo", modo);
        cambiarTema(modo);
    });

    function cambiarTema(modo) {
        const app_menu = document.querySelector(".app_menu");
        const menu_administracion = document.querySelector(".menu_administracion");
        const lineasMenu = document.querySelectorAll(".linea");
        if (modo === true) {
            rueda.classList.remove("mover_izquierda");
            rueda.classList.add("mover_derecha");
            document.body.classList.add("fondo_negro", "letras_blancas");
            app_menu.classList.add("fondo_negro");
            menu_administracion.classList.add("fondo_negro");
        } else {
            rueda.classList.remove("mover_derecha");
            rueda.classList.add("mover_izquierda");
            document.body.classList.remove("fondo_negro", "letras_blancas");
            app_menu.classList.remove("fondo_negro");
            menu_administracion.classList.remove("fondo_negro");
        }
        lineasMenu.forEach((linea)=>{
            if(modo===true){
                linea.style.backgroundColor="white";
            }else{
                linea.style.backgroundColor="black";
            }
        })
        temaModal(modo);
        temaTitulos(modo);
    };
    function temaModal(modo) {
        const arrayModal = [...document.querySelectorAll(".modal")];
        arrayModal.map((modal) => {
            if (modo === true) {
                modal.classList.add("fondo_negro");
            } else {
                modal.classList.remove("fondo_negro");
            }
        });
    };
    function temaTitulos(modo) {
        const arrayTitulos = document.querySelectorAll(".titulo_acciones");
        arrayTitulos.forEach((titulo) => {
            if (modo === true) {
                titulo.classList.add("letras_blancas");
            } else {
                titulo.classList.remove("letras_blancas");
            }
        });
    };
});