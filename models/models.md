* Users *

** Endpoints **
{
  "singup":"/auth/signup",/*post*/
  "login":"/auth/login",/*post*/
  "loggedUser":"/auth/self",/*get*/
  "updateUser":"/users/:userId",/*patch*/
  "deleteUser":"/users/:userId",/*delete*/
  "getUser":"/users/:userId",/*get*/
  "getAllUsers":"/users"/*get*/
}
** User Model **
{
  "email":"example@example.com",

  *** basic data ***
  "basicData":{ 
    "name" :"oswaldinho", 
    "dadSurname":"Martinez", 
    "momSurname":"Anaya", 
    "birthDate":"31/08/1996", 
    "placeOfBirth":{
      "addressName":"Pachuca", 
      "street":"", 
      "outdoorNumber":"", 
      "interiorNumber":"", 
      "colony":"", 
      "zipCode":"", 
      "city":"Pachuca", 
      "state":"Hidalgo", 
      "coordinates":["123312","123123"] 
    }, 
    "speciality" :"Especialidad", 
    "photoURL":"lafoto.jpg",
    "phone":"1234567890",
    "civilStatus" :"one pf these=>['Soltero', 'Casado', 'Divorciado', 'Unión Libre', 'Viudo']", 
    
    "address":{ 
      "addressName":"Pachuca", 
      "street":"", 
      "outdoorNumber":"", 
      "interiorNumber":"", 
      "colony":"", 
      "zipCode":"", 
      "city":"Pachuca", 
      "state":"Hidalgo", 
      "coordinates":["123312","123123"] 
    }  
  }, 
  *** cónyugue if casado o unión libre ***
  "spouse":{ 
    "name":"spouse name", 
    "dadSurname":"elapellido", 
    "momSurname":"el otro apellido",
    "email":"email@conyugue.com", 
    "phone":"1234567890"
  }, 

  *** /Datos fiscales ***
  "fiscalData":{ 
    "rfc":"1234567RTY", 
    "phone":"1234567890" ,
    "email":"email@email.com" ,
    "address":{ 
      "addressName":"Pachuca", 
      "street":"", 
      "outdoorNumber":"", 
      "interiorNumber":"", 
      "colony":"", 
      "zipCode":"", 
      "city":"Pachuca", 
      "state":"Hidalgo", 
      "coordinates":["123312","123123"] 
    }
  }, 

  *** Status Data ***
  "registrationDate":"01/01/2010", 
  "membershipStatus":"one of these=>:['Pendiente de Pago', 'Pagado', 'Veterano']", 

  *** Aproval  Data  ***
  "userStatus":"one of these=>['Registrado', 'Aprobado', 'No Aprobado']", 
  "revisionDate":"01/01/2010", 
  "reviwedBy":"the Object ID of the User",

  ***  "Miembros de la asociación mexicana de gastroenterología que recomiendan su ingreso"  ***
  "membersWhoRecommend":["the Object ID of the User", "the Object ID of the User"], 

  *** Condicional labora actualmente en un hospital o institución ***
  "workedAtInstitutions":["the Object ID of the Users"], 
  ***  Condicional labora posee un consultorio  ***
  "consultories":["the Object ID of the Instituciones"], 
   
  ***  educación  ***
  "studies":["the Object ID of the Studies"],     
  ***  Internado de pregrado  ***
  "internships":["the Object ID of the Internships"], 
  ***  Residencias y posgrados ***
  "residencies":["the Object ID of the Residencies"], 
  *** Actividades docentes pasadas y presentes  ***
  "teachingActivities":["the Object ID of the Activities",], 
  ***  Activityes hospitalarias pasadas y presentes  ***
  "hospitalActivities":["the Object ID of the Activities",], 
  ***  Sociedades médicas a las que pertenece *** o usar un modelo por separado para Sociedades  ***
  "medicalSocieties":["the Object ID of the Activities",], 
   "createdAt":"01/01/2019", 
  "updatedAt":"01/01/2019"  
}

*** Activity Model ***
*** Event Model ***
*** Institution Model ***
*** Internship Model ***
*** Residence Model ***
*** Study Model ***
