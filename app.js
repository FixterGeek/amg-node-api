require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const passport = require('passport');
require('./helpers/passport');
const cors = require('cors')
const session = require('express-session')


mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

//cors
app.use(cors({
  origin:'*'
}))

//passport
app.use(passport.initialize());
app.use(passport.session());


// default value for title local
app.locals.title = 'Express - Generated with Fixter Generator';



const index = require('./routes/index');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');
const institutionRoutes = require('./routes/institutions');
const activityRoutes = require('./routes/activities');
const internshipRoutes = require('./routes/internships');
const residenceRoutes = require('./routes/residences');
const studyRoutes = require('./routes/studies');
const publicationsRoutes = require('./routes/publications');
const eventActivityRoutes = require('./routes/eventActivities');
const eventModuleRoutes = require('./routes/modules');
const examRoutes = require('./routes/exams');
const examResponseRoutes = require('./routes/examResponses'); 
const paymentRoutes = require('./routes/payments'); 
const recursoRoutes = require('./routes/recursos'); 
const invoiceRoutes = require('./routes/invoices'); 
const dataFacturacionRoutes = require('./routes/dataFacturacion'); 
const courseRoutes = require('./routes/courses'); 
const courseModulesRoutes = require('./routes/courseModules'); 
const courseActivitiesRoutes = require('./routes/courseActivities'); 
const filialesRoutes = require('./routes/filiales'); 

app.use('/', index);
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/events', eventRoutes)
app.use('/institutions', institutionRoutes)
app.use('/activities', activityRoutes)
app.use('/internships', internshipRoutes)
app.use('/residences', residenceRoutes)
app.use('/studies', studyRoutes)
app.use('/publications', publicationsRoutes)
app.use('/eventActivities', eventActivityRoutes)
app.use('/eventModules', eventModuleRoutes)
app.use('/exams', examRoutes)
app.use('/examResponses', examResponseRoutes)
app.use('/payments', paymentRoutes)
app.use('/recursos', recursoRoutes)
app.use('/invoices', invoiceRoutes)
app.use('/dataFacturacion', dataFacturacionRoutes)
app.use('/courses', courseRoutes)
app.use('/courseModules', courseModulesRoutes)
app.use('/courseActivities', courseActivitiesRoutes)
app.use('/filiales', filialesRoutes)


module.exports = app;
