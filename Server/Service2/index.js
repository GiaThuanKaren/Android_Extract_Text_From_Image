const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Running At PORT ${PORT}`);
});
