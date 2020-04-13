import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMeme } from '../shared/interfaces/meme';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemesService {
  memes: IMeme[];

  readonly selectedMeme: IMeme;

  constructor(private http: HttpClient) { }

  load(id?: string) {
    return this.http.get<IMeme[] | IMeme>(`memes${id ? `/${id}` : ''}`).pipe(
      tap((memes) => {
        if (id) {
          (this as any).selectedMeme = memes[0];
        } else {
          this.memes = [].concat(memes);
        }
      })
    );
  }

  create(meme: any) {
    return this.http.post<IMeme>('memes', meme);
  }

  like(likes: number) {
    return this.http.put<IMeme>(`memes/${this.selectedMeme._id}`, { likes });
  }

  selectMeme(meme: IMeme) {
    (this as any).selectedMeme = meme;
  }
}
