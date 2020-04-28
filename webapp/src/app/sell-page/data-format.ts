export interface Data{
    user_id:string,
    sellin_user_id:string,
    home_description:
      {
        price:number,
        home_type:string,
        location:string,
        area:number,
        bedroom_no:number,
        bathroom_no:number
      },
    sellout:
      {
        sellout_id:string,
        home_available_status:Boolean,
        sellout_price:number,
        receive_sell:number
      },
    sellin:
      {
        sellin_id:string,
        home_status:Boolean,
        sellin_price:number,
        already_pay_sell:number
      }
};

export interface User{
  account:string,
  password:string,
  firstname:string,
  lastname:string,
  email:string,
  phone:string,
  balance:number,
  id:string
}