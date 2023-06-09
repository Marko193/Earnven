export function CommaFormatted(amount) {
  const delimiter = ','; // replace comma if desired
  const ab = amount.split('.', 2);
  const d = ab[1];
  let i = parseInt(ab[0]);
  if (isNaN(i)) {
    return '';
  }
  let minus = '';
  if (i < 0) {
    minus = '-';
  }
  i = Math.abs(i);
  let n = i.toString();
  const a = [];
  while (n.length > 3) {
    const nn = n.substr(n.length - 3);
    a.unshift(nn);
    n = n.substr(0, n.length - 3);
  }
  if (n.length > 0) {
    a.unshift(n);
  }
  n = a.join(delimiter);
  if (d.length < 1) {
    amount = n;
  } else {
    amount = `${n}.${d}`;
  }
  amount = minus + amount;
  return amount;
}
