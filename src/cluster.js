const cluster = require("cluster");
const app = require("./bin/index");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
	console.log(`Master ${process.pid} is running`);
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on("exit", (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`);
	});
} else {
	app();
	console.log(`Worker ${process.pid} started`);
}
