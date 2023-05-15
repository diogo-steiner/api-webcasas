import { app } from "./app";

const port = process.env.SERVER_PORT || 3001;
app.listen(Number(port), "0.0.0.0", () =>
  console.log(`Server running - port ${port}`)
);
