const chalk = require("chalk");
const { isEmpty, typeMatch } = require("./improve");

const color = {
	green: [0, 255, 0],
	black: [0, 0, 0],
	yellow: [255, 255, 0],
	orange: [255, 189, 0],
	white: [255, 255, 255],
	red: [255, 40, 33],
    pink: [255,20,147]
};

/*
    DRAGON[RED]     -> SUPER HIGH LEVEL -> FATAL ERROR
    MAMBA [BLACK]   -> VERY HIGH LEVEL  -> NON FATAL ERROR
    BEE   [ORANGE]  -> WARNING INFO LOGS
    ANT   [YELLOW]  -> GOOD LOGS
*/

const typeCleaner = (type) => {
    type = type.toLowerCase();
	if (type === "se" || type === 'server') {
        type = "Server"
	} else if (type === "ce" || type === 'client') {
        type = "Client"
	} else if (type === "de" || type === 'database' || type === 'db') {
        type = "Database"
	} else if (type === "cron") {
        type = "Cron"
	}
	return  type
};

const timeNow = () => {
	return new Date().toLocaleString();
};

class loggerClass {
	constructor(filepath) {
		this.filepath = filepath.split("\\");
		this.filepath = this.filepath[this.filepath.length - 1];
	}

	log = (...args) => {
		string = "";

		args.forEach((element, index) => {
			if (index === 0) {
				string += element;
			} else {
				string += " >> " + element;
			}
		});

		console.log(chalk.rgb(...color.green)(string));
	};

	success = (type, message) => {

		const messageFormat = `Success Info >> ${timeNow()} >> ${this.filepath} >> ${message}`;

		console.log(
			chalk.bgRgb(...color.green).rgb(...color.black)(messageFormat)
		);
	};

	info = (typeAliasVersion, status, message) => {
        const typeFull = typeCleaner(typeAliasVersion.split("_")[0]);
        
		const messageFormat = `${typeFull} Info  >> ${timeNow()} >> Status ${status} >> Code ${typeAliasVersion} >> ${this.filepath} >> ${message}`;

		console.log(
			chalk.bgRgb(...color.white).rgb(...color.black)(messageFormat)
		);
	};

	warning = (typeAliasVersion,statuscode, message) => {

        const errorType = typeCleaner(typeAliasVersion.split("_")[0]);
		const messageFormat = `${errorType} Warning >> ${timeNow()} >> Status ${statuscode} >> Code ${typeAliasVersion} >> ${this.filepath} >> ${message}`;

		console.log(
			chalk.bgRgb(...color.orange).rgb(...color.black)(messageFormat)
		);
	};


	error = (typeAliasVersion, status, level, message) => {

        const typeFull = typeCleaner(typeAliasVersion.split("_")[0]);

        if (!["mamba", "dragon", "ant", "bee"].includes(level)) {
            level = "unknown";
        }
        level = level[0].toUpperCase() + level.slice(1);
        const messageFormat = `${typeFull} Error >> ${timeNow()} >> Level ${level} >> Status ${status} >> Code ${typeAliasVersion} >> ${this.filepath} >> ${message}`;
        console.log(
            chalk.bgRgb(...color.red).rgb(...color.white)(messageFormat)
        );
	};

    cron =  (message) => {
        const messageFormat = `CronJob Info >> ${timeNow()} >> ${message}`;

        console.log(
            chalk.bgRgb(...color.pink).rgb(...color.white)(messageFormat)
        );
    }
}

const logger = (filepath) => {
	return new loggerClass(filepath);
};

module.exports = { logger};
