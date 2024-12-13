require('dotenv').config();
const path = require('path');
const express =require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const app=express();
const sequelize = require('./util/database');
const compression = require('compression');
const helmet = require('helmet');
app.use(cors({
    origin:"*"
}));
//updated finally
app.use(bodyParser.json({extended:false}));
app.use(express.urlencoded({ extended: true }));
const User = require('./models/user');
const Service = require('./models/services');
const Availability = require('./models/availibility');
const Appointment = require('./models/Appointment');
const serviceRoutes = require('./routes/services');
const userroutes = require('./routes/user');






Service.hasMany(Availability, { foreignKey: 'serviceId', onDelete: 'CASCADE' });
Availability.belongsTo(Service, { foreignKey: 'serviceId' });

User.hasMany(Appointment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Appointment.belongsTo(User, { foreignKey: 'userId' });

Service.hasMany(Appointment, { foreignKey: 'serviceId', onDelete: 'CASCADE' });
Appointment.belongsTo(Service, { foreignKey: 'serviceId' });

// Add the Cross-Origin-Opener-Policy (COOP) header middleware
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  next();
});

// Optional: Add Content-Security-Policy header for form action as fallback
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net;");
  next();
});


app.use(compression());
app.use(helmet());

//app.use(express.static(path.join(__dirname, 'public')));
app.use('/user',userroutes);
app.use('/salon',serviceRoutes);

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  next();
});
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net;");
  next();
});
app.use((req,res)=>{
  console.log(req.url);
  res.sendFile(path.join(__dirname,`public/${req.url}`))
})




sequelize.sync()
  .then((result) => {
  
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server running on port 3000'+process.env.PORT);
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

