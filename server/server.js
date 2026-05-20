const express =require('express');
const app =express();
const mongoose=require("mongoose")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const dotenv = require("dotenv");
dotenv.config();
const users=require("./models/Users");
const Register = require('./Controllers/Userregister');
const registerValidator = require('./Validators/RegisterValidator');
const loginValidator = require('./Validators/loginValidator');
const Login = require('./Controllers/userlogin');
const testRoute = require('./Controllers/testRoute');
const RolesMiddleware = require('./security/RolesMiddleware');

const bcrypt = require('bcrypt');



const passport = require('passport');
const adminRoute = require('./Controllers/admin');
require('./security/passport');




const cors = require('cors');
app.use(cors());





//importing profile controllers


const { 
  addprofileRoute, 
  showprofileRoute, 
  showallprofilesRoute, 
  deleteprofileRoute,
  deletespeceficuserbyadminRoute,
  showspeceficprofilebyadminRoute,
  updateprofileRoute,
  showusersbyadminRoute,
  showuserinfobyadminRoute
  
} = require('./Controllers/profile');




addProfileValidator = require('./Validators/validateaddprofile');
updateProfileValidator = require('./Validators/updateProfileValidator');





const connectDB = async () => {
    try {
        // Replace with your actual MongoDB URI (Local or Atlas)
        if (!process.env.MONGO_URI) {
         throw new Error("MONGO_URI is missing");
            }

        const mongoURI = process.env.MONGO_URI;
        
        await mongoose.connect(mongoURI);
        
        console.log("🚀 MongoDB Connected Successfully!");
    } catch (err) {
        console.error("❌ Database Connection Failed:", err.message);
        process.exit(1); // Stop the app if connection fails
    }
};







// Routes

//register route
app.post("/register", registerValidator, Register);

//login route
app.post("/login", loginValidator, Login);






//test route (protected)

app.get('/test', passport.authenticate('jwt', { session: false }),
RolesMiddleware(['admin', 'user']), // Only allow 'admin' and 'user' roles to access this route
testRoute
);

//admin route (protected)

app.get('/admin', passport.authenticate('jwt', { session: false }),
RolesMiddleware(['admin']), // Only allow 'admin' role to access this route   
adminRoute
);


// reload problem
app.get('/user', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user); // passport already decoded the token and put user here
});







/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/profile', passport.authenticate('jwt', { session: false }),
RolesMiddleware(['admin', 'user']),
addProfileValidator,
addprofileRoute
);




app.get('/profile', passport.authenticate('jwt', { session: false }),
RolesMiddleware(['admin', 'user']), // Only allow 'admin' and 'user' roles to access this route   
showprofileRoute
);


app.delete('/deleteprofile', passport.authenticate('jwt', { session: false }),
RolesMiddleware(['admin', 'user']), // Only allow 'admin' and 'user' roles to access this route
deleteprofileRoute
);





app.put('/updateprofile', passport.authenticate('jwt', { session: false }),
RolesMiddleware(['admin', 'user']), 
updateProfileValidator,// Only allow 'admin' and 'user' roles to access this route
updateprofileRoute
);







////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////










////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// show profile by admin

app.get('/showprofilebyadmin/:id', passport.authenticate('jwt', { session: false }),
RolesMiddleware(['admin']), // Only allow 'admin' role to access this route
showspeceficprofilebyadminRoute
);


app.get('/profiles', passport.authenticate('jwt', { session: false }),
RolesMiddleware(['admin']), // Only allow 'admin' role   to access this route   
showallprofilesRoute
);



app.get('/admin/users', passport.authenticate('jwt', { session: false }),
RolesMiddleware(['admin']), // Only allow 'admin' role to access this route
showusersbyadminRoute
);



app.delete('/admin/deleteuser/:id', passport.authenticate('jwt', { session: false }),
RolesMiddleware(['admin']), // Only allow 'admin' role to access this route
deletespeceficuserbyadminRoute
);



app.get('/admin/user/:id', passport.authenticate('jwt', { session: false }),
RolesMiddleware(['admin']), // Only allow 'admin' role to access this route
showuserinfobyadminRoute
);






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////













connectDB();
app.listen(process.env.PORT,()=>console.log(`Server is running on port ${process.env.PORT}`));





