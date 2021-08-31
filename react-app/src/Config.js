import prod from "./Config/Production";
import dev from "./Config/Development";
const config = {
    getEnv(){
        if(process.env.NODE_ENV === 'production'){
            return prod
        }

        return dev
    }
};

export default config.getEnv();