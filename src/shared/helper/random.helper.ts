import { randomInt } from 'crypto';

export function generateRandomString(
  length: number = 12,
  charSets: string[] = [
    '0123456789',
    'abcdefghijklmnopqrstuvwxyz',
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    '#!&@',
  ],
): string {
  const allCharacters = charSets.join('');

  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = randomInt(0, allCharacters.length);
    randomString += allCharacters[randomIndex];
  }

  return randomString;
}
