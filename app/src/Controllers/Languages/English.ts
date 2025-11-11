import { Lang } from "./Lang";


class English extends Lang {

    constructor(){
        super("en")
        this.vals = [
            // default entries
            {"": ""},

            // menu entries
            {"iptv": "Online IPTV"},
            {"films": "Films"},
            {"series": "Series"},
            {"favorites": "Favorites"},
            {"profile": "Profile"},
            {"support": "Support"},
            // footer entries 
            {"Leave feedback": "Leave feedback"},
            {"Navigation": "Navigation"},
            {"Contacts": "Contacts"},
            {"movies": "Movies"},
            {"TV": "TV"},
            // Auth footer entries
            {"account":"Account"},
            {"change password":"Change password"},
            {"edit info":"Edit info"},
            {"premium":"Premium"},

            // auth entries
            {"back": "back"},
            {"Sign in": "Sign In"},
            {"Password": "Password"},
            {"Enter email address": "Enter email address"},
            {"Enter password": "Enter password"},
            {"Create account": "Create account"},
            // register page entries
            {"Email": "Email"},
            {"Enter email": "Enter email"},
            {"Username": "Username"},
            {"Enter login": "Enter login"},
            {"Confirm password": "Confirm password"},
            {"Country": "Country"},
            {"Choose your country": "Choose your country"},

            // error entries 
            {"Something went wrong": "Something went wrong"},
            {"You need to autorize": "You need to autorize"},
            {"To get full access for watching please, authorize": "To get full access for watching please, authorize"},
            {"You date was ended": "You date was ended"},
            {"To get full access for watching, please continue payment on you profile": "To get full access for watching, please continue payment on you profile"},
            {"Nothing to show": "Nothing to show"},
            {"Not authorized": "Not authorized"},
            {"Add something to favorites before": "Add something to favorites before"},
            {"Choose another category": "Choose another category"},
            {"Your registration is successful! Please confirm the email we sent you to complete.": "Your registration is successful! Please confirm the email we sent you to complete."},
            
            // profile entries
            {"Subscription is active until": "Subscription is active until"},
            {"days left": "days left"},
            {"autopayment": "Autopayment"},
            {"Change the default payment method": "Change the default payment method"},
            {"Continue subscription!": "Continue subscription!"},
            {"Change info": "Change info"},
            {"Change photo": "Change photo"},
            {"Nickname": "Nickname"},
            {"phone": "phone"},
            {"Save": "Save"},
            {"Plans list": "Plans list"},
            {"Choose plan": "Choose plan"},
            {"months": "months"},
            {"month": "month"},
            {"Choose method of payment": "Choose method of payment"},
            {"To pay": "To pay"},
            {"Sale": "Sale"},
            {"Method": "Method"},
            {"Pay now": "Pay now"},
            
            // Support entries
            {"Thanks you for feedback": "Thanks you for feedback"},
            {"Title": "Title"},
            {"Enter title": "Enter title"},
            {"Description": "Description"},
            {"Type description": "Type description"},

            // pronunciation entries 
            {"minute": "minute"},
            {"minutes": "minutes"},
            
            // one film entries
            {"Watch 1 episode": "Watch 1 episode"},
            {"Watch now": "Watch now"},
            {"Trailer": "Trailer"},
            {"Add the movie to favorites": "Add the movie to favorites"},
            {"Add the series to favorites": "Add the series to favorites"},
            {"Add the tv to favorites": "Add the tv to favorites"},
            {"Details": "Details"},
            {"DESCRIPTION": "DESCRIPTION"},
            {"GENRE": "GENRE"},
            {"COUNTRY": "COUNTRY"},
            {"YEAR": "YEAR"},
            {"AGE LIMIT": "AGE LIMIT"},
            {"DIRECTOR": "DIRECTOR"},
            {"AUDIO": "AUDIO"},
            {"actor": "actor"},
            {"Recomendations": "Recomendations"},

            // filter page
            {"filter": "Filter"},
            {"sort": "Sort"},
            {"year": "year"},
            {"rating": "rating"},
            {"Show more": "Show more"},
            {"results": "results"},
            
            // selector entries 
            {"category": "Category"},
            {"All": "All"},


            // new entries
            {"Search by name, genres, actors...": "Search by name, genres, actors..."},
            {"No result found": "No result found"},
            {"serie": "Series"},
            {"movie": "Movie"},
            {"person": "Person"},
            {"live": "Live"},
            {"Directing": "Directing"},
            {"Your subscription has expired. Please subscribe to use the player.": "Your subscription has expired. Please subscribe to use the player."},
            
            
            {"language": "language"},
            {"seasons": "Seasons"},
            {"episodes": "Episodes"},
            {"Directors and actors": "Directors and actors"},
            {"View all": "View all"},

            {"Change password": "Change password"},
            {"New password": "New password"},
            {"Repeat new password": "Repeat new password"},


            // categoriy entries 
            {"Action":"Action"},
            {"Action & Adventure":"Action & Adventure"},
            {"Adventure":"Adventure"},
            {"Animation":"Animation"},
            {"Comedy":"Comedy"},
            {"Crime":"Crime"},
            {"Documentary":"Documentary"},
            {"Drama":"Drama"},
            {"Family":"Family"},
            {"Fantasy":"Fantasy"},
            {"History":"History"},
            {"Horror":"Horror"},
            {"Kids":"Kids"},
            {"Music":"Music"},
            {"Mystery":"Mystery"},
            {"News":"News"},
            {"Reality":"Reality"},
            {"Romance":"Romance"},
            {"Sci-Fi & Fantasy":"Sci-Fi & Fantasy"},
            {"Science Fiction":"Science Fiction"},
            {"Soap":"Soap"},
            {"Talk":"Talk"},
            {"Thriller":"Thriller"},
            {"War":"War"},
            {"War & Politics":"War & Politics"},
            {"Western":"Western"},

            // iptv categories
            {"sports":"Sports"},
            {"music":"Music"},
            {"news":"News"},
            {"kids":"Kids"},
            {"nature":"Nature"},
            {"science":"Science"},
            {"xxx":"xxx"},
            {"magyar tv":"Magyar tv"},


            {"film":"Films"},
            {"This will be your profile photo":"This will be your profile photo"},
            {"Logout": "Logout"},
            
            
            {"Email doesn't support! Please use like gmail.com,yahoo.com....": "Email doesn't support! Please use like gmail.com,yahoo.com...."},
            
            {"Confirm reset code": "Confirm reset code"},
            {"Reset code was generated and send to your email address. Please type reset code here": "Reset code was generated and send to your email address. Please type reset code here"},
            {"Your code accepted, please enter new password": "Your code accepted, please enter new password"},
            
            {"Enter your password": "Enter your password"},
            {"Confirm your password": "Confirm your password"},
            
            
            {"Link copied to clipboard": "Link copied to clipboard"},
            {"My referrals": "My referrals"},
            {"My paid referrals": "My paid referrals"},
            {"Copy referral link": "Copy referral link"},
            {"Referral program": "Referral program"},
            {"videos": "Videos"},
        ]
    }
}

export { English }