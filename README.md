AWARDS

Namjena: Mogucnost rangiranja vina. Jasno davanje informacija korisnicima.

Lista operacija:
-dodavanje tijela
-izmjena podataka
-dodavanje nagrada(baza podataka)
-brisanje tijela
-brisanje odredjene nagrade

#LISTING
URL: 		/award/
metoda: 	GET
querystring: 	filter=name of filter
		from= number from tu paginate
		size= number of items
opis: 		Listing dodanih tijela i paginacija
encoding: 	JSON

#Dodavanje
-URL:		/award/
-metoda:	POST
-opis: 		Dodavanje tijela za nagrade od strane korisnika. Dodano tijelo nije 				objavljeno.
-napomena:	Dodavanje od strane korisnika za pocetak ne implementirati. Omoguciti 				samo dodavanje od strane administratora stranice
encoding: 	JSON

#Pretraga
-URL:		/award/search/
-metoda:	GET
-opis: 		Pretraga. Koristi se kod pretrage baze awards. 
-napomena:	Pretrazuje se polje naziv(name)
encoding: 	JSON


#Prikazivanje tijela
-URL: 		/award/[id]/[name]/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
		[name] - naziv tijela. Nalazi se u URL-u zarad SEO optimizacije
encoding: 	JSON



#Izmjena tijela
-URL: 		/award/[id]/[name]/
-metoda: 	PUT
-parametri:  	[id] - jedinstveni ID 
		[name] - naziv tijela. Nalazi se u URL-u zarad SEO optimizacije
-opis: 		izmjena podataka od strane korisnika. Upis se dodaju u bazu edit  i ceka 			odobrenje admina za koriscenje. 

#Prikazivanje nagrada po godini
-URL: 		/award/[id]/[name]/[godina]/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
		[name] - naziv tijela. Nalazi se u URL-u zarad SEO optimizacije
		[godina] - godina nagrada
encoding: 	JSON

#Azuriranje nagrada po godini
-URL: 		/award/[id]/[name]/[godina]/
-metoda: 	PUT
-parametri:  	[id] - jedinstveni ID 
		[name] - naziv tijela. Nalazi se u URL-u zarad SEO optimizacije
		[godina] - godina nagrada
-encoding: 	JSON
-opis:		izmjena podataka od strane korisnika. Upisuje se u bazu izmjena i ceka 				odobrenje admina za prikazivanje. 



ADMIN

#Listing
URL: 		/admin/award/
metoda: 	GET
querystring: 	filter=name of filter
		from= number from tu paginate
		size= number of items
opis: 		Listing dodanih tijela i paginacija

#Dodavanje
-URL:		/admin/award/
-metoda:	POST
-opis: 		Dodavanje tijela za nagrade od strane korisnika. Dodano tijelo je 					objavljeno.
encoding: 	JSON


#Prikazivanje tijela
-URL: 		/admin/award/[id]/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
encoding: 	JSON


#Azuriranje tijela
-URL: 		/admin/award/[id]/
-metoda: 	PUT
-parametri:  	[id] - jedinstveni ID 
-encoding: 	JSON
-db polja:	TO DO...

