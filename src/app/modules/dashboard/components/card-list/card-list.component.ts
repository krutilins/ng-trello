import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Column } from 'src/app/core/models/column.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListComponent {

  @Input() list: Column | null = null;

  handleShowActionButton(title: string | undefined): boolean {
    const LIST_NAME = 'Todo';
    return title === LIST_NAME;
  }
}
