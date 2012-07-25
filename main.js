// ==UserScript==
// @author      Ilirith, GaryMcNabb, FarFaraway 
// @description  
// @name        H+
// @namespace   Notyet
// @include     http://hentaiverse.org/*
// @version     0.0
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

/*======================*\
      _          
     / | |\     
     | |_| \_|\_  
     |  _  |_   \
     | | | | |_|  
     \_| |_/ 
	 
 HentaiVerse+ v0.0.1
 -----------------------
 Friendship is Magic.
\*======================*/

//=== GLOBAL VARIABLES | NEUE VARIABELEN GLOBALER ART


//=== EVENT TRIGGERS
// evResLoad(e);
// evDomLoad();
//
// Events fire in THIS order:
// evResLoad - Triggers loading all external resources EXCLUDING img tags.
// evDomLoad - Triggers once the DOM has loaded and page painted.
// evResLoad - Triggers each time an image is loaded.
//===
document.addEventListener( "beforeload", evResLoad, true );
document.addEventListener( "DOMContentLoaded", evDomLoad, true );

function evResLoad( e ){
	// == Image blocking and redirecting goes here == //
}

function evDomLoad(){
	var doc = document;
	
	// -- Page Check Goes Here -- //
	
	// == Hide the Battle Log during Parsing and Redecorating.
	doc.styleSheets[0].insertRule( "#togpane_log {display:none;}", 0 );
	parseBattleLog( doc.getElementById('togpane_log').innerHTML );
	// == Show the Battle Log again.
	doc.styleSheets[0].deleteRule(0);
}

//=== FUNCTIONS
// Explaination Goes Here
//===

function parseBattleLog(){
}

function H_plus_settings(){
//Ilirith

//GaryMcNabb

//FarFaraway - Monster DB
 this.MDB_save_scanned_mobs = true;
 this.MDB_show_monster_hp = true;
 this.MDB_show_monster_hp_in_percent = true;
 this.MDB_save_Monster_skills = true;
 }

var MDB_Number =[
new MDB_Monster_Numbers(0, "Error"),
new MDB_Monster_Numbers(1, "Slashing"),
new MDB_Monster_Numbers(2, "Crushing"),
new MDB_Monster_Numbers(3, "Piercing"),
new MDB_Monster_Numbers(4, "Soul"),
new MDB_Monster_Numbers(5, "Fire"),
new MDB_Monster_Numbers(6, "Cold"),
new MDB_Monster_Numbers(7, "Elec"),
new MDB_Monster_Numbers(8, "Wind"),
new MDB_Monster_Numbers(9, "Holy"),
new MDB_Monster_Numbers(10, "Dark"),
new MDB_Monster_Numbers(11, "Nothing")
]

/* functions for Variabels
Funktionen der Array Variabelen
*/

// simple tamplate for the Monster DB
function MonsterStats(Name, ID, Class, MainATK, PowerLV, Trainer, weakness, resistant, impervious){
 this.Name = Name;                     //a String
 this.ID = ID;                         //Integer
 this.Class = Class;                   //String
 this.MainATK = MainATK;               //Int
 this.PowerLV = PowerLV;               //Int
 this.Trainer = Trainer;               //String
 this.weakness = weakness;             //array of int
 this.resistant = resistant;           //array of int
 this.impervious = impervious;         //array of int
 }

function MDB_Monster_Numbers(ID, String){
 this.ID=ID;                           //ID
 this.Name=String;                     //Name of the Element/Atack
 } 

function MDB_Monster_Numbers(ID, String){
 this.ID=ID;                           //ID
 this.Name=String;                     //Name of the Element/Atack
 } 
/*
Save and load Data place
*/
function local(Store_Name, overwrite_with){                          //Function to save/load permanent
 var Temp_Data = [];
 if (overwrite_with === undefined){                                  //nothing to overwrite? Send the Data from the database
  Temp_Data = JSON.parse(localStorage.getItem(Store_Name));
  return Temp_Data;                                                  //will return null when nothing is stored in the DB
	}
 else {
  localStorage.setItem(Store_Name, JSON.stringify(overwrite_with))
  }
	return true                                                        //return true (sucess at save) when there where no errors
}


function MDB_add_mob_stat(Name, ID, Class, MainATK, PowerLV, Trainer, weakness, resistant, impervious){
 var MOB_BASE = [];
 var temp_Mob = new MonsterStats(Name,ID,Class, MainATK,PowerLV, Trainer, weakness, resistant, impervious);
 var BASE_ID = 0;
 var Schonvorhanden = false;
 if (local("MonsterDB") !== null) 
  {
   MOB_BASE = local("MonsterDB")
  }
 for (var i = 0, z = MOB_BASE.length; i< z; i++){
   if (MOB_BASE[i].ID == ID){
    Schonvorhanden = true;
    MOB_BASE[BASE_ID]=temp_Mob;
    i=z;
    local("MonsterDB", MOB_BASE);
    }
  } 
 if (Schonvorhanden == false){
  MOB_BASE.push(temp_Mob);
  local("MonsterDB", MOB_BASE);
  }
 }
/*
Finally, the real "working" functions
*/

