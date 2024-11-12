const express = require("express");
const app = express();
app.use(express.json());
const PORT = 8080;

const useRouter = require("./Routers/userRoute");
app.use("/user", useRouter);

app.listen(PORT, console.log(`server is running on ${PORT}`));
