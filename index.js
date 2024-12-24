const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

(async function testWebsite() {
    let driver = await new Builder().forBrowser('MicrosoftEdge').build();

    try {
        await driver.get('https://rsport.ria.ru/');
        
        // Тест 1: Проверка заголовка страницы
        let title = await driver.getTitle();
        if (title.includes('РИА Новости')) {
            console.log('Тест 1 пройден: Заголовок содержит "РИА Новости".');
        } else {
            console.error('Тест 1 провален: Заголовок не содержит "РИА Новости".');
        }

        // Тест 2: Проверка наличия кнопки или текста "Поиск"
        try {
            let searchButton = await driver.wait(
                until.elementLocated(By.xpath("//*[contains(text(), 'Поиск') or contains(@class, 'search')]")),
                10000
            );
            console.log('Тест 2 пройден: Кнопка поиска найдена.');
        } catch (e) {
            console.error('Тест 2 провален: Кнопка поиска не найдена.');
        }

        // Тест 3: Проверка наличия текстового поля для поиска
        try {
            let searchField = await driver.wait(
                until.elementLocated(By.xpath("//input[contains(@placeholder, 'Поиск') or @type='text']")),
                10000
            );
            console.log('Тест 3 пройден: Поле для поиска найдено.');
        } catch (e) {
            console.error('Тест 3 провален: Поле для поиска не найдено.');
        }

        // Тест 4: Проверка загрузки главного изображения
        try {
            let mainImage = await driver.wait(
                until.elementLocated(By.xpath("//img[contains(@src, 'logo') or contains(@alt, 'РИА')]")),
                10000
            );
            console.log('Тест 4 пройден: Главное изображение загружено.');
        } catch (e) {
            console.error('Тест 4 провален: Главное изображение не загружено.');
        }

        // Тест 5: Проверка текста в одном из блоков новостей
        try {
            let newsBlock = await driver.wait(
                until.elementLocated(By.xpath("//*[contains(text(), 'Спорт') or contains(@class, 'news')]")),
                10000
            );
            console.log('Тест 5 пройден: Найден блок новостей со словом "Спорт".');
        } catch (e) {
            console.error('Тест 5 провален: Блок новостей со словом "Спорт" не найден.');
        }

    } finally {
        await driver.quit();
    }
})();