namespace Entidades{
    export class Persona {
        public email:string;
        public clave:number;
        constructor(email:string, clave:number) {
            this.clave=clave;
            this.email=email;
        }
        ToString():string{
            var person =JSON.stringify({email: this.email,clave:this.clave});
            return person.toString();
        }
    }

}