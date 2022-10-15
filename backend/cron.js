const cronSchedule = require("node-schedule");

// importing cronJOBS
const autoDeleteRefreshToken = require("./controllers/Cron/autoDeleteRefreshToken")

// importing logger
const { logger } = require("./improve/logger")
const log = logger(__filename)


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

module.exports = { runCrons }