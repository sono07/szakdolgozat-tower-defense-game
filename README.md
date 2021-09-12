# szakdolgozat-tower-defense-game

A program fordításához a Node.js-re, NPM csomagkezelőre, illetve internetkapcsolatra van szükség.

#Indítási segédlet
- src mappában egy konzolt szükséges először nyitni, itt az "npm install" parancsot kell futtatni
- tesztek futtatásához "npm test" parancs
- az alkalmazás fejlesztői módban való elindításához az "npm start" parancsot kell futtatnunk, ami a fordítás után egy webszervert fog elindítani a gépünkön a 8080-as porton. Ezután böngészőnkben a "localhost:8080" -as oldalra navigálva elérhetjük az alkalmazást.
- A program optimalizáltan és kiadható formában fordított változatát az "npm run build" parancs futtatásával lehet elkészíteni. Ez a "dist" mappába fogja elhelyezni a fordított fájlokat. Ezt követően a kész fájlokat egy webszerverre másolva lehet használni. A kipróbálhatóság érdekében az "npm run serve-build" paranccsal tudunk futtatni ideiglenesen egy minimális funckiókkal bíró webszervert, ez a parancs az alapértelmezett böngészőnkben meg is nyitja az alkalmazást mely a "http://127.0.0.1:4949/dist/" címen érhető el.
