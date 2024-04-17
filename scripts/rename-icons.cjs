const fs = require('fs');
const {join} = require("node:path");
const fsp = fs.promises
   /** Папка с иконками которыен надо переименовать */
const dirWithIcons = 'src/assets/icons/svg';

async function rename() {
   /** Читаем файлы */
   const files = await fsp.readdir(dirWithIcons);

   files.forEach((file) => {
      const newName = file.replaceAll(' ', '-').replaceAll('(', '').replaceAll(')', '').toLowerCase();

      /** Метод для сбора 2 путей в 1 путь
       * 1 аргумент - старый путь (читаем из него старое название файла)
       * 2 аргумент - новый путь (новое название файла) */
      fsp.rename(join(dirWithIcons, file), join(dirWithIcons, newName))
   });
}

void rename();