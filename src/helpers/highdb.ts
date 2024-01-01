import { JSONFilePreset } from "lowdb/node";
import { DB } from "../types/type";
const defaultData: DB = {};

export async function setDB(username: string, tries: number, word: string, guesses: string[], location?: string): Promise<void> {
  location = location ? location : "db.json";
  const db = await JSONFilePreset(location, defaultData);
  db.data[username] = { word: word, tries: tries, guesses: guesses };
  await db.write();
  await db.read();
}

export async function getDB(username: string, location?: string) {
  location = location ? location : "db.json";
  const db = await JSONFilePreset(location, defaultData);
  await db.read();
  return db.data[username];
}
