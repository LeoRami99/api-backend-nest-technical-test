import { convertToCents } from '../utils/convertToCents';

import { IVA } from '../const/const.tax';

describe('convertToCents', () => {
  it('debería convertir pesos a centavos correctamente', () => {
    expect(convertToCents(100)).toBe(10000);
    expect(convertToCents(0)).toBe(0);
    expect(convertToCents(123.45)).toBe(12345);
  });

  it('debería redondear correctamente si hay decimales', () => {
    expect(convertToCents(99.999)).toBe(10000);
  });
});

describe('calculo del IVA', () => {
  it('debería calcular el precio con IVA correctamente', () => {
    const price = 1000;
    const priceWithIVA = price * IVA;
    expect(priceWithIVA).toBeCloseTo(190); // 1000 * 0.19

    const totalPriceWithIVA = price + priceWithIVA;
    expect(totalPriceWithIVA).toBeCloseTo(1190);
  });
  it('debería manejar el caso de IVA cero', () => {
    const price = 1000;
    const priceWithIVA = price * 0;
    expect(priceWithIVA).toBe(0); // 1000 * 0
    const totalPriceWithIVA = price + priceWithIVA;
    expect(totalPriceWithIVA).toBe(1000);
  });
  it('debería manejar el caso de IVA negativo', () => {
    const price = 1000;
    const priceWithIVA = price * -IVA;
    expect(priceWithIVA).toBeCloseTo(-190); // 1000 * -0.19
    const totalPriceWithIVA = price + priceWithIVA;
    expect(totalPriceWithIVA).toBeCloseTo(810);
  });

  //hacer en caso de que sea NaN
  it('debería manejar el caso de IVA NaN', () => {
    const price = 1000;
    const priceWithIVA = price * Number.NaN;
    expect(priceWithIVA).toBeNaN(); // 1000 * NaN
    const totalPriceWithIVA = price + priceWithIVA;
    expect(totalPriceWithIVA).toBeNaN();
  });
});
