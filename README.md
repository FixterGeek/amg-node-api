# Models and Endpoints Documentation
## Content:
 - [Users](#users)
 - [Activities](#activities)
 - [Institutions](#institutions)
 - [Internships](#internships)
 - [Residences](#residences)
 - [Studies](#studies)
 - [Events](#events)
 - [Event Modules](#event-modules)
 - [EventsActivities](#event-activities)
 - [Publications](#publications)
 - [Exams](#exams)
 - [ExamResponses](#exam-responses)


 Send all queries as MONGODB syntax in String format(stringify)

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
  ### Follow/Unfollow User
    POST /users/:userId/follow
  ### get a single user
    GET /users/:userId
  ### update a user
    PATCH /users/:userId
    // Send the user image file in the photo field
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
        "speciality" :=> ['Gastroenterología', 'Endoscopia', 'Motilidad', 'Medicina Interna', 'Cirujano', 'Otras']      
        "photoURL":"url de la foto",        
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
      "userType": enum:['Member', 'Editor', 'Admin'],
      "membershipStatus":"one of these=>: enum:['Free', 'Residente', 'Socio', 'Veterano'], 
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
# Events

## Endpoints 
  ### Get all events
    GET /events?query={"filter":"value"}&limit=20&skip=0  
  ### post an event
    POST /events
  ### ASSIST/UNASSIST an event
    POST /events/:eventId/assist
  ### add/remove a speaker
    POST /events/:eventId/speaker

     it receives the object of the speaker in req.body and adds it to the speakers list in the event
     if it has _id, it deletes it from the list
  ### get a single event
    GET /events/:eventId
  ### update an event
    PATCH /events/:eventId
  ### delete an event
    DELETE /events/:eventId

  ## Fields for images or files
    permisos
    constancias
    programas
    logosInstitucionales
    mainImages
    thumbnailImages
    iconImages    
    ## Fields for speaker image
    photo

  

## Model
    {
      ### Datos Generales
      "title":"El evento del año"
      startTime:"10:10:10"
      "startDate":"01/01/2019"
      "endDate":"01/01/2019"
      "description":['parrafo1', 'Párrafo2],

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
     modules:[ids de los modulos],
     ###speakers
     speakers:[{
          title:'doctorazo'
          fullName:'Oswaldso Martinez Anaya'
          photoURL::'lalalalal.png'
          city:'Pachuyork'
          bio:'fit n geek'        
        }]

      mainImagesURLS:[image urls],
      thumbnailImagesURLS:[image urls],
      iconImagesURLS:[image urls],
      permisosURLS:[carta permiso url]
    }

<a name="event-modules"></a>
# Modules

## Endpoints 
  ### Get all eventModules 
    GET /eventModules?query={"filter":"value"}&limit=20&skip=0
  ### post an eventModule
    POST /eventModules      
  ### get a single eventModule
    GET /eventModules/:moduleId
  ### update an eventModule
    PATCH /eventModules/:moduleId
  ### delete an eventModule
    DELETE /eventModules/:moduleId

  ## Model
    {
      event:id del evento ,
      title:String,
      date:String,
      /*just in case*/
      activities:[{
        type:Schema.Types.ObjectId,
        ref:'EventActivity'
      }]
    }

<a name="event-activities"></a>
# Event Activities

## Endpoints 
  ### Get all events
    GET /eventActivities?query={"filter":"value"}&limit=20&skip=0  
  ### post an event
    POST /eventActivities
  ### ASSIST/UNASSIST an activity
    POST /eventActivities/:eventActivityId/assist
  ### get a single event
    GET /eventActivities/:eventActivityId
  ### update an event
    PATCH /eventActivities/:eventActivityId
  ### delete an event
    DELETE /eventActivities/:eventActivityId

  ## Fields for images or files    
    constancia
    speakerPhoto

    
## Model
    {
        event:Event Id,
        module:Module Id,
        activityName:'Name of the activity
        activityType:['Actividad', 'Conferencia', 'Taller', 'Otro']
        cost:1000
        date:10/10/2019 
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
        constanciaURL:constanciaURL,
        speakers:[{}],
        //asistentes
        assistants:[ids de los asistentes]
    }


<a name="publications"></a>
# Publications

## Endpoints 
  ### Get all publications 
    GET /publications?query={"filter":"value"}&limit=20&skip=0
    //to get the favorites of a user
    /publications?query={"liked":{"$in":["userID"]}}
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

  ## Model
    {
      user:
      urls:['url1', 'url2', 'url3'],
      //para post mandar los archivos en formdata en el field images
      //para get viene el array de los links de los archivos
      imagesURLS:[],
      //para post mandar los archivos en formdata en el field docs
      //para get viene el array de los links de los archivos
      docsURLS:[],
      text:"texto del post",
      liked:[urls de los usuarios que agregaron como fav el post]
    }

<a name="exams"></a>
# Exams

## Endpoints 
  ### Get all exams 
    GET /exams?query={"filter":"value"}&limit=20&skip=0
  ### post an post
    POST /exams  
  ### get a single post
    GET /exams/:examId
  ### update an post
    PATCH /exams/:examId
  ### delete an post
    DELETE /exams/:examId

  ## Model
    {
      eventActivity: ID of the Activity EVent
      title:El examen más perro del mundo,
      date:10/10/10,
      beginingTime:String,
      endTime:String,
      questions:[{
        question:¿Porqué bla bla bla?,
        answers:['la uno', 'la dos', 'la tres', 'la cuatro'],
        correct:'la tres'
      }]
    }

<a name="exam-responses"></a>
# Exam Responses

## Endpoints 
  ### Get all publications 
    GET /publications?query={"filter":"value"}&limit=20&skip=0
    //to get the favorites of a user
    /publications?query={"liked":{"$in":["userID"]}}
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

  ## Model
    {
      exam:ID of the Exam
      user: ID of the user who ansers
      answers:[
        {
          question:'kiubo??',
          answer:'lol'
        },    
      ],
      score:10
    }



