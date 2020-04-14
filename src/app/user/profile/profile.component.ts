import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordMatch } from 'src/app/shared/validators/password-match';
import { MemesService } from 'src/app/memes/memes.service';
import { IMeme } from 'src/app/shared/interfaces/meme';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../../../error-styles.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  myMemes: IMeme[];

  get currentUser() {
    return this.userService.currentUser;
  }

  constructor(
    private userService: UserService,
    private memeService: MemesService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z0-9.-_]{6,}@gmail\.com'))]],
      passwords: this.fb.group({
        password: ['', [Validators.required]],
        rePassword: ['', [Validators.required]]
      }, {
        validators: [passwordMatch]
      })
    });
  }

  ngOnInit() {
    this.memeService.load().subscribe((memes: IMeme[]) => {
      console.log(this.userService.isLogged);
      this.myMemes = memes.filter(c => c.author._id === this.userService.currentUser._id);
      
      
    });
  }

  handleSubmit({ email, passwords: { password } }: { email: string, passwords: { password: string } }) {
    this.userService.updateProfile(email, password).subscribe(() => {
    }, console.error);
  }

  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }

}
