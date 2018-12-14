import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Component({
  selector: 'app-xdebug-message',
  templateUrl: './xdebug-message.component.html',
  styleUrls: ['./xdebug-message.component.scss']
})
export class XdebugMessageComponent implements OnInit {
  @Input() message: string;

  html: SafeHtml;

  constructor(private sanitizer: DomSanitizer, elementRef: ElementRef) { }

  ngOnInit() {
    this.html = this.sanitizer.bypassSecurityTrustHtml(this.message);
  }

}
