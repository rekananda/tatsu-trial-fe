export const getInitial = (str: string, length: number = 2): string => {
  return str.match(/\b\w/g)?.slice(0, length).join('').toUpperCase() || '';
};

export const capitalize = (str: string): string => {
  return str.replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase());
}

export function formatNumber(num: number): string {
  if (num < 1000) {
      return num.toString();
  }
  const units = ["K", "M", "B", "T"];
  let unitIndex = -1;
  let scaledNum = num;

  while (scaledNum >= 1000 && unitIndex < units.length - 1) {
    scaledNum /= 1000;
    unitIndex++;
  }

  return scaledNum.toFixed(1) + units[unitIndex];
}
