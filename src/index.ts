import * as dotenv from "dotenv";
dotenv.config();
import * as express from 'express';

// Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

const PORT = process.env.PORT || 6000

async function start() {
	try {
		app.listen(PORT, () => {
            // initializeDataProvider();
            // await executeRestActionExample();
            // await fetchOAuthTokenExample();
			console.log(`API is running on port ${PORT}!`);
		});
	} catch (error) {
		console.log(error);
	}
}

start()