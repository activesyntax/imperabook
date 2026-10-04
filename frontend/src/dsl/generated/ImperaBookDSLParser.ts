
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
    public static readonly PUBLISHED_WS = 34;
    public static readonly WRITTEN_WS = 35;
    public static readonly PAGE = 36;
    public static readonly COUNT = 37;
    public static readonly IS = 38;
    public static readonly WHOSE_WS = 39;
    public static readonly MORE_KW = 40;
    public static readonly GREATER = 41;
    public static readonly LESS = 42;
    public static readonly FEWER = 43;
    public static readonly THAN = 44;
    public static readonly AT = 45;
    public static readonly LEAST = 46;
    public static readonly MOST = 47;
    public static readonly BETWEEN = 48;
    public static readonly AND = 49;
    public static readonly NOT = 50;
    public static readonly NUMBER = 51;
    public static readonly COMPARISON_WS = 52;
    public static readonly VALUE = 53;
    public static readonly VALUE_WS = 54;
    public static readonly RULE_entry = 0;
    public static readonly RULE_command = 1;
    public static readonly RULE_addBookCmd = 2;
    public static readonly RULE_updateBookCmd = 3;
    public static readonly RULE_removeBookCmd = 4;
    public static readonly RULE_listBooksCmd = 5;
    public static readonly RULE_listFilter = 6;
    public static readonly RULE_authorFilter = 7;
    public static readonly RULE_writerName = 8;
    public static readonly RULE_pagesFilter = 9;
    public static readonly RULE_pageComparison = 10;
    public static readonly RULE_pagesMoreThan = 11;
    public static readonly RULE_pagesLessThan = 12;
    public static readonly RULE_pagesAtLeast = 13;
    public static readonly RULE_pagesAtMost = 14;
    public static readonly RULE_pagesBetween = 15;
    public static readonly RULE_pagesNot = 16;
    public static readonly RULE_pagesEqual = 17;
    public static readonly RULE_andBound = 18;
    public static readonly RULE_pageCount = 19;
    public static readonly RULE_addAuthorCmd = 20;
    public static readonly RULE_updateAuthorCmd = 21;
    public static readonly RULE_removeAuthorCmd = 22;
    public static readonly RULE_listAuthorsCmd = 23;
    public static readonly RULE_findCmd = 24;
    public static readonly RULE_keywords = 25;
    public static readonly RULE_dashboardCmd = 26;
    public static readonly RULE_libraryCmd = 27;
    public static readonly RULE_settingsCmd = 28;
    public static readonly RULE_aboutCmd = 29;
    public static readonly RULE_helpCmd = 30;
    public static readonly RULE_accountCmd = 31;
    public static readonly RULE_loginCmd = 32;
    public static readonly RULE_logoutCmd = 33;
    public static readonly RULE_bookTitle = 34;
    public static readonly RULE_authorName = 35;
    public static readonly RULE_bookDetailParam = 36;
    public static readonly RULE_authorParam = 37;
    public static readonly RULE_subtitleParam = 38;
    public static readonly RULE_languageParam = 39;
    public static readonly RULE_publicationYearParam = 40;
    public static readonly RULE_isbnParam = 41;
    public static readonly RULE_summaryParam = 42;
    public static readonly RULE_value = 43;

    public static readonly literalNames = [
        null, "'add'", "'find'", "'update'", "'remove'", "'list'", "'book'", 
        "'books'", "'author'", "'authors'", "'dashboard'", "'library'", 
        "'settings'", "'about'", "'help'", "'account'", "'login'", "'logout'", 
        "'by'", "'with'", "'in'", "'published'", "'subtitled'", "'whose'", 
        "'written'", null, null, null, null, "'isbn'", "'summary'", null, 
        "'language'", null, null, null, "'page'", "'count'", "'is'", null, 
        "'more'", "'greater'", "'less'", "'fewer'", "'than'", "'at'", "'least'", 
        "'most'", "'between'", "'and'", "'not'"
    ];

    public static readonly symbolicNames = [
        null, "ADD", "FIND", "UPDATE", "REMOVE", "LIST", "BOOK", "BOOKS", 
        "AUTHOR", "AUTHORS", "DASHBOARD", "LIBRARY", "SETTINGS", "ABOUT", 
        "HELP", "ACCOUNT", "LOGIN", "LOGOUT", "BY", "WITH", "IN", "PUBLISHED", 
        "SUBTITLED", "WHOSE", "WRITTEN", "NL", "WS", "ADD_WS", "BY_WS", 
        "ISBN", "SUMMARY", "WITH_WS", "LANGUAGE", "IN_WS", "PUBLISHED_WS", 
        "WRITTEN_WS", "PAGE", "COUNT", "IS", "WHOSE_WS", "MORE_KW", "GREATER", 
        "LESS", "FEWER", "THAN", "AT", "LEAST", "MOST", "BETWEEN", "AND", 
        "NOT", "NUMBER", "COMPARISON_WS", "VALUE", "VALUE_WS"
    ];
    public static readonly ruleNames = [
        "entry", "command", "addBookCmd", "updateBookCmd", "removeBookCmd", 
        "listBooksCmd", "listFilter", "authorFilter", "writerName", "pagesFilter", 
        "pageComparison", "pagesMoreThan", "pagesLessThan", "pagesAtLeast", 
        "pagesAtMost", "pagesBetween", "pagesNot", "pagesEqual", "andBound", 
        "pageCount", "addAuthorCmd", "updateAuthorCmd", "removeAuthorCmd", 
        "listAuthorsCmd", "findCmd", "keywords", "dashboardCmd", "libraryCmd", 
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
            this.state = 91;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 25) {
                {
                {
                this.state = 88;
                this.match(ImperaBookDSLParser.NL);
                }
                }
                this.state = 93;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 94;
            this.command();
            this.state = 98;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 25) {
                {
                {
                this.state = 95;
                this.match(ImperaBookDSLParser.NL);
                }
                }
                this.state = 100;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 101;
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
            this.state = 120;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 103;
                this.addBookCmd();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 104;
                this.updateBookCmd();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 105;
                this.removeBookCmd();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 106;
                this.listBooksCmd();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 107;
                this.addAuthorCmd();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 108;
                this.updateAuthorCmd();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 109;
                this.removeAuthorCmd();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 110;
                this.listAuthorsCmd();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 111;
                this.dashboardCmd();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 112;
                this.libraryCmd();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 113;
                this.settingsCmd();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 114;
                this.aboutCmd();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 115;
                this.helpCmd();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 116;
                this.accountCmd();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 117;
                this.loginCmd();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 118;
                this.logoutCmd();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 119;
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
            this.state = 122;
            this.match(ImperaBookDSLParser.ADD);
            this.state = 123;
            this.match(ImperaBookDSLParser.BOOK);
            this.state = 124;
            this.bookTitle();
            this.state = 133;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 126;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    do {
                        {
                        {
                        this.state = 125;
                        this.match(ImperaBookDSLParser.NL);
                        }
                        }
                        this.state = 128;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    } while (_la === 25);
                    this.state = 130;
                    this.bookDetailParam();
                    }
                    }
                }
                this.state = 135;
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
            this.state = 136;
            this.match(ImperaBookDSLParser.UPDATE);
            this.state = 137;
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
            this.state = 139;
            this.match(ImperaBookDSLParser.REMOVE);
            this.state = 140;
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
            this.state = 142;
            this.match(ImperaBookDSLParser.LIST);
            this.state = 143;
            this.match(ImperaBookDSLParser.BOOKS);
            this.state = 145;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 23 || _la === 24) {
                {
                this.state = 144;
                this.listFilter();
                }
            }

            this.state = 155;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 148;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    do {
                        {
                        {
                        this.state = 147;
                        this.match(ImperaBookDSLParser.NL);
                        }
                        }
                        this.state = 150;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    } while (_la === 25);
                    this.state = 152;
                    this.listFilter();
                    }
                    }
                }
                this.state = 157;
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
            this.state = 160;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ImperaBookDSLParser.WHOSE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 158;
                this.pagesFilter();
                }
                break;
            case ImperaBookDSLParser.WRITTEN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 159;
                this.authorFilter();
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
    public authorFilter(): AuthorFilterContext {
        let localContext = new AuthorFilterContext(this.context, this.state);
        this.enterRule(localContext, 14, ImperaBookDSLParser.RULE_authorFilter);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 162;
            this.match(ImperaBookDSLParser.WRITTEN);
            this.state = 163;
            this.match(ImperaBookDSLParser.BY);
            this.state = 164;
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
        this.enterRule(localContext, 16, ImperaBookDSLParser.RULE_writerName);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 166;
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
    public pagesFilter(): PagesFilterContext {
        let localContext = new PagesFilterContext(this.context, this.state);
        this.enterRule(localContext, 18, ImperaBookDSLParser.RULE_pagesFilter);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 168;
            this.match(ImperaBookDSLParser.WHOSE);
            this.state = 169;
            this.match(ImperaBookDSLParser.PAGE);
            this.state = 170;
            this.match(ImperaBookDSLParser.COUNT);
            this.state = 171;
            this.match(ImperaBookDSLParser.IS);
            this.state = 172;
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
        this.enterRule(localContext, 20, ImperaBookDSLParser.RULE_pageComparison);
        try {
            this.state = 181;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 174;
                this.pagesMoreThan();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 175;
                this.pagesLessThan();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 176;
                this.pagesAtLeast();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 177;
                this.pagesAtMost();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 178;
                this.pagesBetween();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 179;
                this.pagesNot();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 180;
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
        this.enterRule(localContext, 22, ImperaBookDSLParser.RULE_pagesMoreThan);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 183;
            _la = this.tokenStream.LA(1);
            if(!(_la === 40 || _la === 41)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 184;
            this.match(ImperaBookDSLParser.THAN);
            this.state = 185;
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
        this.enterRule(localContext, 24, ImperaBookDSLParser.RULE_pagesLessThan);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 187;
            _la = this.tokenStream.LA(1);
            if(!(_la === 42 || _la === 43)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 188;
            this.match(ImperaBookDSLParser.THAN);
            this.state = 189;
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
        this.enterRule(localContext, 26, ImperaBookDSLParser.RULE_pagesAtLeast);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 191;
            this.match(ImperaBookDSLParser.AT);
            this.state = 192;
            this.match(ImperaBookDSLParser.LEAST);
            this.state = 193;
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
        this.enterRule(localContext, 28, ImperaBookDSLParser.RULE_pagesAtMost);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 195;
            this.match(ImperaBookDSLParser.AT);
            this.state = 196;
            this.match(ImperaBookDSLParser.MOST);
            this.state = 197;
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
        this.enterRule(localContext, 30, ImperaBookDSLParser.RULE_pagesBetween);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 199;
            this.match(ImperaBookDSLParser.BETWEEN);
            this.state = 200;
            this.pageCount();
            this.state = 201;
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
        this.enterRule(localContext, 32, ImperaBookDSLParser.RULE_pagesNot);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 203;
            this.match(ImperaBookDSLParser.NOT);
            this.state = 204;
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
        this.enterRule(localContext, 34, ImperaBookDSLParser.RULE_pagesEqual);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 206;
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
        this.enterRule(localContext, 36, ImperaBookDSLParser.RULE_andBound);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 208;
            this.match(ImperaBookDSLParser.AND);
            this.state = 209;
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
        this.enterRule(localContext, 38, ImperaBookDSLParser.RULE_pageCount);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 211;
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
        this.enterRule(localContext, 40, ImperaBookDSLParser.RULE_addAuthorCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 213;
            this.match(ImperaBookDSLParser.ADD);
            this.state = 214;
            this.match(ImperaBookDSLParser.AUTHOR);
            this.state = 215;
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
        this.enterRule(localContext, 42, ImperaBookDSLParser.RULE_updateAuthorCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 217;
            this.match(ImperaBookDSLParser.UPDATE);
            this.state = 218;
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
        this.enterRule(localContext, 44, ImperaBookDSLParser.RULE_removeAuthorCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 220;
            this.match(ImperaBookDSLParser.REMOVE);
            this.state = 221;
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
        this.enterRule(localContext, 46, ImperaBookDSLParser.RULE_listAuthorsCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 223;
            this.match(ImperaBookDSLParser.LIST);
            this.state = 224;
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
        this.enterRule(localContext, 48, ImperaBookDSLParser.RULE_findCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 226;
            this.match(ImperaBookDSLParser.FIND);
            this.state = 227;
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
        this.enterRule(localContext, 50, ImperaBookDSLParser.RULE_keywords);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 229;
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
        this.enterRule(localContext, 52, ImperaBookDSLParser.RULE_dashboardCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 231;
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
        this.enterRule(localContext, 54, ImperaBookDSLParser.RULE_libraryCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 233;
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
        this.enterRule(localContext, 56, ImperaBookDSLParser.RULE_settingsCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 235;
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
        this.enterRule(localContext, 58, ImperaBookDSLParser.RULE_aboutCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 237;
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
        this.enterRule(localContext, 60, ImperaBookDSLParser.RULE_helpCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 239;
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
        this.enterRule(localContext, 62, ImperaBookDSLParser.RULE_accountCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 241;
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
        this.enterRule(localContext, 64, ImperaBookDSLParser.RULE_loginCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 243;
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
        this.enterRule(localContext, 66, ImperaBookDSLParser.RULE_logoutCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 245;
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
        this.enterRule(localContext, 68, ImperaBookDSLParser.RULE_bookTitle);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 247;
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
        this.enterRule(localContext, 70, ImperaBookDSLParser.RULE_authorName);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 249;
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
        this.enterRule(localContext, 72, ImperaBookDSLParser.RULE_bookDetailParam);
        try {
            this.state = 257;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 251;
                this.authorParam();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 252;
                this.subtitleParam();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 253;
                this.languageParam();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 254;
                this.publicationYearParam();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 255;
                this.isbnParam();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 256;
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
        this.enterRule(localContext, 74, ImperaBookDSLParser.RULE_authorParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 259;
            this.match(ImperaBookDSLParser.BY);
            this.state = 260;
            this.match(ImperaBookDSLParser.AUTHOR);
            this.state = 261;
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
        this.enterRule(localContext, 76, ImperaBookDSLParser.RULE_subtitleParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 263;
            this.match(ImperaBookDSLParser.SUBTITLED);
            this.state = 264;
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
        this.enterRule(localContext, 78, ImperaBookDSLParser.RULE_languageParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 266;
            this.match(ImperaBookDSLParser.IN);
            this.state = 267;
            this.match(ImperaBookDSLParser.LANGUAGE);
            this.state = 268;
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
        this.enterRule(localContext, 80, ImperaBookDSLParser.RULE_publicationYearParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 270;
            this.match(ImperaBookDSLParser.PUBLISHED);
            this.state = 271;
            this.match(ImperaBookDSLParser.IN);
            this.state = 272;
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
    public isbnParam(): IsbnParamContext {
        let localContext = new IsbnParamContext(this.context, this.state);
        this.enterRule(localContext, 82, ImperaBookDSLParser.RULE_isbnParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 274;
            this.match(ImperaBookDSLParser.WITH);
            this.state = 275;
            this.match(ImperaBookDSLParser.ISBN);
            this.state = 276;
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
        this.enterRule(localContext, 84, ImperaBookDSLParser.RULE_summaryParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 278;
            this.match(ImperaBookDSLParser.WITH);
            this.state = 279;
            this.match(ImperaBookDSLParser.SUMMARY);
            this.state = 280;
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
        this.enterRule(localContext, 86, ImperaBookDSLParser.RULE_value);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 282;
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
        4,1,54,285,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,1,0,5,0,90,8,0,10,0,12,0,
        93,9,0,1,0,1,0,5,0,97,8,0,10,0,12,0,100,9,0,1,0,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,121,
        8,1,1,2,1,2,1,2,1,2,4,2,127,8,2,11,2,12,2,128,1,2,5,2,132,8,2,10,
        2,12,2,135,9,2,1,3,1,3,1,3,1,4,1,4,1,4,1,5,1,5,1,5,3,5,146,8,5,1,
        5,4,5,149,8,5,11,5,12,5,150,1,5,5,5,154,8,5,10,5,12,5,157,9,5,1,
        6,1,6,3,6,161,8,6,1,7,1,7,1,7,1,7,1,8,1,8,1,9,1,9,1,9,1,9,1,9,1,
        9,1,10,1,10,1,10,1,10,1,10,1,10,1,10,3,10,182,8,10,1,11,1,11,1,11,
        1,11,1,12,1,12,1,12,1,12,1,13,1,13,1,13,1,13,1,14,1,14,1,14,1,14,
        1,15,1,15,1,15,1,15,1,16,1,16,1,16,1,17,1,17,1,18,1,18,1,18,1,19,
        1,19,1,20,1,20,1,20,1,20,1,21,1,21,1,21,1,22,1,22,1,22,1,23,1,23,
        1,23,1,24,1,24,1,24,1,25,1,25,1,26,1,26,1,27,1,27,1,28,1,28,1,29,
        1,29,1,30,1,30,1,31,1,31,1,32,1,32,1,33,1,33,1,34,1,34,1,35,1,35,
        1,36,1,36,1,36,1,36,1,36,1,36,3,36,258,8,36,1,37,1,37,1,37,1,37,
        1,38,1,38,1,38,1,39,1,39,1,39,1,39,1,40,1,40,1,40,1,40,1,41,1,41,
        1,41,1,41,1,42,1,42,1,42,1,42,1,43,1,43,1,43,0,0,44,0,2,4,6,8,10,
        12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,
        56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,0,2,1,0,40,41,1,
        0,42,43,275,0,91,1,0,0,0,2,120,1,0,0,0,4,122,1,0,0,0,6,136,1,0,0,
        0,8,139,1,0,0,0,10,142,1,0,0,0,12,160,1,0,0,0,14,162,1,0,0,0,16,
        166,1,0,0,0,18,168,1,0,0,0,20,181,1,0,0,0,22,183,1,0,0,0,24,187,
        1,0,0,0,26,191,1,0,0,0,28,195,1,0,0,0,30,199,1,0,0,0,32,203,1,0,
        0,0,34,206,1,0,0,0,36,208,1,0,0,0,38,211,1,0,0,0,40,213,1,0,0,0,
        42,217,1,0,0,0,44,220,1,0,0,0,46,223,1,0,0,0,48,226,1,0,0,0,50,229,
        1,0,0,0,52,231,1,0,0,0,54,233,1,0,0,0,56,235,1,0,0,0,58,237,1,0,
        0,0,60,239,1,0,0,0,62,241,1,0,0,0,64,243,1,0,0,0,66,245,1,0,0,0,
        68,247,1,0,0,0,70,249,1,0,0,0,72,257,1,0,0,0,74,259,1,0,0,0,76,263,
        1,0,0,0,78,266,1,0,0,0,80,270,1,0,0,0,82,274,1,0,0,0,84,278,1,0,
        0,0,86,282,1,0,0,0,88,90,5,25,0,0,89,88,1,0,0,0,90,93,1,0,0,0,91,
        89,1,0,0,0,91,92,1,0,0,0,92,94,1,0,0,0,93,91,1,0,0,0,94,98,3,2,1,
        0,95,97,5,25,0,0,96,95,1,0,0,0,97,100,1,0,0,0,98,96,1,0,0,0,98,99,
        1,0,0,0,99,101,1,0,0,0,100,98,1,0,0,0,101,102,5,0,0,1,102,1,1,0,
        0,0,103,121,3,4,2,0,104,121,3,6,3,0,105,121,3,8,4,0,106,121,3,10,
        5,0,107,121,3,40,20,0,108,121,3,42,21,0,109,121,3,44,22,0,110,121,
        3,46,23,0,111,121,3,52,26,0,112,121,3,54,27,0,113,121,3,56,28,0,
        114,121,3,58,29,0,115,121,3,60,30,0,116,121,3,62,31,0,117,121,3,
        64,32,0,118,121,3,66,33,0,119,121,3,48,24,0,120,103,1,0,0,0,120,
        104,1,0,0,0,120,105,1,0,0,0,120,106,1,0,0,0,120,107,1,0,0,0,120,
        108,1,0,0,0,120,109,1,0,0,0,120,110,1,0,0,0,120,111,1,0,0,0,120,
        112,1,0,0,0,120,113,1,0,0,0,120,114,1,0,0,0,120,115,1,0,0,0,120,
        116,1,0,0,0,120,117,1,0,0,0,120,118,1,0,0,0,120,119,1,0,0,0,121,
        3,1,0,0,0,122,123,5,1,0,0,123,124,5,6,0,0,124,133,3,68,34,0,125,
        127,5,25,0,0,126,125,1,0,0,0,127,128,1,0,0,0,128,126,1,0,0,0,128,
        129,1,0,0,0,129,130,1,0,0,0,130,132,3,72,36,0,131,126,1,0,0,0,132,
        135,1,0,0,0,133,131,1,0,0,0,133,134,1,0,0,0,134,5,1,0,0,0,135,133,
        1,0,0,0,136,137,5,3,0,0,137,138,5,6,0,0,138,7,1,0,0,0,139,140,5,
        4,0,0,140,141,5,6,0,0,141,9,1,0,0,0,142,143,5,5,0,0,143,145,5,7,
        0,0,144,146,3,12,6,0,145,144,1,0,0,0,145,146,1,0,0,0,146,155,1,0,
        0,0,147,149,5,25,0,0,148,147,1,0,0,0,149,150,1,0,0,0,150,148,1,0,
        0,0,150,151,1,0,0,0,151,152,1,0,0,0,152,154,3,12,6,0,153,148,1,0,
        0,0,154,157,1,0,0,0,155,153,1,0,0,0,155,156,1,0,0,0,156,11,1,0,0,
        0,157,155,1,0,0,0,158,161,3,18,9,0,159,161,3,14,7,0,160,158,1,0,
        0,0,160,159,1,0,0,0,161,13,1,0,0,0,162,163,5,24,0,0,163,164,5,18,
        0,0,164,165,3,16,8,0,165,15,1,0,0,0,166,167,5,53,0,0,167,17,1,0,
        0,0,168,169,5,23,0,0,169,170,5,36,0,0,170,171,5,37,0,0,171,172,5,
        38,0,0,172,173,3,20,10,0,173,19,1,0,0,0,174,182,3,22,11,0,175,182,
        3,24,12,0,176,182,3,26,13,0,177,182,3,28,14,0,178,182,3,30,15,0,
        179,182,3,32,16,0,180,182,3,34,17,0,181,174,1,0,0,0,181,175,1,0,
        0,0,181,176,1,0,0,0,181,177,1,0,0,0,181,178,1,0,0,0,181,179,1,0,
        0,0,181,180,1,0,0,0,182,21,1,0,0,0,183,184,7,0,0,0,184,185,5,44,
        0,0,185,186,3,38,19,0,186,23,1,0,0,0,187,188,7,1,0,0,188,189,5,44,
        0,0,189,190,3,38,19,0,190,25,1,0,0,0,191,192,5,45,0,0,192,193,5,
        46,0,0,193,194,3,38,19,0,194,27,1,0,0,0,195,196,5,45,0,0,196,197,
        5,47,0,0,197,198,3,38,19,0,198,29,1,0,0,0,199,200,5,48,0,0,200,201,
        3,38,19,0,201,202,3,36,18,0,202,31,1,0,0,0,203,204,5,50,0,0,204,
        205,3,38,19,0,205,33,1,0,0,0,206,207,3,38,19,0,207,35,1,0,0,0,208,
        209,5,49,0,0,209,210,3,38,19,0,210,37,1,0,0,0,211,212,5,51,0,0,212,
        39,1,0,0,0,213,214,5,1,0,0,214,215,5,8,0,0,215,216,3,70,35,0,216,
        41,1,0,0,0,217,218,5,3,0,0,218,219,5,8,0,0,219,43,1,0,0,0,220,221,
        5,4,0,0,221,222,5,8,0,0,222,45,1,0,0,0,223,224,5,5,0,0,224,225,5,
        9,0,0,225,47,1,0,0,0,226,227,5,2,0,0,227,228,3,50,25,0,228,49,1,
        0,0,0,229,230,5,53,0,0,230,51,1,0,0,0,231,232,5,10,0,0,232,53,1,
        0,0,0,233,234,5,11,0,0,234,55,1,0,0,0,235,236,5,12,0,0,236,57,1,
        0,0,0,237,238,5,13,0,0,238,59,1,0,0,0,239,240,5,14,0,0,240,61,1,
        0,0,0,241,242,5,15,0,0,242,63,1,0,0,0,243,244,5,16,0,0,244,65,1,
        0,0,0,245,246,5,17,0,0,246,67,1,0,0,0,247,248,5,53,0,0,248,69,1,
        0,0,0,249,250,5,53,0,0,250,71,1,0,0,0,251,258,3,74,37,0,252,258,
        3,76,38,0,253,258,3,78,39,0,254,258,3,80,40,0,255,258,3,82,41,0,
        256,258,3,84,42,0,257,251,1,0,0,0,257,252,1,0,0,0,257,253,1,0,0,
        0,257,254,1,0,0,0,257,255,1,0,0,0,257,256,1,0,0,0,258,73,1,0,0,0,
        259,260,5,18,0,0,260,261,5,8,0,0,261,262,3,86,43,0,262,75,1,0,0,
        0,263,264,5,22,0,0,264,265,3,86,43,0,265,77,1,0,0,0,266,267,5,20,
        0,0,267,268,5,32,0,0,268,269,3,86,43,0,269,79,1,0,0,0,270,271,5,
        21,0,0,271,272,5,20,0,0,272,273,3,86,43,0,273,81,1,0,0,0,274,275,
        5,19,0,0,275,276,5,29,0,0,276,277,3,86,43,0,277,83,1,0,0,0,278,279,
        5,19,0,0,279,280,5,30,0,0,280,281,3,86,43,0,281,85,1,0,0,0,282,283,
        5,53,0,0,283,87,1,0,0,0,11,91,98,120,128,133,145,150,155,160,181,
        257
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
    public pagesFilter(): PagesFilterContext | null {
        return this.getRuleContext(0, PagesFilterContext);
    }
    public authorFilter(): AuthorFilterContext | null {
        return this.getRuleContext(0, AuthorFilterContext);
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


export class PagesFilterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public WHOSE(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.WHOSE, 0)!;
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
    public value(): ValueContext {
        return this.getRuleContext(0, ValueContext)!;
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
