# Models and Endpoints Documentation
## Content:
 - [Users](#users)
 - [Events](#events)

<a name="users"></a>
# Users

## Endpoints 

  ### Signup
    POST /auth/signup
  ### Login
    POST /auth/login
  ### Get auth User
    GET /auth/self
  ### get a single user
    GET /users/:userId
  ### update a user
    PATCH /users/:userId
  ### delete a user
    DELETE /users/:userId
  ### Get all users
    GET /users?query={"userStatus":"Aprobado", "filter":"value"}&limit=20&skip=0

  

## Model

    {
      "email":"example@example.com",      
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
    ### cónyugue if casado o unión libre   
      "spouse":{     
        "name":"spouse name", 
        "dadSurname":"elapellido", 
        "momSurname":"el otro apellido",
        "email":"email@conyugue.com", 
        "phone":"1234567890"
      }, 
    ###* /Datos fiscales ***
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
      ###* Status Data ***
      "registrationDate":"01/01/2010", 
      "membershipStatus":"one of these=>:['Pendiente de Pago', 'Pagado', 'Veterano']", 
      ###* Aproval  Data  ***
      "userStatus":"one of these=>['Registrado', 'Aprobado', 'No Aprobado']", 
      "revisionDate":"01/01/2010", 
      "reviwedBy":"the Object ID of the User",

      ###*  "Miembros de la asociación mexicana de gastroenterología que recomiendan su ingreso"  ***
      "membersWhoRecommend":["the Object ID of the User", "the Object ID of the User"], 

      ###* Condicional labora actualmente en un hospital o institución ***
      "workedAtInstitutions":["the Object ID of the Users"], 
      ###*  Condicional labora posee un consultorio  ***
      "consultories":["the Object ID of the Instituciones"], 
      
      ###*  educación  ***
      "studies":["the Object ID of the Studies"],     
      ###*  Internado de pregrado  ***
      "internships":["the Object ID of the Internships"], 
      ###*  Residencias y posgrados ***
      "residencies":["the Object ID of the Residencies"], 
      ###* Actividades docentes pasadas y presentes  ***
      "teachingActivities":["the Object ID of the Activities",], 
      ###*  Activityes hospitalarias pasadas y presentes  ***
      "hospitalActivities":["the Object ID of the Activities",], 
      ###*  Sociedades médicas a las que pertenece *** o usar un modelo por separado para Sociedades  ***
      "medicalSocieties":["the Object ID of the Activities",], 
      "createdAt":"01/01/2019", 
      "updatedAt":"01/01/2019"  
    }

# Activities 
# Institutions
# Internshipa
# Residencea 
# Studies

<a name="events"></a>
# Events

## Endpoints 
  ### Get all ecents
    GET /events?query={"userStatus":"Aprobado", "filter":"value"}&limit=20&skip=0  
  ### post an event
    POST /events
  ### get a single event
    GET /events/:eventId
  ### update an event
    PATCH /events/:eventId
  ### delete an event
    DELETE /events/:eventId
  

## Model
    {
      ### Datos Generales
      "title":"El evento del año"
      "startDate":"01/01/2019"
      "endDate":"01/01/2019"
      "curricularValue":"Valor curricular"      
      "curricularRegistrationNumber":"123123"
      "curriculaInstitution":""
      "valor curricular":"123123"
      "directedTo":"Cientificos"
      "cost":123123
      "contact":"contacto"

      ### Ubicación
      location:{
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

      ###Programa
      program:[{    
        "activityName":"activity name",
        "activityType":"type",
        "date":"01/01/2019 10:12:00",        
        "place":"salón ..."
        "speaker":{
          "title":"Doc"
          "fullName":"Oswaldo martinez"
          "photoURL":"foto.png"
          "origin":"origen"
          "bio":"la bio"
          "profileURL":"link de su perfil"
          "activities":"actividades"
        },
        "coordinator":"coordinador"
        "participant":"particioant"
        "module":"modulo"
        "moduleTitle":"titulo del modulo"
        "moduleCoordinator":"coordinador del modulo"
      }],

      ###ivote
      "tituloActividad":"titulo"
      "crearCuestionario":"cuestionario"
    
      ###Mesa directiva:
      "president":"id de usuario",
      "vicepresident":"id de usuario",
      "secretary":"id de usuario"
      "treasurer":"id de usuario"
      "protreasurer":"id de usuario"
      "proceedingsSecretary":"id de usuario"
      "relationsSecretary":"id de usuario"    
      "consultiveDirectors":["ids de usuario"]   
      "courseDirector":"id de usuario"
      "generalCoordinator":"id de usuario"
      "participationAsosiations":[id de instituciones],            
      ###Imagen
      photoURL:"imagen.png"
      logosInstituciones:["imagen.png"]      
      ###Descargables      
      permisoURL:"permiso.pdf"
      constanciaURL:"constancia.pdf"
      programaURL :"programa.pdf"
    }



