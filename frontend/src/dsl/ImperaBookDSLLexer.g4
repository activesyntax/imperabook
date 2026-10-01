lexer grammar ImperaBookDSLLexer;

// Line-oriented input: every line starts with a keyword phrase, and a phrase
// that takes a value hands the rest of its line to VALUE_MODE as one token.
// Nothing inside a value is ever read as a keyword, so values need no quotes:
//
//   add book Gone with the Wind
//   by author Margaret Mitchell
//   published in 1936
//
// A phrase's second word decides that a value follows, so each two-word phrase
// passes through a small mode that knows which words may come next.

// --- Default mode: the start of a line ---------------------------------------
ADD            : 'add' -> pushMode(AFTER_ADD) ;
FIND           : 'find' -> pushMode(VALUE_MODE) ;
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
BY             : 'by' -> pushMode(AFTER_BY) ;
WITH           : 'with' -> pushMode(AFTER_WITH) ;
IN             : 'in' -> pushMode(AFTER_IN) ;
PUBLISHED      : 'published' -> pushMode(AFTER_PUBLISHED) ;
SUBTITLED      : 'subtitled' -> pushMode(VALUE_MODE) ;

NL             : '\r'? '\n' ;
WS             : [ \t]+ -> skip ;

// --- add book … / add author … ----------------------------------------------
mode AFTER_ADD;
ADD_BOOK       : 'book' -> type(BOOK), mode(VALUE_MODE) ;
ADD_AUTHOR     : 'author' -> type(AUTHOR), mode(VALUE_MODE) ;
ADD_NL         : '\r'? '\n' -> type(NL), popMode ;
ADD_WS         : [ \t]+ -> skip ;

// --- by author … -------------------------------------------------------------
mode AFTER_BY;
BY_AUTHOR      : 'author' -> type(AUTHOR), mode(VALUE_MODE) ;
BY_NL          : '\r'? '\n' -> type(NL), popMode ;
BY_WS          : [ \t]+ -> skip ;

// --- with isbn … / with summary … / with pages … ----------------------------
mode AFTER_WITH;
ISBN           : 'isbn' -> mode(VALUE_MODE) ;
SUMMARY        : 'summary' -> mode(VALUE_MODE) ;
PAGES          : 'pages' -> mode(PAGE_FILTER) ;
WITH_NL        : '\r'? '\n' -> type(NL), popMode ;
WITH_WS        : [ \t]+ -> skip ;

// --- in language … -----------------------------------------------------------
mode AFTER_IN;
LANGUAGE       : 'language' -> mode(VALUE_MODE) ;
IN_NL          : '\r'? '\n' -> type(NL), popMode ;
IN_WS          : [ \t]+ -> skip ;

// --- published in … ----------------------------------------------------------
mode AFTER_PUBLISHED;
PUBLISHED_IN   : 'in' -> type(IN), mode(VALUE_MODE) ;
PUBLISHED_NL   : '\r'? '\n' -> type(NL), popMode ;
PUBLISHED_WS   : [ \t]+ -> skip ;

// --- with pages over 120, … between 100 and 200 --------------------------------
// A small fixed vocabulary and numbers, not free text: these words are keywords
// only here, after "with pages", so they never clash with values elsewhere.
mode PAGE_FILTER;
OVER           : 'over' ;
UNDER          : 'under' ;
EQUAL          : 'equal' ;
TO             : 'to' ;
OR             : 'or' ;
OTHER          : 'other' ;
THAN           : 'than' ;
BETWEEN        : 'between' ;
AND            : 'and' ;
NUMBER         : [0-9]+ ;
PAGE_NL        : '\r'? '\n' -> type(NL), popMode ;
PAGE_WS        : [ \t]+ -> skip ;

// --- The rest of the line, verbatim ------------------------------------------
// Leading blanks are skipped; trailing ones are kept and trimmed by the visitor.
mode VALUE_MODE;
VALUE          : ~[ \t\r\n] ~[\r\n]* ;
VALUE_NL       : '\r'? '\n' -> type(NL), popMode ;
VALUE_WS       : [ \t]+ -> skip ;
