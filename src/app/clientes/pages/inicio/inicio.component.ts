import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  array = [
    "https://p4.wallpaperbetter.com/wallpaper/286/711/657/lake-landscape-mountain-mountains-wallpaper-preview.jpg", 
    "https://i.blogs.es/ad1ac4/650_1000_dustin_farrell/1366_2000.jpg", 
    ];

  constructor() { }

  ngOnInit(): void {
  }

}
