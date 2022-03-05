
import { create } from axios;

const myserverINstance = create({
    baseURL: process.env.API_ENDPOINT
})


const firebaseInstance = create({
    baseURL: process.env.API_ENDPOINT
})

export { axiosInstsance, firebaseInstance };