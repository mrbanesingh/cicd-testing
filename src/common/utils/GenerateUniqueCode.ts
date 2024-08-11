const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";

const getRandomCharacter = (chars: string): string =>
  chars.charAt(Math.floor(Math.random() * chars.length));

export const generateUniqueCode = (): string => {
  const codeLength = 8;
  const numDigits = 3;

  const codeArray: string[] = ["C"];

  for (let i = 0; i < numDigits; i++) {
    codeArray.push(getRandomCharacter(numbers));
  }

  for (let i = 0; i < codeLength - numDigits - 1; i++) {
    codeArray.push(getRandomCharacter(letters));
  }

  for (let i = codeArray.length - 1; i > 1; i--) {
    const j = Math.floor(Math.random() * (i - 1)) + 1;
    [codeArray[i], codeArray[j]] = [codeArray[j], codeArray[i]];
  }

  return codeArray.join("");
};
