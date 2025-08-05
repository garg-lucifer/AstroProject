export function getFirstXChars(str: string, noOfChars: number) {
  return str.length <= noOfChars ? str : str.slice(0, noOfChars);
}
