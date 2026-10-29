# E-handelsprojekt: målbild och arbetsordning

## Syfte och beslut

Modernisera den befintliga Flowers-kodbasen till en portfoliodemo för hörlurar.
Butikens nya namn är inte bestämt. Köp och betalningar ska vara tydligt märkta
som demo. Projektet ska visa både genomarbetad UX och testbar affärslogik.

- Behåll React, Node.js/Express, Sequelize och MariaDB.
- Använd JavaScript, inte TypeScript.
- Arbeta i små, sammanhängande ändringar som användaren kan granska och committa.
- Bevara befintlig data under ombyggnaden. Kör inte nuvarande `migrate.js`
  som en vanlig migration: det raderar tabeller.
- Välj bildmaterial tillsammans efter att layoutens bildbehov blivit tydliga.

## Visuell riktning

Utgå från VELOUR-referenserna i `design-references/`: ljusgrå och vit bas,
svart sans-serif-typografi i stor skala och sparsamma orange accenter.
Använd asymmetrisk komposition, mycket luft, stora produktmotiv, små etiketter
och tunna linjer. Mörka fotografiska sektioner kan skapa kontrast längre ned.
Skapa ett eget butiksuttryck; referensens texter, logotyper och statistik ingår
inte i vår design.

MUI får ett eget tema för färger, typografi, avstånd och komponenter.
Befintlig Tailwind-styling ersätts stegvis när respektive vy omarbetas.

### Bildplatshållare först

- Hero: stor reserverad yta för hörlurar med rubriken komponerad runt motivet.
- Produktöversikt: konsekventa bildproportioner och bakgrunder.
- Redaktionella sektioner: större ytor för detaljbilder och miljöbilder.
- Ange bildsyfte och format under prototyparbetet. Dekorativa platshållare
  ska inte annonseras som verkliga produktbilder för skärmläsare.
- Reservera bildutrymmet för att undvika layoutförskjutningar vid laddning.

Fotografierna som finns nu visar flera befintliga tillverkares produkter.
De ska inte presenteras som butikens egenutvecklade produkter. Modellnamn,
bildkällor och användningsvillkor kontrolleras före publicering.

### Rörelse och tillgänglighet

Motion används för samordnade introduktioner, layoutförändringar, dialoger,
varukorg och sidövergångar. Utvalda React Bits-komponenter kan komplettera
uttrycket efter kontroll av beroenden, licens och tillgänglighet.

Prova rörelse i en körbar prototyp. Anpassa produktberoende effekter när
slutbilderna är valda. Behåll fungerande tangentbordsnavigation, synligt fokus,
tydliga felmeddelanden och stöd för reducerad rörelse. WCAG 2.2 AA är målet;
det behöver verifieras i det färdiga gränssnittet.

## Målarkitektur

Backend är en modulär monolit med en gemensam MariaDB-databas.

| Modul | Ansvar |
| --- | --- |
| Auth | Registrering, lösenordshashning, sessioner och utloggning. |
| Catalog | Produkter, varianter, kategorier och administration. |
| Cart | Gäst- och kundvarukorg, antal och övergång vid inloggning. |
| Orders | Orderläggning, historiska orderrader och statusövergångar. |
| Inventory | Lagersaldo, reservationer och frisläppning. |
| Payments | Simulerade betalningsförsök och resultat. |
| Reviews | Betyg, validering och ägarskap. |

Separera HTTP-hantering, användningsfall, domänregler och infrastruktur inom
modulerna där det behövs. Domänregler ska kunna testas utan Express och
Sequelize. Undvik generiska abstraktioner som inte löser ett konkret behov.
Moduler använder uttryckliga gränssnitt för att ändra varandras data.

Frontend organiseras efter funktion med gemensam layout, UI-komponenter och
API-klient. Serverdata, formulärdata och lokalt UI-tillstånd har tydliga ägare.
Varukorgens olika vyer använder samma dataformat och källa för tillstånd.
API-svar formas uttryckligen; råa Sequelize-modeller exponeras inte.

### Garantier för köpflödet

- Backend räknar priser och validerar positiva heltalsantal och varianter.
- Orderrader bevarar pris, valuta och produktbeskrivning från köptillfället.
- Orderskapande och lagerreservation sker i en gemensam kort transaktion,
  via modulernas operationer med samma transaktionskontext.
- Samtidiga köp får inte reservera samma sista exemplar.
- Idempotens skyddar mot dubbla order och dubbla betalningseffekter.
- Betalning hanteras utanför databastransaktionen, bakom ett leverantörsgränssnitt.
- Reservationer har en livscykel. Sena betalningsresultat, timeout och
  återförsök behöver uttryckliga regler och tester.
- Beständiga bakgrundsuppdrag/outbox används när arbete måste överleva krascher.

### Säkerhet och drift

Inför säkra lösenordshashar, serverhanterade sessioner, lämpliga cookieflaggor,
CSRF-skydd samt roll- och ägarskapskontroller. Ta bort känslig loggning och
validera indata på servern. Befintliga klartextkonton behöver en uttrycklig
övergångsstrategi före ändring av lösenordslagringen.

Samla miljökonfiguration och API-adresser. Separera serverstart från appbygge,
versionshantera migreringar och håll demodata/reset separat. Lägg till Docker
Compose, CI, hälsokontroller och dokumenterad drift efter respektive grundsteg.

## Små leveranser

Varje rad är en etapp som kan innehålla flera avgränsade commits.
Tester tillkommer med respektive beteendeförändring.

1. Dokumentera beslut och arbetsordning (detta dokument).
2. Skapa en isolerad visuell prototyp med tema, sidhuvud och hero med
   bildplatshållare. Granska desktop och mobil innan fler sektioner byggs.
3. Samla konfiguration och separera Express-app från serverstart.
4. Inför säkra användarsvar, lösenordshashning, sessioner och behörighet
   i sammanhängande steg som håller frontend och backend kompatibla.
5. Inför migreringar och modellera order, varianter och lagerreservationer.
6. Samla varukorgens datahantering och bygg ett transaktionssäkert köpflöde
   med betalningssimulering och skydd mot dubbla anrop.
7. För över godkänd design till katalog, produktvy, varukorg, checkout,
   konto och administration, en del i taget.
8. Slutför Docker Compose, CI, driftsättning och portfoliodokumentation.

Den visuella prototypen är separat från den befintliga oskyddade API-driften.
En offentlig demo ska inte exponera nuvarande användar- och adminendpoints.

## Klart för en commit

- Ändringen har ett tydligt syfte och rimlig granskningsstorlek.
- Filer och komponenter har fokuserade ansvar; stora filer delas efter ansvar.
- Relevanta kontroller är genomförda och begränsningar redovisade.
- UI-ändringar granskas i webbläsaren på desktop och mobil.
- Säkerhet och köpflöde verifieras med beteendetester, inklusive fel- och
  samtidighetsfall där det är relevant.
- Ett commit-meddelande föreslås; användaren gör commiten.
