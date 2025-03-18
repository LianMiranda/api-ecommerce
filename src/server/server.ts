import { app } from "..";

const port = process.env.PORT;

app.listen(port, () => console.log(`listening on port ${port}`));
