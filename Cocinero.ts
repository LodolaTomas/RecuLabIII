///<reference path="Persona.ts"/>
namespace Entidades{

    export class Cocinero extends Persona {
        public especialidad;
        constructor(email:string,clave:number,especialidad:string) {
            super(email,clave);
            this.especialidad=especialidad;

        }
        ToJSON(): JSON {
            var cocinero = JSON.parse(super.ToString())
            cocinero["especialidad"]=this.especialidad;
            return cocinero;
        }
    }

}