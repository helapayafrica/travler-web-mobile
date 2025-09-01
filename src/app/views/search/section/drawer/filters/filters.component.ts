import {Component, inject, TemplateRef} from '@angular/core';
import {NgbDatepickerModule, NgbOffcanvas, OffcanvasDismissReasons,} from '@ng-bootstrap/ng-bootstrap';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-search-section-filters-drawer',
  standalone: true,
  imports: [NgbDatepickerModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  private offcanvasService = inject(NgbOffcanvas);
  closeResult = '';

  open(content: TemplateRef<any>) {
    this.offcanvasService
      .open(content, {ariaLabelledBy: 'offcanvas-basic-title', position: "end"})
      .result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
