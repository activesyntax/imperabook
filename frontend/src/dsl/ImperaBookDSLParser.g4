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
listBooksCmd   : LIST BOOKS ;

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
