import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  isCollapsed = false;
  size: NzButtonSize = 'large';
  log(): void {
    console.log('click dropdown button');
  }
  constructor() { }

  ngOnInit(): void {
  }

  onBack(): void {
    console.log('onBack');
  }

}
