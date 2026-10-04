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
WHOSE          : 'whose' -> pushMode(AFTER_WHOSE) ;

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

// --- with isbn … / with summary … --------------------------------------------
mode AFTER_WITH;
ISBN           : 'isbn' -> mode(VALUE_MODE) ;
SUMMARY        : 'summary' -> mode(VALUE_MODE) ;
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

// --- whose page count is at least 120 … -------------------------------------
// "whose" opens a filter clause; its words are keywords only inside it, so they
// never clash with values elsewhere.
mode AFTER_WHOSE;
PAGE           : 'page' ;
COUNT          : 'count' ;
IS             : 'is' -> mode(COMPARISON) ;
WHOSE_NL       : '\r'? '\n' -> type(NL), popMode ;
WHOSE_WS       : [ \t]+ -> skip ;

// What follows "is": an amount in everyday words, then a number.
mode COMPARISON;
MORE_KW        : 'more' ;  // MORE is a reserved name in ANTLR lexers
GREATER        : 'greater' ;
LESS           : 'less' ;
FEWER          : 'fewer' ;
THAN           : 'than' ;
AT             : 'at' ;
LEAST          : 'least' ;
MOST           : 'most' ;
BETWEEN        : 'between' ;
AND            : 'and' ;
NOT            : 'not' ;
NUMBER         : [0-9]+ ;
COMPARISON_NL  : '\r'? '\n' -> type(NL), popMode ;
COMPARISON_WS  : [ \t]+ -> skip ;

// --- The rest of the line, verbatim ------------------------------------------
// Leading blanks are skipped; trailing ones are kept and trimmed by the visitor.
mode VALUE_MODE;
VALUE          : ~[ \t\r\n] ~[\r\n]* ;
VALUE_NL       : '\r'? '\n' -> type(NL), popMode ;
VALUE_WS       : [ \t]+ -> skip ;
