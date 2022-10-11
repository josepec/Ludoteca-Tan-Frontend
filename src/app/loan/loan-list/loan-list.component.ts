import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { Pageable } from 'src/app/core/model/page/Pageable';
import { LoanCreateComponent } from '../loan-create/loan-create.component';
import { LoanService } from '../loan.service';
import { Loan } from '../model/Loan';
import { GameService } from '../../game/game.service';
import { Game } from '../../game/model/game';
import { ClientService } from '../../client/client.service';
import { Client } from '../../client/model/client';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  clients : Client[];
  games: Game[];
  filterClient: Client;
  filterTitle: string;
  filterDate: Date;

  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'game', 'client', 'startDate', 'endDate', 'action'];

  constructor(
      private loanService: LoanService,
      private gameService: GameService,
      private clientService: ClientService,
      public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe(
        games => this.games = games
    );

    this.clientService.getClients().subscribe(
        clients => this.clients = clients
    );

    this.loadPage();
  }

  loadPage(event?: PageEvent) {

      let pageable : Pageable =  {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          sort: [{
              property: 'id',
              direction: 'ASC'
          }]
      }

      if (event != null) {
          pageable.pageSize = event.pageSize
          pageable.pageNumber = event.pageIndex;
      }

    let title = this.filterTitle != null ? this.filterTitle : null;
    let clientId = this.filterClient != null ? this.filterClient.id : null;
    let date = this.filterDate != null ? new DatePipe('en-EU').transform(this.filterDate, 'YYYY-MM-dd') : null;

    this.loanService.getLoans(pageable, title, clientId, date).subscribe(data => {
        this.dataSource.data = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
    });
  }  

  onSearch(): void {
    this.loadPage();
  }

  onCleanFilter(): void {
    this.filterTitle = null;
    this.filterClient = null;
    this.filterDate = null;

    this.loadPage();
  }

  createLoan() {      
      const dialogRef = this.dialog.open(LoanCreateComponent, {
          data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
          this.ngOnInit();
      });      
  }  

  deleteLoan(loan: Loan) {    
      const dialogRef = this.dialog.open(DialogConfirmationComponent, {
          data: { title: "Eliminar Préstamo", description: "Atención si borra el prestamo se perderán los datos.<br> ¿Desea eliminar el préstamo?" }
      });

      dialogRef.afterClosed().subscribe(result => {
          if (result) {
              this.loanService.deleteLoan(loan.id).subscribe(result =>  {
                  this.ngOnInit();
              }); 
          }
      });
  }  

}
