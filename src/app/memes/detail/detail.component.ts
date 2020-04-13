import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { IMeme } from 'src/app/shared/interfaces/meme';
import { MemesService } from 'src/app/memes/memes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-meme-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @ViewChild('likes', { static: false }) likes: ElementRef<HTMLInputElement>;

  @Input() selectedMeme2: IMeme;

  currentMeme: IMeme;
  isRouteComponent = false;

  get selectedMeme() { return this.memesService.selectMeme; }

  constructor(
    private memesService: MemesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.isRouteComponent = this.activatedRoute.snapshot.data.shouldFetchMeme;
  }

  ngOnInit() {
    if (this.isRouteComponent) {
      this.memesService.load(this.activatedRoute.snapshot.params.id).subscribe((meme: IMeme) => {
        this.currentMeme = meme[0]
        console.log(this.currentMeme[0]);
        
      });
    }
  }

  likeHandler() {
    this.memesService.like(+this.likes.nativeElement.innerHTML).subscribe(() => {
      this.memesService.load(this.currentMeme._id).subscribe(() => {
      });
    });
  }
}
