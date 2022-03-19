const pctFormatter = new Intl.NumberFormat(undefined, {
  style: "percent",
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
});

const wholeNumFormatter = new Intl.NumberFormat(undefined, {
  useGrouping: true,
  maximumFractionDigits: 0,
});

const ppdFormatter = new Intl.NumberFormat(undefined, {
  useGrouping: true,
  maximumFractionDigits: 2,
});

const pctFmt = (n: number) => pctFormatter.format(n);
const wholeNumFmt = (n: number) => wholeNumFormatter.format(n);
const ppdFmt = (n: number) => ppdFormatter.format(n);

export { pctFmt, wholeNumFmt, ppdFmt };
