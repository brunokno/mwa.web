import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Markup } from '../pages/markup-page/markup';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { saveAs } from 'file-saver';

@Injectable()
export class DataService {
    private serviceUrl: string = 'http://localhost:53092/';
    private cepUrl: string = 'https://viacep.com.br/ws/';

    constructor(
        private http: Http, //Angular 2
        private _http: HttpClient) { }

    createUser(data: any) {
        return this._http
            .post(environment.serviceUrl + 'v1/customer', data);
    }

    createBuyUser(data: any){
        return this._http
            .post(environment.serviceUrl + 'v1/customerBuy',data);
    }

    createMarkup(data: any) {
        return this._http
            .post(environment.serviceUrl + 'v1/markup', data);
    }

    authenticate(data: any) {
        //Angular 2 e Http
        //var dt = "grant_type=password&username=" + data.username + "&password=" + data.password;
        // let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        // let options = new RequestOptions({ headers: headers });
        // return this.http
        //     .post(this.serviceUrl + 'v1/authenticate', dt, options)
        //     .map((res: Response) => res.json());

        //Angular 6 e HttpClient
        const body = new HttpParams()
            .set('username', data.username)
            .set('password', data.password);

        return this._http
            .post<any>(this.serviceUrl + 'v1/authenticate',
                body,
                {
                    headers: new HttpHeaders()
                        .set('Content-Type', 'application/x-www-form-urlencoded')
                        .set('grant_type', 'password')
                });
    }

    getProducts() {
        //Angular 2 e Http
        // var token = localStorage.getItem('mws.token');
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // headers.append('Authorization', `Bearer ${token}`); Headers
        // let options = new RequestOptions({ headers: headers });
        // return this.http
        //     .get(this.serviceUrl + 'v1/products', options)
        //     .map((res: Response) => res.json());

        //Angular 6 e HttpClient
        return this._http
            .get<any[]>(this.serviceUrl + 'v1/products',
                {
                    headers: new HttpHeaders()
                        .set('Content-Type', 'application/json')
                });
    }

    createOrder(data: any) {
        //Angular 2 e Http
        // var token = localStorage.getItem('mws.token');
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // headers.append('Authorization', `Bearer ${token}`); Headers
        // let options = new RequestOptions({ headers: headers });
        // return this.http
        //     .post(this.serviceUrl + 'v1/orders', data, options)
        //     .map((res: Response) => res.json());

        //Angular 6 e HttpClient
        return this._http
            .post(this.serviceUrl + 'v1/orders',
                data,
                {
                    headers: new HttpHeaders()
                        .set('Content-Type', 'application/json')
                });
    }

    getCep(cep: string) {
        //cep = cep.replace('-','');
        cep = cep.replace(/\D/g, '');

        if (cep != '') {
            const validacep = /^[0-9]{8}$/;

            if (validacep.test(cep)) {
                return this.http
                    .get(this.cepUrl + `${cep}/json/`)
                    .map((res: Response) => res.json())
                    ;
            }
        }
    }

    getReseller() {
        return {
            firstName: 'Maximiza',
            lastName: 'teste',
            inscricaoEstadual: '6545464',
            companyName: 'Maximiza razao',
            email: 'revenda@gmail.com',
            emailPortalAdmin: 'revendaportal@gmail.com',
            emailBoleto: 'revendaboleto@gmail.com',
            document: '22365354000165',
            phone: '1165354789',
            cellphone: '11987653245',
            cep: '06194020',
            endereco: 'rua josé gasparini',
            numero: '53',
            complemento: 'osram',
            bairro: 'km 18',
            cidade: 'osasco',
            estado: 'SP'
        };
    }

    getMarkups() {
        return this._http
        .get<any>(this.serviceUrl + 'v1/markup',
            {
                headers: new HttpHeaders()
                    .set('Content-Type', 'application/json')
            });

    }

    postFile(fileToUpload: File): Observable<boolean> {
        const endpoint = 'your-destination-url';
        const formData: FormData = new FormData();
        formData.append('fileKey', fileToUpload, fileToUpload.name);
        return this.http
          .post(this.serviceUrl + 'v1/upload', 
            formData
            //{ headers: yourHeadersConfig }
          )
          .map(() => { return true; })
          //.catch((e) => this.handleError(e));

        // const formdata: FormData = new FormData(); 
        // formdata.append('file', fileToUpload);
        
        // this._http	
        //   .post(this.serviceUrl + 'v1/upload',formdata);
    }

