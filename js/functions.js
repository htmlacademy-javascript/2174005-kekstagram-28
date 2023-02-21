// Функция для проверки длины строки

function validateString (string) {
  return (string.length <= 20) ? true : false;
}

// Функция для проверки, является ли строка палиндромом

function isPalindrome (string) {
  string = string.toLowerCase().split(' ').join('');
  let stringReverse = '';
  for (let i = string.length - 1; i >= 0; --i) {
      stringReverse += string[i];
  }
  return string == stringReverse;
}

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа

let getDigit = (string) => {
  const digitRegExp = /\d/g;
  const stringDigit = string.toString().match(digitRegExp);
  return stringDigit ? Number(stringDigit.join('')) : NaN;
};

/* Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами —
и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки.
Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца. */
