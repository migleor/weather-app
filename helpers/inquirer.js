import inquirer from 'inquirer';
import colors from 'colors';

const questions = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [{
                value: 1,
                name: `${'1.'.green} Buscar Ciudad`
            },{
                value: 2,
                name: `${'2.'.green} Historial`
            },{
                value: 0,
                name: `${'0.'.green} Salir`
            }]
    }
];

const inquirerMenu = async () => {
    console.clear();
    console.log("=============================================".green.bold);
    console.log("            SELECCIONE UNA OPCION            ".white.bold);
    console.log("=============================================\n".green.bold);
    const {opcion} = await inquirer.prompt(questions);
    return opcion;
}

const pause = () => {
    return inquirer.prompt([
        {
            type:'input',
            name:'pausa',
            message: `\n ${'>>>'.red} Presione [${'ENTER'.blue.bold}] para continuar \n`
        }
    ]);
}

const leerInput = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if(value.length === 0){
                    return 'Por favor ingrese la descripción de la tarea';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const menuTareasBorrar = async (tareas = []) => {
    const choices = tareas.map( (tarea, i) => {
        const idx = `${i+1}.`.green;
        return {
            value: tarea.id,
            name: ` ${idx} ${tarea.desc} `
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.blue + 'Cancelar'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];
    console.clear();
    console.log("=============================================".green.bold);
    console.log("   SELECCIONE LA TAREA QUE DESEA BORRAR      ".white.bold);
    console.log("=============================================\n".green.bold);    
    const { id } = await inquirer.prompt(questions);
    return id;
}

const menuTareasUpdate = async (tareas = []) => {
    const choices = tareas.map( (tarea, i) => {
        const idx = `${i+1}.`.green;
        return {
            value: tarea.id,
            name: ` ${idx} ${tarea.desc} `,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];
    console.clear();
    console.log("==============================================".green.bold);
    console.log("  SELECCIONE LA(S) TAREA QUE DESEA COMPLETAR  ".white.bold);
    console.log("==============================================\n".green.bold);    
    const { ids } = await inquirer.prompt(questions);
    return ids;
}

const confirm = async ( message ) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;
}

export {
    inquirerMenu,
    pause,
    leerInput,
    menuTareasBorrar,
    confirm,
    menuTareasUpdate
};