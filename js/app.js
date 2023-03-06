//-----------------------Variables Globales-----------------------------------

const formulario = document.getElementById('formulario');
const input = document.querySelector('input');
const listaTarea = document.getElementById('lista-tareas');
const template = document.getElementById('template');
const fragment = document.createDocumentFragment();
let tareas = {};

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('tareas'))
        {
            tareas = JSON.parse(localStorage.getItem('tareas'));
        }
    printTask();
});

listaTarea.addEventListener('click', e =>{
    btnAccion(e);
});

formulario.addEventListener('submit', e => {
    e.preventDefault();

    setItem();
    //console.log('procesando formulario...');
    //console.log(e.target[0].value);
    //console.log(e.target.querySelector('input').value);
    
});

const setItem = e => {

    if(input.value.trim() === '')
        {
            console.log('esta vacio');
            return
        }

    const tarea = {
        id: Date.now(),
        texto: input.value,
        estado: false
    };

    tareas[tarea.id] = tarea;

    console.log(tareas);

    formulario.reset();
    input.focus();

    printTask();
};

const printTask = () => {

    localStorage.setItem('tareas', JSON.stringify(tareas));

    if(Object.values(tareas).length === 0)
        {
            listaTarea.innerHTML = `
            <div class="alert alert-dark text-center">
                No hay tareas pendientes! <i class="fa-regular fa-note"></i>
            </div>`;

            return;
        }

    listaTarea.innerHTML = '';

    //devolvemos valores de objeto como arrays y lo recorremos
    Object.values(tareas).forEach(tarea => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('p').textContent = tarea.texto;

        if(tarea.estado)
            {
                clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary');
                clone.querySelectorAll('.fa-solid')[0].classList.replace('fa-circle-check', 'fa-rotate-left');
                clone.querySelector('p').style.textDecoration = 'line-through';
            }

        clone.querySelectorAll('.fa-solid')[0].dataset.id = tarea.id;
        clone.querySelectorAll('.fa-solid')[1].dataset.id = tarea.id;
        fragment.appendChild(clone);
    });

    listaTarea.appendChild(fragment);
};

const btnAccion = e => {
    console.log(e.target.classList.contains('fa-circle-check'));

    if(e.target.classList.contains('fa-circle-check'))
        {
            console.log(e.target.dataset.id);
            tareas[e.target.dataset.id].estado = true;
            printTask();
        }

    if(e.target.classList.contains('fa-circle-minus'))
        {
            console.log(e.target.dataset.id);
            delete tareas[e.target.dataset.id];
            printTask();
        }

    if(e.target.classList.contains('fa-rotate-left'))
        {
            console.log('estado:' + e.target.classList.contains('fa-rotate-left'));
            tareas[e.target.dataset.id].estado = false;
            printTask();
        }

    e.stopPropagation();
};
