import fs from 'fs';
import csv from 'csvtojson';

const csvFilePath = './task2/csv/nodejs-hw1-ex1.csv';
const jsonFilePath = './task2/csv/nodejs-hw1-ex1.json';

const errorHandler = (error) => console.error(error);

const readStream = fs.createReadStream(csvFilePath);
readStream.on('error', errorHandler);

const writeStream = fs.createWriteStream(jsonFilePath);
writeStream.on('error', errorHandler);

const transformCSVStream = csv({
  headers: ['book', 'author', 'amount', 'price'],
  checkType: true,
});
transformCSVStream.on('error', errorHandler);

readStream.pipe(transformCSVStream).pipe(writeStream);