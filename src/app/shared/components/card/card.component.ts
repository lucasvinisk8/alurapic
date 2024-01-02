import { Component, Input } from '@angular/core';

@Component({
    selector: 'ap-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent { 
    @Input() title: string = '';
}