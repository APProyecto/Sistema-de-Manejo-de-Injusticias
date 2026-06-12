import type { simpleEntity } from '../types';

export const mockEntities: simpleEntity[] = [
  // Companies (categoryId: 1)
  { id: 1, categoryId: 1, name: 'Google', picture: 'https://via.placeholder.com/40/4285F4/white?text=G' },
  { id: 2, categoryId: 1, name: 'Microsoft', picture: 'https://via.placeholder.com/40/00A4EF/white?text=M' },
  { id: 3, categoryId: 1, name: 'Apple', picture: 'https://via.placeholder.com/40/000000/white?text=A' },
  { id: 4, categoryId: 1, name: 'Amazon', picture: 'https://via.placeholder.com/40/FF9900/white?text=A' },
  { id: 5, categoryId: 1, name: 'Tesla', picture: 'https://via.placeholder.com/40/E82127/white?text=T' },
  { id: 6, categoryId: 1, name: 'Netflix', picture: 'https://via.placeholder.com/40/E50914/white?text=N' },
  { id: 7, categoryId: 1, name: 'Meta', picture: 'https://via.placeholder.com/40/0668E1/white?text=M' },
  { id: 8, categoryId: 1, name: 'Nike', picture: 'https://via.placeholder.com/40/7C4A2A/white?text=N' },
  { id: 9, categoryId: 1, name: 'Coca-Cola', picture: 'https://via.placeholder.com/40/F40000/white?text=C' },
  { id: 10, categoryId: 1, name: 'Disney', picture: 'https://via.placeholder.com/40/000080/white?text=D' },

  // Organizations (categoryId: 2)
  { id: 11, categoryId: 2, name: 'Greenpeace', picture: 'https://via.placeholder.com/40/009E60/white?text=G' },
  { id: 12, categoryId: 2, name: 'Amnesty International', picture: 'https://via.placeholder.com/40/000000/white?text=A' },
  { id: 13, categoryId: 2, name: 'Red Cross', picture: 'https://via.placeholder.com/40/FF0000/white?text=R' },
  { id: 14, categoryId: 2, name: 'UNESCO', picture: 'https://via.placeholder.com/40/000080/white?text=U' },
  { id: 15, categoryId: 2, name: 'World Health Organization', picture: 'https://via.placeholder.com/40/004080/white?text=W' },
  { id: 16, categoryId: 2, name: 'Doctors Without Borders', picture: 'https://via.placeholder.com/40/000000/white?text=D' },
  { id: 17, categoryId: 2, name: 'WWF', picture: 'https://via.placeholder.com/40/000000/white?text=W' },

  // Persons (categoryId: 3)
  { id: 18, categoryId: 3, name: 'Elon Musk', picture: 'https://via.placeholder.com/40/000000/white?text=EM' },
  { id: 19, categoryId: 3, name: 'Jeff Bezos', picture: 'https://via.placeholder.com/40/000000/white?text=JB' },
  { id: 20, categoryId: 3, name: 'Bill Gates', picture: 'https://via.placeholder.com/40/000000/white?text=BG' },
  { id: 21, categoryId: 3, name: 'Mark Zuckerberg', picture: 'https://via.placeholder.com/40/000000/white?text=MZ' },
  { id: 22, categoryId: 3, name: 'Tim Cook', picture: 'https://via.placeholder.com/40/000000/white?text=TC' },
  { id: 23, categoryId: 3, name: 'Greta Thunberg', picture: 'https://via.placeholder.com/40/000000/white?text=GT' },
  { id: 24, categoryId: 3, name: 'Warren Buffett', picture: 'https://via.placeholder.com/40/000000/white?text=WB' },

  // Institutions (categoryId: 4)
  { id: 25, categoryId: 4, name: 'Harvard University', picture: 'https://via.placeholder.com/40/A51C30/white?text=H' },
  { id: 26, categoryId: 4, name: 'Stanford University', picture: 'https://via.placeholder.com/40/8F4436/white?text=S' },
  { id: 27, categoryId: 4, name: 'MIT', picture: 'https://via.placeholder.com/40/A31F34/white?text=M' },
  { id: 28, categoryId: 4, name: 'Oxford University', picture: 'https://via.placeholder.com/40/002147/white?text=O' },
  { id: 29, categoryId: 4, name: 'World Bank', picture: 'https://via.placeholder.com/40/006633/white?text=W' },
  { id: 30, categoryId: 4, name: 'IMF', picture: 'https://via.placeholder.com/40/000080/white?text=I' },

  // Governments (categoryId: 5)
  { id: 31, categoryId: 5, name: 'United States Government', picture: 'https://via.placeholder.com/40/002664/white?text=US' },
  { id: 32, categoryId: 5, name: 'United Kingdom Government', picture: 'https://via.placeholder.com/40/012169/white?text=UK' },
  { id: 33, categoryId: 5, name: 'European Union', picture: 'https://via.placeholder.com/40/003399/white?text=EU' },
  { id: 34, categoryId: 5, name: 'United Nations', picture: 'https://via.placeholder.com/40/009EDB/white?text=UN' },
  { id: 35, categoryId: 5, name: 'German Government', picture: 'https://via.placeholder.com/40/000000/white?text=DE' },
  { id: 36, categoryId: 5, name: 'French Government', picture: 'https://via.placeholder.com/40/0055A4/white?text=FR' },

  // Other (categoryId: 6)
  { id: 37, categoryId: 6, name: 'Anonymous', picture: 'https://via.placeholder.com/40/808080/white?text=?' },
  { id: 38, categoryId: 6, name: 'Other Entity 1', picture: 'https://via.placeholder.com/40/808080/white?text=O1' },
  { id: 39, categoryId: 6, name: 'Other Entity 2', picture: 'https://via.placeholder.com/40/808080/white?text=O2' },
];