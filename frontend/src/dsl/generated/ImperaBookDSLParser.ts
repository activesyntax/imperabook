
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
    public static readonly NL = 25;
    public static readonly WS = 26;
    public static readonly ADD_WS = 27;
    public static readonly BY_WS = 28;
    public static readonly ISBN = 29;
    public static readonly SUMMARY = 30;
    public static readonly WITH_WS = 31;
    public static readonly LANGUAGE = 32;
    public static readonly IN_WS = 33;
    public static readonly BEFORE = 34;
    public static readonly AFTER = 35;
    public static readonly PUBLISHED_WS = 36;
    public static readonly WRITTEN_WS = 37;
    public static readonly PAGE = 38;
    public static readonly COUNT = 39;
    public static readonly IS = 40;
    public static readonly WHOSE_WS = 41;
    public static readonly WHOSE_LANGUAGE_WS = 42;
    public static readonly LANGUAGE_WORD = 43;
    public static readonly LANGUAGE_NAME_WS = 44;
    public static readonly MORE_KW = 45;
    public static readonly GREATER = 46;
    public static readonly LESS = 47;
    public static readonly FEWER = 48;
    public static readonly THAN = 49;
    public static readonly AT = 50;
    public static readonly LEAST = 51;
    public static readonly MOST = 52;
    public static readonly BETWEEN = 53;
    public static readonly AND = 54;
    public static readonly NOT = 55;
    public static readonly NUMBER = 56;
    public static readonly COMPARISON_WS = 57;
    public static readonly YEAR_WS = 58;
    public static readonly VALUE = 59;
    public static readonly VALUE_WS = 60;
    public static readonly LANGUAGE_NOT = 61;
    public static readonly RULE_entry = 0;
    public static readonly RULE_command = 1;
    public static readonly RULE_addBookCmd = 2;
    public static readonly RULE_updateBookCmd = 3;
    public static readonly RULE_removeBookCmd = 4;
    public static readonly RULE_listBooksCmd = 5;
    public static readonly RULE_listFilter = 6;
    public static readonly RULE_publishedFilter = 7;
    public static readonly RULE_yearComparison = 8;
    public static readonly RULE_yearIn = 9;
    public static readonly RULE_yearBefore = 10;
    public static readonly RULE_yearAfter = 11;
    public static readonly RULE_yearBetween = 12;
    public static readonly RULE_yearAnd = 13;
    public static readonly RULE_year = 14;
    public static readonly RULE_authorFilter = 15;
    public static readonly RULE_writerName = 16;
    public static readonly RULE_whoseFilter = 17;
    public static readonly RULE_languageFilter = 18;
    public static readonly RULE_languageNot = 19;
    public static readonly RULE_languageName = 20;
    public static readonly RULE_pagesFilter = 21;
    public static readonly RULE_pageComparison = 22;
    public static readonly RULE_pagesMoreThan = 23;
    public static readonly RULE_pagesLessThan = 24;
    public static readonly RULE_pagesAtLeast = 25;
    public static readonly RULE_pagesAtMost = 26;
    public static readonly RULE_pagesBetween = 27;
    public static readonly RULE_pagesNot = 28;
    public static readonly RULE_pagesEqual = 29;
    public static readonly RULE_andBound = 30;
    public static readonly RULE_pageCount = 31;
    public static readonly RULE_addAuthorCmd = 32;
    public static readonly RULE_updateAuthorCmd = 33;
    public static readonly RULE_removeAuthorCmd = 34;
    public static readonly RULE_listAuthorsCmd = 35;
    public static readonly RULE_findCmd = 36;
    public static readonly RULE_keywords = 37;
    public static readonly RULE_dashboardCmd = 38;
    public static readonly RULE_libraryCmd = 39;
    public static readonly RULE_settingsCmd = 40;
    public static readonly RULE_aboutCmd = 41;
    public static readonly RULE_helpCmd = 42;
    public static readonly RULE_accountCmd = 43;
    public static readonly RULE_loginCmd = 44;
    public static readonly RULE_logoutCmd = 45;
    public static readonly RULE_bookTitle = 46;
    public static readonly RULE_authorName = 47;
    public static readonly RULE_bookDetailParam = 48;
    public static readonly RULE_authorParam = 49;
    public static readonly RULE_subtitleParam = 50;
    public static readonly RULE_languageParam = 51;
    public static readonly RULE_publicationYearParam = 52;
    public static readonly RULE_isbnParam = 53;
    public static readonly RULE_summaryParam = 54;
    public static readonly RULE_value = 55;

    public static readonly literalNames = [
        null, "'add'", "'find'", "'update'", "'remove'", "'list'", "'book'", 
        "'books'", "'author'", "'authors'", "'dashboard'", "'library'", 
        "'settings'", "'about'", "'help'", "'account'", "'login'", "'logout'", 
        "'by'", "'with'", "'in'", "'published'", "'subtitled'", "'whose'", 
        "'written'", null, null, null, null, "'isbn'", "'summary'", null, 
        "'language'", null, "'before'", "'after'", null, null, "'page'", 
        "'count'", "'is'", null, null, null, null, "'more'", "'greater'", 
        "'less'", "'fewer'", "'than'", "'at'", "'least'", "'most'", "'between'"
    ];

    public static readonly symbolicNames = [
        null, "ADD", "FIND", "UPDATE", "REMOVE", "LIST", "BOOK", "BOOKS", 
        "AUTHOR", "AUTHORS", "DASHBOARD", "LIBRARY", "SETTINGS", "ABOUT", 
        "HELP", "ACCOUNT", "LOGIN", "LOGOUT", "BY", "WITH", "IN", "PUBLISHED", 
        "SUBTITLED", "WHOSE", "WRITTEN", "NL", "WS", "ADD_WS", "BY_WS", 
        "ISBN", "SUMMARY", "WITH_WS", "LANGUAGE", "IN_WS", "BEFORE", "AFTER", 
        "PUBLISHED_WS", "WRITTEN_WS", "PAGE", "COUNT", "IS", "WHOSE_WS", 
        "WHOSE_LANGUAGE_WS", "LANGUAGE_WORD", "LANGUAGE_NAME_WS", "MORE_KW", 
        "GREATER", "LESS", "FEWER", "THAN", "AT", "LEAST", "MOST", "BETWEEN", 
        "AND", "NOT", "NUMBER", "COMPARISON_WS", "YEAR_WS", "VALUE", "VALUE_WS", 
        "LANGUAGE_NOT"
    ];
    public static readonly ruleNames = [
        "entry", "command", "addBookCmd", "updateBookCmd", "removeBookCmd", 
        "listBooksCmd", "listFilter", "publishedFilter", "yearComparison", 
        "yearIn", "yearBefore", "yearAfter", "yearBetween", "yearAnd", "year", 
        "authorFilter", "writerName", "whoseFilter", "languageFilter", "languageNot", 
        "languageName", "pagesFilter", "pageComparison", "pagesMoreThan", 
        "pagesLessThan", "pagesAtLeast", "pagesAtMost", "pagesBetween", 
        "pagesNot", "pagesEqual", "andBound", "pageCount", "addAuthorCmd", 
        "updateAuthorCmd", "removeAuthorCmd", "listAuthorsCmd", "findCmd", 
        "keywords", "dashboardCmd", "libraryCmd", "settingsCmd", "aboutCmd", 
        "helpCmd", "accountCmd", "loginCmd", "logoutCmd", "bookTitle", "authorName", 
        "bookDetailParam", "authorParam", "subtitleParam", "languageParam", 
        "publicationYearParam", "isbnParam", "summaryParam", "value",
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
            this.state = 115;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 25) {
                {
                {
                this.state = 112;
                this.match(ImperaBookDSLParser.NL);
                }
                }
                this.state = 117;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 118;
            this.command();
            this.state = 122;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 25) {
                {
                {
                this.state = 119;
                this.match(ImperaBookDSLParser.NL);
                }
                }
                this.state = 124;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 125;
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
            this.state = 144;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 127;
                this.addBookCmd();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 128;
                this.updateBookCmd();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 129;
                this.removeBookCmd();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 130;
                this.listBooksCmd();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 131;
                this.addAuthorCmd();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 132;
                this.updateAuthorCmd();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 133;
                this.removeAuthorCmd();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 134;
                this.listAuthorsCmd();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 135;
                this.dashboardCmd();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 136;
                this.libraryCmd();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 137;
                this.settingsCmd();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 138;
                this.aboutCmd();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 139;
                this.helpCmd();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 140;
                this.accountCmd();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 141;
                this.loginCmd();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 142;
                this.logoutCmd();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 143;
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
            this.state = 146;
            this.match(ImperaBookDSLParser.ADD);
            this.state = 147;
            this.match(ImperaBookDSLParser.BOOK);
            this.state = 148;
            this.bookTitle();
            this.state = 157;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 150;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    do {
                        {
                        {
                        this.state = 149;
                        this.match(ImperaBookDSLParser.NL);
                        }
                        }
                        this.state = 152;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    } while (_la === 25);
                    this.state = 154;
                    this.bookDetailParam();
                    }
                    }
                }
                this.state = 159;
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
            this.state = 160;
            this.match(ImperaBookDSLParser.UPDATE);
            this.state = 161;
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
            this.state = 163;
            this.match(ImperaBookDSLParser.REMOVE);
            this.state = 164;
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
            this.state = 166;
            this.match(ImperaBookDSLParser.LIST);
            this.state = 167;
            this.match(ImperaBookDSLParser.BOOKS);
            this.state = 169;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 27262976) !== 0)) {
                {
                this.state = 168;
                this.listFilter();
                }
            }

            this.state = 179;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 172;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    do {
                        {
                        {
                        this.state = 171;
                        this.match(ImperaBookDSLParser.NL);
                        }
                        }
                        this.state = 174;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    } while (_la === 25);
                    this.state = 176;
                    this.listFilter();
                    }
                    }
                }
                this.state = 181;
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
            this.state = 185;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ImperaBookDSLParser.WHOSE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 182;
                this.whoseFilter();
                }
                break;
            case ImperaBookDSLParser.WRITTEN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 183;
                this.authorFilter();
                }
                break;
            case ImperaBookDSLParser.PUBLISHED:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 184;
                this.publishedFilter();
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
    public publishedFilter(): PublishedFilterContext {
        let localContext = new PublishedFilterContext(this.context, this.state);
        this.enterRule(localContext, 14, ImperaBookDSLParser.RULE_publishedFilter);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 187;
            this.match(ImperaBookDSLParser.PUBLISHED);
            this.state = 188;
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
        this.enterRule(localContext, 16, ImperaBookDSLParser.RULE_yearComparison);
        try {
            this.state = 194;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ImperaBookDSLParser.IN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 190;
                this.yearIn();
                }
                break;
            case ImperaBookDSLParser.BEFORE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 191;
                this.yearBefore();
                }
                break;
            case ImperaBookDSLParser.AFTER:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 192;
                this.yearAfter();
                }
                break;
            case ImperaBookDSLParser.BETWEEN:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 193;
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
        this.enterRule(localContext, 18, ImperaBookDSLParser.RULE_yearIn);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 196;
            this.match(ImperaBookDSLParser.IN);
            this.state = 197;
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
        this.enterRule(localContext, 20, ImperaBookDSLParser.RULE_yearBefore);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 199;
            this.match(ImperaBookDSLParser.BEFORE);
            this.state = 200;
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
        this.enterRule(localContext, 22, ImperaBookDSLParser.RULE_yearAfter);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 202;
            this.match(ImperaBookDSLParser.AFTER);
            this.state = 203;
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
        this.enterRule(localContext, 24, ImperaBookDSLParser.RULE_yearBetween);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 205;
            this.match(ImperaBookDSLParser.BETWEEN);
            this.state = 206;
            this.year();
            this.state = 207;
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
        this.enterRule(localContext, 26, ImperaBookDSLParser.RULE_yearAnd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 209;
            this.match(ImperaBookDSLParser.AND);
            this.state = 210;
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
        this.enterRule(localContext, 28, ImperaBookDSLParser.RULE_year);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 212;
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
    public authorFilter(): AuthorFilterContext {
        let localContext = new AuthorFilterContext(this.context, this.state);
        this.enterRule(localContext, 30, ImperaBookDSLParser.RULE_authorFilter);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 214;
            this.match(ImperaBookDSLParser.WRITTEN);
            this.state = 215;
            this.match(ImperaBookDSLParser.BY);
            this.state = 216;
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
        this.enterRule(localContext, 32, ImperaBookDSLParser.RULE_writerName);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 218;
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
        this.enterRule(localContext, 34, ImperaBookDSLParser.RULE_whoseFilter);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 220;
            this.match(ImperaBookDSLParser.WHOSE);
            this.state = 223;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ImperaBookDSLParser.PAGE:
                {
                this.state = 221;
                this.pagesFilter();
                }
                break;
            case ImperaBookDSLParser.LANGUAGE:
                {
                this.state = 222;
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
        this.enterRule(localContext, 36, ImperaBookDSLParser.RULE_languageFilter);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 225;
            this.match(ImperaBookDSLParser.LANGUAGE);
            this.state = 226;
            this.match(ImperaBookDSLParser.IS);
            this.state = 228;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 55) {
                {
                this.state = 227;
                this.languageNot();
                }
            }

            this.state = 230;
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
        this.enterRule(localContext, 38, ImperaBookDSLParser.RULE_languageNot);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 232;
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
        this.enterRule(localContext, 40, ImperaBookDSLParser.RULE_languageName);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 235;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 234;
                this.match(ImperaBookDSLParser.LANGUAGE_WORD);
                }
                }
                this.state = 237;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 43);
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
        this.enterRule(localContext, 42, ImperaBookDSLParser.RULE_pagesFilter);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 239;
            this.match(ImperaBookDSLParser.PAGE);
            this.state = 240;
            this.match(ImperaBookDSLParser.COUNT);
            this.state = 241;
            this.match(ImperaBookDSLParser.IS);
            this.state = 242;
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
        this.enterRule(localContext, 44, ImperaBookDSLParser.RULE_pageComparison);
        try {
            this.state = 251;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 13, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 244;
                this.pagesMoreThan();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 245;
                this.pagesLessThan();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 246;
                this.pagesAtLeast();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 247;
                this.pagesAtMost();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 248;
                this.pagesBetween();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 249;
                this.pagesNot();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 250;
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
        this.enterRule(localContext, 46, ImperaBookDSLParser.RULE_pagesMoreThan);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 253;
            _la = this.tokenStream.LA(1);
            if(!(_la === 45 || _la === 46)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 254;
            this.match(ImperaBookDSLParser.THAN);
            this.state = 255;
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
        this.enterRule(localContext, 48, ImperaBookDSLParser.RULE_pagesLessThan);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 257;
            _la = this.tokenStream.LA(1);
            if(!(_la === 47 || _la === 48)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 258;
            this.match(ImperaBookDSLParser.THAN);
            this.state = 259;
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
        this.enterRule(localContext, 50, ImperaBookDSLParser.RULE_pagesAtLeast);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 261;
            this.match(ImperaBookDSLParser.AT);
            this.state = 262;
            this.match(ImperaBookDSLParser.LEAST);
            this.state = 263;
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
        this.enterRule(localContext, 52, ImperaBookDSLParser.RULE_pagesAtMost);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 265;
            this.match(ImperaBookDSLParser.AT);
            this.state = 266;
            this.match(ImperaBookDSLParser.MOST);
            this.state = 267;
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
        this.enterRule(localContext, 54, ImperaBookDSLParser.RULE_pagesBetween);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 269;
            this.match(ImperaBookDSLParser.BETWEEN);
            this.state = 270;
            this.pageCount();
            this.state = 271;
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
        this.enterRule(localContext, 56, ImperaBookDSLParser.RULE_pagesNot);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 273;
            this.match(ImperaBookDSLParser.NOT);
            this.state = 274;
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
        this.enterRule(localContext, 58, ImperaBookDSLParser.RULE_pagesEqual);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 276;
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
        this.enterRule(localContext, 60, ImperaBookDSLParser.RULE_andBound);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 278;
            this.match(ImperaBookDSLParser.AND);
            this.state = 279;
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
        this.enterRule(localContext, 62, ImperaBookDSLParser.RULE_pageCount);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 281;
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
        this.enterRule(localContext, 64, ImperaBookDSLParser.RULE_addAuthorCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 283;
            this.match(ImperaBookDSLParser.ADD);
            this.state = 284;
            this.match(ImperaBookDSLParser.AUTHOR);
            this.state = 285;
            this.authorName();
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
        this.enterRule(localContext, 66, ImperaBookDSLParser.RULE_updateAuthorCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 287;
            this.match(ImperaBookDSLParser.UPDATE);
            this.state = 288;
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
        this.enterRule(localContext, 68, ImperaBookDSLParser.RULE_removeAuthorCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 290;
            this.match(ImperaBookDSLParser.REMOVE);
            this.state = 291;
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
        this.enterRule(localContext, 70, ImperaBookDSLParser.RULE_listAuthorsCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 293;
            this.match(ImperaBookDSLParser.LIST);
            this.state = 294;
            this.match(ImperaBookDSLParser.AUTHORS);
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
        this.enterRule(localContext, 72, ImperaBookDSLParser.RULE_findCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 296;
            this.match(ImperaBookDSLParser.FIND);
            this.state = 297;
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
        this.enterRule(localContext, 74, ImperaBookDSLParser.RULE_keywords);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 299;
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
        this.enterRule(localContext, 76, ImperaBookDSLParser.RULE_dashboardCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 301;
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
        this.enterRule(localContext, 78, ImperaBookDSLParser.RULE_libraryCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 303;
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
        this.enterRule(localContext, 80, ImperaBookDSLParser.RULE_settingsCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 305;
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
        this.enterRule(localContext, 82, ImperaBookDSLParser.RULE_aboutCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 307;
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
        this.enterRule(localContext, 84, ImperaBookDSLParser.RULE_helpCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 309;
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
        this.enterRule(localContext, 86, ImperaBookDSLParser.RULE_accountCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 311;
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
        this.enterRule(localContext, 88, ImperaBookDSLParser.RULE_loginCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 313;
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
        this.enterRule(localContext, 90, ImperaBookDSLParser.RULE_logoutCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 315;
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
        this.enterRule(localContext, 92, ImperaBookDSLParser.RULE_bookTitle);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 317;
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
        this.enterRule(localContext, 94, ImperaBookDSLParser.RULE_authorName);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 319;
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
        this.enterRule(localContext, 96, ImperaBookDSLParser.RULE_bookDetailParam);
        try {
            this.state = 327;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 14, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 321;
                this.authorParam();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 322;
                this.subtitleParam();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 323;
                this.languageParam();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 324;
                this.publicationYearParam();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 325;
                this.isbnParam();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 326;
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
        this.enterRule(localContext, 98, ImperaBookDSLParser.RULE_authorParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 329;
            this.match(ImperaBookDSLParser.BY);
            this.state = 330;
            this.match(ImperaBookDSLParser.AUTHOR);
            this.state = 331;
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
        this.enterRule(localContext, 100, ImperaBookDSLParser.RULE_subtitleParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 333;
            this.match(ImperaBookDSLParser.SUBTITLED);
            this.state = 334;
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
        this.enterRule(localContext, 102, ImperaBookDSLParser.RULE_languageParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 336;
            this.match(ImperaBookDSLParser.IN);
            this.state = 337;
            this.match(ImperaBookDSLParser.LANGUAGE);
            this.state = 338;
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
        this.enterRule(localContext, 104, ImperaBookDSLParser.RULE_publicationYearParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 340;
            this.match(ImperaBookDSLParser.PUBLISHED);
            this.state = 341;
            this.match(ImperaBookDSLParser.IN);
            this.state = 342;
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
        this.enterRule(localContext, 106, ImperaBookDSLParser.RULE_isbnParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 344;
            this.match(ImperaBookDSLParser.WITH);
            this.state = 345;
            this.match(ImperaBookDSLParser.ISBN);
            this.state = 346;
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
        this.enterRule(localContext, 108, ImperaBookDSLParser.RULE_summaryParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 348;
            this.match(ImperaBookDSLParser.WITH);
            this.state = 349;
            this.match(ImperaBookDSLParser.SUMMARY);
            this.state = 350;
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
        this.enterRule(localContext, 110, ImperaBookDSLParser.RULE_value);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 352;
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
        4,1,61,355,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
        2,53,7,53,2,54,7,54,2,55,7,55,1,0,5,0,114,8,0,10,0,12,0,117,9,0,
        1,0,1,0,5,0,121,8,0,10,0,12,0,124,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,145,8,1,1,
        2,1,2,1,2,1,2,4,2,151,8,2,11,2,12,2,152,1,2,5,2,156,8,2,10,2,12,
        2,159,9,2,1,3,1,3,1,3,1,4,1,4,1,4,1,5,1,5,1,5,3,5,170,8,5,1,5,4,
        5,173,8,5,11,5,12,5,174,1,5,5,5,178,8,5,10,5,12,5,181,9,5,1,6,1,
        6,1,6,3,6,186,8,6,1,7,1,7,1,7,1,8,1,8,1,8,1,8,3,8,195,8,8,1,9,1,
        9,1,9,1,10,1,10,1,10,1,11,1,11,1,11,1,12,1,12,1,12,1,12,1,13,1,13,
        1,13,1,14,1,14,1,15,1,15,1,15,1,15,1,16,1,16,1,17,1,17,1,17,3,17,
        224,8,17,1,18,1,18,1,18,3,18,229,8,18,1,18,1,18,1,19,1,19,1,20,4,
        20,236,8,20,11,20,12,20,237,1,21,1,21,1,21,1,21,1,21,1,22,1,22,1,
        22,1,22,1,22,1,22,1,22,3,22,252,8,22,1,23,1,23,1,23,1,23,1,24,1,
        24,1,24,1,24,1,25,1,25,1,25,1,25,1,26,1,26,1,26,1,26,1,27,1,27,1,
        27,1,27,1,28,1,28,1,28,1,29,1,29,1,30,1,30,1,30,1,31,1,31,1,32,1,
        32,1,32,1,32,1,33,1,33,1,33,1,34,1,34,1,34,1,35,1,35,1,35,1,36,1,
        36,1,36,1,37,1,37,1,38,1,38,1,39,1,39,1,40,1,40,1,41,1,41,1,42,1,
        42,1,43,1,43,1,44,1,44,1,45,1,45,1,46,1,46,1,47,1,47,1,48,1,48,1,
        48,1,48,1,48,1,48,3,48,328,8,48,1,49,1,49,1,49,1,49,1,50,1,50,1,
        50,1,51,1,51,1,51,1,51,1,52,1,52,1,52,1,52,1,53,1,53,1,53,1,53,1,
        54,1,54,1,54,1,54,1,55,1,55,1,55,0,0,56,0,2,4,6,8,10,12,14,16,18,
        20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,
        64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,
        106,108,110,0,2,1,0,45,46,1,0,47,48,340,0,115,1,0,0,0,2,144,1,0,
        0,0,4,146,1,0,0,0,6,160,1,0,0,0,8,163,1,0,0,0,10,166,1,0,0,0,12,
        185,1,0,0,0,14,187,1,0,0,0,16,194,1,0,0,0,18,196,1,0,0,0,20,199,
        1,0,0,0,22,202,1,0,0,0,24,205,1,0,0,0,26,209,1,0,0,0,28,212,1,0,
        0,0,30,214,1,0,0,0,32,218,1,0,0,0,34,220,1,0,0,0,36,225,1,0,0,0,
        38,232,1,0,0,0,40,235,1,0,0,0,42,239,1,0,0,0,44,251,1,0,0,0,46,253,
        1,0,0,0,48,257,1,0,0,0,50,261,1,0,0,0,52,265,1,0,0,0,54,269,1,0,
        0,0,56,273,1,0,0,0,58,276,1,0,0,0,60,278,1,0,0,0,62,281,1,0,0,0,
        64,283,1,0,0,0,66,287,1,0,0,0,68,290,1,0,0,0,70,293,1,0,0,0,72,296,
        1,0,0,0,74,299,1,0,0,0,76,301,1,0,0,0,78,303,1,0,0,0,80,305,1,0,
        0,0,82,307,1,0,0,0,84,309,1,0,0,0,86,311,1,0,0,0,88,313,1,0,0,0,
        90,315,1,0,0,0,92,317,1,0,0,0,94,319,1,0,0,0,96,327,1,0,0,0,98,329,
        1,0,0,0,100,333,1,0,0,0,102,336,1,0,0,0,104,340,1,0,0,0,106,344,
        1,0,0,0,108,348,1,0,0,0,110,352,1,0,0,0,112,114,5,25,0,0,113,112,
        1,0,0,0,114,117,1,0,0,0,115,113,1,0,0,0,115,116,1,0,0,0,116,118,
        1,0,0,0,117,115,1,0,0,0,118,122,3,2,1,0,119,121,5,25,0,0,120,119,
        1,0,0,0,121,124,1,0,0,0,122,120,1,0,0,0,122,123,1,0,0,0,123,125,
        1,0,0,0,124,122,1,0,0,0,125,126,5,0,0,1,126,1,1,0,0,0,127,145,3,
        4,2,0,128,145,3,6,3,0,129,145,3,8,4,0,130,145,3,10,5,0,131,145,3,
        64,32,0,132,145,3,66,33,0,133,145,3,68,34,0,134,145,3,70,35,0,135,
        145,3,76,38,0,136,145,3,78,39,0,137,145,3,80,40,0,138,145,3,82,41,
        0,139,145,3,84,42,0,140,145,3,86,43,0,141,145,3,88,44,0,142,145,
        3,90,45,0,143,145,3,72,36,0,144,127,1,0,0,0,144,128,1,0,0,0,144,
        129,1,0,0,0,144,130,1,0,0,0,144,131,1,0,0,0,144,132,1,0,0,0,144,
        133,1,0,0,0,144,134,1,0,0,0,144,135,1,0,0,0,144,136,1,0,0,0,144,
        137,1,0,0,0,144,138,1,0,0,0,144,139,1,0,0,0,144,140,1,0,0,0,144,
        141,1,0,0,0,144,142,1,0,0,0,144,143,1,0,0,0,145,3,1,0,0,0,146,147,
        5,1,0,0,147,148,5,6,0,0,148,157,3,92,46,0,149,151,5,25,0,0,150,149,
        1,0,0,0,151,152,1,0,0,0,152,150,1,0,0,0,152,153,1,0,0,0,153,154,
        1,0,0,0,154,156,3,96,48,0,155,150,1,0,0,0,156,159,1,0,0,0,157,155,
        1,0,0,0,157,158,1,0,0,0,158,5,1,0,0,0,159,157,1,0,0,0,160,161,5,
        3,0,0,161,162,5,6,0,0,162,7,1,0,0,0,163,164,5,4,0,0,164,165,5,6,
        0,0,165,9,1,0,0,0,166,167,5,5,0,0,167,169,5,7,0,0,168,170,3,12,6,
        0,169,168,1,0,0,0,169,170,1,0,0,0,170,179,1,0,0,0,171,173,5,25,0,
        0,172,171,1,0,0,0,173,174,1,0,0,0,174,172,1,0,0,0,174,175,1,0,0,
        0,175,176,1,0,0,0,176,178,3,12,6,0,177,172,1,0,0,0,178,181,1,0,0,
        0,179,177,1,0,0,0,179,180,1,0,0,0,180,11,1,0,0,0,181,179,1,0,0,0,
        182,186,3,34,17,0,183,186,3,30,15,0,184,186,3,14,7,0,185,182,1,0,
        0,0,185,183,1,0,0,0,185,184,1,0,0,0,186,13,1,0,0,0,187,188,5,21,
        0,0,188,189,3,16,8,0,189,15,1,0,0,0,190,195,3,18,9,0,191,195,3,20,
        10,0,192,195,3,22,11,0,193,195,3,24,12,0,194,190,1,0,0,0,194,191,
        1,0,0,0,194,192,1,0,0,0,194,193,1,0,0,0,195,17,1,0,0,0,196,197,5,
        20,0,0,197,198,3,28,14,0,198,19,1,0,0,0,199,200,5,34,0,0,200,201,
        3,28,14,0,201,21,1,0,0,0,202,203,5,35,0,0,203,204,3,28,14,0,204,
        23,1,0,0,0,205,206,5,53,0,0,206,207,3,28,14,0,207,208,3,26,13,0,
        208,25,1,0,0,0,209,210,5,54,0,0,210,211,3,28,14,0,211,27,1,0,0,0,
        212,213,5,56,0,0,213,29,1,0,0,0,214,215,5,24,0,0,215,216,5,18,0,
        0,216,217,3,32,16,0,217,31,1,0,0,0,218,219,5,59,0,0,219,33,1,0,0,
        0,220,223,5,23,0,0,221,224,3,42,21,0,222,224,3,36,18,0,223,221,1,
        0,0,0,223,222,1,0,0,0,224,35,1,0,0,0,225,226,5,32,0,0,226,228,5,
        40,0,0,227,229,3,38,19,0,228,227,1,0,0,0,228,229,1,0,0,0,229,230,
        1,0,0,0,230,231,3,40,20,0,231,37,1,0,0,0,232,233,5,55,0,0,233,39,
        1,0,0,0,234,236,5,43,0,0,235,234,1,0,0,0,236,237,1,0,0,0,237,235,
        1,0,0,0,237,238,1,0,0,0,238,41,1,0,0,0,239,240,5,38,0,0,240,241,
        5,39,0,0,241,242,5,40,0,0,242,243,3,44,22,0,243,43,1,0,0,0,244,252,
        3,46,23,0,245,252,3,48,24,0,246,252,3,50,25,0,247,252,3,52,26,0,
        248,252,3,54,27,0,249,252,3,56,28,0,250,252,3,58,29,0,251,244,1,
        0,0,0,251,245,1,0,0,0,251,246,1,0,0,0,251,247,1,0,0,0,251,248,1,
        0,0,0,251,249,1,0,0,0,251,250,1,0,0,0,252,45,1,0,0,0,253,254,7,0,
        0,0,254,255,5,49,0,0,255,256,3,62,31,0,256,47,1,0,0,0,257,258,7,
        1,0,0,258,259,5,49,0,0,259,260,3,62,31,0,260,49,1,0,0,0,261,262,
        5,50,0,0,262,263,5,51,0,0,263,264,3,62,31,0,264,51,1,0,0,0,265,266,
        5,50,0,0,266,267,5,52,0,0,267,268,3,62,31,0,268,53,1,0,0,0,269,270,
        5,53,0,0,270,271,3,62,31,0,271,272,3,60,30,0,272,55,1,0,0,0,273,
        274,5,55,0,0,274,275,3,62,31,0,275,57,1,0,0,0,276,277,3,62,31,0,
        277,59,1,0,0,0,278,279,5,54,0,0,279,280,3,62,31,0,280,61,1,0,0,0,
        281,282,5,56,0,0,282,63,1,0,0,0,283,284,5,1,0,0,284,285,5,8,0,0,
        285,286,3,94,47,0,286,65,1,0,0,0,287,288,5,3,0,0,288,289,5,8,0,0,
        289,67,1,0,0,0,290,291,5,4,0,0,291,292,5,8,0,0,292,69,1,0,0,0,293,
        294,5,5,0,0,294,295,5,9,0,0,295,71,1,0,0,0,296,297,5,2,0,0,297,298,
        3,74,37,0,298,73,1,0,0,0,299,300,5,59,0,0,300,75,1,0,0,0,301,302,
        5,10,0,0,302,77,1,0,0,0,303,304,5,11,0,0,304,79,1,0,0,0,305,306,
        5,12,0,0,306,81,1,0,0,0,307,308,5,13,0,0,308,83,1,0,0,0,309,310,
        5,14,0,0,310,85,1,0,0,0,311,312,5,15,0,0,312,87,1,0,0,0,313,314,
        5,16,0,0,314,89,1,0,0,0,315,316,5,17,0,0,316,91,1,0,0,0,317,318,
        5,59,0,0,318,93,1,0,0,0,319,320,5,59,0,0,320,95,1,0,0,0,321,328,
        3,98,49,0,322,328,3,100,50,0,323,328,3,102,51,0,324,328,3,104,52,
        0,325,328,3,106,53,0,326,328,3,108,54,0,327,321,1,0,0,0,327,322,
        1,0,0,0,327,323,1,0,0,0,327,324,1,0,0,0,327,325,1,0,0,0,327,326,
        1,0,0,0,328,97,1,0,0,0,329,330,5,18,0,0,330,331,5,8,0,0,331,332,
        3,110,55,0,332,99,1,0,0,0,333,334,5,22,0,0,334,335,3,110,55,0,335,
        101,1,0,0,0,336,337,5,20,0,0,337,338,5,32,0,0,338,339,3,110,55,0,
        339,103,1,0,0,0,340,341,5,21,0,0,341,342,5,20,0,0,342,343,3,28,14,
        0,343,105,1,0,0,0,344,345,5,19,0,0,345,346,5,29,0,0,346,347,3,110,
        55,0,347,107,1,0,0,0,348,349,5,19,0,0,349,350,5,30,0,0,350,351,3,
        110,55,0,351,109,1,0,0,0,352,353,5,59,0,0,353,111,1,0,0,0,15,115,
        122,144,152,157,169,174,179,185,194,223,228,237,251,327
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
