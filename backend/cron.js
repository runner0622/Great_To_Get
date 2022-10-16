import cronSchedule from 'node-schedule';

// importing cronJOBS
import autoDeleteRefreshToken from './controllers/Cron/autoDeleteRefreshToken';

// importing logger
import logger from './improve/logger';

const log = logger()


const runCrons = () => {
    // run @daily
    cronSchedule.scheduleJob("* * * * *",()=>{
        if (autoDeleteRefreshToken.autoDeleteRefreshToken()){
            log.cron("Ran autoDeleteRefreshToken | @Daily")
        }else{
            log.error("CRON_XX_1 500",  "dragon", "Failed Cron autoDeleteRefreshToken | @Daily")
        }
    })
}

export default { runCrons };