import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemesService } from '../memes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss', '../../../error-styles.scss']
})
export class CreateComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private memeService: MemesService,
    private router: Router
  ) {
    this.form = this.fb.group({
      memeTitle: ['', [Validators.required]],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  createMemeHandler() {
    this.memeService.create(this.form.value).subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
