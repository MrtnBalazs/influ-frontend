export class Campagne {
    title: string;
    description: string;
    minFee: string;
    maxFee: string;
    id: string;

    constructor(id: string, title: string, description: string, minFee: string, maxFee: string) { 
        this.title = title;
        this.description = description;
        this.minFee = minFee;
        this.maxFee = maxFee;
        this.id = id;
    }
  }