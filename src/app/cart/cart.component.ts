import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { HttpService } from '../../shared-service/http.service';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

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
    await this.refresh();
    // this.createBook ('book', {name: 'The Hunger Games', isbn: 987654321 } );
    // this.updateBook('book/id/7', {name: 'The Witcher', isbn: '1111111111'});
  }

  async refresh() {
    this.books = await this.getBooks('book');
  }


  // getBooks('book'); display all books in the page
  async getBooks(path: string) {
    const resp = await this.http.get(path);
    console.log('resp from getBooks()', resp);
    return resp;
  }

  async createBook() {
    const book = {
      name: null,
      author: null,
      isbn: null,
      description: null
    };
    const resp = await this.http.post('book', book);
    console.log('from createBook() resp: ', resp);
    if (resp) {
      // this.refresh();
      this.books.unshift(resp);
    } else {
      this.toastService.showToast('danger', 3000, 'Book creation failed!');
    }
    return resp;
  }

  async updateBook(book: any) {
    console.log('from updateBook book ', book);
    const resp = await this.http.put(`book/id/${book.id}`, book);
    if (resp) {
      this.toastService.showToast('success', 3000, 'Book updated successfully!');
    }
    // console.log('from updateBook() resp: ', resp);
    return resp;
  }

  async removeBook (book: any, index: number) {
    const resp = await this.http.delete(`book/id/${book.id}`);
    if (resp) {
      this.refresh();
    } else {
      this.toastService.showToast('danger', 3000, 'Book deletion failed!');
    }
  }

}
