/// <reference path="./node_modules/@types/jquery/index.d.ts" />

namespace RecuperatorioPrimerParcial {

    export class Manejadora {

        public static AgregarCocinero() {
            let especialidad = $("#especialidad").val().toString();
            let email = $("#correo").val().toString();
            let clave = parseInt($("#clave").val().toString());
            let pagina: string = "./BACKEND/AltaCocinero.php";
            let form = new FormData();
            form.append("especialidad", especialidad);
            form.append("email", email);
            form.append("clave", clave.toString());
            $.ajax({
                url: pagina,
                type: 'POST',
                dataType: "json",
                contentType: false,
                processData: false,
                data: form,
                async: true,
            }).done(function (retJSON) {
                if (retJSON.exito) {
                    console.log("Agregado Correcamente");
                    console.log(retJSON.mensaje);
                    alert("Agregado Correctamente");
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });

        }

        public static MostrarCocineros() {

            $.ajax({
                url: './BACKEND/ListadoCocineros.php',
                type: 'GET',
                cache: false,
                processData: false
            }).done(function (retJSON) {
                let arrayJson = JSON.parse(retJSON);
                let tabla: string = "";
                tabla += "<table border=1 style='width:100%' text-aling='center'> <thead>";
                tabla += "<tr>";
                tabla += "<th>Especialidad</th>";
                tabla += "<th>Correo</th>";
                tabla += "<th>Clave</th>";
                tabla += "</tr> </thead>";

                for (let i = 0; i < arrayJson.length; i++) {
                    tabla += "<tr>";
                    tabla += "<td>" + arrayJson[i]["especialidad"] + "</td>";
                    tabla += "<td>" + arrayJson[i]["email"] + "</td>";
                    tabla += "<td>" + arrayJson[i]["clave"] + "</td>";
                    console.log(arrayJson[i]);
                    tabla += "</tr>";

                }
                tabla += "</table>";
                $("#divTabla").html(tabla);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });


        }

        public static VerificarExistencia() {
            let correo = $("#correo").val().toString();
            let clave = $("#clave").val().toString();
            $.ajax({
                url: './BACKEND/VerificarCocinero.php',
                type: 'POST',
                dataType: "html",
                data: { "email": correo, "clave": clave },
                async: true,
            }).done(function (retJSON) {
                let respuesta= JSON.parse(retJSON);
                    alert(respuesta.mensaje+JSON.stringify(respuesta.masPopulares));
                    console.log(respuesta);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });

        }

        public static AgregarRecetaSinFoto() {
            let nombre = $("#nombre").val().toString();
            let ingrediente = $("#ingredientes").val().toString();
            let tipo = $("#cboTipo").val().toString();
            let form = new FormData();
            form.append("nombre", nombre);
            form.append("ingredientes", ingrediente);
            form.append("tipo", tipo);
            $.ajax({
                url: './BACKEND/AgregarRecetaSinFoto.php',
                type: 'POST',
                dataType: "json",
                data: form,
                async: true,
                contentType:false,
                processData:false
            }).done(function (retJSON) {
                if (retJSON.exito) {
                    console.log("Agregado Correcamente");
                    console.log(retJSON.mensaje);
                    alert("Agregado Correctamente");
                    Manejadora.MostrarRecetas();
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });

        }

        public static MostrarRecetas() {
            $.ajax({
                url: './BACKEND/ListadoRecetas.php',
                type: 'GET',
                cache: false,
                processData: false
            }).done(function (retJSON) {
                let lista = JSON.parse(retJSON);
                let tabla = `<table style="padding: 20px; margin: 0 auto; width: 900px; text-align: center;"><tr>
                    <td colspan="6">
                    <hr />
                    </td>
                    </tr>
                    <tr>
                        <td>Id</td>
                        <td>Nombre</td>
                        <td>Ingredientes</td>
                        <td>Tipo</td>
                        <td>Foto</td>
                        <td>Acciones</td>
                    </tr>`;
                for (let i = 0; i < lista.length; i++) {
                    const element = lista[i];
                    tabla += `<tr>`;
                    tabla += `<td>` + lista[i].id + `</td>`;
                    tabla += `<td>` + lista[i].nombre + `</td>`;
                    tabla += `<td>` + lista[i].ingredientes + `</td>`;
                    tabla += `<td>` + lista[i].tipo + `</td>`;
                    if (lista[i].pathFoto == undefined || lista[i].pathFoto == null || lista[i].pathFoto == "") {
                        tabla += `<td>SinFoto</td>`;
                    } else {
                        tabla += `<td><img src="` + lista[i].pathFoto + `" height="40" width="40"></td>`;
                    }
                    console.log(lista[i]);
                    let objJson: string = JSON.stringify(lista[i]);
                    console.log(objJson);
                    tabla += "<td><input type='button' onclick='new RecuperatorioPrimerParcial.Manejadora.btnModificar(" + objJson + ")' value='Modificar'</td>";
                    tabla += "<td><input type='button' onclick='new RecuperatorioPrimerParcial.Manejadora.EliminarReceta(" + objJson + ")' value='Eliminar'><td>";
                }
                tabla += `</tr><tr><td colspan="6"><hr /></td></tr>`;

                $("#divTabla").html(tabla);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });

        }

        public static AgregarVerificarReceta() {
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            let id = $("#id").val().toString();
            let nombre = $("#nombre").val().toString();
            let ingredientes = $("#ingredientes").val().toString();
            let tipo = $("#cboTipo").val().toString();
            let foto: any = (<HTMLInputElement>document.getElementById("foto"));
            let form: FormData = new FormData();
            if ($("#hdnIdModificacion").val().toString() == "true") {
                let json: any = { "id": id, "nombre": nombre, "ingredientes": ingredientes, "tipo": tipo, "foto": "" };
                console.log(JSON.stringify(json));
                form.append('receta_json', JSON.stringify(json));
                form.append('foto', foto.files[0]);
                $.ajax({
                    url: "./BACKEND/ModificarReceta.php",
                    type: 'POST',
                    dataType: "json",
                    contentType:false,
                    processData:false,
                    data: form,
                    async: true
                }).done(function(retJSON){
                    if (retJSON.exito) {
                        console.log("Modificado Correcamente");
                        console.log(retJSON.mensaje);
                        alert("Modificado Correctamente");
                        $("#hdnIdModificacion").val("false")
                        Manejadora.MostrarRecetas();
                    }else{
                        alert(retJSON.mensaje);
                        console.log(retJSON.mensaje);
                    }
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                });


            } else {
                form.append('id', id);
                form.append('nombre', nombre);
                form.append('ingredientes', ingredientes);
                form.append('tipo', tipo);
                form.append('foto', foto.files[0]);
                $.ajax({
                    url: './BACKEND/AgregarReceta.php',
                    type: 'POST',
                    dataType: "json",
                    data: form,
                    contentType:false,
                    processData:false,
                    async: true
                }).done(function (retJSON) {
                    if (retJSON.exito) {
                        console.log("Agregado Correcamente");
                        console.log(retJSON.mensaje);
                        alert("Agregado Correctamente");
                        Manejadora.MostrarRecetas();
                    }else{
                        alert(retJSON.mensaje);
                        console.log(retJSON.mensaje);
                    }
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                });
            }
        }

        public static EliminarReceta(json: object) {
            console.log(json);
            let form: FormData = new FormData();
            form.append('receta_json', JSON.stringify(json));
            form.append('accion', 'borrar');
            $.ajax({
                url: './BACKEND/EliminarReceta.php',
                type: 'POST',
                dataType: "json",
                contentType:false,
                data: form,
                processData: false,
                async: true
                
            }).done(function (retJSON) {
                if (retJSON.exito) {
                    console.log("Elminado Correcamente");
                    console.log(retJSON);
                    alert("Eliminado Correctamente");
                    Manejadora.MostrarRecetas();
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });
        }

        public static btnModificar(json: object) {
            console.log(json);
            $("#id").val(json["id"]);
            $('#id').prop('readonly', true);
            $("#nombre").val(json["nombre"]);
            $("#ingredientes").val(json["ingredientes"]);
            $("#cboTipo").val(json["tipo"]);
            if (json["pathFoto"] != null && json["pathFoto"] != undefined && json["pathFoto"] != "") {
                $("#imgFoto").attr("src", json["pathFoto"]);
            }
            $("#hdnIdModificacion").val("true");
        }

        public static ModificarReceta() {
            Manejadora.AgregarVerificarReceta();
            $('#id').prop('readonly', false);
            $("#id").val("");
            $("#nombre").val("");
            $("#ingredientes").val("");
            $("#cboTipo").val( "Bodegon" );
            $("#imgFoto").attr("src", "./receta_default.jpg");
        }

        public static FiltrarRecetas() {
            let nombre: any = $("#nombre").val().toString();
            let tipo: any = $("#cboTipo").val().toString();
            let form: FormData = new FormData();
            form.append('nombre', nombre);
            form.append('tipo', tipo);
            $.ajax({
                url: './BACKEND/FiltrarReceta.php',
                type: 'POST',
                contentType:false,
                dataType:"json",
                data: form,
                cache:false,
                processData: false,
                async: true
            }).done(function (retJSON) {
                //$("#divTabla").html(retJSON);
                alert("ERROR");
            }).fail(function (jqXHR, textStatus, errorThrown) {
                //alert( jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                $("#divTabla").html(jqXHR.responseText);
            });
        }
        public static MostrarRecetasBorradas() {
            $.ajax({
                url: './BACKEND/MostrarBorrados.php',
                type: 'GET',
                cache: false,
                processData: false,
                async: true
            }).done(function (retJSON) {
                $("#divTabla").html(retJSON);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert( + "\n" + textStatus + "\n" + errorThrown);
            });

        }

        public static CargarTipoJSON() {
            $.ajax({
                url: './BACKEND/obtenerJson.php',
                type: 'GET',
                cache: false,
                processData: false,
                async: true
            }).done(function (retJSON) {
                console.log(JSON.parse(retJSON));
                let lista= JSON.parse(retJSON);
                $('#cboTipo').empty();
                for (let index = 0; index < lista.length; index++) {
                    let opcion = lista[index]["descripcion"];
                    $(`<option value="${opcion}">${opcion}</option>`).appendTo("#cboTipo");                    
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });

        }
    }
}