import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { PitchComponent } from '../../pitch/pitch/pitch.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private overlay: Overlay) {}

  openPitchModal(pitchId: any) {
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      panelClass: 'overlay-pane',
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block()
    });

    // Attach the PitchModalComponent inside the overlay
    const portal = new ComponentPortal(PitchComponent);
    const componentRef = overlayRef.attach(portal);

    // Pass data into the modal
    componentRef.instance.pitchId = pitchId;
    componentRef.instance.isModal = true;
    componentRef.instance.selectedPitch = pitchId;
    componentRef.instance.onClose = () => overlayRef.dispose(); // TODO még nincs használva valami x gomb kellene modalok sarkára

    // Close on backdrop click
    overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
  }
}
