import axios from 'axios';
import { writeFileSync, readFileSync, existsSync, fstat } from 'node:fs';


class Busquedas {

    historial = [];
    dbPath = './db/database.json';


    constructor() {
        this.leerDB();
    }

    get paramsMapBox(){
        return {
            'access_token':process.env.MAPBOX_KEY,
            'language':'es',
            'limit': 5,
        };
    }

    get paramsWheather() {
        return {
            appid:process.env.OPENWEATHER_KEY,
            units:'metric',
            lang:'es'}
    };


    async findCity( place = ''){
        //petición http
        try {

            //const resp = await axios.get('https://reqres.in/api/users?page=2');

            const instance = axios.create({
                baseURL: `${process.env.MAPBOX_ENDPOINT} ${ place }.json`,
                params: this.paramsMapBox
            })

            const resp = await instance.get();
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                ciudad: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));

        } catch (error) {
           console.log(`Error obteniendo ciudades ${error}`.red); 
           return [];
        }

    }

    async findWheatherByLatLgn(lat, lon){
        try{
            //?lat={lat}&lon={lon}&appid={API key}        

            const instance = axios.create({
                baseURL: `${process.env.OPENWEATHER_ENDPOINT}`,
                params: {...this.paramsWheather, lat, lon }
            });
            const resp = await instance.get();

            return {
                description:resp.data.weather[0].description,
                temperatura:resp.data.main.temp,
                sensacion:resp.data.main.feels_like,
                minima:resp.data.main.temp_min,
                maxima:resp.data.main.temp_max
            };
        } catch(error) {
            console.log(`Error obteniendo el clima ${error}`.red);
        }
    }

    addHistory(lugar=''){

        if( this.historial.includes( lugar.toLocaleUpperCase() )){
            return;
        }
        this.historial.unshift( lugar.toLocaleUpperCase() );
        this.guardarDB();
        //grabar en json
    }

    guardarDB(){

        const payload = {
            historial: this.historial
        }

        writeFileSync(this.dbPath, JSON.stringify(payload));

    }

    leerDB(){
        if(!existsSync( this.dbPath )){
            return null;
        }
        const info = readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);
        this.historial = data.historial;
    }

}

export { Busquedas };