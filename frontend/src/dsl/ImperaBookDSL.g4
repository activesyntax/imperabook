grammar ImperaBookDSL;

// --- Parser Rules ---
entry          : command EOF ;

command        : addBookCmd
               | addAuthorCmd
               | listBooksCmd
               | listAuthorsCmd
               ;
addBookCmd     : ADD BOOK (authorParam titleParam | titleParam authorParam) ;
addAuthorCmd   : ADD AUTHOR STRING ;
listBooksCmd   : LIST BOOKS ;
listAuthorsCmd : LIST AUTHORS ;

authorParam    : BY AUTHOR STRING ;
titleParam     : WITH TITLE STRING ;

// --- Lexer Rules ---
ADD            : 'add' ;
LIST           : 'list' ;
BOOK           : 'book' ;
BOOKS          : 'books' ;
AUTHOR         : 'author' ;
AUTHORS        : 'authors' ;
BY             : 'by' ;
WITH           : 'with' ;
TITLE          : 'title' ;

STRING         : '"' ~["]* '"' ;
WS             : [ \t\r\n]+ -> skip ;
