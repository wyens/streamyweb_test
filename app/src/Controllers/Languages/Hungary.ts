import { Lang } from "./Lang";


class Hungary extends Lang {

    constructor(){
        super("hu")
        this.vals = [
            // default entries
            {"": ""},

            // menu entries
            {"iptv": "Online IPTV"},
            {"films": "Filmek"},
            {"series": "Sorozatok"},
            {"favorites": "Kedvencek"},
            {"profile": "Profile"},
            {"support": "Segítség"},
            // footer entries 
            {"Leave feedback": "Hagyjon visszajelzést"},
            {"Navigation": "Navigáció"},
            {"Contacts": "Kapcsolatok"},
            {"movies": "Filmek"},
            {"TV": "TV"},
            // Auth footer entries
            {"account":"Fiók"},
            {"change password":"Jelszó csere"},
            {"edit info":"Információ szerkesztése"},
            {"premium":"Prémium"},

            // auth entries
            {"back": "vissza"},
            {"Sign in": "Bejelentkezés"},
            {"Password": "Jelszó"},
            {"Enter email address": "Írja be az emailcímét"},
            {"Enter password": "Írja be a jelszavát"},
            {"Create account": "Fiók létrehozása"},
            // register page entries
            {"Email": "Email"},
            {"Enter email": "Írja be az emailcímét"},
            {"Username": "Felhasználónév"},
            {"Enter login": "Adja meg felhasználónevét"},
            {"Confirm password": "Jelszó megerősítése"},
            {"Country": "Ország"},
            {"Choose your country": "Válassza ki az országát"},

            // error entries 
            {"Something went wrong": "Valami elromlott"},
            {"You need to autorize": "Engedélyeznie kell"},
            {"To get full access for watching please, authorize": "A megtekintés teljes hozzáféréshez, engedélyeznie kell"},
            {"You date was ended": "Az előfizetése lejárt"},
            {"To get full access for watching, please continue payment on you profile": "A megtekintés teljes hozzáféréshez, folytassa a fizetést a profiljában"},
            {"Nothing to show": "Nincs mit mutatni"},
            {"Not authorized": "Nincs engedélyezve"},
            {"Add something to favorites before": "Előtte adjon hozzá valamit a kedvencekhez"},
            {"Choose another category": "Válasszon más kategóriát"},
            {"Your registration is successful! Please confirm the email we sent you to complete.": "Az ön regisztrációja sikeres! Ahhoz, hogy megerősítsük kérjük igazoljon vissza az emailben amelyet kiküldtünk önnek."},
            
            // profile entries
            {"Subscription is active until": "Az előfizetés aktív"},
            {"days left": "Hátralévő napok"},
            {"autopayment": "Automatikus fizetés"},
            {"Change the default payment method": "Alapértelmezett fizetésimód módisítása"},
            {"Continue subscription!": "Előfizetés folytatása!"},
            {"Change info": "Információ módosítása"},
            {"Change photo": "Kép módosítása"},
            {"Nickname": "Fedőnév"},
            {"phone": "Telefonszám"},
            {"Save": "Mentés"},
            {"Plans list": "Előfizetések listája"},
            {"Choose plan": "Válasszon előfizetést"},
            {"months": "hónapok"},
            {"month": "hónap"},
            {"Choose method of payment": "Válassza ki a fizetés módját"},
            {"To pay": "Fizetés"},
            {"Sale": "Kedvezmény"},
            {"Method": "Fizetés módja"},
            {"Pay now": "Fizessen most"},
            
            // Support entries
            {"Thanks you for feedback": "Köszönjük a visszajelzését"},
            {"Title": "Cím"},
            {"Enter title": "Írja be a címet"},
            {"Description": "Leírás"},
            {"Type description": "Írja be a leírást"},

            // pronunciation entries 
            {"minute": "perc"},
            {"minutes": "perc"},
            
            // one film entries
            {"Watch 1 episode": "1 rész megtekintése"},
            {"Watch now": "Nézze most"},
            {"Trailer": "Előzetes"},
            {"Add the movie to favorites": "Film hozzáadása a kedvencekhez"},
            {"Add the series to favorites": "Sorozat hozzáadása a kedvencekhez"},
            {"Add the tv to favorites": "Csatorna hozzáadása a kedvencekhez"},
            {"Details": "Részletek"},
            {"DESCRIPTION": "LEÍRÁS"},
            {"GENRE": "MŰFALY"},
            {"COUNTRY": "ORSZÁG"},
            {"YEAR": "ÉV"},
            {"AGE LIMIT": "KORHATÁR"},
            {"DIRECTOR": "RENDEZŐ"},
            {"AUDIO": "HANG"},
            {"actor": "színész"},
            {"Recomendations": "Ajánlások"},

            // filter page
            {"filter": "Szűrő"},
            {"sort": "Rendezés"},
            {"year": "év"},
            {"rating": "értkelés"},
            {"Show more": "mutass többet"},
            {"results": "eredmények"},
            
            // selector entries 
            {"category": "Kategória"},
            {"All": "Összes"},

             // new entries
             {"Search by name, genres, actors...": "Keresés név, műfaj, színészek szerint..."},
             {"No result found": "Nincs eredmény"},
             {"serie": "Sorozat"},
             {"movie": "Filmek"},
             {"person": "Személy"},
             {"live": "Élő"},
             {"Directing": "Rendező"},
             {"Your subscription has expired. Please subscribe to use the player.": "Az ön előfizetése lejárt. Kérjük fizessen elő a lejátszó használatához."},


             {"language": "Nyelv"},
             {"seasons": "Évadok"},
             {"season": "Évadok"},
             {"episodes": "Részek"},
             {"Directors and actors": "Rendezők és színészek"},
             {"View all": "Összes"},
             
             {"Change password": "Jelszó módosítása"},
             {"New password": "Új jelszó"},
             {"Repeat new password": "Új jelszó mégegyszer"},

             // categoriy entries 
             {"Action":"Akció"},
             {"Action & Adventure":"Akció & Kaland"},
             {"Adventure":"Kaland"},
             {"Animation":"Animációs"},
             {"Comedy":"Vígjáték"},
             {"Crime":"Krimi"},
             {"Documentary":"Dokumentum"},
             {"Drama":"Dráma"},
             {"Family":"Családi"},
             {"Fantasy":"Fantasy"},
             {"History":"Történelmi"},
             {"Horror":"Horror"},
             {"Kids":"Gyerek"},
             {"Music":"Zenés"},
             {"Mystery":"Misztikus"},
             {"News":"Hírek"},
             {"Reality":"Reality"},
             {"Romance":"Romantikus"},
             {"Sci-Fi & Fantasy":"Sci-Fi & Fantasy"},
             {"Science Fiction":"Science Fiction"},
             {"Soap":"Szappan opera"},
             {"Talk":"Kibeszélő"},
             {"Thriller":"Thriller"},
             {"War":"Háborús"},
             {"War & Politics":"Háború & Politika"},
             {"Western":"Western"},

            //  iptv categories 
            {"sports":"Sport"},
            {"music":"Zenés"},
            {"news":"Hírek"},
            {"kids":"Gyerek"},
            {"nature":"Természet"},
            {"science":"Tudomány"},
            {"xxx":"xxx"},
            {"magyar tv":"Magyar tv"},
            
            
            {"film":"Filmek"},
            {"This will be your profile photo":"This will be your profile photo"},
            {"Logout": "Kijelentkezés"},

            {"Continue":"Continue"},
            {"From":"From"},
            
            {"Email doesn't support! Please use like gmail.com,yahoo.com....": "Ez az email típus nem támogatott! Kérem használjon hasonlókat mint gmail.com, yahoo.com……"},
            
            
            {"Code allready deactivated":"A kód már deaktiválva van"},
            {"Try again":"Próbálja újra"},
            {"Wrong code":"Helytelen Kód"},
            {"Next":"tovább"},
            {"Your password has been updated":"A jelszava frissítve lett"},
            {"Forgot password":"Elfelejtettem a jelszavam"},
            
            
            {"Name":"Név"},
            {"Enter name":"Írja be a nevét"},


            {"Confirm reset code": "Visszaállítási kód megerősítése"},
            {"Reset code was generated and send to your email address. Please type reset code here": "A rendszer létrehozta a visszaállítási kódot, és elküldte az Ön e-mail címére. Kérjük, írja be ide a visszaállítási kódot"},
            {"Your code accepted, please enter new password": "A kódja elfogadva, kérjük, adjon meg új jelszót"},

            {"Enter your password": "Írd be a jelszavad"},
            {"Confirm your password": "Erősítsd meg a jelszavad"},

            {"Link copied to clipboard": "Vágólapra másolva a link"},
            {"My referrals:": "Referáljaim:"},
            {"My paid referrals:": "Fizetett Referáljaim:"},
            {"Copy referral link": "Vágólapra másolás"},
            {"Referral program": "Referál program"},
            {"videos": "Videok"},
            {"🔥Share and get +1 day! Hurry up!🚀": "🔥Oszd meg, szerezz +1 napot! Siess!🚀"},
            {"Try our new feature!": "Próbáld ki az új funkciónkat!"},
            {"times left in this month": "a hónapban hátralévő idők"},
            {"Share this page with friends in facebook and win 24 hours free using Bober tv": "Oszd meg ezt az oldalt barátaiddal a Facebook-on, és nyerj 24 órányi ingyenes használatot a Bober TV-n"},
            {"Extends with sharing": "Megosztással meghosszabbítható"},
        ]
    }
}

export { Hungary }