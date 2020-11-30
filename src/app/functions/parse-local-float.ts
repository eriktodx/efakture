export function parseLocalFloat(str: string) {
  if (str == null) return NaN;
  const validChars = '1234567890.,';
  let countCommas = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (validChars.indexOf(char) === -1) return NaN;
    if (char === ',') countCommas++;
  }
  if (countCommas > 1) return NaN;
  const strSplit = str.split(',');
  const firstPart = strSplit[0].replace(/\./g, '');
  const secondPart = strSplit[1];
  const enFormatedNumberStr = firstPart + (secondPart ? ('.' + secondPart) : '');
  return parseFloat(enFormatedNumberStr);
}