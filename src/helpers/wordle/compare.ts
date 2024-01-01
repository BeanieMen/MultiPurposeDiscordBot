export function compare(source: string, target: string): { result: string; correct: boolean } {
  let result = "";
  for (let i = 0; i < source.length; i++) {
    // a==a
    if (source[i] == target[i]) {
      result += ":green_square:";
    } else {
      // abcde includes a
      result += target.includes(source[i]) ? ":yellow_square:" : "⬛";
    }
  }
  if (result === ":green_square::green_square::green_square::green_square::green_square:") {
    return { result: result, correct: true };
  } else {
    return { result: result, correct: false };
  }
}

export function getRandom(list: string[]) {
  return list[Math.floor(Math.random() * list.length)];
}
