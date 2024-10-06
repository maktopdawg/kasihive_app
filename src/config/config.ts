import mongoose from "mongoose";

export const connect = async () => {
    try {
        mongoose.connect(process.env.DATABASE_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('[server]: Connection to database successful.')
        });

        connection.on('error', (error: any) => {
            console.log('[server]: Connection to database unsuccessful.\n' + error);
            process.exit();
        })

    } catch (error: any) {
        console.log("[server]: Something went wrong.")
        console.log(error)
    }
}