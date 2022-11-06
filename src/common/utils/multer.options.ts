import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const filenameToUtf8 = (name: string) =>
  Buffer.from(name, 'latin1').toString('utf-8').replace(' ', '-');

const rootFolder = path.join(__dirname, '..', '..', 'uploads');
// upload를 위한 폴더 생성
const createFolder = (folder: string) => {
  try {
    fs.mkdirSync(rootFolder); // root folder
  } catch (error) {
    console.log('The folder already exists...');
  }

  try {
    console.log(`💾 Create a ${folder} uploads folder...`);
    fs.mkdirSync(path.join(rootFolder, folder)); // sub folder
  } catch (error) {
    console.log(`The ${folder} folder already exists...`);
  }
};

const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder);

  return multer.diskStorage({
    // 어디에 저장할 지
    destination(req, file, cb) {
      const folderName = path.join(rootFolder, folder);
      cb(null, folderName);
    },
    // 저장될 파일 이름
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      const fileName = `${path.basename(
        file.originalname,
        ext,
      )}${Date.now()}${ext}`;

      cb(null, filenameToUtf8(fileName));
    },
  });
};

// multer에 사용할 옵션
export const multerOptions = (folder: string) => {
  const result: MulterOptions = {
    storage: storage(folder),
  };

  return result;
};
