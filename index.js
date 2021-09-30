const http = require("http");
const app = require("./app");
const httpServer = http.createServer(app);
require("dotenv").config();
const PORT = process.env.PORT;

httpServer.listen(PORT, () => {
    console.log(`Server speaks to PORT ${PORT}`);
});
