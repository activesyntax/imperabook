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
WRITTEN        : 'written' -> pushMode(AFTER_WRITTEN) ;
HAVING         : 'having' -> pushMode(AFTER_HAVING) ;
BORN           : 'born' -> pushMode(AFTER_LIFE_EVENT) ;
DIED           : 'died' -> pushMode(AFTER_LIFE_EVENT) ;
LIVING         : 'living' ;

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
// A year, not free text: "published in 1965" adding a book, and the list
// filters "published before/after 1950", "published between 1950 and 1960".
mode AFTER_PUBLISHED;
PUBLISHED_IN   : 'in' -> type(IN), mode(YEAR_MODE) ;
BEFORE         : 'before' -> mode(YEAR_MODE) ;
AFTER          : 'after' -> mode(YEAR_MODE) ;
PUBLISHED_BETWEEN : 'between' -> type(BETWEEN), mode(YEAR_MODE) ;
PUBLISHED_NL   : '\r'? '\n' -> type(NL), popMode ;
PUBLISHED_WS   : [ \t]+ -> skip ;

// --- having no page count … (a list filter) -----------------------------------
// After "no", only the names of what a book may lack.
mode AFTER_HAVING;
NO             : 'no' -> mode(MISSING) ;
HAVING_NL      : '\r'? '\n' -> type(NL), popMode ;
HAVING_WS      : [ \t]+ -> skip ;

mode MISSING;
MISSING_AUTHOR : 'author' -> type(AUTHOR) ;
MISSING_PAGE   : 'page' -> type(PAGE) ;
MISSING_COUNT  : 'count' -> type(COUNT) ;
PUBLICATION    : 'publication' ;
YEAR           : 'year' ;
MISSING_LANGUAGE : 'language' -> type(LANGUAGE) ;
MISSING_ISBN   : 'isbn' -> type(ISBN) ;
COVER          : 'cover' ;
MISSING_BOOKS  : 'books' -> type(BOOKS) ;   // "list authors having no books"
MISSING_NL     : '\r'? '\n' -> type(NL), popMode ;
MISSING_WS     : [ \t]+ -> skip ;

// --- written by … (a list filter) --------------------------------------------
mode AFTER_WRITTEN;
WRITTEN_BY     : 'by' -> type(BY), mode(VALUE_MODE) ;
WRITTEN_NL     : '\r'? '\n' -> type(NL), popMode ;
WRITTEN_WS     : [ \t]+ -> skip ;

// --- whose page count is at least 120 … -------------------------------------
// "whose" opens a filter clause; its words are keywords only inside it, so they
// never clash with values elsewhere.
mode AFTER_WHOSE;
PAGE           : 'page' ;
COUNT          : 'count' ;
IS             : 'is' -> mode(COMPARISON) ;
WHOSE_LANGUAGE : 'language' -> type(LANGUAGE), mode(AFTER_WHOSE_LANGUAGE) ;
WHOSE_NL       : '\r'? '\n' -> type(NL), popMode ;
WHOSE_WS       : [ \t]+ -> skip ;

// --- whose language is [not] hungarian -----------------------------------------
mode AFTER_WHOSE_LANGUAGE;
LANGUAGE_IS    : 'is' -> type(IS), mode(LANGUAGE_NAME) ;
WHOSE_LANGUAGE_NL : '\r'? '\n' -> type(NL), popMode ;
WHOSE_LANGUAGE_WS : [ \t]+ -> skip ;

// A language is words of letters ("hungarian", "hu", "norwegian bokmål"). Word by
// word, not the rest of the line, so a leading "not" can be told apart: as long
// as a word, the earlier rule wins.
mode LANGUAGE_NAME;
LANGUAGE_NOT   : 'not' -> type(NOT) ;
LANGUAGE_WORD  : [\p{L}-]+ ;
LANGUAGE_NAME_NL : '\r'? '\n' -> type(NL), popMode ;
LANGUAGE_NAME_WS : [ \t]+ -> skip ;

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

// --- born in 1920 / died in 1986 / died (year unknown) ---------------------------
mode AFTER_LIFE_EVENT;
LIFE_EVENT_IN  : 'in' -> type(IN), mode(YEAR_MODE) ;
LIFE_EVENT_NL  : '\r'? '\n' -> type(NL), popMode ;
LIFE_EVENT_WS  : [ \t]+ -> skip ;

// A year, optionally before the common era: 1965, 428 BC.
mode YEAR_MODE;
YEAR_NUMBER    : [0-9]+ -> type(NUMBER) ;
BC             : [bB][cC] ;
YEAR_AND       : 'and' -> type(AND) ;
YEAR_NL        : '\r'? '\n' -> type(NL), popMode ;
YEAR_WS        : [ \t]+ -> skip ;

// --- The rest of the line, verbatim ------------------------------------------
// Leading blanks are skipped; trailing ones are kept and trimmed by the visitor.
mode VALUE_MODE;
VALUE          : ~[ \t\r\n] ~[\r\n]* ;
VALUE_NL       : '\r'? '\n' -> type(NL), popMode ;
VALUE_WS       : [ \t]+ -> skip ;
