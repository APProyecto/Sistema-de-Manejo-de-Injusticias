export const formatNumber = (num: string | number): string => {

  const numberValue = typeof num === 'string' ? parseFloat(num) : num;
  
  if (isNaN(numberValue)) return '0';
  
  if (numberValue < 1000) return numberValue.toString();
  
  const formatter = new Intl.NumberFormat('en', { 
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1
  });
  
  return formatter.format(numberValue);
};

export const formatDate = (date: string): string => {
 return new Date(date).toLocaleDateString('es-CR')
}