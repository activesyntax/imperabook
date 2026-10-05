
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
    public static readonly RULE_authorListFilter = 49;
    public static readonly RULE_bornFilter = 50;
    public static readonly RULE_diedFilter = 51;
    public static readonly RULE_livingFilter = 52;
    public static readonly RULE_authorsWithoutBooks = 53;
    public static readonly RULE_findCmd = 54;
    public static readonly RULE_keywords = 55;
    public static readonly RULE_dashboardCmd = 56;
    public static readonly RULE_libraryCmd = 57;
    public static readonly RULE_settingsCmd = 58;
    public static readonly RULE_aboutCmd = 59;
    public static readonly RULE_helpCmd = 60;
    public static readonly RULE_accountCmd = 61;
    public static readonly RULE_loginCmd = 62;
    public static readonly RULE_logoutCmd = 63;
    public static readonly RULE_bookTitle = 64;
    public static readonly RULE_authorName = 65;
    public static readonly RULE_bookDetailParam = 66;
    public static readonly RULE_authorParam = 67;
    public static readonly RULE_subtitleParam = 68;
    public static readonly RULE_languageParam = 69;
    public static readonly RULE_publicationYearParam = 70;
    public static readonly RULE_isbnParam = 71;
    public static readonly RULE_summaryParam = 72;
    public static readonly RULE_value = 73;

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
        "updateAuthorCmd", "removeAuthorCmd", "listAuthorsCmd", "authorListFilter", 
        "bornFilter", "diedFilter", "livingFilter", "authorsWithoutBooks", 
        "findCmd", "keywords", "dashboardCmd", "libraryCmd", "settingsCmd", 
        "aboutCmd", "helpCmd", "accountCmd", "loginCmd", "logoutCmd", "bookTitle", 
        "authorName", "bookDetailParam", "authorParam", "subtitleParam", 
        "languageParam", "publicationYearParam", "isbnParam", "summaryParam", 
        "value",
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
            this.state = 151;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 29) {
                {
                {
                this.state = 148;
                this.match(ImperaBookDSLParser.NL);
                }
                }
                this.state = 153;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 154;
            this.command();
            this.state = 158;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 29) {
                {
                {
                this.state = 155;
                this.match(ImperaBookDSLParser.NL);
                }
                }
                this.state = 160;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 161;
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
            this.state = 180;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 163;
                this.addBookCmd();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 164;
                this.updateBookCmd();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 165;
                this.removeBookCmd();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 166;
                this.listBooksCmd();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 167;
                this.addAuthorCmd();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 168;
                this.updateAuthorCmd();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 169;
                this.removeAuthorCmd();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 170;
                this.listAuthorsCmd();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 171;
                this.dashboardCmd();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 172;
                this.libraryCmd();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 173;
                this.settingsCmd();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 174;
                this.aboutCmd();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 175;
                this.helpCmd();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 176;
                this.accountCmd();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 177;
                this.loginCmd();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 178;
                this.logoutCmd();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 179;
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
            this.state = 182;
            this.match(ImperaBookDSLParser.ADD);
            this.state = 183;
            this.match(ImperaBookDSLParser.BOOK);
            this.state = 184;
            this.bookTitle();
            this.state = 193;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 186;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    do {
                        {
                        {
                        this.state = 185;
                        this.match(ImperaBookDSLParser.NL);
                        }
                        }
                        this.state = 188;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    } while (_la === 29);
                    this.state = 190;
                    this.bookDetailParam();
                    }
                    }
                }
                this.state = 195;
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
            this.state = 196;
            this.match(ImperaBookDSLParser.UPDATE);
            this.state = 197;
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
            this.state = 199;
            this.match(ImperaBookDSLParser.REMOVE);
            this.state = 200;
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
            this.state = 202;
            this.match(ImperaBookDSLParser.LIST);
            this.state = 203;
            this.match(ImperaBookDSLParser.BOOKS);
            this.state = 205;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 60817408) !== 0)) {
                {
                this.state = 204;
                this.listFilter();
                }
            }

            this.state = 215;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 208;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    do {
                        {
                        {
                        this.state = 207;
                        this.match(ImperaBookDSLParser.NL);
                        }
                        }
                        this.state = 210;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    } while (_la === 29);
                    this.state = 212;
                    this.listFilter();
                    }
                    }
                }
                this.state = 217;
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
            this.state = 222;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ImperaBookDSLParser.WHOSE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 218;
                this.whoseFilter();
                }
                break;
            case ImperaBookDSLParser.WRITTEN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 219;
                this.authorFilter();
                }
                break;
            case ImperaBookDSLParser.PUBLISHED:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 220;
                this.publishedFilter();
                }
                break;
            case ImperaBookDSLParser.HAVING:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 221;
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
            this.state = 224;
            this.match(ImperaBookDSLParser.HAVING);
            this.state = 225;
            this.match(ImperaBookDSLParser.NO);
            this.state = 226;
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
            this.state = 234;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ImperaBookDSLParser.AUTHOR:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 228;
                this.missingAuthor();
                }
                break;
            case ImperaBookDSLParser.PAGE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 229;
                this.missingPages();
                }
                break;
            case ImperaBookDSLParser.PUBLICATION:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 230;
                this.missingYear();
                }
                break;
            case ImperaBookDSLParser.LANGUAGE:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 231;
                this.missingLanguage();
                }
                break;
            case ImperaBookDSLParser.ISBN:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 232;
                this.missingIsbn();
                }
                break;
            case ImperaBookDSLParser.COVER:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 233;
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
            this.state = 236;
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
            this.state = 238;
            this.match(ImperaBookDSLParser.PAGE);
            this.state = 239;
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
            this.state = 241;
            this.match(ImperaBookDSLParser.PUBLICATION);
            this.state = 242;
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
            this.state = 244;
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
            this.state = 246;
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
            this.state = 248;
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
            this.state = 250;
            this.match(ImperaBookDSLParser.PUBLISHED);
            this.state = 251;
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
            this.state = 257;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ImperaBookDSLParser.IN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 253;
                this.yearIn();
                }
                break;
            case ImperaBookDSLParser.BEFORE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 254;
                this.yearBefore();
                }
                break;
            case ImperaBookDSLParser.AFTER:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 255;
                this.yearAfter();
                }
                break;
            case ImperaBookDSLParser.BETWEEN:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 256;
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
            this.state = 259;
            this.match(ImperaBookDSLParser.IN);
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
    public yearBefore(): YearBeforeContext {
        let localContext = new YearBeforeContext(this.context, this.state);
        this.enterRule(localContext, 36, ImperaBookDSLParser.RULE_yearBefore);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 262;
            this.match(ImperaBookDSLParser.BEFORE);
            this.state = 263;
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
            this.state = 265;
            this.match(ImperaBookDSLParser.AFTER);
            this.state = 266;
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
            this.state = 268;
            this.match(ImperaBookDSLParser.BETWEEN);
            this.state = 269;
            this.year();
            this.state = 270;
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
            this.state = 272;
            this.match(ImperaBookDSLParser.AND);
            this.state = 273;
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
            this.state = 275;
            this.match(ImperaBookDSLParser.NUMBER);
            this.state = 277;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 69) {
                {
                this.state = 276;
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
            this.state = 279;
            this.match(ImperaBookDSLParser.WRITTEN);
            this.state = 280;
            this.match(ImperaBookDSLParser.BY);
            this.state = 281;
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
            this.state = 283;
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
            this.state = 285;
            this.match(ImperaBookDSLParser.WHOSE);
            this.state = 288;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ImperaBookDSLParser.PAGE:
                {
                this.state = 286;
                this.pagesFilter();
                }
                break;
            case ImperaBookDSLParser.LANGUAGE:
                {
                this.state = 287;
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
            this.state = 290;
            this.match(ImperaBookDSLParser.LANGUAGE);
            this.state = 291;
            this.match(ImperaBookDSLParser.IS);
            this.state = 293;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 65) {
                {
                this.state = 292;
                this.languageNot();
                }
            }

            this.state = 295;
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
            this.state = 297;
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
            this.state = 300;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 299;
                this.match(ImperaBookDSLParser.LANGUAGE_WORD);
                }
                }
                this.state = 302;
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
            this.state = 304;
            this.match(ImperaBookDSLParser.PAGE);
            this.state = 305;
            this.match(ImperaBookDSLParser.COUNT);
            this.state = 306;
            this.match(ImperaBookDSLParser.IS);
            this.state = 307;
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
            this.state = 316;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 15, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 309;
                this.pagesMoreThan();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 310;
                this.pagesLessThan();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 311;
                this.pagesAtLeast();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 312;
                this.pagesAtMost();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 313;
                this.pagesBetween();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 314;
                this.pagesNot();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 315;
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
            this.state = 318;
            _la = this.tokenStream.LA(1);
            if(!(_la === 55 || _la === 56)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 319;
            this.match(ImperaBookDSLParser.THAN);
            this.state = 320;
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
            this.state = 322;
            _la = this.tokenStream.LA(1);
            if(!(_la === 57 || _la === 58)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 323;
            this.match(ImperaBookDSLParser.THAN);
            this.state = 324;
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
            this.state = 326;
            this.match(ImperaBookDSLParser.AT);
            this.state = 327;
            this.match(ImperaBookDSLParser.LEAST);
            this.state = 328;
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
            this.state = 330;
            this.match(ImperaBookDSLParser.AT);
            this.state = 331;
            this.match(ImperaBookDSLParser.MOST);
            this.state = 332;
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
            this.state = 334;
            this.match(ImperaBookDSLParser.BETWEEN);
            this.state = 335;
            this.pageCount();
            this.state = 336;
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
            this.state = 338;
            this.match(ImperaBookDSLParser.NOT);
            this.state = 339;
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
            this.state = 341;
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
            this.state = 343;
            this.match(ImperaBookDSLParser.AND);
            this.state = 344;
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
            this.state = 346;
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
            this.state = 348;
            this.match(ImperaBookDSLParser.ADD);
            this.state = 349;
            this.match(ImperaBookDSLParser.AUTHOR);
            this.state = 350;
            this.authorName();
            this.state = 359;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 17, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 352;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    do {
                        {
                        {
                        this.state = 351;
                        this.match(ImperaBookDSLParser.NL);
                        }
                        }
                        this.state = 354;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    } while (_la === 29);
                    this.state = 356;
                    this.authorDetailParam();
                    }
                    }
                }
                this.state = 361;
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
            this.state = 365;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ImperaBookDSLParser.BORN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 362;
                this.bornParam();
                }
                break;
            case ImperaBookDSLParser.DIED:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 363;
                this.diedParam();
                }
                break;
            case ImperaBookDSLParser.LIVING:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 364;
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
            this.state = 367;
            this.match(ImperaBookDSLParser.BORN);
            this.state = 368;
            this.match(ImperaBookDSLParser.IN);
            this.state = 369;
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
            this.state = 371;
            this.match(ImperaBookDSLParser.DIED);
            this.state = 373;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 20) {
                {
                this.state = 372;
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
            this.state = 375;
            this.match(ImperaBookDSLParser.IN);
            this.state = 376;
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
            this.state = 378;
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
            this.state = 380;
            this.match(ImperaBookDSLParser.UPDATE);
            this.state = 381;
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
            this.state = 383;
            this.match(ImperaBookDSLParser.REMOVE);
            this.state = 384;
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
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 386;
            this.match(ImperaBookDSLParser.LIST);
            this.state = 387;
            this.match(ImperaBookDSLParser.AUTHORS);
            this.state = 389;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 503316480) !== 0)) {
                {
                this.state = 388;
                this.authorListFilter();
                }
            }

            this.state = 399;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 22, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 392;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    do {
                        {
                        {
                        this.state = 391;
                        this.match(ImperaBookDSLParser.NL);
                        }
                        }
                        this.state = 394;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    } while (_la === 29);
                    this.state = 396;
                    this.authorListFilter();
                    }
                    }
                }
                this.state = 401;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 22, this.context);
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
    public authorListFilter(): AuthorListFilterContext {
        let localContext = new AuthorListFilterContext(this.context, this.state);
        this.enterRule(localContext, 98, ImperaBookDSLParser.RULE_authorListFilter);
        try {
            this.state = 406;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ImperaBookDSLParser.BORN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 402;
                this.bornFilter();
                }
                break;
            case ImperaBookDSLParser.DIED:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 403;
                this.diedFilter();
                }
                break;
            case ImperaBookDSLParser.LIVING:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 404;
                this.livingFilter();
                }
                break;
            case ImperaBookDSLParser.HAVING:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 405;
                this.authorsWithoutBooks();
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
    public bornFilter(): BornFilterContext {
        let localContext = new BornFilterContext(this.context, this.state);
        this.enterRule(localContext, 100, ImperaBookDSLParser.RULE_bornFilter);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 408;
            this.match(ImperaBookDSLParser.BORN);
            this.state = 409;
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
    public diedFilter(): DiedFilterContext {
        let localContext = new DiedFilterContext(this.context, this.state);
        this.enterRule(localContext, 102, ImperaBookDSLParser.RULE_diedFilter);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 411;
            this.match(ImperaBookDSLParser.DIED);
            this.state = 412;
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
    public livingFilter(): LivingFilterContext {
        let localContext = new LivingFilterContext(this.context, this.state);
        this.enterRule(localContext, 104, ImperaBookDSLParser.RULE_livingFilter);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 414;
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
    public authorsWithoutBooks(): AuthorsWithoutBooksContext {
        let localContext = new AuthorsWithoutBooksContext(this.context, this.state);
        this.enterRule(localContext, 106, ImperaBookDSLParser.RULE_authorsWithoutBooks);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 416;
            this.match(ImperaBookDSLParser.HAVING);
            this.state = 417;
            this.match(ImperaBookDSLParser.NO);
            this.state = 418;
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
        this.enterRule(localContext, 108, ImperaBookDSLParser.RULE_findCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 420;
            this.match(ImperaBookDSLParser.FIND);
            this.state = 421;
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
        this.enterRule(localContext, 110, ImperaBookDSLParser.RULE_keywords);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 423;
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
        this.enterRule(localContext, 112, ImperaBookDSLParser.RULE_dashboardCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 425;
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
        this.enterRule(localContext, 114, ImperaBookDSLParser.RULE_libraryCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 427;
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
        this.enterRule(localContext, 116, ImperaBookDSLParser.RULE_settingsCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 429;
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
        this.enterRule(localContext, 118, ImperaBookDSLParser.RULE_aboutCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 431;
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
        this.enterRule(localContext, 120, ImperaBookDSLParser.RULE_helpCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 433;
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
        this.enterRule(localContext, 122, ImperaBookDSLParser.RULE_accountCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 435;
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
        this.enterRule(localContext, 124, ImperaBookDSLParser.RULE_loginCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 437;
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
        this.enterRule(localContext, 126, ImperaBookDSLParser.RULE_logoutCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 439;
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
        this.enterRule(localContext, 128, ImperaBookDSLParser.RULE_bookTitle);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 441;
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
        this.enterRule(localContext, 130, ImperaBookDSLParser.RULE_authorName);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 443;
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
        this.enterRule(localContext, 132, ImperaBookDSLParser.RULE_bookDetailParam);
        try {
            this.state = 451;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 24, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 445;
                this.authorParam();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 446;
                this.subtitleParam();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 447;
                this.languageParam();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 448;
                this.publicationYearParam();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 449;
                this.isbnParam();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 450;
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
        this.enterRule(localContext, 134, ImperaBookDSLParser.RULE_authorParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 453;
            this.match(ImperaBookDSLParser.BY);
            this.state = 454;
            this.match(ImperaBookDSLParser.AUTHOR);
            this.state = 455;
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
        this.enterRule(localContext, 136, ImperaBookDSLParser.RULE_subtitleParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 457;
            this.match(ImperaBookDSLParser.SUBTITLED);
            this.state = 458;
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
        this.enterRule(localContext, 138, ImperaBookDSLParser.RULE_languageParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 460;
            this.match(ImperaBookDSLParser.IN);
            this.state = 461;
            this.match(ImperaBookDSLParser.LANGUAGE);
            this.state = 462;
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
        this.enterRule(localContext, 140, ImperaBookDSLParser.RULE_publicationYearParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 464;
            this.match(ImperaBookDSLParser.PUBLISHED);
            this.state = 465;
            this.match(ImperaBookDSLParser.IN);
            this.state = 466;
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
        this.enterRule(localContext, 142, ImperaBookDSLParser.RULE_isbnParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 468;
            this.match(ImperaBookDSLParser.WITH);
            this.state = 469;
            this.match(ImperaBookDSLParser.ISBN);
            this.state = 470;
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
        this.enterRule(localContext, 144, ImperaBookDSLParser.RULE_summaryParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 472;
            this.match(ImperaBookDSLParser.WITH);
            this.state = 473;
            this.match(ImperaBookDSLParser.SUMMARY);
            this.state = 474;
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
        this.enterRule(localContext, 146, ImperaBookDSLParser.RULE_value);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 476;
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
        4,1,75,479,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
        2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,
        7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,
        2,66,7,66,2,67,7,67,2,68,7,68,2,69,7,69,2,70,7,70,2,71,7,71,2,72,
        7,72,2,73,7,73,1,0,5,0,150,8,0,10,0,12,0,153,9,0,1,0,1,0,5,0,157,
        8,0,10,0,12,0,160,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,181,8,1,1,2,1,2,1,2,1,2,4,
        2,187,8,2,11,2,12,2,188,1,2,5,2,192,8,2,10,2,12,2,195,9,2,1,3,1,
        3,1,3,1,4,1,4,1,4,1,5,1,5,1,5,3,5,206,8,5,1,5,4,5,209,8,5,11,5,12,
        5,210,1,5,5,5,214,8,5,10,5,12,5,217,9,5,1,6,1,6,1,6,1,6,3,6,223,
        8,6,1,7,1,7,1,7,1,7,1,8,1,8,1,8,1,8,1,8,1,8,3,8,235,8,8,1,9,1,9,
        1,10,1,10,1,10,1,11,1,11,1,11,1,12,1,12,1,13,1,13,1,14,1,14,1,15,
        1,15,1,15,1,16,1,16,1,16,1,16,3,16,258,8,16,1,17,1,17,1,17,1,18,
        1,18,1,18,1,19,1,19,1,19,1,20,1,20,1,20,1,20,1,21,1,21,1,21,1,22,
        1,22,3,22,278,8,22,1,23,1,23,1,23,1,23,1,24,1,24,1,25,1,25,1,25,
        3,25,289,8,25,1,26,1,26,1,26,3,26,294,8,26,1,26,1,26,1,27,1,27,1,
        28,4,28,301,8,28,11,28,12,28,302,1,29,1,29,1,29,1,29,1,29,1,30,1,
        30,1,30,1,30,1,30,1,30,1,30,3,30,317,8,30,1,31,1,31,1,31,1,31,1,
        32,1,32,1,32,1,32,1,33,1,33,1,33,1,33,1,34,1,34,1,34,1,34,1,35,1,
        35,1,35,1,35,1,36,1,36,1,36,1,37,1,37,1,38,1,38,1,38,1,39,1,39,1,
        40,1,40,1,40,1,40,4,40,353,8,40,11,40,12,40,354,1,40,5,40,358,8,
        40,10,40,12,40,361,9,40,1,41,1,41,1,41,3,41,366,8,41,1,42,1,42,1,
        42,1,42,1,43,1,43,3,43,374,8,43,1,44,1,44,1,44,1,45,1,45,1,46,1,
        46,1,46,1,47,1,47,1,47,1,48,1,48,1,48,3,48,390,8,48,1,48,4,48,393,
        8,48,11,48,12,48,394,1,48,5,48,398,8,48,10,48,12,48,401,9,48,1,49,
        1,49,1,49,1,49,3,49,407,8,49,1,50,1,50,1,50,1,51,1,51,1,51,1,52,
        1,52,1,53,1,53,1,53,1,53,1,54,1,54,1,54,1,55,1,55,1,56,1,56,1,57,
        1,57,1,58,1,58,1,59,1,59,1,60,1,60,1,61,1,61,1,62,1,62,1,63,1,63,
        1,64,1,64,1,65,1,65,1,66,1,66,1,66,1,66,1,66,1,66,3,66,452,8,66,
        1,67,1,67,1,67,1,67,1,68,1,68,1,68,1,69,1,69,1,69,1,69,1,70,1,70,
        1,70,1,70,1,71,1,71,1,71,1,71,1,72,1,72,1,72,1,72,1,73,1,73,1,73,
        0,0,74,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,
        42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,
        86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,120,
        122,124,126,128,130,132,134,136,138,140,142,144,146,0,2,1,0,55,56,
        1,0,57,58,464,0,151,1,0,0,0,2,180,1,0,0,0,4,182,1,0,0,0,6,196,1,
        0,0,0,8,199,1,0,0,0,10,202,1,0,0,0,12,222,1,0,0,0,14,224,1,0,0,0,
        16,234,1,0,0,0,18,236,1,0,0,0,20,238,1,0,0,0,22,241,1,0,0,0,24,244,
        1,0,0,0,26,246,1,0,0,0,28,248,1,0,0,0,30,250,1,0,0,0,32,257,1,0,
        0,0,34,259,1,0,0,0,36,262,1,0,0,0,38,265,1,0,0,0,40,268,1,0,0,0,
        42,272,1,0,0,0,44,275,1,0,0,0,46,279,1,0,0,0,48,283,1,0,0,0,50,285,
        1,0,0,0,52,290,1,0,0,0,54,297,1,0,0,0,56,300,1,0,0,0,58,304,1,0,
        0,0,60,316,1,0,0,0,62,318,1,0,0,0,64,322,1,0,0,0,66,326,1,0,0,0,
        68,330,1,0,0,0,70,334,1,0,0,0,72,338,1,0,0,0,74,341,1,0,0,0,76,343,
        1,0,0,0,78,346,1,0,0,0,80,348,1,0,0,0,82,365,1,0,0,0,84,367,1,0,
        0,0,86,371,1,0,0,0,88,375,1,0,0,0,90,378,1,0,0,0,92,380,1,0,0,0,
        94,383,1,0,0,0,96,386,1,0,0,0,98,406,1,0,0,0,100,408,1,0,0,0,102,
        411,1,0,0,0,104,414,1,0,0,0,106,416,1,0,0,0,108,420,1,0,0,0,110,
        423,1,0,0,0,112,425,1,0,0,0,114,427,1,0,0,0,116,429,1,0,0,0,118,
        431,1,0,0,0,120,433,1,0,0,0,122,435,1,0,0,0,124,437,1,0,0,0,126,
        439,1,0,0,0,128,441,1,0,0,0,130,443,1,0,0,0,132,451,1,0,0,0,134,
        453,1,0,0,0,136,457,1,0,0,0,138,460,1,0,0,0,140,464,1,0,0,0,142,
        468,1,0,0,0,144,472,1,0,0,0,146,476,1,0,0,0,148,150,5,29,0,0,149,
        148,1,0,0,0,150,153,1,0,0,0,151,149,1,0,0,0,151,152,1,0,0,0,152,
        154,1,0,0,0,153,151,1,0,0,0,154,158,3,2,1,0,155,157,5,29,0,0,156,
        155,1,0,0,0,157,160,1,0,0,0,158,156,1,0,0,0,158,159,1,0,0,0,159,
        161,1,0,0,0,160,158,1,0,0,0,161,162,5,0,0,1,162,1,1,0,0,0,163,181,
        3,4,2,0,164,181,3,6,3,0,165,181,3,8,4,0,166,181,3,10,5,0,167,181,
        3,80,40,0,168,181,3,92,46,0,169,181,3,94,47,0,170,181,3,96,48,0,
        171,181,3,112,56,0,172,181,3,114,57,0,173,181,3,116,58,0,174,181,
        3,118,59,0,175,181,3,120,60,0,176,181,3,122,61,0,177,181,3,124,62,
        0,178,181,3,126,63,0,179,181,3,108,54,0,180,163,1,0,0,0,180,164,
        1,0,0,0,180,165,1,0,0,0,180,166,1,0,0,0,180,167,1,0,0,0,180,168,
        1,0,0,0,180,169,1,0,0,0,180,170,1,0,0,0,180,171,1,0,0,0,180,172,
        1,0,0,0,180,173,1,0,0,0,180,174,1,0,0,0,180,175,1,0,0,0,180,176,
        1,0,0,0,180,177,1,0,0,0,180,178,1,0,0,0,180,179,1,0,0,0,181,3,1,
        0,0,0,182,183,5,1,0,0,183,184,5,6,0,0,184,193,3,128,64,0,185,187,
        5,29,0,0,186,185,1,0,0,0,187,188,1,0,0,0,188,186,1,0,0,0,188,189,
        1,0,0,0,189,190,1,0,0,0,190,192,3,132,66,0,191,186,1,0,0,0,192,195,
        1,0,0,0,193,191,1,0,0,0,193,194,1,0,0,0,194,5,1,0,0,0,195,193,1,
        0,0,0,196,197,5,3,0,0,197,198,5,6,0,0,198,7,1,0,0,0,199,200,5,4,
        0,0,200,201,5,6,0,0,201,9,1,0,0,0,202,203,5,5,0,0,203,205,5,7,0,
        0,204,206,3,12,6,0,205,204,1,0,0,0,205,206,1,0,0,0,206,215,1,0,0,
        0,207,209,5,29,0,0,208,207,1,0,0,0,209,210,1,0,0,0,210,208,1,0,0,
        0,210,211,1,0,0,0,211,212,1,0,0,0,212,214,3,12,6,0,213,208,1,0,0,
        0,214,217,1,0,0,0,215,213,1,0,0,0,215,216,1,0,0,0,216,11,1,0,0,0,
        217,215,1,0,0,0,218,223,3,50,25,0,219,223,3,46,23,0,220,223,3,30,
        15,0,221,223,3,14,7,0,222,218,1,0,0,0,222,219,1,0,0,0,222,220,1,
        0,0,0,222,221,1,0,0,0,223,13,1,0,0,0,224,225,5,25,0,0,225,226,5,
        41,0,0,226,227,3,16,8,0,227,15,1,0,0,0,228,235,3,18,9,0,229,235,
        3,20,10,0,230,235,3,22,11,0,231,235,3,24,12,0,232,235,3,26,13,0,
        233,235,3,28,14,0,234,228,1,0,0,0,234,229,1,0,0,0,234,230,1,0,0,
        0,234,231,1,0,0,0,234,232,1,0,0,0,234,233,1,0,0,0,235,17,1,0,0,0,
        236,237,5,8,0,0,237,19,1,0,0,0,238,239,5,48,0,0,239,240,5,49,0,0,
        240,21,1,0,0,0,241,242,5,43,0,0,242,243,5,44,0,0,243,23,1,0,0,0,
        244,245,5,36,0,0,245,25,1,0,0,0,246,247,5,33,0,0,247,27,1,0,0,0,
        248,249,5,45,0,0,249,29,1,0,0,0,250,251,5,21,0,0,251,252,3,32,16,
        0,252,31,1,0,0,0,253,258,3,34,17,0,254,258,3,36,18,0,255,258,3,38,
        19,0,256,258,3,40,20,0,257,253,1,0,0,0,257,254,1,0,0,0,257,255,1,
        0,0,0,257,256,1,0,0,0,258,33,1,0,0,0,259,260,5,20,0,0,260,261,3,
        44,22,0,261,35,1,0,0,0,262,263,5,38,0,0,263,264,3,44,22,0,264,37,
        1,0,0,0,265,266,5,39,0,0,266,267,3,44,22,0,267,39,1,0,0,0,268,269,
        5,63,0,0,269,270,3,44,22,0,270,271,3,42,21,0,271,41,1,0,0,0,272,
        273,5,64,0,0,273,274,3,44,22,0,274,43,1,0,0,0,275,277,5,66,0,0,276,
        278,5,69,0,0,277,276,1,0,0,0,277,278,1,0,0,0,278,45,1,0,0,0,279,
        280,5,24,0,0,280,281,5,18,0,0,281,282,3,48,24,0,282,47,1,0,0,0,283,
        284,5,71,0,0,284,49,1,0,0,0,285,288,5,23,0,0,286,289,3,58,29,0,287,
        289,3,52,26,0,288,286,1,0,0,0,288,287,1,0,0,0,289,51,1,0,0,0,290,
        291,5,36,0,0,291,293,5,50,0,0,292,294,3,54,27,0,293,292,1,0,0,0,
        293,294,1,0,0,0,294,295,1,0,0,0,295,296,3,56,28,0,296,53,1,0,0,0,
        297,298,5,65,0,0,298,55,1,0,0,0,299,301,5,53,0,0,300,299,1,0,0,0,
        301,302,1,0,0,0,302,300,1,0,0,0,302,303,1,0,0,0,303,57,1,0,0,0,304,
        305,5,48,0,0,305,306,5,49,0,0,306,307,5,50,0,0,307,308,3,60,30,0,
        308,59,1,0,0,0,309,317,3,62,31,0,310,317,3,64,32,0,311,317,3,66,
        33,0,312,317,3,68,34,0,313,317,3,70,35,0,314,317,3,72,36,0,315,317,
        3,74,37,0,316,309,1,0,0,0,316,310,1,0,0,0,316,311,1,0,0,0,316,312,
        1,0,0,0,316,313,1,0,0,0,316,314,1,0,0,0,316,315,1,0,0,0,317,61,1,
        0,0,0,318,319,7,0,0,0,319,320,5,59,0,0,320,321,3,78,39,0,321,63,
        1,0,0,0,322,323,7,1,0,0,323,324,5,59,0,0,324,325,3,78,39,0,325,65,
        1,0,0,0,326,327,5,60,0,0,327,328,5,61,0,0,328,329,3,78,39,0,329,
        67,1,0,0,0,330,331,5,60,0,0,331,332,5,62,0,0,332,333,3,78,39,0,333,
        69,1,0,0,0,334,335,5,63,0,0,335,336,3,78,39,0,336,337,3,76,38,0,
        337,71,1,0,0,0,338,339,5,65,0,0,339,340,3,78,39,0,340,73,1,0,0,0,
        341,342,3,78,39,0,342,75,1,0,0,0,343,344,5,64,0,0,344,345,3,78,39,
        0,345,77,1,0,0,0,346,347,5,66,0,0,347,79,1,0,0,0,348,349,5,1,0,0,
        349,350,5,8,0,0,350,359,3,130,65,0,351,353,5,29,0,0,352,351,1,0,
        0,0,353,354,1,0,0,0,354,352,1,0,0,0,354,355,1,0,0,0,355,356,1,0,
        0,0,356,358,3,82,41,0,357,352,1,0,0,0,358,361,1,0,0,0,359,357,1,
        0,0,0,359,360,1,0,0,0,360,81,1,0,0,0,361,359,1,0,0,0,362,366,3,84,
        42,0,363,366,3,86,43,0,364,366,3,90,45,0,365,362,1,0,0,0,365,363,
        1,0,0,0,365,364,1,0,0,0,366,83,1,0,0,0,367,368,5,26,0,0,368,369,
        5,20,0,0,369,370,3,44,22,0,370,85,1,0,0,0,371,373,5,27,0,0,372,374,
        3,88,44,0,373,372,1,0,0,0,373,374,1,0,0,0,374,87,1,0,0,0,375,376,
        5,20,0,0,376,377,3,44,22,0,377,89,1,0,0,0,378,379,5,28,0,0,379,91,
        1,0,0,0,380,381,5,3,0,0,381,382,5,8,0,0,382,93,1,0,0,0,383,384,5,
        4,0,0,384,385,5,8,0,0,385,95,1,0,0,0,386,387,5,5,0,0,387,389,5,9,
        0,0,388,390,3,98,49,0,389,388,1,0,0,0,389,390,1,0,0,0,390,399,1,
        0,0,0,391,393,5,29,0,0,392,391,1,0,0,0,393,394,1,0,0,0,394,392,1,
        0,0,0,394,395,1,0,0,0,395,396,1,0,0,0,396,398,3,98,49,0,397,392,
        1,0,0,0,398,401,1,0,0,0,399,397,1,0,0,0,399,400,1,0,0,0,400,97,1,
        0,0,0,401,399,1,0,0,0,402,407,3,100,50,0,403,407,3,102,51,0,404,
        407,3,104,52,0,405,407,3,106,53,0,406,402,1,0,0,0,406,403,1,0,0,
        0,406,404,1,0,0,0,406,405,1,0,0,0,407,99,1,0,0,0,408,409,5,26,0,
        0,409,410,3,32,16,0,410,101,1,0,0,0,411,412,5,27,0,0,412,413,3,32,
        16,0,413,103,1,0,0,0,414,415,5,28,0,0,415,105,1,0,0,0,416,417,5,
        25,0,0,417,418,5,41,0,0,418,419,5,7,0,0,419,107,1,0,0,0,420,421,
        5,2,0,0,421,422,3,110,55,0,422,109,1,0,0,0,423,424,5,71,0,0,424,
        111,1,0,0,0,425,426,5,10,0,0,426,113,1,0,0,0,427,428,5,11,0,0,428,
        115,1,0,0,0,429,430,5,12,0,0,430,117,1,0,0,0,431,432,5,13,0,0,432,
        119,1,0,0,0,433,434,5,14,0,0,434,121,1,0,0,0,435,436,5,15,0,0,436,
        123,1,0,0,0,437,438,5,16,0,0,438,125,1,0,0,0,439,440,5,17,0,0,440,
        127,1,0,0,0,441,442,5,71,0,0,442,129,1,0,0,0,443,444,5,71,0,0,444,
        131,1,0,0,0,445,452,3,134,67,0,446,452,3,136,68,0,447,452,3,138,
        69,0,448,452,3,140,70,0,449,452,3,142,71,0,450,452,3,144,72,0,451,
        445,1,0,0,0,451,446,1,0,0,0,451,447,1,0,0,0,451,448,1,0,0,0,451,
        449,1,0,0,0,451,450,1,0,0,0,452,133,1,0,0,0,453,454,5,18,0,0,454,
        455,5,8,0,0,455,456,3,146,73,0,456,135,1,0,0,0,457,458,5,22,0,0,
        458,459,3,146,73,0,459,137,1,0,0,0,460,461,5,20,0,0,461,462,5,36,
        0,0,462,463,3,146,73,0,463,139,1,0,0,0,464,465,5,21,0,0,465,466,
        5,20,0,0,466,467,3,44,22,0,467,141,1,0,0,0,468,469,5,19,0,0,469,
        470,5,33,0,0,470,471,3,146,73,0,471,143,1,0,0,0,472,473,5,19,0,0,
        473,474,5,34,0,0,474,475,3,146,73,0,475,145,1,0,0,0,476,477,5,71,
        0,0,477,147,1,0,0,0,25,151,158,180,188,193,205,210,215,222,234,257,
        277,288,293,302,316,354,359,365,373,389,394,399,406,451
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
    public authorListFilter(): AuthorListFilterContext[];
    public authorListFilter(i: number): AuthorListFilterContext | null;
    public authorListFilter(i?: number): AuthorListFilterContext[] | AuthorListFilterContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AuthorListFilterContext);
        }

        return this.getRuleContext(i, AuthorListFilterContext);
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


export class AuthorListFilterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public bornFilter(): BornFilterContext | null {
        return this.getRuleContext(0, BornFilterContext);
    }
    public diedFilter(): DiedFilterContext | null {
        return this.getRuleContext(0, DiedFilterContext);
    }
    public livingFilter(): LivingFilterContext | null {
        return this.getRuleContext(0, LivingFilterContext);
    }
    public authorsWithoutBooks(): AuthorsWithoutBooksContext | null {
        return this.getRuleContext(0, AuthorsWithoutBooksContext);
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_authorListFilter;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterAuthorListFilter) {
             listener.enterAuthorListFilter(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitAuthorListFilter) {
             listener.exitAuthorListFilter(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitAuthorListFilter) {
            return visitor.visitAuthorListFilter(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BornFilterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BORN(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.BORN, 0)!;
    }
    public yearComparison(): YearComparisonContext {
        return this.getRuleContext(0, YearComparisonContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_bornFilter;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterBornFilter) {
             listener.enterBornFilter(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitBornFilter) {
             listener.exitBornFilter(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitBornFilter) {
            return visitor.visitBornFilter(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DiedFilterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DIED(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.DIED, 0)!;
    }
    public yearComparison(): YearComparisonContext {
        return this.getRuleContext(0, YearComparisonContext)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_diedFilter;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterDiedFilter) {
             listener.enterDiedFilter(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitDiedFilter) {
             listener.exitDiedFilter(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitDiedFilter) {
            return visitor.visitDiedFilter(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LivingFilterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LIVING(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.LIVING, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_livingFilter;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterLivingFilter) {
             listener.enterLivingFilter(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitLivingFilter) {
             listener.exitLivingFilter(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitLivingFilter) {
            return visitor.visitLivingFilter(this);
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
    public BOOKS(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.BOOKS, 0)!;
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
