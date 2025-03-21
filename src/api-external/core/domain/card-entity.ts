export class Card {
  constructor(
    public number: number,
    public cvc: number,
    public exp_month: number,
    public exp_year: number,
    public card_holder: string,
  ) {}
}
