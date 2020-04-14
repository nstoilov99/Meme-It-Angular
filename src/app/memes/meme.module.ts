import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { MemeRoutingModule } from './meme-routing.module';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateComponent, DetailComponent, ListComponent],
  imports: [
    FormsModule,
    CommonModule,
    MemeRoutingModule,
    ReactiveFormsModule,

  ],
  exports: [
    ListComponent,
    DetailComponent
  ]
})
export class MemeModule { }
