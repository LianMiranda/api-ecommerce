import { config } from "dotenv";
import { app } from "..";
config()

const port= process.env.PORT

app.listen(port, () => console.log(`listening on port ${port}`))