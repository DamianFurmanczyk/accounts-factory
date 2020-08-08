import { Component, ChangeDetectionStrategy, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer-ui',
  templateUrl: './footer-ui.component.html',
  styleUrls: ['./footer-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterUiComponent {

  @ViewChild('faqColumn', {static: true}) faqCol: ElementRef;
  @ViewChild('linksCol', {static: true}) linksCol: ElementRef;
  dds: NodeListOf<HTMLElement>;

  constructor() { }

  ngAfterViewInit() {
    this.faqCol.nativeElement.querySelectorAll('dt').forEach((el: HTMLElement) => el.addEventListener('click', toggleSiblingActiveClass))
    this.dds = this.faqCol.nativeElement.querySelectorAll('dd');
    const FooterComponent = this;

    function  toggleSiblingActiveClass() {
      const siblAlreadyActiveFlag = <HTMLElement>this.nextSibling.classList.contains('active');
      FooterComponent.dds.forEach(el => el.classList.remove('active'));

      if(!siblAlreadyActiveFlag) <HTMLElement>this.nextSibling.classList.add('active');
    }

    function toggleChildrenActiveClass() {
      const childAlreadyActiveFlag = <HTMLElement>this.classList.contains('active');

      FooterComponent.explendableUlsTriggers.forEach(el => el.classList.remove('active'));

      if(!childAlreadyActiveFlag) <HTMLElement>this.classList.add('active');
    }
  }

}
