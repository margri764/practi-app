export const getDataLS = (key: string): any | undefined => {
  try {

    const serializedData = localStorage.getItem(key);

 
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (err) {
    console.log('Ups!! algo fallo al recibir datos en LS');
    return undefined;
  }
};

export const saveDataLS = (key: string, data: any): void | undefined => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch {
    console.log('Ups!! algo fallo al guardar datos en LS');
    return undefined;
  }
};

export const saveDataSS = (key: string, data: any): void | undefined => {
  try {
    const serializedData = JSON.stringify(data);
    sessionStorage.setItem(key, serializedData);
  } catch {
    console.log('Ups!! algo fallo al guardar datos en SS');
    return undefined;
  }
};

export const getDataSS = (key: string): any | undefined => {
  try {
    const serializedData = sessionStorage.getItem(key);
    // console.log(serializedData);
    if (serializedData === null || serializedData === undefined  ) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (err) {
    console.log('Ups!! algo fallo al recibir datos en SS');
    return undefined;
  }
};
