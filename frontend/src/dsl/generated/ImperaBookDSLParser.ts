
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { ImperaBookDSLParserListener } from "./ImperaBookDSLParserListener.js";
import { ImperaBookDSLParserVisitor } from "./ImperaBookDSLParserVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class ImperaBookDSLParser extends antlr.Parser {
    public static readonly ADD = 1;
    public static readonly FIND = 2;
    public static readonly UPDATE = 3;
    public static readonly REMOVE = 4;
    public static readonly LIST = 5;
    public static readonly BOOK = 6;
    public static readonly BOOKS = 7;
    public static readonly AUTHOR = 8;
    public static readonly AUTHORS = 9;
    public static readonly DASHBOARD = 10;
    public static readonly LIBRARY = 11;
    public static readonly SETTINGS = 12;
    public static readonly ABOUT = 13;
    public static readonly HELP = 14;
    public static readonly ACCOUNT = 15;
    public static readonly LOGIN = 16;
    public static readonly LOGOUT = 17;
    public static readonly BY = 18;
    public static readonly WITH = 19;
    public static readonly IN = 20;
    public static readonly PUBLISHED = 21;
    public static readonly SUBTITLED = 22;
    public static readonly WHOSE = 23;
    public static readonly WRITTEN = 24;
    public static readonly HAVING = 25;
    public static readonly BORN = 26;
    public static readonly DIED = 27;
    public static readonly LIVING = 28;
    public static readonly NL = 29;
    public static readonly WS = 30;
    public static readonly ADD_WS = 31;
    public static readonly BY_WS = 32;
    public static readonly ISBN = 33;
    public static readonly SUMMARY = 34;
    public static readonly WITH_WS = 35;
    public static readonly LANGUAGE = 36;
    public static readonly IN_WS = 37;
    public static readonly BEFORE = 38;
    public static readonly AFTER = 39;
    public static readonly PUBLISHED_WS = 40;
    public static readonly NO = 41;
    public static readonly HAVING_WS = 42;
    public static readonly PUBLICATION = 43;
    public static readonly YEAR = 44;
    public static readonly COVER = 45;
    public static readonly MISSING_WS = 46;
    public static readonly WRITTEN_WS = 47;
    public static readonly PAGE = 48;
    public static readonly COUNT = 49;
    public static readonly IS = 50;
    public static readonly WHOSE_WS = 51;
    public static readonly WHOSE_LANGUAGE_WS = 52;
    public static readonly LANGUAGE_WORD = 53;
    public static readonly LANGUAGE_NAME_WS = 54;
    public static readonly MORE_KW = 55;
    public static readonly GREATER = 56;
    public static readonly LESS = 57;
    public static readonly FEWER = 58;
    public static readonly THAN = 59;
    public static readonly AT = 60;
    public static readonly LEAST = 61;
    public static readonly MOST = 62;
    public static readonly BETWEEN = 63;
    public static readonly AND = 64;
    public static readonly NOT = 65;
    public static readonly NUMBER = 66;
    public static readonly COMPARISON_WS = 67;
    public static readonly LIFE_EVENT_WS = 68;
    public static readonly BC = 69;
    public static readonly YEAR_WS = 70;
    public static readonly VALUE = 71;
    public static readonly VALUE_WS = 72;
    public static readonly MISSING_PAGE = 73;
    public static readonly MISSING_COUNT = 74;
    public static readonly LANGUAGE_NOT = 75;
    public static readonly RULE_entry = 0;
    public static readonly RULE_command = 1;
    public static readonly RULE_addBookCmd = 2;
    public static readonly RULE_updateBookCmd = 3;
    public static readonly RULE_removeBookCmd = 4;
    public static readonly RULE_listBooksCmd = 5;
    public static readonly RULE_listFilter = 6;
    public static readonly RULE_missingFilter = 7;
    public static readonly RULE_missingProperty = 8;
    public static readonly RULE_missingAuthor = 9;
    public static readonly RULE_missingPages = 10;
    public static readonly RULE_missingYear = 11;
    public static readonly RULE_missingLanguage = 12;
    public static readonly RULE_missingIsbn = 13;
    public static readonly RULE_missingCover = 14;
    public static readonly RULE_publishedFilter = 15;
    public static readonly RULE_yearComparison = 16;
    public static readonly RULE_yearIn = 17;
    public static readonly RULE_yearBefore = 18;
    public static readonly RULE_yearAfter = 19;
    public static readonly RULE_yearBetween = 20;
    public static readonly RULE_yearAnd = 21;
    public static readonly RULE_year = 22;
    public static readonly RULE_authorFilter = 23;
    public static readonly RULE_writerName = 24;
    public static readonly RULE_whoseFilter = 25;
    public static readonly RULE_languageFilter = 26;
    public static readonly RULE_languageNot = 27;
    public static readonly RULE_languageName = 28;
    public static readonly RULE_pagesFilter = 29;
    public static readonly RULE_pageComparison = 30;
    public static readonly RULE_pagesMoreThan = 31;
    public static readonly RULE_pagesLessThan = 32;
    public static readonly RULE_pagesAtLeast = 33;
    public static readonly RULE_pagesAtMost = 34;
    public static readonly RULE_pagesBetween = 35;
    public static readonly RULE_pagesNot = 36;
    public static readonly RULE_pagesEqual = 37;
    public static readonly RULE_andBound = 38;
    public static readonly RULE_pageCount = 39;
    public static readonly RULE_addAuthorCmd = 40;
    public static readonly RULE_authorDetailParam = 41;
    public static readonly RULE_bornParam = 42;
    public static readonly RULE_diedParam = 43;
    public static readonly RULE_diedYear = 44;
    public static readonly RULE_livingParam = 45;
    public static readonly RULE_updateAuthorCmd = 46;
    public static readonly RULE_removeAuthorCmd = 47;
    public static readonly RULE_listAuthorsCmd = 48;
    public static readonly RULE_authorsWithoutBooks = 49;
    public static readonly RULE_noBooks = 50;
    public static readonly RULE_findCmd = 51;
    public static readonly RULE_keywords = 52;
    public static readonly RULE_dashboardCmd = 53;
    public static readonly RULE_libraryCmd = 54;
    public static readonly RULE_settingsCmd = 55;
    public static readonly RULE_aboutCmd = 56;
    public static readonly RULE_helpCmd = 57;
    public static readonly RULE_accountCmd = 58;
    public static readonly RULE_loginCmd = 59;
    public static readonly RULE_logoutCmd = 60;
    public static readonly RULE_bookTitle = 61;
    public static readonly RULE_authorName = 62;
    public static readonly RULE_bookDetailParam = 63;
    public static readonly RULE_authorParam = 64;
    public static readonly RULE_subtitleParam = 65;
    public static readonly RULE_languageParam = 66;
    public static readonly RULE_publicationYearParam = 67;
    public static readonly RULE_isbnParam = 68;
    public static readonly RULE_summaryParam = 69;
    public static readonly RULE_value = 70;

    public static readonly literalNames = [
        null, "'add'", "'find'", "'update'", "'remove'", "'list'", "'book'", 
        null, null, "'authors'", "'dashboard'", "'library'", "'settings'", 
        "'about'", "'help'", "'account'", "'login'", "'logout'", "'by'", 
        "'with'", "'in'", "'published'", "'subtitled'", "'whose'", "'written'", 
        "'having'", "'born'", "'died'", "'living'", null, null, null, null, 
        null, "'summary'", null, null, null, "'before'", "'after'", null, 
        "'no'", null, "'publication'", "'year'", "'cover'", null, null, 
        null, null, "'is'", null, null, null, null, "'more'", "'greater'", 
        "'less'", "'fewer'", "'than'", "'at'", "'least'", "'most'", "'between'"
    ];

    public static readonly symbolicNames = [
        null, "ADD", "FIND", "UPDATE", "REMOVE", "LIST", "BOOK", "BOOKS", 
        "AUTHOR", "AUTHORS", "DASHBOARD", "LIBRARY", "SETTINGS", "ABOUT", 
        "HELP", "ACCOUNT", "LOGIN", "LOGOUT", "BY", "WITH", "IN", "PUBLISHED", 
        "SUBTITLED", "WHOSE", "WRITTEN", "HAVING", "BORN", "DIED", "LIVING", 
        "NL", "WS", "ADD_WS", "BY_WS", "ISBN", "SUMMARY", "WITH_WS", "LANGUAGE", 
        "IN_WS", "BEFORE", "AFTER", "PUBLISHED_WS", "NO", "HAVING_WS", "PUBLICATION", 
        "YEAR", "COVER", "MISSING_WS", "WRITTEN_WS", "PAGE", "COUNT", "IS", 
        "WHOSE_WS", "WHOSE_LANGUAGE_WS", "LANGUAGE_WORD", "LANGUAGE_NAME_WS", 
        "MORE_KW", "GREATER", "LESS", "FEWER", "THAN", "AT", "LEAST", "MOST", 
        "BETWEEN", "AND", "NOT", "NUMBER", "COMPARISON_WS", "LIFE_EVENT_WS", 
        "BC", "YEAR_WS", "VALUE", "VALUE_WS", "MISSING_PAGE", "MISSING_COUNT", 
        "LANGUAGE_NOT"
    ];
    public static readonly ruleNames = [
        "entry", "command", "addBookCmd", "updateBookCmd", "removeBookCmd", 
        "listBooksCmd", "listFilter", "missingFilter", "missingProperty", 
        "missingAuthor", "missingPages", "missingYear", "missingLanguage", 
        "missingIsbn", "missingCover", "publishedFilter", "yearComparison", 
        "yearIn", "yearBefore", "yearAfter", "yearBetween", "yearAnd", "year", 
        "authorFilter", "writerName", "whoseFilter", "languageFilter", "languageNot", 
        "languageName", "pagesFilter", "pageComparison", "pagesMoreThan", 
        "pagesLessThan", "pagesAtLeast", "pagesAtMost", "pagesBetween", 
        "pagesNot", "pagesEqual", "andBound", "pageCount", "addAuthorCmd", 
        "authorDetailParam", "bornParam", "diedParam", "diedYear", "livingParam", 
        "updateAuthorCmd", "removeAuthorCmd", "listAuthorsCmd", "authorsWithoutBooks", 
        "noBooks", "findCmd", "keywords", "dashboardCmd", "libraryCmd", 
        "settingsCmd", "aboutCmd", "helpCmd", "accountCmd", "loginCmd", 
        "logoutCmd", "bookTitle", "authorName", "bookDetailParam", "authorParam", 
        "subtitleParam", "languageParam", "publicationYearParam", "isbnParam", 
        "summaryParam", "value",
    ];

    public get grammarFileName(): string { return "ImperaBookDSLParser.g4"; }
    public get literalNames(): (string | null)[] { return ImperaBookDSLParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return ImperaBookDSLParser.symbolicNames; }
    public get ruleNames(): string[] { return ImperaBookDSLParser.ruleNames; }
    public get serializedATN(): number[] { return ImperaBookDSLParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, ImperaBookDSLParser._ATN, ImperaBookDSLParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public entry(): EntryContext {
        let localContext = new EntryContext(this.context, this.state);
        this.enterRule(localContext, 0, ImperaBookDSLParser.RULE_entry);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 145;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 29) {
                {
                {
                this.state = 142;
                this.match(ImperaBookDSLParser.NL);
                }
                }
                this.state = 147;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 148;
            this.command();
            this.state = 152;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 29) {
                {
                {
                this.state = 149;
                this.match(ImperaBookDSLParser.NL);
                }
                }
                this.state = 154;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 155;
            this.match(ImperaBookDSLParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public command(): CommandContext {
        let localContext = new CommandContext(this.context, this.state);
        this.enterRule(localContext, 2, ImperaBookDSLParser.RULE_command);
        try {
            this.state = 174;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 157;
                this.addBookCmd();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 158;
                this.updateBookCmd();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 159;
                this.removeBookCmd();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 160;
                this.listBooksCmd();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 161;
                this.addAuthorCmd();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 162;
                this.updateAuthorCmd();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 163;
                this.removeAuthorCmd();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 164;
                this.listAuthorsCmd();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 165;
                this.dashboardCmd();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 166;
                this.libraryCmd();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 167;
                this.settingsCmd();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 168;
                this.aboutCmd();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 169;
                this.helpCmd();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 170;
                this.accountCmd();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 171;
                this.loginCmd();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 172;
                this.logoutCmd();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 173;
                this.findCmd();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public addBookCmd(): AddBookCmdContext {
        let localContext = new AddBookCmdContext(this.context, this.state);
        this.enterRule(localContext, 4, ImperaBookDSLParser.RULE_addBookCmd);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 176;
            this.match(ImperaBookDSLParser.ADD);
            this.state = 177;
            this.match(ImperaBookDSLParser.BOOK);
            this.state = 178;
            this.bookTitle();
            this.state = 187;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 180;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    do {
                        {
                        {
                        this.state = 179;
                        this.match(ImperaBookDSLParser.NL);
                        }
                        }
                        this.state = 182;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    } while (_la === 29);
                    this.state = 184;
                    this.bookDetailParam();
                    }
                    }
                }
                this.state = 189;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public updateBookCmd(): UpdateBookCmdContext {
        let localContext = new UpdateBookCmdContext(this.context, this.state);
        this.enterRule(localContext, 6, ImperaBookDSLParser.RULE_updateBookCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 190;
            this.match(ImperaBookDSLParser.UPDATE);
            this.state = 191;
            this.match(ImperaBookDSLParser.BOOK);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public removeBookCmd(): RemoveBookCmdContext {
        let localContext = new RemoveBookCmdContext(this.context, this.state);
        this.enterRule(localContext, 8, ImperaBookDSLParser.RULE_removeBookCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 193;
            this.match(ImperaBookDSLParser.REMOVE);
            this.state = 194;
            this.match(ImperaBookDSLParser.BOOK);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public listBooksCmd(): ListBooksCmdContext {
        let localContext = new ListBooksCmdContext(this.context, this.state);
        this.enterRule(localContext, 10, ImperaBookDSLParser.RULE_listBooksCmd);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 196;
            this.match(ImperaBookDSLParser.LIST);
            this.state = 197;
            this.match(ImperaBookDSLParser.BOOKS);
            this.state = 199;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 60817408) !== 0)) {
                {
                this.state = 198;
                this.listFilter();
                }
            }

            this.state = 209;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 202;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    do {
                        {
                        {
                        this.state = 201;
                        this.match(ImperaBookDSLParser.NL);
                        }
                        }
                        this.state = 204;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    } while (_la === 29);
                    this.state = 206;
                    this.listFilter();
                    }
                    }
                }
                this.state = 211;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public listFilter(): ListFilterContext {
        let localContext = new ListFilterContext(this.context, this.state);
        this.enterRule(localContext, 12, ImperaBookDSLParser.RULE_listFilter);
        try {
            this.state = 216;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ImperaBookDSLParser.WHOSE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 212;
                this.whoseFilter();
                }
                break;
            case ImperaBookDSLParser.WRITTEN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 213;
                this.authorFilter();
                }
                break;
            case ImperaBookDSLParser.PUBLISHED:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 214;
                this.publishedFilter();
                }
                break;
            case ImperaBookDSLParser.HAVING:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 215;
                this.missingFilter();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public missingFilter(): MissingFilterContext {
        let localContext = new MissingFilterContext(this.context, this.state);
        this.enterRule(localContext, 14, ImperaBookDSLParser.RULE_missingFilter);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 218;
            this.match(ImperaBookDSLParser.HAVING);
            this.state = 219;
            this.match(ImperaBookDSLParser.NO);
            this.state = 220;
            this.missingProperty();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public missingProperty(): MissingPropertyContext {
        let localContext = new MissingPropertyContext(this.context, this.state);
        this.enterRule(localContext, 16, ImperaBookDSLParser.RULE_missingProperty);
        try {
            this.state = 228;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ImperaBookDSLParser.AUTHOR:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 222;
                this.missingAuthor();
                }
                break;
            case ImperaBookDSLParser.PAGE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 223;
                this.missingPages();
                }
                break;
            case ImperaBookDSLParser.PUBLICATION:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 224;
                this.missingYear();
                }
                break;
            case ImperaBookDSLParser.LANGUAGE:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 225;
                this.missingLanguage();
                }
                break;
            case ImperaBookDSLParser.ISBN:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 226;
                this.missingIsbn();
                }
                break;
            case ImperaBookDSLParser.COVER:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 227;
                this.missingCover();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public missingAuthor(): MissingAuthorContext {
        let localContext = new MissingAuthorContext(this.context, this.state);
        this.enterRule(localContext, 18, ImperaBookDSLParser.RULE_missingAuthor);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 230;
            this.match(ImperaBookDSLParser.AUTHOR);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public missingPages(): MissingPagesContext {
        let localContext = new MissingPagesContext(this.context, this.state);
        this.enterRule(localContext, 20, ImperaBookDSLParser.RULE_missingPages);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 232;
            this.match(ImperaBookDSLParser.PAGE);
            this.state = 233;
            this.match(ImperaBookDSLParser.COUNT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public missingYear(): MissingYearContext {
        let localContext = new MissingYearContext(this.context, this.state);
        this.enterRule(localContext, 22, ImperaBookDSLParser.RULE_missingYear);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 235;
            this.match(ImperaBookDSLParser.PUBLICATION);
            this.state = 236;
            this.match(ImperaBookDSLParser.YEAR);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public missingLanguage(): MissingLanguageContext {
        let localContext = new MissingLanguageContext(this.context, this.state);
        this.enterRule(localContext, 24, ImperaBookDSLParser.RULE_missingLanguage);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 238;
            this.match(ImperaBookDSLParser.LANGUAGE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public missingIsbn(): MissingIsbnContext {
        let localContext = new MissingIsbnContext(this.context, this.state);
        this.enterRule(localContext, 26, ImperaBookDSLParser.RULE_missingIsbn);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 240;
            this.match(ImperaBookDSLParser.ISBN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public missingCover(): MissingCoverContext {
        let localContext = new MissingCoverContext(this.context, this.state);
        this.enterRule(localContext, 28, ImperaBookDSLParser.RULE_missingCover);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 242;
            this.match(ImperaBookDSLParser.COVER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public publishedFilter(): PublishedFilterContext {
        let localContext = new PublishedFilterContext(this.context, this.state);
        this.enterRule(localContext, 30, ImperaBookDSLParser.RULE_publishedFilter);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 244;
            this.match(ImperaBookDSLParser.PUBLISHED);
            this.state = 245;
            this.yearComparison();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public yearComparison(): YearComparisonContext {
        let localContext = new YearComparisonContext(this.context, this.state);
        this.enterRule(localContext, 32, ImperaBookDSLParser.RULE_yearComparison);
        try {
            this.state = 251;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ImperaBookDSLParser.IN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 247;
                this.yearIn();
                }
                break;
            case ImperaBookDSLParser.BEFORE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 248;
                this.yearBefore();
                }
                break;
            case ImperaBookDSLParser.AFTER:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 249;
                this.yearAfter();
                }
                break;
            case ImperaBookDSLParser.BETWEEN:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 250;
                this.yearBetween();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public yearIn(): YearInContext {
        let localContext = new YearInContext(this.context, this.state);
        this.enterRule(localContext, 34, ImperaBookDSLParser.RULE_yearIn);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 253;
            this.match(ImperaBookDSLParser.IN);
            this.state = 254;
            this.year();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public yearBefore(): YearBeforeContext {
        let localContext = new YearBeforeContext(this.context, this.state);
        this.enterRule(localContext, 36, ImperaBookDSLParser.RULE_yearBefore);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 256;
            this.match(ImperaBookDSLParser.BEFORE);
            this.state = 257;
            this.year();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public yearAfter(): YearAfterContext {
        let localContext = new YearAfterContext(this.context, this.state);
        this.enterRule(localContext, 38, ImperaBookDSLParser.RULE_yearAfter);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 259;
            this.match(ImperaBookDSLParser.AFTER);
            this.state = 260;
            this.year();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public yearBetween(): YearBetweenContext {
        let localContext = new YearBetweenContext(this.context, this.state);
        this.enterRule(localContext, 40, ImperaBookDSLParser.RULE_yearBetween);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 262;
            this.match(ImperaBookDSLParser.BETWEEN);
            this.state = 263;
            this.year();
            this.state = 264;
            this.yearAnd();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public yearAnd(): YearAndContext {
        let localContext = new YearAndContext(this.context, this.state);
        this.enterRule(localContext, 42, ImperaBookDSLParser.RULE_yearAnd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 266;
            this.match(ImperaBookDSLParser.AND);
            this.state = 267;
            this.year();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public year(): YearContext {
        let localContext = new YearContext(this.context, this.state);
        this.enterRule(localContext, 44, ImperaBookDSLParser.RULE_year);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 269;
            this.match(ImperaBookDSLParser.NUMBER);
            this.state = 271;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 69) {
                {
                this.state = 270;
                this.match(ImperaBookDSLParser.BC);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public authorFilter(): AuthorFilterContext {
        let localContext = new AuthorFilterContext(this.context, this.state);
        this.enterRule(localContext, 46, ImperaBookDSLParser.RULE_authorFilter);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 273;
            this.match(ImperaBookDSLParser.WRITTEN);
            this.state = 274;
            this.match(ImperaBookDSLParser.BY);
            this.state = 275;
            this.writerName();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public writerName(): WriterNameContext {
        let localContext = new WriterNameContext(this.context, this.state);
        this.enterRule(localContext, 48, ImperaBookDSLParser.RULE_writerName);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 277;
            this.match(ImperaBookDSLParser.VALUE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public whoseFilter(): WhoseFilterContext {
        let localContext = new WhoseFilterContext(this.context, this.state);
        this.enterRule(localContext, 50, ImperaBookDSLParser.RULE_whoseFilter);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 279;
            this.match(ImperaBookDSLParser.WHOSE);
            this.state = 282;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ImperaBookDSLParser.PAGE:
                {
                this.state = 280;
                this.pagesFilter();
                }
                break;
            case ImperaBookDSLParser.LANGUAGE:
                {
                this.state = 281;
                this.languageFilter();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public languageFilter(): LanguageFilterContext {
        let localContext = new LanguageFilterContext(this.context, this.state);
        this.enterRule(localContext, 52, ImperaBookDSLParser.RULE_languageFilter);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 284;
            this.match(ImperaBookDSLParser.LANGUAGE);
            this.state = 285;
            this.match(ImperaBookDSLParser.IS);
            this.state = 287;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 65) {
                {
                this.state = 286;
                this.languageNot();
                }
            }

            this.state = 289;
            this.languageName();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public languageNot(): LanguageNotContext {
        let localContext = new LanguageNotContext(this.context, this.state);
        this.enterRule(localContext, 54, ImperaBookDSLParser.RULE_languageNot);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 291;
            this.match(ImperaBookDSLParser.NOT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public languageName(): LanguageNameContext {
        let localContext = new LanguageNameContext(this.context, this.state);
        this.enterRule(localContext, 56, ImperaBookDSLParser.RULE_languageName);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 294;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 293;
                this.match(ImperaBookDSLParser.LANGUAGE_WORD);
                }
                }
                this.state = 296;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 53);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public pagesFilter(): PagesFilterContext {
        let localContext = new PagesFilterContext(this.context, this.state);
        this.enterRule(localContext, 58, ImperaBookDSLParser.RULE_pagesFilter);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 298;
            this.match(ImperaBookDSLParser.PAGE);
            this.state = 299;
            this.match(ImperaBookDSLParser.COUNT);
            this.state = 300;
            this.match(ImperaBookDSLParser.IS);
            this.state = 301;
            this.pageComparison();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public pageComparison(): PageComparisonContext {
        let localContext = new PageComparisonContext(this.context, this.state);
        this.enterRule(localContext, 60, ImperaBookDSLParser.RULE_pageComparison);
        try {
            this.state = 310;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 15, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 303;
                this.pagesMoreThan();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 304;
                this.pagesLessThan();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 305;
                this.pagesAtLeast();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 306;
                this.pagesAtMost();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 307;
                this.pagesBetween();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 308;
                this.pagesNot();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 309;
                this.pagesEqual();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public pagesMoreThan(): PagesMoreThanContext {
        let localContext = new PagesMoreThanContext(this.context, this.state);
        this.enterRule(localContext, 62, ImperaBookDSLParser.RULE_pagesMoreThan);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 312;
            _la = this.tokenStream.LA(1);
            if(!(_la === 55 || _la === 56)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 313;
            this.match(ImperaBookDSLParser.THAN);
            this.state = 314;
            this.pageCount();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public pagesLessThan(): PagesLessThanContext {
        let localContext = new PagesLessThanContext(this.context, this.state);
        this.enterRule(localContext, 64, ImperaBookDSLParser.RULE_pagesLessThan);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 316;
            _la = this.tokenStream.LA(1);
            if(!(_la === 57 || _la === 58)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 317;
            this.match(ImperaBookDSLParser.THAN);
            this.state = 318;
            this.pageCount();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public pagesAtLeast(): PagesAtLeastContext {
        let localContext = new PagesAtLeastContext(this.context, this.state);
        this.enterRule(localContext, 66, ImperaBookDSLParser.RULE_pagesAtLeast);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 320;
            this.match(ImperaBookDSLParser.AT);
            this.state = 321;
            this.match(ImperaBookDSLParser.LEAST);
            this.state = 322;
            this.pageCount();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public pagesAtMost(): PagesAtMostContext {
        let localContext = new PagesAtMostContext(this.context, this.state);
        this.enterRule(localContext, 68, ImperaBookDSLParser.RULE_pagesAtMost);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 324;
            this.match(ImperaBookDSLParser.AT);
            this.state = 325;
            this.match(ImperaBookDSLParser.MOST);
            this.state = 326;
            this.pageCount();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public pagesBetween(): PagesBetweenContext {
        let localContext = new PagesBetweenContext(this.context, this.state);
        this.enterRule(localContext, 70, ImperaBookDSLParser.RULE_pagesBetween);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 328;
            this.match(ImperaBookDSLParser.BETWEEN);
            this.state = 329;
            this.pageCount();
            this.state = 330;
            this.andBound();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public pagesNot(): PagesNotContext {
        let localContext = new PagesNotContext(this.context, this.state);
        this.enterRule(localContext, 72, ImperaBookDSLParser.RULE_pagesNot);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 332;
            this.match(ImperaBookDSLParser.NOT);
            this.state = 333;
            this.pageCount();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public pagesEqual(): PagesEqualContext {
        let localContext = new PagesEqualContext(this.context, this.state);
        this.enterRule(localContext, 74, ImperaBookDSLParser.RULE_pagesEqual);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 335;
            this.pageCount();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public andBound(): AndBoundContext {
        let localContext = new AndBoundContext(this.context, this.state);
        this.enterRule(localContext, 76, ImperaBookDSLParser.RULE_andBound);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 337;
            this.match(ImperaBookDSLParser.AND);
            this.state = 338;
            this.pageCount();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public pageCount(): PageCountContext {
        let localContext = new PageCountContext(this.context, this.state);
        this.enterRule(localContext, 78, ImperaBookDSLParser.RULE_pageCount);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 340;
            this.match(ImperaBookDSLParser.NUMBER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public addAuthorCmd(): AddAuthorCmdContext {
        let localContext = new AddAuthorCmdContext(this.context, this.state);
        this.enterRule(localContext, 80, ImperaBookDSLParser.RULE_addAuthorCmd);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 342;
            this.match(ImperaBookDSLParser.ADD);
            this.state = 343;
            this.match(ImperaBookDSLParser.AUTHOR);
            this.state = 344;
            this.authorName();
            this.state = 353;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 17, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 346;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    do {
                        {
                        {
                        this.state = 345;
                        this.match(ImperaBookDSLParser.NL);
                        }
                        }
                        this.state = 348;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    } while (_la === 29);
                    this.state = 350;
                    this.authorDetailParam();
                    }
                    }
                }
                this.state = 355;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 17, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public authorDetailParam(): AuthorDetailParamContext {
        let localContext = new AuthorDetailParamContext(this.context, this.state);
        this.enterRule(localContext, 82, ImperaBookDSLParser.RULE_authorDetailParam);
        try {
            this.state = 359;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ImperaBookDSLParser.BORN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 356;
                this.bornParam();
                }
                break;
            case ImperaBookDSLParser.DIED:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 357;
                this.diedParam();
                }
                break;
            case ImperaBookDSLParser.LIVING:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 358;
                this.livingParam();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public bornParam(): BornParamContext {
        let localContext = new BornParamContext(this.context, this.state);
        this.enterRule(localContext, 84, ImperaBookDSLParser.RULE_bornParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 361;
            this.match(ImperaBookDSLParser.BORN);
            this.state = 362;
            this.match(ImperaBookDSLParser.IN);
            this.state = 363;
            this.year();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public diedParam(): DiedParamContext {
        let localContext = new DiedParamContext(this.context, this.state);
        this.enterRule(localContext, 86, ImperaBookDSLParser.RULE_diedParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 365;
            this.match(ImperaBookDSLParser.DIED);
            this.state = 367;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 20) {
                {
                this.state = 366;
                this.diedYear();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public diedYear(): DiedYearContext {
        let localContext = new DiedYearContext(this.context, this.state);
        this.enterRule(localContext, 88, ImperaBookDSLParser.RULE_diedYear);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 369;
            this.match(ImperaBookDSLParser.IN);
            this.state = 370;
            this.year();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public livingParam(): LivingParamContext {
        let localContext = new LivingParamContext(this.context, this.state);
        this.enterRule(localContext, 90, ImperaBookDSLParser.RULE_livingParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 372;
            this.match(ImperaBookDSLParser.LIVING);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public updateAuthorCmd(): UpdateAuthorCmdContext {
        let localContext = new UpdateAuthorCmdContext(this.context, this.state);
        this.enterRule(localContext, 92, ImperaBookDSLParser.RULE_updateAuthorCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 374;
            this.match(ImperaBookDSLParser.UPDATE);
            this.state = 375;
            this.match(ImperaBookDSLParser.AUTHOR);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public removeAuthorCmd(): RemoveAuthorCmdContext {
        let localContext = new RemoveAuthorCmdContext(this.context, this.state);
        this.enterRule(localContext, 94, ImperaBookDSLParser.RULE_removeAuthorCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 377;
            this.match(ImperaBookDSLParser.REMOVE);
            this.state = 378;
            this.match(ImperaBookDSLParser.AUTHOR);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public listAuthorsCmd(): ListAuthorsCmdContext {
        let localContext = new ListAuthorsCmdContext(this.context, this.state);
        this.enterRule(localContext, 96, ImperaBookDSLParser.RULE_listAuthorsCmd);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 380;
            this.match(ImperaBookDSLParser.LIST);
            this.state = 381;
            this.match(ImperaBookDSLParser.AUTHORS);
            this.state = 383;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 25) {
                {
                this.state = 382;
                this.authorsWithoutBooks();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public authorsWithoutBooks(): AuthorsWithoutBooksContext {
        let localContext = new AuthorsWithoutBooksContext(this.context, this.state);
        this.enterRule(localContext, 98, ImperaBookDSLParser.RULE_authorsWithoutBooks);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 385;
            this.match(ImperaBookDSLParser.HAVING);
            this.state = 386;
            this.match(ImperaBookDSLParser.NO);
            this.state = 387;
            this.noBooks();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public noBooks(): NoBooksContext {
        let localContext = new NoBooksContext(this.context, this.state);
        this.enterRule(localContext, 100, ImperaBookDSLParser.RULE_noBooks);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 389;
            this.match(ImperaBookDSLParser.BOOKS);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public findCmd(): FindCmdContext {
        let localContext = new FindCmdContext(this.context, this.state);
        this.enterRule(localContext, 102, ImperaBookDSLParser.RULE_findCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 391;
            this.match(ImperaBookDSLParser.FIND);
            this.state = 392;
            this.keywords();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public keywords(): KeywordsContext {
        let localContext = new KeywordsContext(this.context, this.state);
        this.enterRule(localContext, 104, ImperaBookDSLParser.RULE_keywords);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 394;
            this.match(ImperaBookDSLParser.VALUE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public dashboardCmd(): DashboardCmdContext {
        let localContext = new DashboardCmdContext(this.context, this.state);
        this.enterRule(localContext, 106, ImperaBookDSLParser.RULE_dashboardCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 396;
            this.match(ImperaBookDSLParser.DASHBOARD);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public libraryCmd(): LibraryCmdContext {
        let localContext = new LibraryCmdContext(this.context, this.state);
        this.enterRule(localContext, 108, ImperaBookDSLParser.RULE_libraryCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 398;
            this.match(ImperaBookDSLParser.LIBRARY);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public settingsCmd(): SettingsCmdContext {
        let localContext = new SettingsCmdContext(this.context, this.state);
        this.enterRule(localContext, 110, ImperaBookDSLParser.RULE_settingsCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 400;
            this.match(ImperaBookDSLParser.SETTINGS);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public aboutCmd(): AboutCmdContext {
        let localContext = new AboutCmdContext(this.context, this.state);
        this.enterRule(localContext, 112, ImperaBookDSLParser.RULE_aboutCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 402;
            this.match(ImperaBookDSLParser.ABOUT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public helpCmd(): HelpCmdContext {
        let localContext = new HelpCmdContext(this.context, this.state);
        this.enterRule(localContext, 114, ImperaBookDSLParser.RULE_helpCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 404;
            this.match(ImperaBookDSLParser.HELP);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public accountCmd(): AccountCmdContext {
        let localContext = new AccountCmdContext(this.context, this.state);
        this.enterRule(localContext, 116, ImperaBookDSLParser.RULE_accountCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 406;
            this.match(ImperaBookDSLParser.ACCOUNT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public loginCmd(): LoginCmdContext {
        let localContext = new LoginCmdContext(this.context, this.state);
        this.enterRule(localContext, 118, ImperaBookDSLParser.RULE_loginCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 408;
            this.match(ImperaBookDSLParser.LOGIN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public logoutCmd(): LogoutCmdContext {
        let localContext = new LogoutCmdContext(this.context, this.state);
        this.enterRule(localContext, 120, ImperaBookDSLParser.RULE_logoutCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 410;
            this.match(ImperaBookDSLParser.LOGOUT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public bookTitle(): BookTitleContext {
        let localContext = new BookTitleContext(this.context, this.state);
        this.enterRule(localContext, 122, ImperaBookDSLParser.RULE_bookTitle);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 412;
            this.match(ImperaBookDSLParser.VALUE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public authorName(): AuthorNameContext {
        let localContext = new AuthorNameContext(this.context, this.state);
        this.enterRule(localContext, 124, ImperaBookDSLParser.RULE_authorName);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 414;
            this.match(ImperaBookDSLParser.VALUE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public bookDetailParam(): BookDetailParamContext {
        let localContext = new BookDetailParamContext(this.context, this.state);
        this.enterRule(localContext, 126, ImperaBookDSLParser.RULE_bookDetailParam);
        try {
            this.state = 422;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 21, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 416;
                this.authorParam();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 417;
                this.subtitleParam();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 418;
                this.languageParam();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 419;
                this.publicationYearParam();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 420;
                this.isbnParam();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 421;
                this.summaryParam();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public authorParam(): AuthorParamContext {
        let localContext = new AuthorParamContext(this.context, this.state);
        this.enterRule(localContext, 128, ImperaBookDSLParser.RULE_authorParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 424;
            this.match(ImperaBookDSLParser.BY);
            this.state = 425;
            this.match(ImperaBookDSLParser.AUTHOR);
            this.state = 426;
            this.value();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public subtitleParam(): SubtitleParamContext {
        let localContext = new SubtitleParamContext(this.context, this.state);
        this.enterRule(localContext, 130, ImperaBookDSLParser.RULE_subtitleParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 428;
            this.match(ImperaBookDSLParser.SUBTITLED);
            this.state = 429;
            this.value();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public languageParam(): LanguageParamContext {
        let localContext = new LanguageParamContext(this.context, this.state);
        this.enterRule(localContext, 132, ImperaBookDSLParser.RULE_languageParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 431;
            this.match(ImperaBookDSLParser.IN);
            this.state = 432;
            this.match(ImperaBookDSLParser.LANGUAGE);
            this.state = 433;
            this.value();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public publicationYearParam(): PublicationYearParamContext {
        let localContext = new PublicationYearParamContext(this.context, this.state);
        this.enterRule(localContext, 134, ImperaBookDSLParser.RULE_publicationYearParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 435;
            this.match(ImperaBookDSLParser.PUBLISHED);
            this.state = 436;
            this.match(ImperaBookDSLParser.IN);
            this.state = 437;
            this.year();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public isbnParam(): IsbnParamContext {
        let localContext = new IsbnParamContext(this.context, this.state);
        this.enterRule(localContext, 136, ImperaBookDSLParser.RULE_isbnParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 439;
            this.match(ImperaBookDSLParser.WITH);
            this.state = 440;
            this.match(ImperaBookDSLParser.ISBN);
            this.state = 441;
            this.value();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public summaryParam(): SummaryParamContext {
        let localContext = new SummaryParamContext(this.context, this.state);
        this.enterRule(localContext, 138, ImperaBookDSLParser.RULE_summaryParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 443;
            this.match(ImperaBookDSLParser.WITH);
            this.state = 444;
            this.match(ImperaBookDSLParser.SUMMARY);
            this.state = 445;
            this.value();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public value(): ValueContext {
        let localContext = new ValueContext(this.context, this.state);
        this.enterRule(localContext, 140, ImperaBookDSLParser.RULE_value);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 447;
            this.match(ImperaBookDSLParser.VALUE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public static readonly _serializedATN: number[] = [
        4,1,75,450,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
        2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,
        7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,
        2,66,7,66,2,67,7,67,2,68,7,68,2,69,7,69,2,70,7,70,1,0,5,0,144,8,
        0,10,0,12,0,147,9,0,1,0,1,0,5,0,151,8,0,10,0,12,0,154,9,0,1,0,1,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,3,1,175,8,1,1,2,1,2,1,2,1,2,4,2,181,8,2,11,2,12,2,182,1,2,
        5,2,186,8,2,10,2,12,2,189,9,2,1,3,1,3,1,3,1,4,1,4,1,4,1,5,1,5,1,
        5,3,5,200,8,5,1,5,4,5,203,8,5,11,5,12,5,204,1,5,5,5,208,8,5,10,5,
        12,5,211,9,5,1,6,1,6,1,6,1,6,3,6,217,8,6,1,7,1,7,1,7,1,7,1,8,1,8,
        1,8,1,8,1,8,1,8,3,8,229,8,8,1,9,1,9,1,10,1,10,1,10,1,11,1,11,1,11,
        1,12,1,12,1,13,1,13,1,14,1,14,1,15,1,15,1,15,1,16,1,16,1,16,1,16,
        3,16,252,8,16,1,17,1,17,1,17,1,18,1,18,1,18,1,19,1,19,1,19,1,20,
        1,20,1,20,1,20,1,21,1,21,1,21,1,22,1,22,3,22,272,8,22,1,23,1,23,
        1,23,1,23,1,24,1,24,1,25,1,25,1,25,3,25,283,8,25,1,26,1,26,1,26,
        3,26,288,8,26,1,26,1,26,1,27,1,27,1,28,4,28,295,8,28,11,28,12,28,
        296,1,29,1,29,1,29,1,29,1,29,1,30,1,30,1,30,1,30,1,30,1,30,1,30,
        3,30,311,8,30,1,31,1,31,1,31,1,31,1,32,1,32,1,32,1,32,1,33,1,33,
        1,33,1,33,1,34,1,34,1,34,1,34,1,35,1,35,1,35,1,35,1,36,1,36,1,36,
        1,37,1,37,1,38,1,38,1,38,1,39,1,39,1,40,1,40,1,40,1,40,4,40,347,
        8,40,11,40,12,40,348,1,40,5,40,352,8,40,10,40,12,40,355,9,40,1,41,
        1,41,1,41,3,41,360,8,41,1,42,1,42,1,42,1,42,1,43,1,43,3,43,368,8,
        43,1,44,1,44,1,44,1,45,1,45,1,46,1,46,1,46,1,47,1,47,1,47,1,48,1,
        48,1,48,3,48,384,8,48,1,49,1,49,1,49,1,49,1,50,1,50,1,51,1,51,1,
        51,1,52,1,52,1,53,1,53,1,54,1,54,1,55,1,55,1,56,1,56,1,57,1,57,1,
        58,1,58,1,59,1,59,1,60,1,60,1,61,1,61,1,62,1,62,1,63,1,63,1,63,1,
        63,1,63,1,63,3,63,423,8,63,1,64,1,64,1,64,1,64,1,65,1,65,1,65,1,
        66,1,66,1,66,1,66,1,67,1,67,1,67,1,67,1,68,1,68,1,68,1,68,1,69,1,
        69,1,69,1,69,1,70,1,70,1,70,0,0,71,0,2,4,6,8,10,12,14,16,18,20,22,
        24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,
        68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,
        108,110,112,114,116,118,120,122,124,126,128,130,132,134,136,138,
        140,0,2,1,0,55,56,1,0,57,58,433,0,145,1,0,0,0,2,174,1,0,0,0,4,176,
        1,0,0,0,6,190,1,0,0,0,8,193,1,0,0,0,10,196,1,0,0,0,12,216,1,0,0,
        0,14,218,1,0,0,0,16,228,1,0,0,0,18,230,1,0,0,0,20,232,1,0,0,0,22,
        235,1,0,0,0,24,238,1,0,0,0,26,240,1,0,0,0,28,242,1,0,0,0,30,244,
        1,0,0,0,32,251,1,0,0,0,34,253,1,0,0,0,36,256,1,0,0,0,38,259,1,0,
        0,0,40,262,1,0,0,0,42,266,1,0,0,0,44,269,1,0,0,0,46,273,1,0,0,0,
        48,277,1,0,0,0,50,279,1,0,0,0,52,284,1,0,0,0,54,291,1,0,0,0,56,294,
        1,0,0,0,58,298,1,0,0,0,60,310,1,0,0,0,62,312,1,0,0,0,64,316,1,0,
        0,0,66,320,1,0,0,0,68,324,1,0,0,0,70,328,1,0,0,0,72,332,1,0,0,0,
        74,335,1,0,0,0,76,337,1,0,0,0,78,340,1,0,0,0,80,342,1,0,0,0,82,359,
        1,0,0,0,84,361,1,0,0,0,86,365,1,0,0,0,88,369,1,0,0,0,90,372,1,0,
        0,0,92,374,1,0,0,0,94,377,1,0,0,0,96,380,1,0,0,0,98,385,1,0,0,0,
        100,389,1,0,0,0,102,391,1,0,0,0,104,394,1,0,0,0,106,396,1,0,0,0,
        108,398,1,0,0,0,110,400,1,0,0,0,112,402,1,0,0,0,114,404,1,0,0,0,
        116,406,1,0,0,0,118,408,1,0,0,0,120,410,1,0,0,0,122,412,1,0,0,0,
        124,414,1,0,0,0,126,422,1,0,0,0,128,424,1,0,0,0,130,428,1,0,0,0,
        132,431,1,0,0,0,134,435,1,0,0,0,136,439,1,0,0,0,138,443,1,0,0,0,
        140,447,1,0,0,0,142,144,5,29,0,0,143,142,1,0,0,0,144,147,1,0,0,0,
        145,143,1,0,0,0,145,146,1,0,0,0,146,148,1,0,0,0,147,145,1,0,0,0,
        148,152,3,2,1,0,149,151,5,29,0,0,150,149,1,0,0,0,151,154,1,0,0,0,
        152,150,1,0,0,0,152,153,1,0,0,0,153,155,1,0,0,0,154,152,1,0,0,0,
        155,156,5,0,0,1,156,1,1,0,0,0,157,175,3,4,2,0,158,175,3,6,3,0,159,
        175,3,8,4,0,160,175,3,10,5,0,161,175,3,80,40,0,162,175,3,92,46,0,
        163,175,3,94,47,0,164,175,3,96,48,0,165,175,3,106,53,0,166,175,3,
        108,54,0,167,175,3,110,55,0,168,175,3,112,56,0,169,175,3,114,57,
        0,170,175,3,116,58,0,171,175,3,118,59,0,172,175,3,120,60,0,173,175,
        3,102,51,0,174,157,1,0,0,0,174,158,1,0,0,0,174,159,1,0,0,0,174,160,
        1,0,0,0,174,161,1,0,0,0,174,162,1,0,0,0,174,163,1,0,0,0,174,164,
        1,0,0,0,174,165,1,0,0,0,174,166,1,0,0,0,174,167,1,0,0,0,174,168,
        1,0,0,0,174,169,1,0,0,0,174,170,1,0,0,0,174,171,1,0,0,0,174,172,
        1,0,0,0,174,173,1,0,0,0,175,3,1,0,0,0,176,177,5,1,0,0,177,178,5,
        6,0,0,178,187,3,122,61,0,179,181,5,29,0,0,180,179,1,0,0,0,181,182,
        1,0,0,0,182,180,1,0,0,0,182,183,1,0,0,0,183,184,1,0,0,0,184,186,
        3,126,63,0,185,180,1,0,0,0,186,189,1,0,0,0,187,185,1,0,0,0,187,188,
        1,0,0,0,188,5,1,0,0,0,189,187,1,0,0,0,190,191,5,3,0,0,191,192,5,
        6,0,0,192,7,1,0,0,0,193,194,5,4,0,0,194,195,5,6,0,0,195,9,1,0,0,
        0,196,197,5,5,0,0,197,199,5,7,0,0,198,200,3,12,6,0,199,198,1,0,0,
        0,199,200,1,0,0,0,200,209,1,0,0,0,201,203,5,29,0,0,202,201,1,0,0,
        0,203,204,1,0,0,0,204,202,1,0,0,0,204,205,1,0,0,0,205,206,1,0,0,
        0,206,208,3,12,6,0,207,202,1,0,0,0,208,211,1,0,0,0,209,207,1,0,0,
        0,209,210,1,0,0,0,210,11,1,0,0,0,211,209,1,0,0,0,212,217,3,50,25,
        0,213,217,3,46,23,0,214,217,3,30,15,0,215,217,3,14,7,0,216,212,1,
        0,0,0,216,213,1,0,0,0,216,214,1,0,0,0,216,215,1,0,0,0,217,13,1,0,
        0,0,218,219,5,25,0,0,219,220,5,41,0,0,220,221,3,16,8,0,221,15,1,
        0,0,0,222,229,3,18,9,0,223,229,3,20,10,0,224,229,3,22,11,0,225,229,
        3,24,12,0,226,229,3,26,13,0,227,229,3,28,14,0,228,222,1,0,0,0,228,
        223,1,0,0,0,228,224,1,0,0,0,228,225,1,0,0,0,228,226,1,0,0,0,228,
        227,1,0,0,0,229,17,1,0,0,0,230,231,5,8,0,0,231,19,1,0,0,0,232,233,
        5,48,0,0,233,234,5,49,0,0,234,21,1,0,0,0,235,236,5,43,0,0,236,237,
        5,44,0,0,237,23,1,0,0,0,238,239,5,36,0,0,239,25,1,0,0,0,240,241,
        5,33,0,0,241,27,1,0,0,0,242,243,5,45,0,0,243,29,1,0,0,0,244,245,
        5,21,0,0,245,246,3,32,16,0,246,31,1,0,0,0,247,252,3,34,17,0,248,
        252,3,36,18,0,249,252,3,38,19,0,250,252,3,40,20,0,251,247,1,0,0,
        0,251,248,1,0,0,0,251,249,1,0,0,0,251,250,1,0,0,0,252,33,1,0,0,0,
        253,254,5,20,0,0,254,255,3,44,22,0,255,35,1,0,0,0,256,257,5,38,0,
        0,257,258,3,44,22,0,258,37,1,0,0,0,259,260,5,39,0,0,260,261,3,44,
        22,0,261,39,1,0,0,0,262,263,5,63,0,0,263,264,3,44,22,0,264,265,3,
        42,21,0,265,41,1,0,0,0,266,267,5,64,0,0,267,268,3,44,22,0,268,43,
        1,0,0,0,269,271,5,66,0,0,270,272,5,69,0,0,271,270,1,0,0,0,271,272,
        1,0,0,0,272,45,1,0,0,0,273,274,5,24,0,0,274,275,5,18,0,0,275,276,
        3,48,24,0,276,47,1,0,0,0,277,278,5,71,0,0,278,49,1,0,0,0,279,282,
        5,23,0,0,280,283,3,58,29,0,281,283,3,52,26,0,282,280,1,0,0,0,282,
        281,1,0,0,0,283,51,1,0,0,0,284,285,5,36,0,0,285,287,5,50,0,0,286,
        288,3,54,27,0,287,286,1,0,0,0,287,288,1,0,0,0,288,289,1,0,0,0,289,
        290,3,56,28,0,290,53,1,0,0,0,291,292,5,65,0,0,292,55,1,0,0,0,293,
        295,5,53,0,0,294,293,1,0,0,0,295,296,1,0,0,0,296,294,1,0,0,0,296,
        297,1,0,0,0,297,57,1,0,0,0,298,299,5,48,0,0,299,300,5,49,0,0,300,
        301,5,50,0,0,301,302,3,60,30,0,302,59,1,0,0,0,303,311,3,62,31,0,
        304,311,3,64,32,0,305,311,3,66,33,0,306,311,3,68,34,0,307,311,3,
        70,35,0,308,311,3,72,36,0,309,311,3,74,37,0,310,303,1,0,0,0,310,
        304,1,0,0,0,310,305,1,0,0,0,310,306,1,0,0,0,310,307,1,0,0,0,310,
        308,1,0,0,0,310,309,1,0,0,0,311,61,1,0,0,0,312,313,7,0,0,0,313,314,
        5,59,0,0,314,315,3,78,39,0,315,63,1,0,0,0,316,317,7,1,0,0,317,318,
        5,59,0,0,318,319,3,78,39,0,319,65,1,0,0,0,320,321,5,60,0,0,321,322,
        5,61,0,0,322,323,3,78,39,0,323,67,1,0,0,0,324,325,5,60,0,0,325,326,
        5,62,0,0,326,327,3,78,39,0,327,69,1,0,0,0,328,329,5,63,0,0,329,330,
        3,78,39,0,330,331,3,76,38,0,331,71,1,0,0,0,332,333,5,65,0,0,333,
        334,3,78,39,0,334,73,1,0,0,0,335,336,3,78,39,0,336,75,1,0,0,0,337,
        338,5,64,0,0,338,339,3,78,39,0,339,77,1,0,0,0,340,341,5,66,0,0,341,
        79,1,0,0,0,342,343,5,1,0,0,343,344,5,8,0,0,344,353,3,124,62,0,345,
        347,5,29,0,0,346,345,1,0,0,0,347,348,1,0,0,0,348,346,1,0,0,0,348,
        349,1,0,0,0,349,350,1,0,0,0,350,352,3,82,41,0,351,346,1,0,0,0,352,
        355,1,0,0,0,353,351,1,0,0,0,353,354,1,0,0,0,354,81,1,0,0,0,355,353,
        1,0,0,0,356,360,3,84,42,0,357,360,3,86,43,0,358,360,3,90,45,0,359,
        356,1,0,0,0,359,357,1,0,0,0,359,358,1,0,0,0,360,83,1,0,0,0,361,362,
        5,26,0,0,362,363,5,20,0,0,363,364,3,44,22,0,364,85,1,0,0,0,365,367,
        5,27,0,0,366,368,3,88,44,0,367,366,1,0,0,0,367,368,1,0,0,0,368,87,
        1,0,0,0,369,370,5,20,0,0,370,371,3,44,22,0,371,89,1,0,0,0,372,373,
        5,28,0,0,373,91,1,0,0,0,374,375,5,3,0,0,375,376,5,8,0,0,376,93,1,
        0,0,0,377,378,5,4,0,0,378,379,5,8,0,0,379,95,1,0,0,0,380,381,5,5,
        0,0,381,383,5,9,0,0,382,384,3,98,49,0,383,382,1,0,0,0,383,384,1,
        0,0,0,384,97,1,0,0,0,385,386,5,25,0,0,386,387,5,41,0,0,387,388,3,
        100,50,0,388,99,1,0,0,0,389,390,5,7,0,0,390,101,1,0,0,0,391,392,
        5,2,0,0,392,393,3,104,52,0,393,103,1,0,0,0,394,395,5,71,0,0,395,
        105,1,0,0,0,396,397,5,10,0,0,397,107,1,0,0,0,398,399,5,11,0,0,399,
        109,1,0,0,0,400,401,5,12,0,0,401,111,1,0,0,0,402,403,5,13,0,0,403,
        113,1,0,0,0,404,405,5,14,0,0,405,115,1,0,0,0,406,407,5,15,0,0,407,
        117,1,0,0,0,408,409,5,16,0,0,409,119,1,0,0,0,410,411,5,17,0,0,411,
        121,1,0,0,0,412,413,5,71,0,0,413,123,1,0,0,0,414,415,5,71,0,0,415,
        125,1,0,0,0,416,423,3,128,64,0,417,423,3,130,65,0,418,423,3,132,
        66,0,419,423,3,134,67,0,420,423,3,136,68,0,421,423,3,138,69,0,422,
        416,1,0,0,0,422,417,1,0,0,0,422,418,1,0,0,0,422,419,1,0,0,0,422,
        420,1,0,0,0,422,421,1,0,0,0,423,127,1,0,0,0,424,425,5,18,0,0,425,
        426,5,8,0,0,426,427,3,140,70,0,427,129,1,0,0,0,428,429,5,22,0,0,
        429,430,3,140,70,0,430,131,1,0,0,0,431,432,5,20,0,0,432,433,5,36,
        0,0,433,434,3,140,70,0,434,133,1,0,0,0,435,436,5,21,0,0,436,437,
        5,20,0,0,437,438,3,44,22,0,438,135,1,0,0,0,439,440,5,19,0,0,440,
        441,5,33,0,0,441,442,3,140,70,0,442,137,1,0,0,0,443,444,5,19,0,0,
        444,445,5,34,0,0,445,446,3,140,70,0,446,139,1,0,0,0,447,448,5,71,
        0,0,448,141,1,0,0,0,22,145,152,174,182,187,199,204,209,216,228,251,
        271,282,287,296,310,348,353,359,367,383,422
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!ImperaBookDSLParser.__ATN) {
            ImperaBookDSLParser.__ATN = new antlr.ATNDeserializer().deserialize(ImperaBookDSLParser._serializedATN);
        }

        return ImperaBookDSLParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(ImperaBookDSLParser.literalNames, ImperaBookDSLParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return ImperaBookDSLParser.vocabulary;
    }

    private static readonly decisionsToDFA = ImperaBookDSLParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class EntryContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public command(): CommandContext {
        return this.getRuleContext(0, CommandContext)!;
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.EOF, 0)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ImperaBookDSLParser.NL);
    	} else {
    		return this.getToken(ImperaBookDSLParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_entry;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterEntry) {
             listener.enterEntry(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitEntry) {
             listener.exitEntry(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitEntry) {
            return visitor.visitEntry(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CommandContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public addBookCmd(): AddBookCmdContext | null {
        return this.getRuleContext(0, AddBookCmdContext);
    }
    public updateBookCmd(): UpdateBookCmdContext | null {
        return this.getRuleContext(0, UpdateBookCmdContext);
    }
    public removeBookCmd(): RemoveBookCmdContext | null {
        return this.getRuleContext(0, RemoveBookCmdContext);
    }
    public listBooksCmd(): ListBooksCmdContext | null {
        return this.getRuleContext(0, ListBooksCmdContext);
    }
    public addAuthorCmd(): AddAuthorCmdContext | null {
        return this.getRuleContext(0, AddAuthorCmdContext);
    }
    public updateAuthorCmd(): UpdateAuthorCmdContext | null {
        return this.getRuleContext(0, UpdateAuthorCmdContext);
    }
    public removeAuthorCmd(): RemoveAuthorCmdContext | null {
        return this.getRuleContext(0, RemoveAuthorCmdContext);
    }
    public listAuthorsCmd(): ListAuthorsCmdContext | null {
        return this.getRuleContext(0, ListAuthorsCmdContext);
    }
    public dashboardCmd(): DashboardCmdContext | null {
        return this.getRuleContext(0, DashboardCmdContext);
    }
    public libraryCmd(): LibraryCmdContext | null {
        return this.getRuleContext(0, LibraryCmdContext);
    }
    public settingsCmd(): SettingsCmdContext | null {
        return this.getRuleContext(0, SettingsCmdContext);
    }
    public aboutCmd(): AboutCmdContext | null {
        return this.getRuleContext(0, AboutCmdContext);
    }
    public helpCmd(): HelpCmdContext | null {
        return this.getRuleContext(0, HelpCmdContext);
    }
    public accountCmd(): AccountCmdContext | null {
        return this.getRuleContext(0, AccountCmdContext);
    }
    public loginCmd(): LoginCmdContext | null {
        return this.getRuleContext(0, LoginCmdContext);
    }
    public logoutCmd(): LogoutCmdContext | null {
        return this.getRuleContext(0, LogoutCmdContext);
    }
    public findCmd(): FindCmdContext | null {
        return this.getRuleContext(0, FindCmdContext);
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_command;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterCommand) {
             listener.enterCommand(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitCommand) {
             listener.exitCommand(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitCommand) {
            return visitor.visitCommand(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AddBookCmdContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ADD(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.ADD, 0)!;
    }
    public BOOK(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.BOOK, 0)!;
    }
    public bookTitle(): BookTitleContext {
        return this.getRuleContext(0, BookTitleContext)!;
    }
    public bookDetailParam(): BookDetailParamContext[];
    public bookDetailParam(i: number): BookDetailParamContext | null;
    public bookDetailParam(i?: number): BookDetailParamContext[] | BookDetailParamContext | null {
        if (i === undefined) {
            return this.getRuleContexts(BookDetailParamContext);
        }

        return this.getRuleContext(i, BookDetailParamContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ImperaBookDSLParser.NL);
    	} else {
    		return this.getToken(ImperaBookDSLParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_addBookCmd;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterAddBookCmd) {
             listener.enterAddBookCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitAddBookCmd) {
             listener.exitAddBookCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitAddBookCmd) {
            return visitor.visitAddBookCmd(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class UpdateBookCmdContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public UPDATE(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.UPDATE, 0)!;
    }
    public BOOK(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.BOOK, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_updateBookCmd;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterUpdateBookCmd) {
             listener.enterUpdateBookCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitUpdateBookCmd) {
             listener.exitUpdateBookCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitUpdateBookCmd) {
            return visitor.visitUpdateBookCmd(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class RemoveBookCmdContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public REMOVE(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.REMOVE, 0)!;
    }
    public BOOK(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.BOOK, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_removeBookCmd;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterRemoveBookCmd) {
             listener.enterRemoveBookCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitRemoveBookCmd) {
             listener.exitRemoveBookCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitRemoveBookCmd) {
            return visitor.visitRemoveBookCmd(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ListBooksCmdContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LIST(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.LIST, 0)!;
    }
    public BOOKS(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.BOOKS, 0)!;
    }
    public listFilter(): ListFilterContext[];
    public listFilter(i: number): ListFilterContext | null;
    public listFilter(i?: number): ListFilterContext[] | ListFilterContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ListFilterContext);
        }

        return this.getRuleContext(i, ListFilterContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ImperaBookDSLParser.NL);
    	} else {
    		return this.getToken(ImperaBookDSLParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_listBooksCmd;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterListBooksCmd) {
             listener.enterListBooksCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitListBooksCmd) {
             listener.exitListBooksCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitListBooksCmd) {
            return visitor.visitListBooksCmd(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ListFilterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public whoseFilter(): WhoseFilterContext | null {
        return this.getRuleContext(0, WhoseFilterContext);
    }
    public authorFilter(): AuthorFilterContext | null {
        return this.getRuleContext(0, AuthorFilterContext);
    }
    public publishedFilter(): PublishedFilterContext | null {
        return this.getRuleContext(0, PublishedFilterContext);
    }
    public missingFilter(): MissingFilterContext | null {
        return this.getRuleContext(0, MissingFilterContext);
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_listFilter;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterListFilter) {
             listener.enterListFilter(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitListFilter) {
             listener.exitListFilter(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitListFilter) {
            return visitor.visitListFilter(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MissingFilterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public HAVING(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.HAVING, 0)!;
    }
    public NO(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.NO, 0)!;
    }
    public missingProperty(): MissingPropertyContext {
        return this.getRuleContext(0, MissingPropertyContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_missingFilter;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterMissingFilter) {
             listener.enterMissingFilter(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitMissingFilter) {
             listener.exitMissingFilter(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitMissingFilter) {
            return visitor.visitMissingFilter(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MissingPropertyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public missingAuthor(): MissingAuthorContext | null {
        return this.getRuleContext(0, MissingAuthorContext);
    }
    public missingPages(): MissingPagesContext | null {
        return this.getRuleContext(0, MissingPagesContext);
    }
    public missingYear(): MissingYearContext | null {
        return this.getRuleContext(0, MissingYearContext);
    }
    public missingLanguage(): MissingLanguageContext | null {
        return this.getRuleContext(0, MissingLanguageContext);
    }
    public missingIsbn(): MissingIsbnContext | null {
        return this.getRuleContext(0, MissingIsbnContext);
    }
    public missingCover(): MissingCoverContext | null {
        return this.getRuleContext(0, MissingCoverContext);
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_missingProperty;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterMissingProperty) {
             listener.enterMissingProperty(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitMissingProperty) {
             listener.exitMissingProperty(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitMissingProperty) {
            return visitor.visitMissingProperty(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MissingAuthorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public AUTHOR(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.AUTHOR, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_missingAuthor;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterMissingAuthor) {
             listener.enterMissingAuthor(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitMissingAuthor) {
             listener.exitMissingAuthor(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitMissingAuthor) {
            return visitor.visitMissingAuthor(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MissingPagesContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PAGE(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.PAGE, 0)!;
    }
    public COUNT(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.COUNT, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_missingPages;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterMissingPages) {
             listener.enterMissingPages(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitMissingPages) {
             listener.exitMissingPages(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitMissingPages) {
            return visitor.visitMissingPages(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MissingYearContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PUBLICATION(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.PUBLICATION, 0)!;
    }
    public YEAR(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.YEAR, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_missingYear;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterMissingYear) {
             listener.enterMissingYear(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitMissingYear) {
             listener.exitMissingYear(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitMissingYear) {
            return visitor.visitMissingYear(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MissingLanguageContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LANGUAGE(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.LANGUAGE, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_missingLanguage;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterMissingLanguage) {
             listener.enterMissingLanguage(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitMissingLanguage) {
             listener.exitMissingLanguage(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitMissingLanguage) {
            return visitor.visitMissingLanguage(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MissingIsbnContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ISBN(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.ISBN, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_missingIsbn;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterMissingIsbn) {
             listener.enterMissingIsbn(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitMissingIsbn) {
             listener.exitMissingIsbn(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitMissingIsbn) {
            return visitor.visitMissingIsbn(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MissingCoverContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public COVER(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.COVER, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_missingCover;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterMissingCover) {
             listener.enterMissingCover(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitMissingCover) {
             listener.exitMissingCover(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitMissingCover) {
            return visitor.visitMissingCover(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PublishedFilterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PUBLISHED(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.PUBLISHED, 0)!;
    }
    public yearComparison(): YearComparisonContext {
        return this.getRuleContext(0, YearComparisonContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_publishedFilter;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterPublishedFilter) {
             listener.enterPublishedFilter(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitPublishedFilter) {
             listener.exitPublishedFilter(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitPublishedFilter) {
            return visitor.visitPublishedFilter(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class YearComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public yearIn(): YearInContext | null {
        return this.getRuleContext(0, YearInContext);
    }
    public yearBefore(): YearBeforeContext | null {
        return this.getRuleContext(0, YearBeforeContext);
    }
    public yearAfter(): YearAfterContext | null {
        return this.getRuleContext(0, YearAfterContext);
    }
    public yearBetween(): YearBetweenContext | null {
        return this.getRuleContext(0, YearBetweenContext);
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_yearComparison;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterYearComparison) {
             listener.enterYearComparison(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitYearComparison) {
             listener.exitYearComparison(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitYearComparison) {
            return visitor.visitYearComparison(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class YearInContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IN(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.IN, 0)!;
    }
    public year(): YearContext {
        return this.getRuleContext(0, YearContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_yearIn;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterYearIn) {
             listener.enterYearIn(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitYearIn) {
             listener.exitYearIn(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitYearIn) {
            return visitor.visitYearIn(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class YearBeforeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BEFORE(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.BEFORE, 0)!;
    }
    public year(): YearContext {
        return this.getRuleContext(0, YearContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_yearBefore;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterYearBefore) {
             listener.enterYearBefore(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitYearBefore) {
             listener.exitYearBefore(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitYearBefore) {
            return visitor.visitYearBefore(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class YearAfterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public AFTER(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.AFTER, 0)!;
    }
    public year(): YearContext {
        return this.getRuleContext(0, YearContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_yearAfter;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterYearAfter) {
             listener.enterYearAfter(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitYearAfter) {
             listener.exitYearAfter(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitYearAfter) {
            return visitor.visitYearAfter(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class YearBetweenContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BETWEEN(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.BETWEEN, 0)!;
    }
    public year(): YearContext {
        return this.getRuleContext(0, YearContext)!;
    }
    public yearAnd(): YearAndContext {
        return this.getRuleContext(0, YearAndContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_yearBetween;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterYearBetween) {
             listener.enterYearBetween(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitYearBetween) {
             listener.exitYearBetween(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitYearBetween) {
            return visitor.visitYearBetween(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class YearAndContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public AND(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.AND, 0)!;
    }
    public year(): YearContext {
        return this.getRuleContext(0, YearContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_yearAnd;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterYearAnd) {
             listener.enterYearAnd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitYearAnd) {
             listener.exitYearAnd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitYearAnd) {
            return visitor.visitYearAnd(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class YearContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NUMBER(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.NUMBER, 0)!;
    }
    public BC(): antlr.TerminalNode | null {
        return this.getToken(ImperaBookDSLParser.BC, 0);
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_year;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterYear) {
             listener.enterYear(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitYear) {
             listener.exitYear(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitYear) {
            return visitor.visitYear(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AuthorFilterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public WRITTEN(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.WRITTEN, 0)!;
    }
    public BY(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.BY, 0)!;
    }
    public writerName(): WriterNameContext {
        return this.getRuleContext(0, WriterNameContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_authorFilter;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterAuthorFilter) {
             listener.enterAuthorFilter(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitAuthorFilter) {
             listener.exitAuthorFilter(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitAuthorFilter) {
            return visitor.visitAuthorFilter(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class WriterNameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public VALUE(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.VALUE, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_writerName;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterWriterName) {
             listener.enterWriterName(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitWriterName) {
             listener.exitWriterName(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitWriterName) {
            return visitor.visitWriterName(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class WhoseFilterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public WHOSE(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.WHOSE, 0)!;
    }
    public pagesFilter(): PagesFilterContext | null {
        return this.getRuleContext(0, PagesFilterContext);
    }
    public languageFilter(): LanguageFilterContext | null {
        return this.getRuleContext(0, LanguageFilterContext);
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_whoseFilter;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterWhoseFilter) {
             listener.enterWhoseFilter(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitWhoseFilter) {
             listener.exitWhoseFilter(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitWhoseFilter) {
            return visitor.visitWhoseFilter(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LanguageFilterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LANGUAGE(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.LANGUAGE, 0)!;
    }
    public IS(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.IS, 0)!;
    }
    public languageName(): LanguageNameContext {
        return this.getRuleContext(0, LanguageNameContext)!;
    }
    public languageNot(): LanguageNotContext | null {
        return this.getRuleContext(0, LanguageNotContext);
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_languageFilter;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterLanguageFilter) {
             listener.enterLanguageFilter(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitLanguageFilter) {
             listener.exitLanguageFilter(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitLanguageFilter) {
            return visitor.visitLanguageFilter(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LanguageNotContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NOT(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.NOT, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_languageNot;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterLanguageNot) {
             listener.enterLanguageNot(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitLanguageNot) {
             listener.exitLanguageNot(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitLanguageNot) {
            return visitor.visitLanguageNot(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LanguageNameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LANGUAGE_WORD(): antlr.TerminalNode[];
    public LANGUAGE_WORD(i: number): antlr.TerminalNode | null;
    public LANGUAGE_WORD(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ImperaBookDSLParser.LANGUAGE_WORD);
    	} else {
    		return this.getToken(ImperaBookDSLParser.LANGUAGE_WORD, i);
    	}
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_languageName;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterLanguageName) {
             listener.enterLanguageName(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitLanguageName) {
             listener.exitLanguageName(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitLanguageName) {
            return visitor.visitLanguageName(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PagesFilterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PAGE(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.PAGE, 0)!;
    }
    public COUNT(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.COUNT, 0)!;
    }
    public IS(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.IS, 0)!;
    }
    public pageComparison(): PageComparisonContext {
        return this.getRuleContext(0, PageComparisonContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_pagesFilter;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterPagesFilter) {
             listener.enterPagesFilter(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitPagesFilter) {
             listener.exitPagesFilter(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitPagesFilter) {
            return visitor.visitPagesFilter(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PageComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public pagesMoreThan(): PagesMoreThanContext | null {
        return this.getRuleContext(0, PagesMoreThanContext);
    }
    public pagesLessThan(): PagesLessThanContext | null {
        return this.getRuleContext(0, PagesLessThanContext);
    }
    public pagesAtLeast(): PagesAtLeastContext | null {
        return this.getRuleContext(0, PagesAtLeastContext);
    }
    public pagesAtMost(): PagesAtMostContext | null {
        return this.getRuleContext(0, PagesAtMostContext);
    }
    public pagesBetween(): PagesBetweenContext | null {
        return this.getRuleContext(0, PagesBetweenContext);
    }
    public pagesNot(): PagesNotContext | null {
        return this.getRuleContext(0, PagesNotContext);
    }
    public pagesEqual(): PagesEqualContext | null {
        return this.getRuleContext(0, PagesEqualContext);
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_pageComparison;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterPageComparison) {
             listener.enterPageComparison(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitPageComparison) {
             listener.exitPageComparison(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitPageComparison) {
            return visitor.visitPageComparison(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PagesMoreThanContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public THAN(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.THAN, 0)!;
    }
    public pageCount(): PageCountContext {
        return this.getRuleContext(0, PageCountContext)!;
    }
    public MORE_KW(): antlr.TerminalNode | null {
        return this.getToken(ImperaBookDSLParser.MORE_KW, 0);
    }
    public GREATER(): antlr.TerminalNode | null {
        return this.getToken(ImperaBookDSLParser.GREATER, 0);
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_pagesMoreThan;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterPagesMoreThan) {
             listener.enterPagesMoreThan(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitPagesMoreThan) {
             listener.exitPagesMoreThan(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitPagesMoreThan) {
            return visitor.visitPagesMoreThan(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PagesLessThanContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public THAN(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.THAN, 0)!;
    }
    public pageCount(): PageCountContext {
        return this.getRuleContext(0, PageCountContext)!;
    }
    public LESS(): antlr.TerminalNode | null {
        return this.getToken(ImperaBookDSLParser.LESS, 0);
    }
    public FEWER(): antlr.TerminalNode | null {
        return this.getToken(ImperaBookDSLParser.FEWER, 0);
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_pagesLessThan;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterPagesLessThan) {
             listener.enterPagesLessThan(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitPagesLessThan) {
             listener.exitPagesLessThan(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitPagesLessThan) {
            return visitor.visitPagesLessThan(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PagesAtLeastContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public AT(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.AT, 0)!;
    }
    public LEAST(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.LEAST, 0)!;
    }
    public pageCount(): PageCountContext {
        return this.getRuleContext(0, PageCountContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_pagesAtLeast;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterPagesAtLeast) {
             listener.enterPagesAtLeast(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitPagesAtLeast) {
             listener.exitPagesAtLeast(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitPagesAtLeast) {
            return visitor.visitPagesAtLeast(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PagesAtMostContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public AT(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.AT, 0)!;
    }
    public MOST(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.MOST, 0)!;
    }
    public pageCount(): PageCountContext {
        return this.getRuleContext(0, PageCountContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_pagesAtMost;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterPagesAtMost) {
             listener.enterPagesAtMost(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitPagesAtMost) {
             listener.exitPagesAtMost(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitPagesAtMost) {
            return visitor.visitPagesAtMost(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PagesBetweenContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BETWEEN(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.BETWEEN, 0)!;
    }
    public pageCount(): PageCountContext {
        return this.getRuleContext(0, PageCountContext)!;
    }
    public andBound(): AndBoundContext {
        return this.getRuleContext(0, AndBoundContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_pagesBetween;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterPagesBetween) {
             listener.enterPagesBetween(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitPagesBetween) {
             listener.exitPagesBetween(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitPagesBetween) {
            return visitor.visitPagesBetween(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PagesNotContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NOT(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.NOT, 0)!;
    }
    public pageCount(): PageCountContext {
        return this.getRuleContext(0, PageCountContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_pagesNot;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterPagesNot) {
             listener.enterPagesNot(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitPagesNot) {
             listener.exitPagesNot(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitPagesNot) {
            return visitor.visitPagesNot(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PagesEqualContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public pageCount(): PageCountContext {
        return this.getRuleContext(0, PageCountContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_pagesEqual;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterPagesEqual) {
             listener.enterPagesEqual(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitPagesEqual) {
             listener.exitPagesEqual(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitPagesEqual) {
            return visitor.visitPagesEqual(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AndBoundContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public AND(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.AND, 0)!;
    }
    public pageCount(): PageCountContext {
        return this.getRuleContext(0, PageCountContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_andBound;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterAndBound) {
             listener.enterAndBound(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitAndBound) {
             listener.exitAndBound(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitAndBound) {
            return visitor.visitAndBound(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PageCountContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NUMBER(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.NUMBER, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_pageCount;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterPageCount) {
             listener.enterPageCount(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitPageCount) {
             listener.exitPageCount(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitPageCount) {
            return visitor.visitPageCount(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AddAuthorCmdContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ADD(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.ADD, 0)!;
    }
    public AUTHOR(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.AUTHOR, 0)!;
    }
    public authorName(): AuthorNameContext {
        return this.getRuleContext(0, AuthorNameContext)!;
    }
    public authorDetailParam(): AuthorDetailParamContext[];
    public authorDetailParam(i: number): AuthorDetailParamContext | null;
    public authorDetailParam(i?: number): AuthorDetailParamContext[] | AuthorDetailParamContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AuthorDetailParamContext);
        }

        return this.getRuleContext(i, AuthorDetailParamContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ImperaBookDSLParser.NL);
    	} else {
    		return this.getToken(ImperaBookDSLParser.NL, i);
    	}
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_addAuthorCmd;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterAddAuthorCmd) {
             listener.enterAddAuthorCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitAddAuthorCmd) {
             listener.exitAddAuthorCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitAddAuthorCmd) {
            return visitor.visitAddAuthorCmd(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AuthorDetailParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public bornParam(): BornParamContext | null {
        return this.getRuleContext(0, BornParamContext);
    }
    public diedParam(): DiedParamContext | null {
        return this.getRuleContext(0, DiedParamContext);
    }
    public livingParam(): LivingParamContext | null {
        return this.getRuleContext(0, LivingParamContext);
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_authorDetailParam;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterAuthorDetailParam) {
             listener.enterAuthorDetailParam(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitAuthorDetailParam) {
             listener.exitAuthorDetailParam(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitAuthorDetailParam) {
            return visitor.visitAuthorDetailParam(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BornParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BORN(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.BORN, 0)!;
    }
    public IN(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.IN, 0)!;
    }
    public year(): YearContext {
        return this.getRuleContext(0, YearContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_bornParam;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterBornParam) {
             listener.enterBornParam(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitBornParam) {
             listener.exitBornParam(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitBornParam) {
            return visitor.visitBornParam(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DiedParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DIED(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.DIED, 0)!;
    }
    public diedYear(): DiedYearContext | null {
        return this.getRuleContext(0, DiedYearContext);
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_diedParam;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterDiedParam) {
             listener.enterDiedParam(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitDiedParam) {
             listener.exitDiedParam(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitDiedParam) {
            return visitor.visitDiedParam(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DiedYearContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IN(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.IN, 0)!;
    }
    public year(): YearContext {
        return this.getRuleContext(0, YearContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_diedYear;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterDiedYear) {
             listener.enterDiedYear(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitDiedYear) {
             listener.exitDiedYear(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitDiedYear) {
            return visitor.visitDiedYear(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LivingParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LIVING(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.LIVING, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_livingParam;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterLivingParam) {
             listener.enterLivingParam(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitLivingParam) {
             listener.exitLivingParam(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitLivingParam) {
            return visitor.visitLivingParam(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class UpdateAuthorCmdContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public UPDATE(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.UPDATE, 0)!;
    }
    public AUTHOR(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.AUTHOR, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_updateAuthorCmd;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterUpdateAuthorCmd) {
             listener.enterUpdateAuthorCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitUpdateAuthorCmd) {
             listener.exitUpdateAuthorCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitUpdateAuthorCmd) {
            return visitor.visitUpdateAuthorCmd(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class RemoveAuthorCmdContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public REMOVE(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.REMOVE, 0)!;
    }
    public AUTHOR(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.AUTHOR, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_removeAuthorCmd;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterRemoveAuthorCmd) {
             listener.enterRemoveAuthorCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitRemoveAuthorCmd) {
             listener.exitRemoveAuthorCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitRemoveAuthorCmd) {
            return visitor.visitRemoveAuthorCmd(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ListAuthorsCmdContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LIST(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.LIST, 0)!;
    }
    public AUTHORS(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.AUTHORS, 0)!;
    }
    public authorsWithoutBooks(): AuthorsWithoutBooksContext | null {
        return this.getRuleContext(0, AuthorsWithoutBooksContext);
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_listAuthorsCmd;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterListAuthorsCmd) {
             listener.enterListAuthorsCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitListAuthorsCmd) {
             listener.exitListAuthorsCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitListAuthorsCmd) {
            return visitor.visitListAuthorsCmd(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AuthorsWithoutBooksContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public HAVING(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.HAVING, 0)!;
    }
    public NO(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.NO, 0)!;
    }
    public noBooks(): NoBooksContext {
        return this.getRuleContext(0, NoBooksContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_authorsWithoutBooks;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterAuthorsWithoutBooks) {
             listener.enterAuthorsWithoutBooks(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitAuthorsWithoutBooks) {
             listener.exitAuthorsWithoutBooks(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitAuthorsWithoutBooks) {
            return visitor.visitAuthorsWithoutBooks(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class NoBooksContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BOOKS(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.BOOKS, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_noBooks;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterNoBooks) {
             listener.enterNoBooks(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitNoBooks) {
             listener.exitNoBooks(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitNoBooks) {
            return visitor.visitNoBooks(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FindCmdContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public FIND(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.FIND, 0)!;
    }
    public keywords(): KeywordsContext {
        return this.getRuleContext(0, KeywordsContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_findCmd;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterFindCmd) {
             listener.enterFindCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitFindCmd) {
             listener.exitFindCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitFindCmd) {
            return visitor.visitFindCmd(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class KeywordsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public VALUE(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.VALUE, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_keywords;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterKeywords) {
             listener.enterKeywords(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitKeywords) {
             listener.exitKeywords(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitKeywords) {
            return visitor.visitKeywords(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DashboardCmdContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DASHBOARD(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.DASHBOARD, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_dashboardCmd;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterDashboardCmd) {
             listener.enterDashboardCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitDashboardCmd) {
             listener.exitDashboardCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitDashboardCmd) {
            return visitor.visitDashboardCmd(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LibraryCmdContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LIBRARY(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.LIBRARY, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_libraryCmd;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterLibraryCmd) {
             listener.enterLibraryCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitLibraryCmd) {
             listener.exitLibraryCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitLibraryCmd) {
            return visitor.visitLibraryCmd(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SettingsCmdContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SETTINGS(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.SETTINGS, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_settingsCmd;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterSettingsCmd) {
             listener.enterSettingsCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitSettingsCmd) {
             listener.exitSettingsCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitSettingsCmd) {
            return visitor.visitSettingsCmd(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AboutCmdContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ABOUT(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.ABOUT, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_aboutCmd;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterAboutCmd) {
             listener.enterAboutCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitAboutCmd) {
             listener.exitAboutCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitAboutCmd) {
            return visitor.visitAboutCmd(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class HelpCmdContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public HELP(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.HELP, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_helpCmd;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterHelpCmd) {
             listener.enterHelpCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitHelpCmd) {
             listener.exitHelpCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitHelpCmd) {
            return visitor.visitHelpCmd(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AccountCmdContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ACCOUNT(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.ACCOUNT, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_accountCmd;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterAccountCmd) {
             listener.enterAccountCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitAccountCmd) {
             listener.exitAccountCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitAccountCmd) {
            return visitor.visitAccountCmd(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LoginCmdContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LOGIN(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.LOGIN, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_loginCmd;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterLoginCmd) {
             listener.enterLoginCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitLoginCmd) {
             listener.exitLoginCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitLoginCmd) {
            return visitor.visitLoginCmd(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LogoutCmdContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LOGOUT(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.LOGOUT, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_logoutCmd;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterLogoutCmd) {
             listener.enterLogoutCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitLogoutCmd) {
             listener.exitLogoutCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitLogoutCmd) {
            return visitor.visitLogoutCmd(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BookTitleContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public VALUE(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.VALUE, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_bookTitle;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterBookTitle) {
             listener.enterBookTitle(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitBookTitle) {
             listener.exitBookTitle(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitBookTitle) {
            return visitor.visitBookTitle(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AuthorNameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public VALUE(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.VALUE, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_authorName;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterAuthorName) {
             listener.enterAuthorName(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitAuthorName) {
             listener.exitAuthorName(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitAuthorName) {
            return visitor.visitAuthorName(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BookDetailParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public authorParam(): AuthorParamContext | null {
        return this.getRuleContext(0, AuthorParamContext);
    }
    public subtitleParam(): SubtitleParamContext | null {
        return this.getRuleContext(0, SubtitleParamContext);
    }
    public languageParam(): LanguageParamContext | null {
        return this.getRuleContext(0, LanguageParamContext);
    }
    public publicationYearParam(): PublicationYearParamContext | null {
        return this.getRuleContext(0, PublicationYearParamContext);
    }
    public isbnParam(): IsbnParamContext | null {
        return this.getRuleContext(0, IsbnParamContext);
    }
    public summaryParam(): SummaryParamContext | null {
        return this.getRuleContext(0, SummaryParamContext);
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_bookDetailParam;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterBookDetailParam) {
             listener.enterBookDetailParam(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitBookDetailParam) {
             listener.exitBookDetailParam(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitBookDetailParam) {
            return visitor.visitBookDetailParam(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AuthorParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BY(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.BY, 0)!;
    }
    public AUTHOR(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.AUTHOR, 0)!;
    }
    public value(): ValueContext {
        return this.getRuleContext(0, ValueContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_authorParam;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterAuthorParam) {
             listener.enterAuthorParam(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitAuthorParam) {
             listener.exitAuthorParam(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitAuthorParam) {
            return visitor.visitAuthorParam(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SubtitleParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SUBTITLED(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.SUBTITLED, 0)!;
    }
    public value(): ValueContext {
        return this.getRuleContext(0, ValueContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_subtitleParam;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterSubtitleParam) {
             listener.enterSubtitleParam(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitSubtitleParam) {
             listener.exitSubtitleParam(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitSubtitleParam) {
            return visitor.visitSubtitleParam(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LanguageParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IN(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.IN, 0)!;
    }
    public LANGUAGE(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.LANGUAGE, 0)!;
    }
    public value(): ValueContext {
        return this.getRuleContext(0, ValueContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_languageParam;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterLanguageParam) {
             listener.enterLanguageParam(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitLanguageParam) {
             listener.exitLanguageParam(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitLanguageParam) {
            return visitor.visitLanguageParam(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PublicationYearParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PUBLISHED(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.PUBLISHED, 0)!;
    }
    public IN(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.IN, 0)!;
    }
    public year(): YearContext {
        return this.getRuleContext(0, YearContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_publicationYearParam;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterPublicationYearParam) {
             listener.enterPublicationYearParam(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitPublicationYearParam) {
             listener.exitPublicationYearParam(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitPublicationYearParam) {
            return visitor.visitPublicationYearParam(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IsbnParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public WITH(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.WITH, 0)!;
    }
    public ISBN(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.ISBN, 0)!;
    }
    public value(): ValueContext {
        return this.getRuleContext(0, ValueContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_isbnParam;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterIsbnParam) {
             listener.enterIsbnParam(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitIsbnParam) {
             listener.exitIsbnParam(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitIsbnParam) {
            return visitor.visitIsbnParam(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SummaryParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public WITH(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.WITH, 0)!;
    }
    public SUMMARY(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.SUMMARY, 0)!;
    }
    public value(): ValueContext {
        return this.getRuleContext(0, ValueContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_summaryParam;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterSummaryParam) {
             listener.enterSummaryParam(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitSummaryParam) {
             listener.exitSummaryParam(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitSummaryParam) {
            return visitor.visitSummaryParam(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ValueContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public VALUE(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.VALUE, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_value;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterValue) {
             listener.enterValue(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitValue) {
             listener.exitValue(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitValue) {
            return visitor.visitValue(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
