Student Desk — Android App Setup (Capacitor)
Yeh guide batati hai ki www/ folder ko ek real Android APK mein kaise convert karein, jisme apna khud ka icon, splash screen animation, aur login-first flow ho. Yeh steps apne PC/laptop par karne honge — mere paas yahan Android Studio ya internet access nahi hai, isliye actual build tumhe locally karna hoga. Neeche har command exact copy-paste karne layak hai.
Prerequisites (ek baar install karein)
Node.js (LTS version) — https://nodejs.org se install karein.
Android Studio — https://developer.android.com/studio se install karein. Pehli baar khulne par yeh Android SDK bhi download karega (thoda time lagega).
Java/JDK Android Studio ke saath hi aa jaata hai — alag se install karne ki zaroorat nahi.
Step 1 — Project folder taiyaar karo
Is poore build/ folder ko apne PC par kisi folder mein copy kar lo (e.g. StudentDeskApp/). Ismein already ye sab hai:
www/ — poora app (HTML/CSS/JS)
assets/icon.png, assets/splash.png, assets/splash-dark.png — tumhare "Student Desk" logo se banaye gaye app-icon aur splash-screen source images (yeh naam aur jagah @capacitor/assets tool khud dhoondta hai, kuch configure nahi karna padega)
package.json, capacitor.config.json
Terminal (Command Prompt / PowerShell / Terminal) us folder mein khol kar:
npm install
Step 2 — Android platform add karo
npx cap add android
Yeh ek android/ folder banayega — yehi asli Android Studio project hai.
Step 3 — App icon aur splash screen generate karo
Yeh command assets/ folder ki images se Android ke liye zaroori saare sizes (launcher icon, adaptive icon, splash screen — har screen density ke liye) khud generate kar degi:
npx capacitor-assets generate --android
Ab jab app open hogi, sabse pehle tumhara "Student Desk" logo ek animation ke saath (fade + zoom-in) dikhega — bilkul waise jaise kisi bhi real Android app mein hota hai — uske baad login screen aayega.
Step 4 — Website files ko Android project mein copy karo
Jab bhi www/ folder mein koi change karo, yeh command chalao:
npx cap sync android
Step 5 — Android Studio mein kholo
npx cap open android
Pehli baar Gradle sync hone mein 2-5 minute lag sakte hain — bas wait karo.
Step 6 — APK banao
Android Studio ke andar:
Build → Build Bundle(s) / APK(s) → Build APK(s) click karo.
Build complete hone par "locate" link se app-debug.apk milega — yeh file kisi bhi Android phone par install ho sakti hai (phone mein "install from unknown sources" allow karna padega).
Phone USB se connect karke green ▶️ "Run" button se direct install-and-launch bhi kar sakte ho.
Zaroori: Firebase login ke liye ek setting check kar lo
Admin login Firebase Auth use karta hai. Capacitor app "localhost" se load hoti hai, aur Firebase by default "localhost" ko allowed rakhta hai — normally kuch karne ki zaroorat nahi. Agar login karte waqt auth/unauthorized-domain jaisi error aaye: Firebase Console → Authentication → Settings → Authorized domains → check karo "localhost" list mein hai.
Is baar kya naya design hua
1. App icon + splash animation capacitor.config.json mein native SplashScreen plugin configure kiya hai — app open hote hi tumhara logo animation ke saath dikhta hai (fade + zoom), phir app load hoti hai. App ka naam ab "Student Desk" hai (phone ke home screen aur app-drawer mein yehi dikhega).
2. App ab login se shuru hoti hai, website homepage se nahi index.html (jo pehle school-website ka homepage tha) ab sirf ek chhota router hai: agar koi role pehle se logged in hai to seedha uske dashboard par le jaata hai; nahi to role-choose/login screen (login.html) khulti hai. Purana website-style homepage (home.js wala) file mein hai still, bas app isse use nahi karti — agar wahi design kabhi alag se website ke liye chahiye ho to woh mehfooz hai.
3. Student ke liye pura naya bottom-nav design student-dashboard.html ko poori tarah redesign kiya hai — purani sidebar ki jagah ab neeche ek floating 5-icon bar hai (Flipkart jaisa style): Home, Attendance, Results, Fees, Notices. Tap karne par page reload nahi hota — bas woh section dikh jaata hai, baaki chhup jaate hain, bilkul real app jaisa feel. "Home" tab hi ab login ke baad ka dashboard hai. Colors bhi zyada bright/friendly kar diye hain (logo ka yellow+black accent use kiya hai).
Yeh naya bottom-nav wala design abhi sirf Student portal ke liye hai — Teacher, Parent, aur Admin abhi bhi purane sidebar-wale design mein hain (poori tarah kaam karte hain, bas visual style nayi nahi hai). Bata dena agar unhe bhi isi tarah redesign karna hai.
4. Login hamesha yaad rehta hai, 20-min timer hata diya gaya hai (Pichli baar ka change — abhi bhi waisa hi hai.) sessionStorage ko localStorage se replace kiya gaya hai har jagah, aur session-timer.js ab sirf login-guard hai, auto-logout nahi karta.
Ek cheez jo abhi kaam nahi karegi: assistant.html (Workdesk) ka AI chat
assistant.html mein jo chat feature hai, woh seedha https://api.anthropic.com ko call karta hai bina kisi API key ke — yeh sirf Claude.ai ke apne sandbox (artifacts) ke andar hi kaam karta hai. Ek normal Android app se yeh call fail ho jaayegi. Tasks aur Settings tabs (jo sirf localStorage use karte hain) theek kaam karenge — sirf Chat tab ka AI reply nahi aayega. Bata dena agar iska backend proxy banwana ho.
Baaki files jo include nahi ki gayi
admin-error.js — tumne khud bataya ye sirf backup hai.
