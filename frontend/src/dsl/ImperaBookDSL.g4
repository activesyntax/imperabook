grammar ImperaBookDSL;

// --- Parser Rules ---
entry          : command EOF ;

command        : addBookCmd
               | updateBookCmd
               | removeBookCmd
               | showBookCmd
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

// Title and author are required exactly once each; the optional details may
// appear in any order around them.
addBookCmd     : ADD BOOK bookDetailParam*
                 ( authorParam bookDetailParam* titleParam
                 | titleParam bookDetailParam* authorParam
                 )
                 bookDetailParam* ;
updateBookCmd  : UPDATE BOOK ;
removeBookCmd  : REMOVE BOOK ;
showBookCmd    : SHOW BOOK ;
listBooksCmd   : LIST BOOKS ;

addAuthorCmd   : ADD AUTHOR STRING ;
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

authorParam    : BY AUTHOR STRING ;
titleParam     : WITH TITLE STRING ;

bookDetailParam
               : subtitleParam
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
SHOW           : 'show' ;
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
TITLE          : 'title' ;
SUBTITLED      : 'subtitled' ;
IN             : 'in' ;
LANGUAGE       : 'language' ;
PUBLISHED      : 'published' ;
ISBN           : 'isbn' ;
SUMMARY        : 'summary' ;

STRING         : '"' ~["]* '"' ;
NUMBER         : [0-9]+ ;
WS             : [ \t\r\n]+ -> skip ;
