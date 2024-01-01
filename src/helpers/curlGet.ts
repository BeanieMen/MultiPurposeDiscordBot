import { config } from "dotenv";
import { exec } from "child_process";
import { ResponseApod } from "../types/type";
config();

const currentDate = new Date().toISOString().split("T")[0];

export async function getApod(key: string, date?: string): Promise<ResponseApod> {
  date = date ? date : currentDate;
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${date}&thumbs=true`;
  const respone = await new Promise((resolve, reject) => {
    const command = `curl ${apiUrl}`;
    exec(command, (error, stdout) => {
      if (error) {
        console.error(`Error executing curl: ${error}`);
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
  const jsonData = JSON.parse(respone as string);
  return jsonData;
}
