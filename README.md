# Models and Endpoints Documentation
## Content:
 - [Users](#users)
 - [Activities](#activities)
 - [Institutions](#institutions)
 - [Internships](#internships)
 - [Residences](#residences)
 - [Studies](#studies)
 - [Events](#events)
 - [Publications](#publications)

<a name="users"></a>
# Users

## Endpoints 

  ### Signup
    POST /auth/signup
  ### Login
    POST /auth/login
  ### Get auth User
    GET /auth/self
  ### change password
    POST /auth/change
    {email, oldPassword, newPassword}
  ### change password if forgotten
    POST /auth/forgot
    {email, password}
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
      "userStatus":"one of these=>['Registrado','Pendiente', 'Aprobado', 'No Aprobado']", 
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
<a name="activities"></a>
# Activities 

## Endpoints

### Get all activities
    GET /activities?query={"filter":"value"}&limit=20&skip=0  
  ### post an activity
    POST /activities
  ### get a single activity
    GET /activities/:activityId
  ### update an activity
    PATCH /activities/:activityId
  ### delete an activity
    DELETE /activities/:activityId

##Model

    {
      user: ID of the User
      type:one of these['Hospitalaria', 'Docente', 'Sociedad'],
      institution:ID of an Institution
      //If Docente
      subject:'La materia'
      //If Hospitalaria
      charge :'El cargo'
      startDate :'10/10/2010',
      endDate :'10/10/2010'
    }


<a name="institutions"></a>
# Institutions

## Endpoints

### Get all institutions
    GET /institutions?query={"filter":"value"}&limit=20&skip=0  
  ### post an institushion
    POST /institutions
  ### get a single activity
    GET /institutions/:institushionId
  ### update an institushion
    PATCH /institutions/:institushionId
  ### delete an institushion
    DELETE /institutions/:institushionId

##Model

    {         
      name:'Institution Name'
      president:''
      type: => ['Hospital', 'Escuela', 'Consultorio', 'Sociedad']      
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
      phones:[124123412341234,123412341234],
      email:'institutionmail@mail.com'
      logoURL:'institution.jpg'  
    }

<a name="internships"></a>
# Internships

## Endpoints

### Get all internships
    GET /internships?query={"filter":"value"}&limit=20&skip=0  
  ### post an internship
    POST /internships
  ### get a single activity
    GET /internships/:internshipId
  ### update an internship
    PATCH /internships/:internshipId
  ### delete an internship
    DELETE /internships/:internshipId

##Model

    {
      user:User ID,
      institution:Institution ID,
      startDate:'10/10/10',
      endDate :'10/10/10',
    }


<a name="residences"></a>
# Residences 

## Endpoints

### Get all residences
    GET /residences?query={"filter":"value"}&limit=20&skip=0  
  ### post an residence
    POST /residences
  ### get a single activity
    GET /residences/:residenceId
  ### update an residence
    PATCH /residences/:residenceId
  ### delete an residence
    DELETE /residences/:residenceId

##Model

    {
      user:User ID,
      speciality:'especialidad',
      institution:InstitutionID,  
      startDate:'10/10/10'
      endDate :'10/10/10'
      specialityLicence:'CEdula de especialidad'
      specialityLicenceCopy :'file.jpg'
      specialistLicence:'cedula de especialidad'
      specialityDirectorsCertificates:'certificados del consejo de especialidad'
    }

<a name="studies"></a>
# Studies

## Endpoints

### Get all studies
    GET /studies?query={"filter":"value"}&limit=20&skip=0  
  ### post an study
    POST /studies
  ### get a single activity
    GET /studies/:studyId
  ### update an study
    PATCH /studies/:studyId
  ### delete an study
    DELETE /studies/:studyId

##Model

    {
      user:User ID,
      major:'Carrera'
      institution:Institution ID,
      startDate:'10/10/2010'
      endDate:'10/10/2010'
      //(Año de titulación)
      receptionDate :'10/10/2015'
      professionalLicence:'Cédula profesional'
    }

<a name="events"></a>
# Eventsv

## Endpoints 
  ### Get all events
    GET /events?query={"filter":"value"}&limit=20&skip=0  
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
<a name="publications"></a>
# Publications

## Endpoints 
  ### Get all publications
    GET /publications?query={"filter":"value"}&limit=20&skip=0  
  ### post an post
    POST /publications
  ### LIKE/DISLIKE a post
    POST /publications/:publicationId/like
  ### get a single post
    GET /publications/:publicationId
  ### update an post
    PATCH /publications/:publicationId
  ### delete an post
    DELETE /publications/:publicationId



