class Personne{
    age : number;

    constructor(public numero:number=0, public nom:string="?",a:number=0){
        this.age=a;
    }
    incrementer_age():void{
        this.age++;
    }
}
let p1: Personne;
p1=new Personne();
p1.age=30;
p1.incrementer_age();
console.log("parsonne avec age=" + p1.age);
console.log(JSON.stringify(p1));
let p2 = new Personne(2,"toto",25);
console.log(JSON.stringify(p2));

