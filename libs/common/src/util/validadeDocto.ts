export function validateDocument(type: string, document: string): boolean {
  if (type === 'PF' && document.length === 11 && isValidCPF(document)) {
    return true;
  } else if (type === 'PJ' && document.length === 14 && isValidCNPJ(document)) {
    return true;
  } else {
    return false;
  }
}

function isValidCPF(document: string): boolean {
  if (document.length !== 11) {
    return false;
  }

  if (/^(\d)\1{10}$/.test(document)) {
    return false;
  }

  let sum = 0;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(document.charAt(i - 1)) * (11 - i);
  }

  let result = (sum * 10) % 11;
  if (result === 10 || result === 11) {
    result = 0;
  }

  if (result != parseInt(document.charAt(9))) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(document.charAt(i - 1)) * (12 - i);
  }

  result = (sum * 10) % 11;
  if (result === 10 || result === 11) {
    result = 0;
  }

  if (result != parseInt(document.charAt(10))) {
    return false;
  }

  return true;
}

function isValidCNPJ(document: string): boolean {
  if (document.length !== 14) {
    return false;
  }

  if (/^(\d)\1{13}$/.test(document)) {
    return false;
  }

  let sum = 0;
  let weight = 5;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(document.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  let remainder = (sum * 10) % 11;
  remainder = remainder === 10 || remainder === 11 ? 0 : remainder;
  if (remainder != parseInt(document.charAt(12))) {
    return false;
  }

  sum = 0;
  weight = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(document.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  remainder = (sum * 10) % 11;
  remainder = remainder === 10 || remainder === 11 ? 0 : remainder;
  if (remainder != parseInt(document.charAt(13))) {
    return false;
  }

  return true;
}
