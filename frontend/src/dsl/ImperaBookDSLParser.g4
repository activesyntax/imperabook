parser grammar ImperaBookDSLParser;

options { tokenVocab = ImperaBookDSLLexer; }

// One command, possibly over several lines: the command's own line first, then
// one parameter per line. Blank lines anywhere are ignored.
entry          : NL* command NL* EOF ;

command        : addBookCmd
               | updateBookCmd
               | removeBookCmd
               | listBooksCmd
               | addAuthorCmd
               | updateAuthorCmd
               | removeAuthorCmd
               | listAuthorsCmd
               | dashboardCmd
               | libraryCmd
               | settingsCmd
               | aboutCmd
               | helpCmd
               | accountCmd
               | loginCmd
               | logoutCmd
               | findCmd
               ;

// The title is the rest of the first line; the optional details, author
// included, follow one per line in any order. No author line means the author
// is unknown. Every value that is written must be there: "add book" with no
// title, or "by author" with no name, is not a command yet — the bar says so
// instead of sending what the server can only refuse.
addBookCmd     : ADD BOOK bookTitle (NL+ bookDetailParam)* ;
updateBookCmd  : UPDATE BOOK ;
removeBookCmd  : REMOVE BOOK ;
// An optional page-count filter, on the same line: a new line after "list books"
// would make Enter wait for more instead of listing.
listBooksCmd   : LIST BOOKS pagesFilter? ;

pagesFilter    : WITH PAGES pageComparison ;
pageComparison : pagesOver        // with pages over 120
               | pagesUnder       // with pages under 120
               | pagesEqual       // with pages equal to 120
               | pagesAtLeast     // with pages 120 or over
               | pagesAtMost      // with pages 120 or under
               | pagesOtherThan   // with pages other than 120
               | pagesBetween     // with pages between 100 and 200
               ;
pagesOver      : OVER NUMBER ;
pagesUnder     : UNDER NUMBER ;
pagesEqual     : EQUAL TO NUMBER ;
pagesAtLeast   : NUMBER orOver ;
pagesAtMost    : NUMBER orUnder ;
pagesOtherThan : OTHER THAN NUMBER ;
pagesBetween   : BETWEEN NUMBER andBound ;
// The second halves are rules of their own so they can be suggested on their own.
orOver         : OR OVER ;
orUnder        : OR UNDER ;
andBound       : AND NUMBER ;

addAuthorCmd   : ADD AUTHOR authorName ;
updateAuthorCmd: UPDATE AUTHOR ;
removeAuthorCmd: REMOVE AUTHOR ;
listAuthorsCmd : LIST AUTHORS ;

// Keywords to look for in books and authors, the rest of the line: find dune herbert
findCmd        : FIND keywords ;
keywords       : VALUE ;

dashboardCmd   : DASHBOARD ;
libraryCmd     : LIBRARY ;
settingsCmd    : SETTINGS ;
aboutCmd       : ABOUT ;
helpCmd        : HELP ;
accountCmd     : ACCOUNT ;
loginCmd       : LOGIN ;
logoutCmd      : LOGOUT ;

// The book's title as typed: add book Dune
bookTitle      : VALUE ;

// The author's full name as typed, first name(s) then last name: add author Ursula K. Le Guin
authorName     : VALUE ;

bookDetailParam
               : authorParam
               | subtitleParam
               | languageParam
               | publicationYearParam
               | isbnParam
               | summaryParam
               ;
authorParam    : BY AUTHOR value ;
subtitleParam  : SUBTITLED value ;
languageParam  : IN LANGUAGE value ;
publicationYearParam
               : PUBLISHED IN value ;
isbnParam      : WITH ISBN value ;
summaryParam   : WITH SUMMARY value ;

value          : VALUE ;
