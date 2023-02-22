// Функция для проверки длины строки

function validateString (string, maxLength) {
  return (string.length <= maxLength) ? true : false;
}

validateString('Хрюшка вышла погулять', 25);

// Функция для проверки, является ли строка палиндромом

function isPalindrome (string) {
  string = string.toLowerCase().split(' ').join('');
  let stringReverse = '';
  for (let i = string.length - 1; i >= 0; --i) {
    stringReverse += string[i];
  }
  return string === stringReverse;
}

isPalindrome('Лёша на полке клопа нашёл ');

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа
// 1. Решение с помощью цикла

let result = '';

function getNumber (string) {
  for (let i = 0; i < string.length; i++) {
    if (string[i] == parseInt(string[i])) {
      result += string[i];
    }
  }
  parseInt(result);
  return result;
}

getNumber('агент 007');

// 2. Решение с помощью регулярного выражения

const getDigit = (string) => {
  const digitRegExp = /\d/g;
  const stringDigit = string.toString().match(digitRegExp);
  return stringDigit ? parseInt(stringDigit.join('')) : NaN;
};

getDigit('агент 007');

/* Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами —
и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки.
Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца. */

function pad (string, width, padding) { 
  while (width > string.length) {
    padding = padding.slice(0, width - string.length);
      if (width > string.length + padding.length) { 
        padding;
      } 
    string = `${padding}${string}`;
  }
  return string;
};

pad ('q', 4, 'we');