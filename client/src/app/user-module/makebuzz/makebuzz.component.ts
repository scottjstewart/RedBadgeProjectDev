import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthUserService } from 'src/app/data.auth-user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BuzzesService } from '../../data.buzzes.service'; 
import { Buzz } from '../../buzz.model'

@Component({
  selector: 'app-makebuzz',
  templateUrl: './makebuzz.component.html',
  styleUrls: ['./makebuzz.component.css']
})
export class MakebuzzComponent implements OnInit {
  user
  form: FormGroup

  constructor(
    private Buzz: BuzzesService,
    private fb: FormBuilder,
    private auth: AuthUserService,
    private ref: MatDialogRef<MakebuzzComponent>,

    @Inject(MAT_DIALOG_DATA) data
  ) {
    if (data) {
      this.form.controls.location = data.location
      this.form.controls.price = data.price
      this.form.controls.funFactor = data.funFactor
      this.form.controls.details = data.details
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      location: new FormControl,
      price: new FormControl,
      funFactor: new FormControl,
      details: new FormControl
    })
  }

  submit(comment: string) {
    let buzz: Buzz = this.form.value
    console.log('buzz', this.form.value)
    this.Buzz.makeBuzz(buzz).subscribe(
      res => {
        console.log('it worked')
      }
    )
    this.ref.close(this.form.value)
  }

  close() {
    this.ref.close()
  }

}
