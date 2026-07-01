using ImperaBook.Application.Dashboard;
using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Views;

// View composition is an API-layer concern (DECISIONS 15) — the same seam that maps
// domain DUs to ProblemDetails (DECISIONS 12). One composer per composed read model;
// book views follow the same shape once their ViewNodes land.
public static class DashboardViews
{
    public static CommandResult ToCommandResult(this DashboardSummary s) =>
        new(
            new ViewNode[]
            {
                new ImageView(
                    Src: "assets/img/imperabook-logo-dark.svg",
                    Alt: "ImperaBook",
                    Caption: "Your library, at your fingertips.",
                    Variant: "logo"
                ),
                new CardCollectionView(
                    new[]
                    {
                        new CardView(
                            "All Books",
                            s.TotalBooks.ToString(),
                            "books in your sanctuary"
                        ),
                        new CardView("Authors", s.AuthorCount.ToString(), "across your collection"),
                        new CardView(
                            "Languages",
                            s.LanguageCount.ToString(),
                            "languages represented"
                        ),
                    }
                ),
                new MessageView(
                    Kind: "info",
                    Text: "Welcome to ImperaBook! --- RENDSZERÁTTEKINTÉS ÉS HASZNÁLATI ÚTMUTATÓ ---\n\n"
                        + "Az ImperaBook egy minimál, billentyűzet-központú, parancssor-vezérelt otthoni könyvtárkatalógus alkalmazás, "
                        + "amelyet a felesleges vizuális zaj kiszűrésére és a maximális fókuszált működésre terveztünk. "
                        + "Ez a hosszú üzenet azért jött létre, hogy tesztelje a felhasználói felület görgetési mechanizmusát, "
                        + "a szövegtörést és a többoldalas vagy túlcsorduló (overflow) tartalom kezelését.\n\n"
                        + "--- ALAPVETŐ PARANCSOK ---\n"
                        + "1. :add \"Cím\" \"Szerző\" [ISBN] - Új kötet hozzáadása a helyi katalógushoz.\n"
                        + "2. :search \"kifejezés\"     - Gyorskeresés a címek, szerzők és tagek között.\n"
                        + "3. :checkout \"ID\" \"Név\"  - Könyv kölcsönadása (pl. családtagoknak vagy barátoknak).\n"
                        + "4. :return \"ID\"            - Kölcsönzés lezárása, a könyv visszakerül a polcra.\n"
                        + "5. :stats                  - Statisztikák megjelenítése (olvasott oldalak száma, műfaji megoszlás).\n\n"
                        + "--- FILOZÓFIA ÉS DOMAIN MODELLEZÉS ---\n"
                        + "Az alkalmazás magja a funkcionális programozás elveire épül, ahol az érvénytelen állapotok reprezentálhatatlanok "
                        + "(making invalid states unrepresentable). Ez biztosítja, hogy a könyvtár adatbázisa soha ne kerülhessen "
                        + "inkonzisztens állapotba. Egy könyv nem lehet egyszerre a polcon és kölcsönadva; a domain típusok (Result és Option) "
                        + "garantálják a fordítási időben ellenőrzött üzleti logikát.\n\n"
                        + "--- RENDKÍVÜL HOSSZÚ TESZTSZÖVEG A GÖRGETÉSHEZ ---\n"
                        + "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ssed do eiusmod tempor incididunt ut labore et "
                        + "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex "
                        + "ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu "
                        + "fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt "
                        + "mollit anim id est laborum.\n\n"
                        + "Amennyiben ezt a szöveget látod, a MessageView sikeresen fogadta a bemenetet. Ha a szöveg alja levágódik, "
                        + "vagy nem jelenik meg görgetősáv (illetve i3/Sway stílusú billentyűs navigáció a szövegen belül), akkor a UI "
                        + "komponens méretkorlátozása vagy az overflow-y beállítása finomhangolásra szorul. Teszteld le a PgUp/PgDn, "
                        + "valamint a J/K vagy Ctrl+D/Ctrl+U billentyűkombinációkat a navigációhoz, ha a parancssoros mód ezt támogatja!"
                ),
                new GuidanceView(
                    Title: "Getting started",
                    Intro: "ImperaBook is a keyboard-driven catalog for your personal library. "
                        + "Type a command to add, find, and organize your books — anything that "
                        + "isn't a command runs as a search.",
                    Hints: new[]
                    {
                        new GuidanceHint(new[] { "Enter" }, "run the typed command"),
                        new GuidanceHint(
                            new[] { "Tab", "Enter" },
                            "pick a suggestion, then accept"
                        ),
                        new GuidanceHint(new[] { "Ctrl + K" }, "focus the command bar"),
                    }
                ),
            }
        );
}