    upload(fileToUpload: any) {
        let input = new FormData();
        input.append("file", fileToUpload);
    
        return this.http
            .post(this.serviceUrl + 'v1/uploadfile', input);
    }

    public downloadFile() {
        fetch(this.serviceUrl + 'v1/download', {
            method: 'POST'//,
            //headers: this.headers()
        })
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .then(url => {
            window.open(url, '_blank');
            // var link = document.createElement("a");
            // link.setAttribute("href", url);
            // link.setAttribute("download", "test.docx");
            // link.style.display = "none";
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);
        });
    }

    CreateMyPage(data:any, fileToUpload:any){
        let input = new FormData();
        input.append("Image", fileToUpload);
        input.append("Alias", data.alias);

        return this._http
            .post(environment.serviceUrl + 'v1/mypage', input);
    }

     

}





        // var markups: Markup[] = [];
        // markups.push({
        //     Visible: false,
        //     CategoryName: "Office 365",
        //     PartNumber: "O365_BUS_PREMIUM",
        //     Name: "Office 365 Business Premium",
        //     BasePriceBRL: 51.83,
        //     MarkupPercentual: 0.00,
        //     PriceSale: 51.83,
        //     EffectivePrice: 0.00,
        //     BasePriceUSD: 0.00,
        //     Description: "",
        //     ShortDescription: ""
        // },
        //     {
        //         Visible: false,
        //         CategoryName: "Office 365",
        //         PartNumber: "OFFICESUBSCRIPTION",
        //         Name: "Office 365 Pro Plus",
        //         BasePriceBRL: 49.75,
        //         MarkupPercentual: 0.00,
        //         PriceSale: 49.75,
        //         EffectivePrice: 0.00,
        //         BasePriceUSD: 0.00,
        //         Description: "",
        //         ShortDescription: ""
        //     },
        //     {
        //         Visible: false,
        //         CategoryName: "Serviços",
        //         PartNumber: "IMP-365",
        //         Name: "Implementação Office 365 com pagamento à vista",
        //         BasePriceBRL: 77.70,
        //         MarkupPercentual: 0.00,
        //         PriceSale: 77.70,
        //         EffectivePrice: 0.00,
        //         BasePriceUSD: 0.00,
        //         Description: "",
        //         ShortDescription: ""
        //     },
        //     {
        //         Visible: false,
        //         CategoryName: "Soluções",
        //         PartNumber: "PREMIUM-MIGD-DIR",
        //         Name: "Office 365 Premium com migrações de e-mail e dados e senhas sincronizadas",
        //         BasePriceBRL: 256.12,
        //         MarkupPercentual: 0.00,
        //         PriceSale: 45.12,
        //         EffectivePrice: 0.00,
        //         BasePriceUSD: 0.00,
        //         Description: "",
        //         ShortDescription: ""
        //     },
        //     {
        //         Visible: true,
        //         CategoryName: "Azure",
        //         PartNumber: "VIR-MAC-A2",
        //         Name: "Máquina Virtual P",
        //         BasePriceBRL: 56.20,
        //         MarkupPercentual: 0.00,
        //         PriceSale: 56.20,
        //         EffectivePrice: 1.07,
        //         BasePriceUSD: 0.00,
        //         Description: "",
        //         ShortDescription: ""
        //     });

        // return markups;

        // return
        // [
        //     {
        //         Visible: false,
        //         CategoryName: "Office 365",
        //         PartNumber: "O365_BUS_PREMIUM",
        //         Name: "Office 365 Business Premium",
        //         BasePriceBRL: 51.83,
        //         MarkupPercentual: 0.00,
        //         PriceSale: 51.83,
        //         EffectivePrice: 0.00
        //     },
        //     {
        //         Visible: false,
        //         CategoryName: "Office 365",
        //         PartNumber: "OFFICESUBSCRIPTION",
        //         Name: "Office 365 Pro Plus",
        //         BasePriceBRL: 49.75,
        //         MarkupPercentual: 0.00,
        //         PriceSale: 49.75,
        //         EffectivePrice: 0.00
        //     },
        //     {
        //         Visible: false,
        //         CategoryName: "Serviços",
        //         PartNumber: "IMP-365",
        //         Name: "Implementação Office 365 com pagamento à vista",
        //         BasePriceBRL: 77.70,
        //         MarkupPercentual: 0.00,
        //         PriceSale: 77.70,
        //         EffectivePrice: 0.00
        //     }
        // ];