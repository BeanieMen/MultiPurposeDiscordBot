import { config } from "dotenv";
import { Chess, ResponseApod } from "../types/type";
import axios from "axios";
config();

const currentDate = new Date().toISOString().split("T")[0];

export async function getApod(key: string, date?: string): Promise<ResponseApod> {
  date = date ? date : currentDate;
  const apiUrl = `https://api.nasa.gov/planetary/apod`;

  try {
    const response = await axios.get(apiUrl, {
      params: {
        api_key: key,
        date: date,
        thumbs: true,
      },
    });

    const jsonData = response.data as ResponseApod;
    return jsonData;
  } catch (error) {
    console.error(`Error making request: ${error}`);
    throw error;
  }
}

export async function getPuzzle(key: string): Promise<Chess> {
  const apiUrl = "https://lichess.org/api/puzzle/daily";

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });

    const puzzle = response.data as Chess;
    return puzzle;
  } catch (error) {
    console.error(`Error making request: ${error}`);
    throw error;
  }
}
