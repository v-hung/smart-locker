import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

export const BASE_DIR = path.dirname(__filename);
