import { Module } from "@nestjs/common";
import { MongoClient } from "mongodb";

@Module({
    providers: [{
        provide: "DATABASE",
        useFactory: async () => {
            const db = await MongoClient.connect("mongodb://localhost")
            return db.db("sims")
        }
    }],
    exports: ['DATABASE'],
})
export class DatabaseModule { }