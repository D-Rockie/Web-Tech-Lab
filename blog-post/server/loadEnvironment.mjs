// Loads the variables from server/.env into process.env.
// This file is imported FIRST in index.mjs, before anything reads process.env,
// otherwise ATLAS_URI would still be undefined when db/conn.mjs runs.
import dotenv from "dotenv";

dotenv.config();
