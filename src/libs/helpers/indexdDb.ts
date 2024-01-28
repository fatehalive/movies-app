// Fungsi untuk membuka atau membuat database IndexedDB
export const openDatabase = async (dbName: string, storeName: string) => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(dbName, 1);
  
      request.onupgradeneeded = (event) => {
        const db = request.result;
        const store = db.createObjectStore(storeName, { keyPath: "id" });
      };
  
      request.onsuccess = (event) => {
        resolve(request.result);
      };
  
      request.onerror = (event) => {
        reject(request.error);
      };
    });
  };