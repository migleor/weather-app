import colors from 'colors';
import { inquirerMenu, leerInput, pause } from './helpers/inquirer.js';


const main = async() => {
    let opt;
    
    do {
        opt = await inquirerMenu();
        console.log('has selecionado la opción ', opt);
        if(opt !== 0) await pause ();
    } while(opt !== 0);
};

main();