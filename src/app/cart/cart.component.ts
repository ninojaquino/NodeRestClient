import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { HttpService } from '../../shared-service/http.service';

export interface IBike {
  id?: number;
  image: string;
  price: number;
  quantity: number;
  description: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  bikes: Array<IBike> = [];
  myName = '';
  books = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private http: HttpService
  ) { }

  async ngOnInit() {
    this.books = await this.getBooks('book');
    // this.createBook ('book', {name: 'The Hunger Games', isbn: 987654321 } );
  }


  // getBooks('book');
  async getBooks(path: string) {
    const resp = await this.http.get(path);
    console.log('resp from getBooks()', resp);
    return resp;
  }

  async createBook (path: string, payload: any) {
    const resp = await this.http.post(path, payload);
    console.log('from createBook() resp: ', resp);
  }

}
