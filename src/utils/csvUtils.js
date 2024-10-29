// src/utils/csvUtils.js
import Papa from 'papaparse';

export const parseCSV = async (csvFile) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvFile, {
      download: true,
      header: true,
      complete: (result) => resolve(result.data),
      error: (error) => reject(error),
    });
  });
};
