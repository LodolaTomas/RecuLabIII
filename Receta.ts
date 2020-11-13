namespace Entidades {

    export class Receta {

        id: number;
        nombre: string;
        ingredientes: string;
        tipo: string;
        foto: string;
    

        constructor(id: number, nombre: string, poblacion: string, pais: string, foto: string) {

            this.id = id;
            this.nombre = nombre;
            this.ingredientes = poblacion;
            this.tipo = pais;
            this.foto = foto;
        }

        ToJSON(): JSON {
            let retornoJSON = `{"id":"${this.id}","nombre":"${this.nombre}","ingredientes":"${this.ingredientes}","tipo":"${this.tipo}","foto":"${this.foto}"}`;
            return JSON.parse(retornoJSON);
        }

    }




}