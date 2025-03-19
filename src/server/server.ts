import { app } from "..";
import env from "../config/env";

const port = env.port;

app.listen(port, () => console.log(`listening on port ${port}`));
