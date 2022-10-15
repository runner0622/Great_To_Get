/*

    s -> seconds
    m -> minutes
    h -> hours
    d -> days
    y -> years

*/

const timeAt = (timing) => {
	if (timing === '30 seconds') {
		timing = 30*1000 + Date.now();
	}
	else if (timing === '5 minutes') {
		timing = 60*5*1000 + Date.now();
	}
	else if (timing === '15 minutes') {
		timing = 60*15*1000 + Date.now();
	}
	else if (timing === '30 minutes'){
		timing = 60*30*1000 + Date.now();
	}
	else if (timing === '1 hour') {
		timing = 60*60*1*1000 + Date.now();
	}
	else if (timing === '2 hours') {
		timing = 60*60*2*1000 + Date.now();
	}
	else if (timing === '4 hours') {
		timing = 60*60*4*1000 + Date.now();
	}
	else if (timing === '8 hours') {
		timing = 60*60*6*1000 + Date.now();
	}
	else if (timing === '12 hours') {
		timing = 60*60*12*1000 + Date.now();
	}
	else if (timing === '1 day') {
		timing = 60*60*24*1000 + Date.now();
	}
	else if (timing === '7 days') {
		timing = 60*60*24*7*1000 + Date.now();
	}
	else if (timing === '14 days') {
		timing = 60*60*24*14*1000 + Date.now();
	}
	else if (timing === '1 month'){
		timing = 60*60*24*30*1000 + Date.now();
	}
	else if (timing === '3 months'){
		timing = 60*60*24*30*3*1000 + Date.now();
	}
	else if (timing === '6 months'){
		timing = 60*60*24*30*6*1000 + Date.now();
	}
	else if (timing === '1 year'){
		timing = 60*60*24*30*12*1000 + Date.now();
	}
	else if (timing === '3 years'){
		timing = 60*60*24*30*12*3*1000 + Date.now();
	}
	else if (timing === '5 years'){
		timing = (60*60*24*30*12*5*1000) + Date.now();
	}
	else{
		timing =  (60*60*24*30*12*10*1000) + Date.now();
	}
	return timing;
}



module.exports = {timeAt};