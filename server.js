import app from './app.js';
import { dbConnection }  from "./database/dbConnection.js";

dbConnection();
app.listen(process.env.PORT, () =>{
    console.log(`Server listening on port ${process.env.PORT}`);
});