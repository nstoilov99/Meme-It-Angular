import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { IMeme } from 'src/app/shared/interfaces/meme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  comments: [String]
  isRouteComponent = false;
  memeId = this.activatedRoute.snapshot.params.id

  get selectedMeme() { return this.memeService.selectMeme; }

  form: FormGroup
 
  constructor(
    private memeService: MemesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    
  ) {
    this.isRouteComponent = this.activatedRoute.snapshot.data.shouldFetchMeme;
    this.form = this.fb.group({
      comment: ['', [Validators.required]],
    });

  }

  ngOnInit() {
    if (this.isRouteComponent) {
      this.memeService.load(this.memeId).subscribe((meme: IMeme) => {
        this.currentMeme = meme[0]
        console.log(this.currentMeme[0]);
        
      });
      this.memeService.loadComment(this.memeId).subscribe((comments:[String]) => {
        this.comments = comments
        console.log( this.comments);
        
      });
    }
  }

  handleComment() {
    this.memeService.createComment(this.memeId, this.form.value).subscribe(() => {
      this.router.navigate(['']);
    });
    
  }

}
