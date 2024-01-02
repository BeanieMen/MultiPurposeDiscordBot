import { config } from "dotenv";
import { exec } from "child_process";
import { Chess, ResponseApod } from "../types/type";
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

export async function getPuzzle(key: string): Promise<Chess> {
  const apiUrl = `https://lichess.org/api/puzzle/daily`;
  const respone = (await new Promise((resolve, reject) => {
    const command = `curl -i '${apiUrl}' -H 'Authorization Bearer: ${key}'`;
    exec(command, (error, stdout) => {
      if (error) {
        console.error(`Error executing curl: ${error}`);
        reject(error);
        return;
      }
      resolve(stdout);
    });
  })) as string;
  const jsonString = respone.split("\n").pop() as string;

  const puzzle = JSON.parse(jsonString ?? "");
  return puzzle as Chess;
}
