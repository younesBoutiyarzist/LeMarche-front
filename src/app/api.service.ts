import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   
  idUser : number | undefined;
  typeUser : string | undefined;


  constructor(private http: HttpClient) { }

  configUrl = 'http://127.0.0.1:8080/OnlineShop/Serv?';

loginCustomer(name: string, password : string) {
  return this.http.get(this.configUrl + "name=" + name + "&pw=" + password.toString() +  "&op=loginB", {responseType: 'json'} );
}  


loginSeller(name: string, password : string) {
  return this.http.get(this.configUrl + "name=" + name + "&pw=" + password.toString() + "&op=loginS", {responseType: 'json'} );
} 

addSeller(name: string, cash : number, password : string) {
  return this.http.get(this.configUrl + "name=" + name +
   "&cash="+ cash.toString() + "&pw=" + password.toString() + "&op=addSeller" );
}

addCustomer(name: string, cash : number, password : string) {
  return this.http.get(this.configUrl + "name=" + name + 
   "&cash="+ cash.toString() + "&pw=" + password.toString() + "&op=addBuyer" );
}
removeSeller(id: number) {
  return this.http.get(this.configUrl + "id=" + id.toString() + "&op=removeSeller" );
}

removeCustomer(id: number) {
  return this.http.get(this.configUrl + "id=" + id.toString() + "&op=removeCustomer" );
}

addProduct(idSeller: number, name: string, price: number, quantity: number) {
  return this.http.get(this.configUrl + "idSeller=" + idSeller.toString() + "&name=" + name + "&price=" +
  price.toString() + "&q=" + quantity.toString() + "&op=addProduct" );
}

removeProduct(idProduct: number) {
  return this.http.get(this.configUrl + "idProduct=" + idProduct.toString()  + "&op=removeProduct" );
}
updateStock(idSeller: number, idProduct: number, quantity: number) {
  return this.http.get(this.configUrl + "idSeller=" + idSeller.toString() + "&idProduct=" + idProduct.toString() + "&q=" + quantity.toString()  + "&op=updateStock", {responseType: 'json'});

}

updatePrice(idSeller: number, idProduct: number, price: number) {
  return this.http.get(this.configUrl + "idProduct=" + idProduct.toString() + "&idSeller=" + idSeller.toString() + "&price=" +  price.toString() + "&op=updatePrice", {responseType: 'json'});

}
listProducts() {
  return this.http.get(this.configUrl + "op=listProducts" , {responseType: 'json'});

}

addToBasket(idCustomer: number, idProduct: number, quantity : number) {
  return this.http.get(this.configUrl + "idCustomer=" + idCustomer.toString() + "&idProduct=" +  idProduct.toString() + "&q=" + quantity.toString() + "&op=addToBasket", {responseType: 'json'});

}

removeFromBasket(idCustomer: number, idProduct: number) {
  return this.http.get(this.configUrl + "idCustomer=" + idCustomer.toString() + "&idProduct=" +  idProduct.toString() + "&op=removeFromBasket", {responseType: 'json'});

}

resetBasket(idCustomer: number) {
  return this.http.get(this.configUrl + "idCustomer=" +  idCustomer.toString() + "&op=resetBasket", {responseType: 'json'});

}

editBasketQuantity(idCustomer: number, idProduct: number, quantity:number) {
  return this.http.get(this.configUrl + "idCustomer=" +  idCustomer.toString()  + "&idProduct=" +  idProduct.toString() + "&q=" + quantity.toString() +  "&op=editBasketQuantity", {responseType: 'json'});

}

getStock(idCustomer: number) {
  return this.http.get(this.configUrl +  "id=" + idCustomer.toString() +  "&op=getStock", {responseType: 'json'});

}

getBasket(idCustomer: number) {
  return this.http.get(this.configUrl +  "id=" + idCustomer.toString() +  "&op=getBasket", {responseType: 'json'});

}
buy(idCustomer: number) {
  return this.http.get(this.configUrl +  "idCustomer=" + idCustomer.toString()  +  "&op=buy", {responseType: 'json'});

}

salesHistory(idCustomer: number) {
  return this.http.get(this.configUrl +  "id=" + idCustomer.toString() +  "&op=salesHistory", {responseType: 'json'});

}

purchasesHistory(idCustomer: number) {
  return this.http.get(this.configUrl +  "id=" + idCustomer.toString() +  "&op=purchasesHistory", {responseType: 'json'});
}


}
