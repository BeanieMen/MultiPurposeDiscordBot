import { exec } from "child_process";

export async function pgnToFen(pgn: string) {
  const respone = (await new Promise((resolve, reject) => {
    const command = `echo -e ${pgn} | pgn-extract -Wepd`;
    exec(command, (error, stdout) => {
      if (error) {
        console.error(`Error executing curl: ${error}`);
        reject(error);
        return;
      }
      resolve(stdout);
    });
  })) as string;
  const fenList = respone.split("\n");
  return fenList[fenList.length - 3].split(" ")[0];
}
