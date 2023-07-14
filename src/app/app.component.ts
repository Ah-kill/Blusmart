import { Component } from '@angular/core';
import { TableService } from './table.service';
import { IProduct } from './table/table.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'blusmart';
  tableData: IProduct[] = [];
  cardData: any[] = [];
  constructor(private tableService: TableService) {}

  ngOnInit() {
    this.tableService.getTableData().subscribe((data: IProduct[]) => {
      this.tableData = data;
    });

    this.tableService.getCardData().subscribe((data) => {
      this.cardData = data;
    });
  }
}
