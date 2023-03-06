// Функция для проверки длины строки

const validateString = (string, maxLength) => (string.length <= maxLength);

validateString('Хрюшка вышла погулять', 25);

// Функция для проверки, является ли строка палиндромом

const isPalindrome = (string) => {
  string = string.toLowerCase().split(' ').join('');
  let stringReverse = '';
  for (let i = string.length - 1; i >= 0; --i) {
    stringReverse += string[i];
  }
  return string === stringReverse;
};

isPalindrome('Лёша на полке клопа нашёл ');

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа
// 1. Решение с помощью цикла

const getNumber = (string) => {
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (isNaN(parseInt(string[i], 10)) === false) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
};

getNumber('агент 007');

// 2. Решение с помощью регулярного выражения

const getDigit = (string) => {
  const digitRegExp = /\d/g;
  const stringDigit = string.toString().match(digitRegExp);
  return stringDigit ? parseInt(stringDigit.join(''), 10) : NaN;
};

getDigit('агент 007');

/* Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами —
и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки.
Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца. */

const padString = (string, width, padding) => {
  while (width > string.length) {
    if (width > string.length + padding.length) {
      padding = padding.slice(0, width - string.length);
    }
    string = `${padding = padding.slice(0, width - string.length)}${string}`;
  }
  return string;
};

padString ('q', 4, 'we');
