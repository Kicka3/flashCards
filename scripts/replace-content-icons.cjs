const fs = require('fs')
const { join } = require('node:path')
const fsp = fs.promises
/** Папка с иконками в которых надо заменить что-то */
const dirWithIcons = 'src/assets/icons/components'

async function replaceAttr() {
  /** Читаем файлы */
  const files = await fsp.readdir(dirWithIcons)

  files.forEach(async file => {
    /** Путь к файлу */
    const filePath = join(dirWithIcons, file)

    /** Если картинка - это текст(svg), то передаём кодировку utf-8 */
    const fileContent = await fsp.readFile(filePath, 'utf-8')

    /** Меняю #fff => currentColor для отображение нужного мне цвета svg-иконки */
    const newFileContent = fileContent.replaceAll('#fff', 'currentcolor')

    /** Перезаписываем файлы */
    fsp.writeFile(filePath, newFileContent)
  })
}

void replaceAttr()
