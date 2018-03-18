import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnAdd: boolean = true;
  @ViewChild('clientform') form: any;

  constructor(
    private flashmessage: FlashMessagesService, 
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}){
    if(this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if(!valid) {
      this.flashmessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout:4000
      });
    } else {
      this.clientService.newClient(value);
      this.flashmessage.show('New Client added', {
        cssClass: 'alert-success', timeout:4000
      });
      this.router.navigate(['/']);
    }
  } 

}
