// ==UserScript==
// @author      Ilirith, GaryMcNabb, FarFaraway MrTT 
// @description Lost in HV? Get the Overview - get H+! 
// @name        H+
// @namespace   Notyet
// @include     http://hentaiverse.org/*
// @version     0.0.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
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
];

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
  switch(PAGE_Info()){                                                //Pagecheck outsorced to the page_Info function
                                                                      //is in ongoing fight in the...
   case 1:                                                            //Itemworld
   case 4:                                                            //Arena
   case 7:                                                            //Ring of Blood
   case 10:                                                           //Grindfest
   case 13:                                                           //Crysefest
   case 16:                                                           //Random Battle
    MDB_read_scan($(".t3").get());
    parseBattleLog();
    break;                                                            
                                                                      //Someone Finished/lose/flee...
   case 2:                                                            //Itemworld
   case 5:                                                            //Arena
   case 8:                                                            //Ring of Blood
   case 11:                                                           //Grindfest
   case 14:                                                           //Crysefest
   case 17:                                                           //Random Battle
    MDB_read_scan($(".t3").get());
    parseBattleLog();
    break; 
                                                                      //Someone just visit one Battlefield, don't start a battle
   case 3:                                                            //Itemworld
   case 6:                                                            //Arena
   case 9:                                                            //Ring of Blood
   case 12:                                                           //Grindfest
   case 15:                                                           //Crystfest
   case 18:                                                           //Random Battle
    
    break;
                                                                      //result when an other userscript create his own page (HV-SS as example)
   case -1:                                                           //It's mostly not clever to start something there ;-)
    break;                                                            
   default:                                                           //The Script don't know where we are exactly, but it's somewhere on the HV
   
    break; 
  }
	// == Hide the Battle Log during Parsing and Redecorating.
/*
##
#FarFaraway/info -> disabeld until 1. there is an #togpane for a little css change, 2. parseBattleLog is added 
# (sorry, i run this script the moment i work on it to find the first logic errors)
##
	doc.styleSheets[0].insertRule( "#togpane_log {display:none;}", 0 );
*/	
	parseBattleLog();
/*
	// == Show the Battle Log again.
	doc.styleSheets[0].deleteRule(0);
*/	
}

//=== FUNCTIONS
// Explaination Goes Here
//===

function parseBattleLog(){
 var Battle_Data = new BATTLE_DATA();
 var check_if_there_are_different_mobs = false;
 var something_done = false;
 if (local("Battle_DB") !== null){Battle_Data = local("Battle_DB");}
 if (Battle_Data.Round_now == ( parseInt($(".t1:first").get().html)+1)){
  Battle_Data = update_Battle_statistic(Battle_Data);
  something_done = true;
  }
 else{
  if (Battle_Data.Round_now != parseInt($(".t1:first").get().html)){
   if ($(".t3").get().length != Battle_Data.Monster_DATA.length){
    Battle_Data = new_Battle_statistic();
    something_done = true;
    }
   else{
    for (var i=0, z=(MDB_read_scan($(".t3").get())).length; i<z; i++){
     check_if_there_are_different_mobs = ($(".btm3 .fd10").get().html.match(Battle_Data.Monster_DATA[i].Name)) ? check_if_there_are_different_mobs : true;
     }
    if (check_if_there_are_different_mobs){Battle_Data = new_Battle_statistic();something_done = true;} 
    } 
   }
  } 
 if (something_done){local("Battle_DB", Battle_Data);} 
}

/* functions for Variabels
Funktionen der Array Variabelen
*/

