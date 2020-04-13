import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IMeme } from 'src/app/shared/interfaces/meme';
import { MemesService } from 'src/app/memes/memes.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-meme-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  get memes() { return this.memeService.memes; }

  get isLogged() { return this.userService.isLogged; }

  @Output() selectMeme: EventEmitter<IMeme> = new EventEmitter();

  constructor(
    private memeService: MemesService,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.memeService.load().subscribe();
  }

  selectMemeHandler(meme: IMeme) {
    this.memeService.selectMeme(meme);
  }

}
