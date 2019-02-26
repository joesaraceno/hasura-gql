import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('new post component works')
  }

}
