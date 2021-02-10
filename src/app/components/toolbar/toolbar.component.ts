import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from 'src/app/modules/public/public.service';
import { LoginService } from '../../services/login.service';
import { WaiterService } from '../../modules/waiter/waiter.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSideNav: EventEmitter<boolean> = new EventEmitter();
  @Output() toggleChat: EventEmitter<boolean> = new EventEmitter();
  @Input() unreadMessages: number;

  hiddenBadge: boolean;

  constructor(
    public loginService: LoginService,
    public waiterService: WaiterService,
    public publicService: PublicService,
    public router: Router
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: any) {
    this.hiddenBadge = false;
  }

  toggle(component: string): void {
    switch (component) {
      case 'sidenav':
        this.toggleSideNav.emit(true);
        break;
      case 'chat':
        this.hiddenBadge = true;
        this.toggleChat.emit(true);
        break;
    }
  }

  scrollToElement(): void {
    this.router.navigate(['/home']).then(()=>{
      const elem = document.getElementById('home-map-container');
      elem.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    })
  }

}