//FarFaraway, MDB
function MDB_read_scan(TD_Element){
 var soll_ich_scannen = true;
 var zahl = 0;
 var beginn = 0;
 var ende = 0;
 var mini_beginn = 0;
 var mini_ende = 0;
 var Name = "";  
 var Monster_Klasse = "";
 var PowerLV = 0;
 var Trainer = "";
 var MainATK = 0;
 var Temp_String = "";
 var weakness=[];
 var resistant=[];
 var impervious=[];
 var ID = 0;
 for (var i=0, z=TD_Element.length; i<z; i++){
  temp_TD = TD_Element[i];
  if (temp_TD.outerHTML){
   String_TD = temp_TD.outerHTML;
   }
  else{
   if (XMLSerializer){
    String_TD = new XMLSerializer().serializeToString(temp_TD);
    }
   }
  if ((String_TD.match("Scanning"))&&(soll_ich_scannen == true)){
   beginn = String_TD.indexOf("Scanning ")+9;
   ende = String_TD.indexOf("...", beginn);
   Name = String_TD.substring(beginn, ende);
   beginn = String_TD.indexOf("Monster Class", ende);
   beginn = String_TD.indexOf("</td>", beginn)+5;
   beginn = String_TD.indexOf(">", beginn)+1;
   ende = String_TD.indexOf("</td>", beginn);
   Monster_Klasse = String_TD.substring(beginn, ende);
   if (Monster_Klasse.match(",")){
    mini_beginn = Monster_Klasse.indexOf("Level ")+6;
    mini_ende = Monster_Klasse.length;
    PowerLV = parseInt(Monster_Klasse.substring(mini_beginn, mini_ende));
    mini_beginn=0;
    mini_ende = Monster_Klasse.indexOf(",");
    Monster_Klasse = Monster_Klasse.substring(mini_beginn, mini_ende);
    }
   beginn = String_TD.indexOf("Monster Trainer", ende);
   beginn = String_TD.indexOf("</td>", beginn)+5;
   beginn = String_TD.indexOf(">", beginn)+1;
   ende = String_TD.indexOf("</td>", beginn);
   Trainer = String_TD.substring(beginn, ende);
   if (Trainer ==""){
    Trainer = "System";
    }
   beginn = String_TD.indexOf("Melee Attack", ende);
   beginn = String_TD.indexOf("</td>", beginn)+5;
   beginn = String_TD.indexOf(">", beginn)+1;
   ende = String_TD.indexOf("</td>", beginn);
   Temp_String = String_TD.substring(beginn, ende);
   MainATK = MDB_seek_Number(Temp_String);
   beginn = String_TD.indexOf("Weak against", ende);
   beginn = String_TD.indexOf("</td>", beginn)+5;
   beginn = String_TD.indexOf(">", beginn)+1;
   ende = String_TD.indexOf("</td>", beginn);
   Temp_String = String_TD.substring(beginn, ende);
   weakness = MDB_fetch(Temp_String);
   beginn = String_TD.indexOf("Resistant to", ende);
   beginn = String_TD.indexOf("</td>", beginn)+5;
   beginn = String_TD.indexOf(">", beginn)+1;
   ende = String_TD.indexOf("</td>", beginn);
   Temp_String = String_TD.substring(beginn, ende);
   resistant = MDB_fetch(Temp_String);
   beginn = String_TD.indexOf("Impervious to", ende);
   beginn = String_TD.indexOf("</td>", beginn)+5;
   beginn = String_TD.indexOf(">", beginn)+1;
   ende = String_TD.indexOf("</td>", beginn);
   Temp_String = String_TD.substring(beginn, ende);
   impervious = MDB_fetch(Temp_String);
   soll_ich_scannen = false;
   }
  if ((soll_ich_scannen == false) && (String_TD.match(Name))){
   beginn = String_TD.indexOf("MID=")+4;
   ende = String_TD.indexOf(" (", beginn);
   ID = parseInt(String_TD.substring(beginn, ende));   
   }     
  }
 if (soll_ich_scannen == false){
  MDB_add_mob_stat(Name, ID, Monster_Klasse, MainATK, PowerLV, Trainer, weakness, resistant, impervious);
  }  
 } 
function MDB_seek_Number(String){
 var Number = 0;
 for (var i=0, z=MDB_Number.length; i<z; i++){
  if (MDB_Number[i].Name == String){
   Number = MDB_Number[i].ID; 
   i=z;
   }
  }
 return Number; 
 } 
function MDB_seek_String(Number){
 var String = "";
 for (var i=0, z=MDB_Number.length; i<z; i++){
  if (MDB_Number[i].ID == Number){
   String = MDB_Number[i].Name; 
   i=z;
   }
  }
 return String; 
 }
function MDB_fetch(String){ 
 var mini_ende = 0;
 var mini_beginn = 0;
 var zahl = 0;
 var Numbers =[];
 if (String.match(",")){
  while (String.indexOf(",",mini_beginn)!=-1){
   mini_ende=String.indexOf(",",mini_beginn);
   Numbers[zahl]=MDB_seek_Number(String.substring(mini_beginn, mini_ende));
   zahl++;
   mini_beginn = mini_ende+2;
   }
  mini_ende = String.length;
  Numbers[zahl]=MDB_seek_Number(String.substring(mini_beginn, mini_ende)); 
  }
 else{
  Numbers[0] = MDB_seek_Number(String);
  }
 return Numbers;
 }
function MDB_puke_String(Number_Array){ 
 var String ="";
 for (var i=0, z=Number_Array.length, trenner="";i<z;i++,trenner=", "){
  String += trenner + MDB_seek_String(Number_Array[i]);
  }
 return String; 
 }     