#Brisnje tijela
-URL: 		/admin/award/[id/
-metoda: 	DELETE
-parametri:  	[id] - jedinstveni ID 
-encoding: 	JSON
-response:	200 OK

#PUBLISH 
-URL: 		/admin/award/[id]/publish/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
-encoding: 	JSON
-opis:		Objavljivanje i suprotna operacija. Upucuje se get zahtjev prema url 				adresi. Vracamo status 200 i vrijednost polja publish sa boolean 					vrijednosti.
-response: 	200 OK {published: false II true}

#Prikazivanje godine 
-URL: 		/admin/award/[id/[godina]/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
		[godina] - 
-encoding: 	JSON

#Azuriranje godine 
-URL: 		/admin/award/[id/[godina]/
-metoda: 	PUT
-parametri:  	[id] - jedinstveni ID 
		[godina] - 
-encoding: 	JSON
-opis:		Lista svih nagrada po godini se ponovo upisu u bazu po azuriranju

#Brisanje godine 
-URL: 		/admin/award/[id/[godina]/
-metoda: 	DELETE
-parametri:  	[id] - jedinstveni ID 
		[godina] - 
-encoding: 	JSON
-response: 	200 OK



Baza podataka: award

 var AwardSchema = new Schema({
	name: {type: String, required: true},
	shortId: {type: ShortId},
	published: {type: Boolean},
	prizes: {},
	years: [year],
	location: {type: String},
	article: {type: String},
	region: [countries],
	profil: {type: String},
	pictures: {type: String},
	rss: {type: String}
});
















Grape 

Namjena: Unos svih sorti grozdja kako bi se moglo klasifikovati vino i radoznalim dati informacije o istim.  

- dodavanje sorte grozdja
- brisanje sorte
- izmjena

Operacije:
-statistika za odredjenu sortu, broj vina sa tom sortom (cistih i kupaza)
-azuriranje statistike pri dodavanju vina brisanje statistike pri brisanju vina


#LISTING
URL: 		/grape/
metoda: 	GET
querystring: 	filter=name of filter
		from= number from tu paginate
		size= number of items
opis: 		Listing dodanih tijela i paginacija
encoding: 	JSON

#Dodavanje
-URL:		/grape/
-metoda:	POST
-opis: 		Dodavanje tijela za nagrade od strane korisnika. Dodano tijelo nije 			objavljeno.
encoding: 	JSON

#Pretraga
-URL:		/grape/search/
-metoda:	GET
-opis: 		Pretraga. Koristi se kod pretrage baze awards. 
-napomena:	Pretrazuje se polje naziv(name)
encoding: 	JSON


#Prikazivanje tijela
-URL: 		/grape/[id]/[name]/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
		[name] - naziv tijela. Nalazi se u URL-u zarad SEO optimizacije
encoding: 	JSON


#Izmjena tijela
-URL: 		/grape/[id]/[name]/
-metoda: 	PUT
-parametri:  	[id] - jedinstveni ID 
		[name] - naziv tijela. Nalazi se u URL-u zarad SEO optimizacije
-opis: 		izmjena podataka od strane korisnika. Upis se dodaju u bazu edit  i ceka 			odobrenje admina za koriscenje. 


ADMIN

#Listing
URL: 		/admin/grape/
metoda: 	GET
querystring: 	filter=name of filter
		from= number from tu paginate
		size= number of items
opis: 		Listing dodanih tijela i paginacija

#Dodavanje
-URL:		/admin/grape/
-metoda:	POST
-opis: 		Dodavanje tijela za nagrade od strane administratora. Dodano tijelo je 			objavljeno.
encoding: 	JSON


#Prikazivanje tijela
-URL: 		/admin/grape/[id]/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
encoding: 	JSON

#Azuriranje tijela
-URL: 		/admin/grape/[id]/
-metoda: 	PUT
-parametri:  	[id] - jedinstveni ID 
-encoding: 	JSON
-db polja:	TO DO...

#Brisnje tijela
-URL: 		/admin/grape/[id/
-metoda: 	DELETE
-parametri:  	[id] - jedinstveni ID 
-encoding: 	JSON
-response:	200 OK

#PUBLISH 
-URL: 		/admin/grape/[id]/publish/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
-encoding: 	JSON
-opis:		Objavljivanje i suprotna operacija. Upucuje se get zahtjev prema url 			adresi. Vracamo status 200 i vrijednost polja publish sa boolean 				vrijednosti.
-response: 	200 OK {published: false II true}

Baza podataka: grapes

Atributi:
	name: {type: String},
	aka: [],		//also known as
	published: {type: Boolean},
	shortId: {type: ShortId},
	article: {type: String},
	year: {type: Number},
	country {},
	kalem:[ShortGrapeSchema],
	stat: {}  //statistic   perhaps number of wineris with this grape

*Pretrazivanje po imenu,  sekundarnim imenima






















Drzava

- dodavanje drzave
- dodavanje republike
- dodavanje vinske regije
- vodjenje statistike o broju vinarija

#LISTING
URL: 		/country/
metoda: 	GET
querystring: 	filter=name of filter
		from= number from tu paginate
		size= number of items
opis: 		Listing dodanih tijela i paginacija
encoding: 	JSON

#Dodavanje
-URL:		/country/
-metoda:	POST
-opis: 		Dodavanje tijela od strane korisnika. Dodano tijelo nije 						objavljeno.
-napomena:	Dodavanje od strane korisnika za pocetak ne implementirati. Omoguciti 				samo dodavanje od strane administratora stranice
encoding: 	JSON

#Pretraga
-URL:		/country/search/
-metoda:	GET
-opis: 		Pretraga. Koristi se kod pretrage baze.
-napomena:	Pretrazuje se polje naziv(name), skracenica, republika.
encoding: 	JSON


#Prikazivanje tijela
-URL: 		/country/[id]/[name]/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
		[name] - naziv tijela. Nalazi se u URL-u zarad SEO optimizacije
encoding: 	JSON



#Izmjena tijela
-URL: 		/country/[id]/[name]/
-metoda: 	PUT
-parametri:  	[id] - jedinstveni ID 
		[name] - naziv tijela. Nalazi se u URL-u zarad SEO optimizacije
-opis: 		izmjena podataka od strane korisnika. Upis se dodaju u bazu edit  i ceka 			odobrenje admina za koriscenje. 



ADMIN

#Listing
URL: 		/admin/country/
metoda: 	GET
querystring: 	filter=name of filter   //maybe continent
		from= number from tu paginate
		size= number of items
opis: 		Listing dodanih tijela i paginacija

#Dodavanje
-URL:		/admin/country/
-metoda:	POST
-opis: 		Dodavanje tijela za nagrade od strane korisnika. Dodano tijelo je 				objavljeno.
encoding: 	JSON


#Prikazivanje tijela
-URL: 		/admin/country/[id]/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
encoding: 	JSON


#Azuriranje tijela
-URL: 		/admin/country/[id]/
-metoda: 	PUT
-parametri:  	[id] - jedinstveni ID 
-encoding: 	JSON
-db polja:	TO DO...

#Brisnje tijela
-URL: 		/admin/country/[id/
-metoda: 	DELETE
-parametri:  	[id] - jedinstveni ID 
-encoding: 	JSON
-response:	200 OK

#PUBLISH 
-URL: 		/admin/country/[id]/publish/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
-encoding: 	JSON
-opis:		Objavljivanje i suprotna operacija. Upucuje se get zahtjev prema url 			adresi. Vracamo status 200 i vrijednost polja publish sa boolean 				vrijednosti.
-response: 	200 OK {published: false II true}



Baza podataka: countries

Atributi:
var CountrySchema = new Schema({
	name: {type: String},
	continent: {type: String},
	shortId: {type: ShortId},
	published: {type: Boolean},
	abbr: {type: String},
	wineRegions: [],
	republic: {type : String},
	article: {type: String},
	autohtoneSorte: [ShortGrapeSchema],
	media: [MediaSchema],
	wineries: [ShortWinerySchema]   // how to implement, where to store grapes???
});	


















Turisticka organizacija

Namjena:Prikazivanje turisticke ponude, promocija vinkskog turizma.

Lista operacija:
-



#LISTING
URL: 		/tourist/
metoda: 	GET
querystring: 	filter=name of filter  {country, winery}
		from= number from tu paginate
		size= number of items
opis: 		Listing dodanih tijela i paginacija
encoding: 	JSON

#Dodavanje
-URL:		/tourist/
-metoda:	POST
-opis: 		Dodavanje turisticke organizacije od strane korisnika..
-napomena:	Dodavanje omoguceno samo registrovanim korisnicima I koji vec nemaju dodanu turisticku organizaciju. 
-podoperacije:	-Informisati admina o dodavanju tur. Org.
		-Upisati u bazu korisnika
		-upisati statistiku
encoding: 	JSON

#Pretraga
-URL:		/tourist/search/
-metoda:	GET
-opis: 		Pretraga. Koristi se kod pretrage baze tourist. 
-napomena:	Pretrazuje se polje naziv(name), vinarija
encoding: 	JSON


#Prikazivanje tijela
-URL: 		/tourist/[id]/[name]/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
		[name] - naziv tijela. Nalazi se u URL-u zarad SEO optimizacije
encoding: 	JSON



#Izmjena tijela
-URL: 		/award/[id]/[name]/
-metoda: 	PUT
-parametri:  	[id] - jedinstveni ID 
		[name] - naziv tijela. Nalazi se u URL-u zarad SEO optimizacije
-opis: 		Izmjene vrsi registrovani korisnik koji je napravio stranicu. 
#Brisanje tijela
-URL: 		/award/[id]/[name]/
-metoda: 	DELETE
-parametri:  	[id] - jedinstveni ID 
		[name] - naziv tijela. Nalazi se u URL-u zarad SEO optimizacije
-opis: 		Brisanje vrsi registrovani korisnik koji je napravio stranicu. 
-podoperacije:	-Brisanje iz baze tur. Organizacija.
			-brisanje iz baze korisnika
			-azuriranje statistike
			-obavjestavanje admina



ADMIN

#Listing
URL: 		/admin/tourist/
metoda: 	GET
querystring: 	filter=name of filter  {country, winery}
		from= number from tu paginate
		size= number of items
opis: 		Listing dodanih tijela i paginacija

#Dodavanje
-URL:		/admin/tourist/
-metoda:	POST
-opis: 		Dodavanje tur. Org. od strane admina. Dodano tijelo je 						objavljeno.
-napomena:	Za pocetak NE implementirati dodavanje od strane admina
-encoding: 	JSON


#Prikazivanje tijela
-URL: 		/admin/award/[id]/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
encoding: 	JSON


#Azuriranje tijela
-URL: 		/admin/award/[id]/
-metoda: 	PUT
-parametri:  	[id] - jedinstveni ID 
-napomena: 	Azuriranje uvidjenih gresaka.
-encoding: 	JSON
-db polja:	TO DO...

#Brisnje tijela
-URL: 		/admin/award/[id/
-metoda: 	DELETE
-parametri:  	[id] - jedinstveni ID 
-napomena:	Brisanje turisticke organizacije usljed uvidjenih nedostataka 
-podoperacije:	-Obavjestavanje korisnika o izvrsenom brisanju.
			-Onemogucavanje daljnog dodavanja distributera
			-azuriranje statistike
-encoding: 	JSON
-response:	200 OK

#Banned
-URL: 		/admin/award/[id]/banned/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
-encoding: 	JSON
-opis:		Objavljivanje i suprotna operacija. Upucuje se get zahtjev prema url 				adresi. Vracamo status 200 i vrijednost polja publish sa boolean 					vrijednosti.
-podoperacije: 	Obavjestava se korisnik o razlozima banovanja. Omogucava se ispravka gresaka zarad ponovnog aktiviranja rada stranice.
	-azuriranje statistike
-response: 	200 OK {published: false II true}

Baza podataka: tourist
var TouristSchema = new Schema({
	name: {type: String, required: true},
	published: {type: Boolean},
	shortId: {type: ShortId},
	country: {type: String},  
	city: {type: String}
	tel: [],
	email: {type: String},
	www: {type: String},
	plans: [TouristPlanSchema],
	profil: {type: String},
	rss: {type: String},
	map: {},
	review: [],
	rating: {},   //score. number of votes
	article: {type: String},
	created: {type: Date},
	modified: {type: Date}
});
DISTRIBUTER

Distributer stranica trebala bi da omoguci dodavanje distributera vina na nivou drzave

#LISTING
URL: 		/merchant/
metoda: 	GET
querystring: 	filter=name of filter  {country}
		from= number from tu paginate
		size= number of items
opis: 		Listing dodanih tijela i paginacija
encoding: 	JSON

#Dodavanje
-URL:		/merchant/
-metoda:	POST
-opis: 		Dodavanje distributera od strane korisnika..
-napomena:	Dodavanje omoguceno samo registrovanim korisnicima I koji vec nemaju dodanog distributera. 
-podoperacije:	-Informisati admina o dodavanju.
		-Upisati u bazu korisnika
		-upisati statistiku
encoding: 	JSON

#Pretraga
-URL:		/merchant/search/
-metoda:	GET
-opis: 		Pretraga. Koristi se kod pretrage baze. 
-napomena:	Pretrazuje se polje naziv(name)
encoding: 	JSON


#Prikazivanje tijela
-URL: 		/merchant/[id]/[name]/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
		[name] - naziv tijela. Nalazi se u URL-u zarad SEO optimizacije
encoding: 	JSON



#Izmjena tijela
-URL: 		/merchant/[id]/[name]/
-metoda: 	PUT
-parametri:  	[id] - jedinstveni ID 
		[name] - naziv tijela. Nalazi se u URL-u zarad SEO optimizacije
-opis: 		Izmjene vrsi registrovani korisnik koji je napravio stranicu. 

#Brisanje tijela
-URL: 		/merchant/[id]/[name]/
-metoda: 	DELETE
-parametri:  	[id] - jedinstveni ID 
		[name] - naziv tijela. Nalazi se u URL-u zarad SEO optimizacije
-opis: 		Brisanje vrsi registrovani korisnik koji je napravio stranicu. 
-podoperacije:	-Brisanje iz baze distributera.
			-brisanje iz baze korisnika
			-azuriranje statistike
			-obavjestavanje admina


ADMIN

#Listing
URL: 		/admin/merchant/
metoda: 	GET
querystring: 	filter=name of filter  {country,}
		from= number from tu paginate
		size= number of items
opis: 		Listing dodanih tijela i paginacija

#Dodavanje
-URL:		/admin/merchant/
-metoda:	POST
-opis: 		Dodavanje distributera. od strane admina. Dodano tijelo je 						objavljeno.
-napomena:	Za pocetak NE implementirati dodavanje od strane admina
-encoding: 	JSON


#Prikazivanje tijela
-URL: 		/admin/merchant/[id]/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
encoding: 	JSON


#Azuriranje tijela
-URL: 		/admin/merchant/[id]/
-metoda: 	PUT
-parametri:  	[id] - jedinstveni ID 
-napomena: 	Azuriranje uvidjenih gresaka.
-encoding: 	JSON
-db polja:	TO DO...

#Brisnje tijela
-URL: 		/admin/merchant/[id/
-metoda: 	DELETE
-parametri:  	[id] - jedinstveni ID 
-napomena:	Brisanje distributera usljed uvidjenih nedostataka 
-podoperacije:	-Obavjestavanje korisnika o izvrsenom brisanju.
			-Onemogucavanje daljnog dodavanja distributera
			-azuriranje statistike
-encoding: 	JSON
-response:	200 OK

#Banned
-URL: 		/admin/merchant/[id]/banned/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
-encoding: 	JSON
-opis:		Objavljivanje i suprotna operacija. Upucuje se get zahtjev prema url 				adresi. Vracamo status 200 i vrijednost polja publish sa boolean 					vrijednosti.
-podoperacije: 	Obavjestava se korisnik o razlozima banovanja. Omogucava se ispravka gresaka zarad ponovnog aktiviranja rada stranice.
	-azuriranje statistike
-response: 	200 OK {published: false II true}

BAZA
var MerchantSchema = new Schema({
	name: {type: String, required: true},
	shortId: {type: ShortId},
	published: {type: Boolean},
	email: {type: String},
	tel: [],
	city: {type: String},
	country: {type: String},
	article: {type: String},
	region: [countries],
	profil: {type: String},
	rss: {type: String},
	shipping: {type: String},
	postage: {Type: String},
	orderTerms: {type: String}  //terms of order
	wines: [MerchantWineSchema],
	review: [],
	rating: {},
	www: {type: String},
	map: {},
	created: {type: Date},
	modified: {type: Date}
});

Wine page

- dodavanje vina

#LISTING
URL: 		/wine/
metoda: 	GET
querystring: 	filter=name of filter  {country, type, sweetness} 
		from= number from tu paginate
		size= number of items
opis: 		Listing dodanih tijela i paginacija
encoding: 	JSON

#Dodavanje
-URL:		/wine/
-metoda:	POST
-opis: 		Dodavanje vina od strane korisnika. Dodano tijelo nije 						objavljeno.
-podoperacije:	-Obavijestiti administrator o dodavanju vina.
-Pri objavljivanju od strane odministratora obavijestiti korisnika I prihvatanju unosa.
-Pri objavljivanju azurirati statistiku.	
encoding: 	JSON

#Pretraga
-URL:		/wine/search/
-metoda:	GET
-opis: 		Pretraga. Koristi se kod pretrage baze.
-napomena:	Pretrazuje se polje naziv(name)
encoding: 	JSON


#Prikazivanje tijela
-URL: 		/wine/[id]/[name]/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
		[name] - naziv tijela. Nalazi se u URL-u zarad SEO optimizacije
encoding: 	JSON



#Izmjena tijela
-URL: 		/wine/[id]/[name]/
-metoda: 	PUT
-parametri:  	[id] - jedinstveni ID 
		[name] - naziv tijela. Nalazi se u URL-u zarad SEO optimizacije
-opis: 		izmjena podataka od strane korisnika. Upis se dodaju u bazu edit  i ceka 			odobrenje admina za koriscenje. 

#Prikazivanje recenzija
-URL: 		/wine/[id]/[name]/reviews/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
		[name] - naziv tijela. Nalazi se u URL-u zarad SEO optimizacije
-opis:		Prikazivanje recenzija.
encoding: 	JSON

#Dodavanje recenzije
-URL: 		/wine/[id]/[name]/reviews/
-metoda: 	POST
-parametri:  	[id] - jedinstveni ID 	
-opis:		Dodavanje recenzije 

#Ocjena recenzije
-URL: 		/wine/[id]/[name]/reviews/[Rid]/
-metoda: 	POST
-parametri:  	[id] - jedinstveni ID 	
		[Rid] – id recenzije
-opis:		Ocjenjivanje recenzije
-podoperacije:	-Azuriranje dokumenta(++ pozitivna recenzija)
			-Sortiranje po recenzijama
-U slucaju da recenzija ima vise glasova od one u glavnom dokumentu izvrsti upis.
-napomena:	Ocjeniti recenziju mogu samo registrovani korisnici I korisnici koji to vec nisu ucinili. 
	Ocjena recenzije nije omogucena autoru iste.


ADMIN

#Listing
URL: 		/admin/wine/
metoda: 	GET
querystring: 	filter=name of filter  {country, type, sweetness}
		from= number from tu paginate
		size= number of items
opis: 		Listing dodanih tijela i paginacija

#Dodavanje
-URL:		/admin/wine/
-metoda:	POST
-opis: 		Dodavanje tijela za nagrade od strane admina. Dodano tijelo je 					objavljeno.
encoding: 	JSON


#Prikazivanje tijela
-URL: 		/admin/wine/[id]/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
encoding: 	JSON


#Azuriranje tijela
-URL: 		/admin/wine/[id]/
-metoda: 	PUT
-parametri:  	[id] - jedinstveni ID 
-encoding: 	JSON
-db polja:	TO DO...

#Brisnje tijela
-URL: 		/admin/wine/[id/
-metoda: 	DELETE
-parametri:  	[id] - jedinstveni ID 
-encoding: 	JSON
-response:	200 OK

#PUBLISH 
-URL: 		/admin/wine/[id]/publish/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
-encoding: 	JSON
-opis:		Objavljivanje i suprotna operacija. Upucuje se get zahtjev prema url 				adresi. Vracamo status 200 i vrijednost polja publish sa boolean 					vrijednosti.
-response: 	200 OK {published: false II true}

#Lista recenzije
-URL: 		/admin/wine/[id]/[name]/reviews/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 	


#Brisanje recenzije
-URL: 		/admin/wine/[id]/[name]/reviews/
-metoda: 	DELETE
-parametri:  	[id] - jedinstveni ID 	
-podoperacije:	-Obavjestavanje korisnika o brisanju recenzije. 
			-Azuriranje statistike
			-Sortiranje
			-ako je bio najbolje ocjenjena recenzija postaviti drugu u glavni document
			-TO DO brisanje glasova recenzije
-opis:		Dodavanje recenzije 


Baza:
var WineSchema = new Schema({
    name: {type: String, required: true},
    shortId: {type: ShortId},
    published: {type: Boolean},
    vintage: {type: Number}, //year of harvest
    addedBy: {type: String, enum: ['user', 'admin']},
    profil: {type: String},  //picture
    pictures: [PictureSchema],
    winery: {},   //{name, id, state, region , contact}
    alc: {type: Number},
    volume: {type: Number},   //size of bottle
    intro: {type: String},  //short descrioption
    article: {type: String},
    grapes: [ShortGrapeSchema],
    wineType: {type: String, enum: ['red', 'white', 'rose', 'sampanjac']},
    sweetness: {type: String, enum:['dry', 'semydry', 'sweet']},
    averagePrice: {type: Number},
    awards: [AwardPerWineSchema],  //awards for that particular wine
    food: {type: String},
    score: {type: Number},
    color: {type: String},
    smell: {type: String},
    taste: {type: String},
    clima: {type: String},
    sugar: {type: Number},
    food: [],
    temperature: {type: Number},
    organic: {type: Boolean},
    odlezavanje: {type: String},
    rss: {type: String},
    merchants: [ShortMerchantSchema],
    news: [] //news related to this document TO DO
});










Winery


#LISTING
URL: 		/winery/
metoda: 	GET
querystring: 	filter=name of filter  {country, region} 
		from= number from tu paginate
		size= number of items
opis: 		Listing dodanih tijela i paginacija
encoding: 	JSON

#Dodavanje
-URL:		/winery/
-metoda:	POST
-opis: 		Dodavanje vina od strane korisnika. Dodano tijelo nije 						objavljeno.
-podoperacije:	-Obavijestiti administrator o dodavanju vina.
-Pri objavljivanju od strane odministratora obavijestiti korisnika I prihvatanju unosa.
-Pri objavljivanju azurirati statistiku.	
encoding: 	JSON

#Pretraga
-URL:		/winery/search/
-metoda:	GET
-opis: 		Pretraga. Koristi se kod pretrage baze . 
-napomena:	Pretrazuje se polje naziv(name)
encoding: 	JSON


#Prikazivanje tijela
-URL: 		/winery/[id]/[name]/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
		[name] - naziv tijela. Nalazi se u URL-u zarad SEO optimizacije
encoding: 	JSON



#Izmjena tijela
-URL: 		/winery/[id]/[name]/
-metoda: 	PUT
-parametri:  	[id] - jedinstveni ID 
		[name] - naziv tijela. Nalazi se u URL-u zarad SEO optimizacije
-opis: 		izmjena podataka od strane korisnika. Upis se dodaju u bazu edit  i ceka 			odobrenje admina za koriscenje. 

#Prikazivanje recenzija
-URL: 		/winery/[id]/[name]/reviews/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
		[name] - naziv tijela. Nalazi se u URL-u zarad SEO optimizacije
-opis:		Prikazivanje recenzija.
encoding: 	JSON

#Dodavanje recenzije
-URL: 		/winery/[id]/[name]/reviews/
-metoda: 	POST
-parametri:  	[id] - jedinstveni ID 	
-opis:		Dodavanje recenzije 

#Ocjena recenzije
-URL: 		/winery/[id]/[name]/reviews/[Rid]/
-metoda: 	POST
-parametri:  	[id] - jedinstveni ID 	
		[Rid] – id recenzije
-opis:		Ocjenjivanje recenzije
-podoperacije:	-Azuriranje dokumenta(++ pozitivna recenzija)
			-Sortiranje po recenzijama
-U slucaju da recenzija ima vise glasova od one u glavnom dokumentu izvrsti upis.
-napomena:	Ocjeniti recenziju mogu samo registrovani korisnici I korisnici koji to vec nisu ucinili. 
	Ocjena recenzije nije omogucena autoru iste.


ADMIN

#Listing
URL: 		/admin/winery/
metoda: 	GET
querystring: 	filter=name of filter  {country, region}
		from= number from tu paginate
		size= number of items
opis: 		Listing dodanih tijela i paginacija

#Dodavanje
-URL:		/admin/winery/
-metoda:	POST
-opis: 		Dodavanje tijela za nagrade od strane admina. Dodano tijelo je 					objavljeno.
encoding: 	JSON


#Prikazivanje tijela
-URL: 		/admin/winery/[id]/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
encoding: 	JSON


#Azuriranje tijela
-URL: 		/admin/winery/[id]/
-metoda: 	PUT
-parametri:  	[id] - jedinstveni ID 
-encoding: 	JSON
-db polja:	TO DO...

#Brisnje tijela
-URL: 		/admin/winery/[id/
-metoda: 	DELETE
-parametri:  	[id] - jedinstveni ID 
-encoding: 	JSON
-response:	200 OK

#PUBLISH 
-URL: 		/admin/winery/[id]/publish/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 
-encoding: 	JSON
-opis:		Objavljivanje i suprotna operacija. Upucuje se get zahtjev prema url 				adresi. Vracamo status 200 i vrijednost polja publish sa boolean 					vrijednosti.
-response: 	200 OK {published: false II true}

#Lista recenzije
-URL: 		/admin/winery/[id]/[name]/reviews/
-metoda: 	GET
-parametri:  	[id] - jedinstveni ID 	

#Brisanje recenzije
-URL: 		/admin/winery/[id]/[name]/reviews/
-metoda: 	DELETE
-parametri:  	[id] - jedinstveni ID 	
-podoperacije:	-Obavjestavanje korisnika o brisanju recenzije. 
			-Azuriranje statistike
			-Sortiranje
			-ako je bio najbolje ocjenjena recenzija postaviti drugu u glavni document
			-TO DO brisanje glasova recenzije
-opis:		Dodavanje recenzije 

Baza:
var WinerySchema = new Schema({
	name: {type: String, required: true},
	shortId: {type: ShortId},
	published: {type: Boolean},
	established: {type: Number},
	country: {},   // {name , republic}
	contact:{},   // {tel:[], email, www}
	touristInfo: {},  //{restaurant, hotel}
	location:{},   // street adress, city
	description: {type: String},
	profil: {type: String},  //picture
	wines:[listOfWinesSchema],
	media: [MediaSchema],
	selling: {type: String},  //?
	recenzion: [],  //to implement
	literPerYear: {type: Number},
	altitude: {type: Number},
	owner: {type: String},
	povrsina: {type: Number},
	notified: {type: Boolean}   //email nootification to winery
	grapes:[ShortGrapeSchema],
	pictures: [PictureSchema],
	awards: [AwardPerWineSchema],
	wineriesLocations: [WineriesLocationSchema],  //definition of wineyards
	rss: {type: String},
	map: {},
	news: [] //news related to this document TO DO
});
















User

Baza:
var AccountSchema = new Schema({
	name: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required: true},
	id: {type: String},
	reviews:[],
	ratings: [],
	favourites: [ShortWineSchema],  //user favourite wines
	banned: {type: Boolean},
	merchant: {type: Boolean, default: false},
	merhantId: {type: String},  //user created merchant
	tourist: {type: Boolean, default: false},
	touristId: {type: String},  // user created tourist

});


REST

























EDIT

Baza:

var EditSchema = new Schema({
	user: {type: String, required: true},
	explanation: {type: String},
	category: {type: String},
	date: {type: Date},
	changes: {}    //json object of changes
});


REST