import { NgModule } from '@angular/core';
import { CapitalizarPipe } from './capitalizar.pipe';
import { DomseguroPipe } from './domseguro.pipe';
import { GetidstringPipe } from './getidstring.pipe';
import { ImagenPipe } from './imagen.pipe';
import { IntervalToHmsPipe } from './interval-to-hms.pipe';
import { MessageTimePipe } from './message-time.pipe';
import { TimeToHmsPipe } from './time-to-hms.pipe';
import { WordMaxLengthPipe } from './word-max-length.pipe';
import { GetOccupationPipe } from './get-ocuppation.pipe';

@NgModule({
  declarations: [
    DomseguroPipe,
    GetidstringPipe,
    IntervalToHmsPipe,
    MessageTimePipe,
    TimeToHmsPipe,
    WordMaxLengthPipe,
    CapitalizarPipe,
    ImagenPipe,
    GetOccupationPipe
  ],
  imports: [],
  exports: [
    DomseguroPipe,
    GetidstringPipe,
    IntervalToHmsPipe,
    MessageTimePipe,
    TimeToHmsPipe,
    WordMaxLengthPipe,
    CapitalizarPipe,
    ImagenPipe,
    GetOccupationPipe

  ]
})
export class PipesModule { }
