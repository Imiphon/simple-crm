export class User {
firstName: string;
lastName: string;
street: string;
houseNumber: number;
city: string;
zip: string; 
telNumber: number;
email: string;
birthday: number;

constructor(obj?: any){
this.firstName = obj ? obj.firstName : '';
this.lastName  = obj ? obj.lastName : '';
this.street  = obj ? obj.street : '';
this.houseNumber  = obj ? obj.houseNumber : '';
this.city  = obj ? obj.city : '';
this.zip  = obj ? obj.zip : '';
this.telNumber  = obj ? obj.telNumber : null;
this.email  = obj ? obj.email : '';
this.birthday  = obj ? obj.birthday : null;  //timestamp
}
}