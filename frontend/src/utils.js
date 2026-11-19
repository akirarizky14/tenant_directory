export const KATEGORI = ['F&B', 'Fashion', 'Elektronik', 'Jasa'];

export function namaLantai(lantai) {
  if (lantai === 'GF') return 'Ground Floor';
  return 'Lantai ' + lantai.replace('L', '');
}
