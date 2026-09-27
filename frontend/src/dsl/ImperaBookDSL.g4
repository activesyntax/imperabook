grammar ImperaBookDSL;

// --- Parser Rules ---
entry          : command EOF ;

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
               ;

// The title comes first, right after the command; the optional details, author
// included, follow in any order. No author means the author is unknown.
addBookCmd     : ADD BOOK bookTitle bookDetailParam* ;
updateBookCmd  : UPDATE BOOK ;
removeBookCmd  : REMOVE BOOK ;
listBooksCmd   : LIST BOOKS ;

addAuthorCmd   : ADD AUTHOR authorName ;
updateAuthorCmd: UPDATE AUTHOR ;
removeAuthorCmd: REMOVE AUTHOR ;
listAuthorsCmd : LIST AUTHORS ;

dashboardCmd   : DASHBOARD ;
libraryCmd     : LIBRARY ;
settingsCmd    : SETTINGS ;
aboutCmd       : ABOUT ;
helpCmd        : HELP ;
accountCmd     : ACCOUNT ;
loginCmd       : LOGIN ;
logoutCmd      : LOGOUT ;

// The author's full name as typed, first name(s) then last name: "Ursula K. Le Guin".
authorName     : STRING ;

// The book's title as typed: add book "Dune".
bookTitle      : STRING ;

authorParam    : BY AUTHOR STRING ;

bookDetailParam
               : authorParam
               | subtitleParam
               | languageParam
               | publicationYearParam
               | isbnParam
               | summaryParam
               ;
subtitleParam  : SUBTITLED STRING ;
languageParam  : IN LANGUAGE STRING ;
publicationYearParam
               : PUBLISHED IN NUMBER ;
isbnParam      : WITH ISBN STRING ;
summaryParam   : WITH SUMMARY STRING ;

// --- Lexer Rules ---
ADD            : 'add' ;
UPDATE         : 'update' ;
REMOVE         : 'remove' ;
LIST           : 'list' ;
BOOK           : 'book' ;
BOOKS          : 'books' ;
AUTHOR         : 'author' ;
AUTHORS        : 'authors' ;
DASHBOARD      : 'dashboard' ;
LIBRARY        : 'library' ;
SETTINGS       : 'settings' ;
ABOUT          : 'about' ;
HELP           : 'help' ;
ACCOUNT        : 'account' ;
LOGIN          : 'login' ;
LOGOUT         : 'logout' ;
BY             : 'by' ;
WITH           : 'with' ;
SUBTITLED      : 'subtitled' ;
IN             : 'in' ;
LANGUAGE       : 'language' ;
PUBLISHED      : 'published' ;
ISBN           : 'isbn' ;
SUMMARY        : 'summary' ;

STRING         : '"' ~["]* '"' ;
NUMBER         : [0-9]+ ;
WS             : [ \t\r\n]+ -> skip ;
