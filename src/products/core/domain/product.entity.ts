export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public description: string,
    public image: string,
    public category: string,
    public stock: number,
  ) {}
}
