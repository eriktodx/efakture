export class AccountingModel {
  year = new Date().getFullYear();
  yearShort = true;
  seq = 1;
  seqLength = 4;
  seqOffer = 1;
  seqPre = 1;

  constructor(o?: any) {
    if (o != null) {
      if (typeof o === 'object') {
        if (o.year != null) this.year = o.year;
        if (o.yearShort != null) this.yearShort = o.yearShort;
        if (o.seq != null) this.seq = o.seq;
        if (o.seqLength != null) this.seqLength = o.seqLength;
        if (o.seqOffer != null) this.seqOffer = o.seqOffer;
        if (o.seqPre != null) this.seqPre = o.seqPre;
      }
    }
  }
}
