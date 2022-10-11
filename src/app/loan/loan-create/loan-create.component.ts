import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import { LoanService } from '../loan.service';
import { Loan } from '../model/Loan';
import { ClientService } from'../../client/client.service';
import { Client } from '../../client/model/Client';
import { GameService } from'../../game/game.service';
import { Game } from '../../game/model/Game';

@Component({
  selector: 'app-loan-create',
  templateUrl: './loan-create.component.html',
  styleUrls: ['./loan-create.component.scss']
})
export class LoanCreateComponent implements OnInit {

  loan : Loan;
  clients: Client[];
  games: Game[];
  errorMsg: any;

  constructor(
      public dialogRef: MatDialogRef<LoanCreateComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private loanService: LoanService,
      private clientService: ClientService,
      private gameService: GameService
  ) { 
    this.errorMsg=null;
  }

  ngOnInit(): void {
    this.loan = new Loan();

    this.clientService.getClients().subscribe(
      clients => this.clients = clients
    );

    this.gameService.getGames().subscribe(
      games => this.games = games
    );
  }

  onSave() {
    this.errorMsg=null;
    this.loanService.saveLoan(this.loan).subscribe(result =>  {
        this.dialogRef.close();
    },
    error =>{
      this.errorMsg=error.error.message;
    });  
  }  

  onClose() {
      this.dialogRef.close();
  }

  
  getDateRangeErrorMessage(dates: any) {
    if((dates.start==null) || (dates.end==null)){
      return true;
    }else{
      return false;
    }
  }

}
