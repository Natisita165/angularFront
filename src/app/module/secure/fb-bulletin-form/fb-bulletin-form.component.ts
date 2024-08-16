import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bulletin-form',
  templateUrl: './fb-bulletin-form.component.html',
  styleUrls: ['./fb-bulletin-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FbBulletinFormComponent{

  public commentText: string;
  private readonly _EMPTY: string = '';

  constructor(
    public dialogRef: MatDialogRef<FbBulletinFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { commentId: number },
  ) { 
    this.commentText = this._EMPTY;
  }

  public submit(): void {
    if (this.commentText.trim()) {
      this.dialogRef.close(this.commentText);
    } else {
      this.dialogRef.close(null); 
    }
  }


 
}
