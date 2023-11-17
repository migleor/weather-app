import 'dotenv/config';
import colors from 'colors';
import { inquirerMenu, leerInput, pause, menuCiudadesListar } from './helpers/inquirer.js';
import { Busquedas } from './models/busquedas.js';

const main = async() => {

    const busquedas = new Busquedas();
    let opt;
    
    do {
        opt = await inquirerMenu();

        switch(opt) {
            case 1:
                //solicitar ciudad
                const readPlace = await leerInput('Por favor digite la ciudad que desea buscar: ');
                const ciudades = await busquedas.findCity(readPlace);
                const city = await menuCiudadesListar(ciudades);
                if(city==='0') continue;
                const citySelected = ciudades.find( c => c.id === city);
                
                //guardar historial
                busquedas.addHistory(citySelected.ciudad);
                
                //buscar clima
                const findWheather = await busquedas.findWheatherByLatLgn(citySelected.lat, citySelected.lng);
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: ', `(${citySelected.id} ) ${citySelected.ciudad} `.yellow);
                console.log('Cooredenadas: ', `Lat: ${citySelected.lat} - Lon ${citySelected.lng}`.blue  );
                console.log('Temp: ', findWheather.temperatura);
                console.log('Mínima: ',findWheather.minima);
                console.log('Máxima: ', findWheather.maxima);
                console.log('Sensación Térmica: ',findWheather.sensacion);
                console.log('Descripción Clima: ', `${findWheather.description.toUpperCase()}`.blue);
            break;

            case 2:
                busquedas.historial.forEach((lugar, i) => {
                    const idx = `${i + 1}`.green;
                    console.log(`${idx} ${lugar}`.grey.bold);
                })
            break;
        }
    
        if(opt !== 0) await pause ();

    } while(opt !== 0);
};

main();