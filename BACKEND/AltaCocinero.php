<?php
require "./clases/Cocinero.php";
$especialidad=$_POST["especialidad"]??NULL;
$email=$_POST["email"]??NULL;
$clave=$_POST["clave"]??NULL;
$nuevo= new Cocinero($especialidad,$email,$clave);

/* 
$cocinero=json_decode($_POST["cocinero_json"]);
$nuevo= new Cocinero($cocinero->especialidad,$cocinero->email,$cocinero->clave); */

$json= new stdClass();
$json=$nuevo->GuardarEnArchivo();
echo json_encode($json) ;
