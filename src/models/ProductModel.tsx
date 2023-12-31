import AsyncStorage from '@react-native-async-storage/async-storage';

/*** PRODUCT CRUD ***/

// CREATE / UPDATE PRODUCT
async function saveItem(listItem: any, id: number | undefined) {
  const savedProducts = await getItems();
  listItem.id = id ? id : new Date().getTime();

  if (id) {
    // Update
    const index = await savedProducts.findIndex((item: any) => item.id === id);
    savedProducts[index] = listItem;
  } else {
    // Create
    savedProducts.push(listItem);
  }

  return AsyncStorage.setItem('products', JSON.stringify(savedProducts));
}

// READ PRODUCTS
function getItems(): Promise<any[]> {
  return AsyncStorage.getItem('products')
    .then((response) => {
      if (response) return Promise.resolve(JSON.parse(response));
      else return Promise.resolve([]);
    });
}

// READ PRODUCT
async function getItem(id: number) {
  const savedProducts = await getItems();
  return savedProducts.find((item: any) => item.id === id);
}

// DELETE PRODUCT
async function deleteItem(id: number) {
  let savedProducts = await getItems();
  const index = await savedProducts.findIndex((item: any) => item.id === id);
  savedProducts.splice(index, 1);
  return AsyncStorage.setItem('products', JSON.stringify(savedProducts));
}

export {
  saveItem,
  getItems,
  getItem,
  deleteItem,
};
