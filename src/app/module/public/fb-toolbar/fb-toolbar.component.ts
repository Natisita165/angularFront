import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fb-toolbar',
  templateUrl: './fb-toolbar.component.html',
  styleUrls: ['./fb-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FbToolbarComponent implements OnInit {

  public date?: string;

  constructor() { }

  public ngOnInit(): void {
    this.getDate();
  }

  public getDate(){
    this.date = new Date().toLocaleDateString();
  }

}
