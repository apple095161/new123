

//回傳$符號到金額前面 在變數後面使用 {{     |currency }}

export default function (num) {
    const n = Number(num);
    return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
      const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c);
      return currency;
    })}`;
  }
  