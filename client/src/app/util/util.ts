export function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export function handleSubTotalCalc(price: number, quantity = 1) {
  const formatter = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  });

  const amount = (price * quantity) / 100;

  const total = formatter.format(amount);

  return total;
}
