//Funkcija za prikaz/skritje besedila (licence) pod sliko
function showText(img){
    const text = img.parentElement.nextElementSibling; //poišče naslednji element (besedilo), ki ga bo pokazala. Besedilo je takoj za img atributom!
    if(text.style.display == "block"){
        text.style.display = "none"; //skrije besedilo, če je že prikazano
    }else {
        text.style.display = "block" // pokaže besedilo, če je bilo skrito
    }
}

//funkcija za prikaz/skritje namiga, glede na indeks namiga (imam dva namiga)
function myFunction(index) {

    const hints = document.querySelectorAll('.hint'); //dobi oba namiga
    const hint = hints[index]; // vzame le tistega, katerega določa indeks

    if(hint.style.display == 'block') {
        hint.style.display = 'none'; //skrije namig, če je že prikazan
    }else{
        hint.style.display = 'block';//prikaže namig, če je skrit
    }
}

//funkcija za preverjanje gesla za vstop v razdelek Preizkusi se
function checkPassword(event){
    event.preventDefault(); //prepreči, da bi povezava delovala brez gesla
    const password = prompt("Vpiši geslo za vstop:") // zahteva vnos gesla z vstop

    //če vneseno geslo pravilno (ni občutljivo na male/velike črke in presledke)
    if(password && password.toLocaleLowerCase().trim() === "čistopis"){
        window.location.href = "preizkusiSe.html"; //če geslo pravilno, preusmeri na podstran
    }else {
        alert("Napačno geslo. Poskusi znova."); //če geslo napačno, opozori, da je napačno
    }
}

//prikaz licence na strani zgodovine, saj pokaže licencu na dnu časovnice
function showLicence(){
    //alert('SI STISNO');
    const licence = document.querySelectorAll('.hide-na-belo'); //izbere vsa polja z licenco
    const pokazi_licenco = licence[1]; //izbere drugo licenco (prva je za naslovno sliko)
    if(pokazi_licenco.style.display == 'block'){
        pokazi_licenco.style.display = 'none'; //skrije to licenco, če je prikazana
    }else{
        pokazi_licenco.style.display = 'block'; //prikaže licenco, če je skrita
        pokazi_licenco.scrollIntoView(); //premakne pogled na licenco (na dno strani)
    }
}

//Funkcija za kodiranje besedila s Cezarjevim kriptogramom
function kriptiraj(){
    //Slovenska abeceda
    const abeceda = "a b c č d e f g h i j k l m n o p r s š t u v z ž".split(" ");
    const besedilo = document.getElementById("text").value; //uporabnikov vnos
    const zamik = Number(document.getElementById("key").value);//uporabnikova določitev zamika(ključa)

    let kriptogram = ""; //izhodno zakodirano sporočilo

    //sprehodi se po besedilo in vsako črko zamika
    for (let char of besedilo){
        let crka = char.toLowerCase(); //ker v tabeli samo male črke najprej spremeni črko v malo črko
        if(abeceda.includes(crka)) { //če je znak črka, jo zamakne
            let starI = abeceda.indexOf(crka); //trenutna pozicija črke v abecedi
            let novI = (starI + zamik)% abeceda.length;//pozicija po zamiku
            let novaCrka = abeceda[novI]; //nova črka za kriptogram

            //spremeni velikost, če je bila začetna črka velika, in jo doda k izhodnemu sporočilu
            if(char == char.toUpperCase()){
                kriptogram+= novaCrka.toUpperCase();
            }else { //če začetna črka mala ne spreminja in samo doda novo črko k izhodnemu sporočilu
                kriptogram+= novaCrka;
            }
            
        } else { //če zank ni črka (npr število, presledek,...) potem jo pusti
            kriptogram+=char;
        }
    }

    document.getElementById("kriptogram").textContent=kriptogram; //prikaže kriptogram v razdelku kriptogram

}

//funkcija za preverjanja naloge v razdelku preizkusi se (poznavanje osnovnih pojmov)
function preveriOdgovore(){

    //pravilni odgovori, oblika ključ/vrednost
    const pravilniOdgovori = {
        dropdown1: "čistopis",
        dropdown2: "kriptogram",
        dropdown3: "enkripcijskega algoritma",
        dropdown4: "dekripcijski ključ",
        dropdown5: "cezarjev kriptogram",
        dropdown6: "cik-cak kriptogram"
    };

    //zanka, ki gre skozi vse ključe
    for (const id in pravilniOdgovori){
        
        const izbran = document.getElementById(id).value;//pridobi vrednost, ki jo je uporabnik zbral pri trenutnem id

        if (izbran === pravilniOdgovori[id]){ //če se izbira ujema s pravilnim odgovorom
            document.getElementById(id).style.borderColor = "green"; // obarvamo obrobo dropdown menija v zeleno
        } else {
            //če ni pravilen, obarvamo obrobo rdeče
            document.getElementById(id).style.borderColor = "red";
        }
    }
}