function H_plus_settings(){ //Settings template. this will become the default settings for the script
//MrTT

//Ilirith

//GaryMcNabb

//FarFaraway - Monster DB
 this.MDB_save_scanned_mobs = true;
 this.MDB_show_monster_hp = true;
 this.MDB_show_monster_hp_in_percent = true;
 this.MDB_save_Monster_skills = true;
 }
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
//tamplate for Monstes in the Battle Database
function BATTLE_Monster_tamplate(){
 this.Name = "";
 this.ID = 0;
 this.HP = 0;
 this.MP = 0;
 this.SP = 0;
} 
//tamplate to save the battle data. 
function BATTLE_DATA(){
 this.Monster_DATA = [];
 this.Round_now = 0;
 this.Round_total = 0;
 this.proficiency_OH = 0;
 this.proficiency_TH = 0;
 this.proficiency_DW = 0;
 this.proficiency_Staff = 0;
 this.proficiency_CA = 0;
 this.proficiency_LA = 0;
 this.proficiency_HA = 0;
 this.proficiency_Elemental = 0;
 this.proficiency_Divine = 0;
 this.proficiency_Forbidden = 0;
 this.proficiency_Spiritual = 0;
 this.proficiency_Deprecating = 0;
 this.proficiency_Supportive = 0;
 this.proficiency_Curative = 0;
 this.Statistic_Phsyical_Attack_total = 0;
 this.Statistic_Phsyical_Attack_hit = 0;
 this.Statistic_Phsyical_Attack_hit = 0;
 this.Statistic_Phsyical_Attack_crit = 0;
 this.Statistic_Phsyical_Overwhelming_total = 0;
 this.Statistic_Phsyical_Overwhelming_hit = 0;
 this.Statistic_Phsyical_Offhand_total = 0;
 this.Statistic_Phsyical_Offhand_hit = 0;
 this.Statistic_Phsyical_Domino_total = 0;
 this.Statistic_Phsyical_Domino_hit = 0;
 this.Statistic_Phsyical_Domino_2 = 0;
 this.Statistic_Phsyical_Domino_3 = 0;
 this.Statistic_Phsyical_Domino_4 = 0;
 this.Statistic_Phsyical_Domino_5 = 0;
 this.Statistic_Phsyical_Domino_6 = 0;
 this.Statistic_Phsyical_Domino_7 = 0;
 this.Statistic_Phsyical_Domino_8 = 0;
 this.Statistic_Phsyical_Domino_9 = 0;
 this.Statistic_Phsyical_Stun = 0;
 this.Statistic_Phsyical_Penetrate = 0;
 this.Statistic_Phsyical_Bleed = 0;
 this.Statistic_Phsyical_dealt_deamage = 0;
 this.Statistic_Phsyical_dealt_crit_deamage = 0;
 this.Statistic_Phsyical_Drain_MP = 0;
 this.Statistic_Phsyical_Drain_HP = 0;
 this.Statistic_Phsyical_Drain_SP = 0;
 this.Statistic_Magic_Total = 0;
 this.Statistic_Magic_Hit = 0;
 this.Statistic_Magic_Channeling = 0;
 this.Statistic_Magic_Crit = 0;
 this.Statistic_Magic_dealt_deamage = 0;
 this.Statistic_Magic_dealt_crit_deamage = 0;
 this.Statistic_Defence_Counter_chance = 0;
 this.Statistic_Defence_Counter_1 = 0;
 this.Statistic_Defence_Counter_2 = 0;
 this.Statistic_Defence_Counter_3 = 0;
 this.Statistic_Defence_Counter_triggered = 0;
 this.Statistic_Defence_attacks = 0;
 this.Statistic_Defence_hits = 0;
 this.Statistic_Defence_hits_deamage = 0; 
 this.Statistic_Defence_crits = 0;
 this.Statistic_Defence_crits_deamage = 0;
 this.Statistic_Defence_Miss = 0;
 this.Statistic_Defence_Evade = 0;
 this.Statistic_Defence_Block = 0;
 this.Statistic_Defence_Parry = 0;
 this.Statistic_Defence_Resist = 0;
 this.Statistic_Heal_Cure_1_count = 0;
 this.Statistic_Heal_Cure_1 = 0;
 this.Statistic_Heal_Cure_2_count = 0;
 this.Statistic_Heal_Cure_2 = 0;
 this.Statistic_Heal_Cure_3_count = 0;
 this.Statistic_Heal_Cure_3 = 0;
 this.Statistic_Heal_Absorb_cast = 0;
 this.Statistic_Heal_Absorb_triggered = 0;
 this.Statistic_Heal_Absorb_cost = 0;
 this.Statistic_Heal_Absorb_gain_mp = 0;
 
    
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

//FarFaraway, function to update the last fight data & read the battle log
function update_Battle_statistic(Battle_Data){

 return Battle_Data;
}
function new_Battle_statistic(){
 var Battle_Data = new BATTLE_DATA();
 
 return Battle_Data
}
function new_Monster_List(){
 var Monster_BASE = []; 
 var temo_Mob = new BATTLE_Monster_tamplate();
 
 return Monster_BASE;
 }
function update_Monster_List(Monster_BASE){
 var temo_Mob = new BATTLE_Monster_tamplate();
 
 return Monster_BASE;
} 
//FarFaraway, Functions to check the actual page
function PAGE_Info(){                                      //This function will return NUMBERS
 var Antwort = -1;
 Antwort = ($(".stuffbox").length > 0) ? 0 : Antwort; 
//Itemworld
 Antwort = ((Battle_status() == 1)&&(document.location.href.match("s=Battle&ss=iw"))) ? 1 : Antwort;
 Antwort = ((Battle_status() == 2)&&(document.location.href.match("s=Battle&ss=iw"))) ? 2 : Antwort;
 Antwort = ((Battle_status() == 0)&&(document.location.href.match("s=Battle&ss=iw"))) ? 3 : Antwort;
//Arena
 Antwort = ((Battle_status() == 1)&&(document.location.href.match("s=Battle&ss=ar"))) ? 4 : Antwort;
 Antwort = ((Battle_status() == 2)&&(document.location.href.match("s=Battle&ss=ar"))) ? 5 : Antwort;
 Antwort = ((Battle_status() == 0)&&(document.location.href.match("s=Battle&ss=ar"))) ? 6 : Antwort;
//Ring of Blood
 Antwort = ((Battle_status() == 1)&&(document.location.href.match("s=Battle&ss=rb"))) ? 7 : Antwort;
 Antwort = ((Battle_status() == 2)&&(document.location.href.match("s=Battle&ss=rb"))) ? 8 : Antwort;
 Antwort = ((Battle_status() == 0)&&(document.location.href.match("s=Battle&ss=rb"))) ? 9 : Antwort; 
//Grindfest
 Antwort = ((Battle_status() == 1)&&(document.location.href.match("s=Battle&ss=gr"))) ? 10 : Antwort;
 Antwort = ((Battle_status() == 2)&&(document.location.href.match("s=Battle&ss=gr"))) ? 11 : Antwort;
 Antwort = ((Battle_status() == 0)&&(document.location.href.match("s=Battle&ss=gr"))) ? 12 : Antwort;
//CrysFest
 Antwort = ((Battle_status() == 1)&&(document.location.href.match("s=Battle&ss=cf"))) ? 13 : Antwort;
 Antwort = ((Battle_status() == 2)&&(document.location.href.match("s=Battle&ss=cf"))) ? 14 : Antwort;
 Antwort = ((Battle_status() == 0)&&(document.location.href.match("s=Battle&ss=cf"))) ? 15 : Antwort;
//Hourly Encounter 
 Antwort = ((Battle_status() == 1)&&(document.location.href.match("s=Battle&ss=ba"))) ? 16 : Antwort;
 Antwort = ((Battle_status() == 2)&&(document.location.href.match("s=Battle&ss=ba"))) ? 17 : Antwort;
 Antwort = ((Battle_status() == 0)&&(document.location.href.match("s=Battle&ss=ba"))) ? 18 : Antwort;
  
 
 return Antwort;                    
}
//FarFaraway, little beside function for PAGE_Info
function Battle_status(){
 var Status = 0;
 Status = ($("#togpane_log").length > 0) ? 1 : Status;
 Status = ($("#battleform .btcp").length > 0) ? 2 : Status;
 return Status;
}

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