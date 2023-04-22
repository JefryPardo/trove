import { Component,OnDestroy } from '@angular/core';
import { FirebaseApiService } from 'src/app/service/firebase.api.service';

@Component({
  selector: 'app-search-flipping-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnDestroy {

  constructor(public trove: FirebaseApiService) {}
  
  ngOnDestroy() {
    this.trove.flipping_mas_bajo = this.trove.defauld;
    this.trove.flipping_mas_alto = this.trove.defauld;
    this.trove.resultadoFlipping = false;
  }
}