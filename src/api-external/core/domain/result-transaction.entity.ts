export class ResultTransactionExternal {
  constructor(
    public data: {
      id: string;
      created_at: string;
      finalized_at: string;
      amount_in_cents: number;
      reference: string;
      customer_email: string;
      currency: string;
      payment_method_type: string;
      payment_method: {
        type: string;
        extra: {
          bin: string;
          name: string;
          brand: string;
          exp_year: string;
          card_type: string;
          exp_month: string;
          last_four: string;
          card_holder: string;
          is_three_ds: boolean;
          three_ds_auth_type: string;
        };
        installments: number;
      };
      status: string;
      status_message: string;
      billing_data: any;
      shipping_address: any;
      redirect_url: string;
      payment_source_id: string;
      payment_link_id: string;
      customer_data: any;
      bill_id: string;
      taxes: any[];
      tip_in_cents: number;
    },
    // public id: string,
    // public created_at: string,
    // public finalized_at: string,
    // public amount_in_cents: number,
    // public reference: string,
    // public customer_email: string,
    // public currency: string,
    // public payment_method_type: string,
    // public payment_method: {
    //   type: string;
    //   extra: {
    //     bin: string;
    //     name: string;
    //     brand: string;
    //     exp_year: string;
    //     card_type: string;
    //     exp_month: string;
    //     last_four: string;
    //     card_holder: string;
    //     is_three_ds: boolean;
    //     three_ds_auth_type: string;
    //   };
    //   installments: number;
    // },
    // public status: string,
    // public status_message: string,
    // public billing_data: any,
    // public shipping_address: any,
    // public redirect_url: string,
    // public payment_source_id: string,
    // public payment_link_id: string,
    // public customer_data: any,
    // public bill_id: string,
    // public taxes: any[],
    // public tip_in_cents: number,
  ) {}
}

// {
//   "data": {
//     "id": "15113-1742532605-49382",
//     "created_at": "2025-03-21T04:50:05.813Z",
//     "finalized_at": null,
//     "amount_in_cents": 2500000,
//     "reference": "14a0de9f29d04469ac06bfdcc1bb5588",
//     "customer_email": "pruebasensandbox@yopmail.com",
//     "currency": "COP",
//     "payment_method_type": "CARD",
//     "payment_method": {
//       "type": "CARD",
//       "extra": {
//         "bin": "424242",
//         "name": "VISA-4242",
//         "brand": "VISA",
//         "exp_year": "29",
//         "card_type": "CREDIT",
//         "exp_month": "12",
//         "last_four": "4242",
//         "card_holder": "Pedro Pérez",
//         "is_three_ds": false,
//         "three_ds_auth_type": null
//       },
//       "installments": 2
//     },
//     "status": "PENDING",
//     "status_message": null,
//     "billing_data": null,
//     "shipping_address": null,
//     "redirect_url": "https://mitienda.com.co/pago/resultado",
//     "payment_source_id": null,
//     "payment_link_id": null,
//     "customer_data": null,
//     "bill_id": null,
//     "taxes": [],
//     "tip_in_cents": null
//   },
//   "meta": {}
// }
