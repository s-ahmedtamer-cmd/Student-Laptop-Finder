export async function getLaptops() {
  try {
    const response = await fetch('./data/laptops.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Invalid laptop data format');
    return data;
  } catch (error) {
    throw new Error(`Unable to load laptops: ${error.message}. Please run the app using Live Server.`);
  }
}
export const getLaptopById = (list, id) => list.find(laptop => laptop.id === Number(id));
