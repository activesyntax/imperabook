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
// Optional filters, like add book's parameters: one per line, in any order. The
// first may share the command's line, so a one-filter list stays one sentence:
//
//   list books whose page count is at least 120
//       written by Frank Herbert
listBooksCmd   : LIST BOOKS listFilter? (NL+ listFilter)* ;

listFilter     : whoseFilter
               | authorFilter
               | publishedFilter
               ;

// published in 1965 / before 1950 / after 1950 / between 1950 and 1960.
// Two steps, like the page filter: "published" is offered beside the other
// filters, and the four comparisons only once it is chosen.
publishedFilter: PUBLISHED yearComparison ;
yearComparison : yearIn
               | yearBefore
               | yearAfter
               | yearBetween
               ;
yearIn         : IN year ;
yearBefore     : BEFORE year ;
yearAfter      : AFTER year ;
yearBetween    : BETWEEN year yearAnd ;
yearAnd        : AND year ;
// A rule of its own so the bar can name what goes here ("year") while it is still to type.
year           : NUMBER ;

// The rest of the line, matched against the book's authors: written by herbert
authorFilter   : WRITTEN BY writerName ;
writerName     : VALUE ;

// Two steps: "whose" beside the other filters, then the property it is about.
whoseFilter    : WHOSE (pagesFilter | languageFilter) ;

// whose language is hungarian / is not english — by name or code.
languageFilter : LANGUAGE IS languageNot? languageName ;
languageNot    : NOT ;
languageName   : LANGUAGE_WORD+ ;

pagesFilter    : PAGE COUNT IS pageComparison ;
pageComparison : pagesMoreThan    // is more than 300   (or greater than)
               | pagesLessThan    // is less than 100   (or fewer than)
               | pagesAtLeast     // is at least 120
               | pagesAtMost      // is at most 120
               | pagesBetween     // is between 100 and 200
               | pagesNot         // is not 120
               | pagesEqual       // is 120
               ;
pagesMoreThan  : (MORE_KW | GREATER) THAN pageCount ;
pagesLessThan  : (LESS | FEWER) THAN pageCount ;
pagesAtLeast   : AT LEAST pageCount ;
pagesAtMost    : AT MOST pageCount ;
pagesBetween   : BETWEEN pageCount andBound ;
pagesNot       : NOT pageCount ;
pagesEqual     : pageCount ;
// A rule of its own so "and" can be suggested on its own.
andBound       : AND pageCount ;
// A rule of its own so the bar can name what goes here ("page count") while it is still to type.
pageCount      : NUMBER ;

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
               : PUBLISHED IN year ;
isbnParam      : WITH ISBN value ;
summaryParam   : WITH SUMMARY value ;

value          : VALUE ;
