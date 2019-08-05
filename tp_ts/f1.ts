let msg : string;
msg = "abcdef";
//msg=123;// error TS2322: Type '123' is not assignable to type 'string'.
console.log(msg);

//En tp:
//1. déclarer un tableau de number
let tab : number[]=[];
//2. ajouter quelques valeurs
tab.push(12); tab.push(8); tab.push(24);

//3. boucle pour multiplier chaque valeur par 2
for(let i in tab){
	tab[i]=tab[i]*2;
}

//4. afficher toutes les valeurs modifiées via for(...of)
	//future syntaxe angular : <tr *ngFor="let v of tab"><td>{{v}}</td>...
for(let v of tab){
	console.log(v);
}
	
//5. autre modif (ex: inverser ordre des valeurs) 


//6. ré-affichage