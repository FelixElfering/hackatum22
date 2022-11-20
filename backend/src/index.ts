import { AppDataSource } from "./data-source"

AppDataSource.initialize().then(async () => {
    console.log("DB connection is up and running");
}).catch(error => console.log(error))
