export class Campagne {
    title: String;
    description: String;
    minFee: String;
    maxFee: String;

    constructor(title: String, description: String, minFee: String, maxFee: String) { 
        this.title = title;
        this.description = description;
        this.minFee = minFee;
        this.maxFee = maxFee;
    }
  }