
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
    public static readonly NL = 23;
    public static readonly WS = 24;
    public static readonly ADD_WS = 25;
    public static readonly BY_WS = 26;
    public static readonly ISBN = 27;
    public static readonly SUMMARY = 28;
    public static readonly PAGES = 29;
    public static readonly WITH_WS = 30;
    public static readonly LANGUAGE = 31;
    public static readonly IN_WS = 32;
    public static readonly PUBLISHED_WS = 33;
    public static readonly OVER = 34;
    public static readonly UNDER = 35;
    public static readonly EQUAL = 36;
    public static readonly TO = 37;
    public static readonly OR = 38;
    public static readonly OTHER = 39;
    public static readonly THAN = 40;
    public static readonly BETWEEN = 41;
    public static readonly AND = 42;
    public static readonly NUMBER = 43;
    public static readonly PAGE_WS = 44;
    public static readonly VALUE = 45;
    public static readonly VALUE_WS = 46;
    public static readonly RULE_entry = 0;
    public static readonly RULE_command = 1;
    public static readonly RULE_addBookCmd = 2;
    public static readonly RULE_updateBookCmd = 3;
    public static readonly RULE_removeBookCmd = 4;
    public static readonly RULE_listBooksCmd = 5;
    public static readonly RULE_pagesFilter = 6;
    public static readonly RULE_pageComparison = 7;
    public static readonly RULE_pagesOver = 8;
    public static readonly RULE_pagesUnder = 9;
    public static readonly RULE_pagesEqual = 10;
    public static readonly RULE_pagesAtLeast = 11;
    public static readonly RULE_pagesAtMost = 12;
    public static readonly RULE_pagesOtherThan = 13;
    public static readonly RULE_pagesBetween = 14;
    public static readonly RULE_orOver = 15;
    public static readonly RULE_orUnder = 16;
    public static readonly RULE_andBound = 17;
    public static readonly RULE_addAuthorCmd = 18;
    public static readonly RULE_updateAuthorCmd = 19;
    public static readonly RULE_removeAuthorCmd = 20;
    public static readonly RULE_listAuthorsCmd = 21;
    public static readonly RULE_findCmd = 22;
    public static readonly RULE_keywords = 23;
    public static readonly RULE_dashboardCmd = 24;
    public static readonly RULE_libraryCmd = 25;
    public static readonly RULE_settingsCmd = 26;
    public static readonly RULE_aboutCmd = 27;
    public static readonly RULE_helpCmd = 28;
    public static readonly RULE_accountCmd = 29;
    public static readonly RULE_loginCmd = 30;
    public static readonly RULE_logoutCmd = 31;
    public static readonly RULE_bookTitle = 32;
    public static readonly RULE_authorName = 33;
    public static readonly RULE_bookDetailParam = 34;
    public static readonly RULE_authorParam = 35;
    public static readonly RULE_subtitleParam = 36;
    public static readonly RULE_languageParam = 37;
    public static readonly RULE_publicationYearParam = 38;
    public static readonly RULE_isbnParam = 39;
    public static readonly RULE_summaryParam = 40;
    public static readonly RULE_value = 41;

    public static readonly literalNames = [
        null, "'add'", "'find'", "'update'", "'remove'", "'list'", "'book'", 
        "'books'", "'author'", "'authors'", "'dashboard'", "'library'", 
        "'settings'", "'about'", "'help'", "'account'", "'login'", "'logout'", 
        "'by'", "'with'", "'in'", "'published'", "'subtitled'", null, null, 
        null, null, "'isbn'", "'summary'", "'pages'", null, "'language'", 
        null, null, "'over'", "'under'", "'equal'", "'to'", "'or'", "'other'", 
        "'than'", "'between'", "'and'"
    ];

    public static readonly symbolicNames = [
        null, "ADD", "FIND", "UPDATE", "REMOVE", "LIST", "BOOK", "BOOKS", 
        "AUTHOR", "AUTHORS", "DASHBOARD", "LIBRARY", "SETTINGS", "ABOUT", 
        "HELP", "ACCOUNT", "LOGIN", "LOGOUT", "BY", "WITH", "IN", "PUBLISHED", 
        "SUBTITLED", "NL", "WS", "ADD_WS", "BY_WS", "ISBN", "SUMMARY", "PAGES", 
        "WITH_WS", "LANGUAGE", "IN_WS", "PUBLISHED_WS", "OVER", "UNDER", 
        "EQUAL", "TO", "OR", "OTHER", "THAN", "BETWEEN", "AND", "NUMBER", 
        "PAGE_WS", "VALUE", "VALUE_WS"
    ];
    public static readonly ruleNames = [
        "entry", "command", "addBookCmd", "updateBookCmd", "removeBookCmd", 
        "listBooksCmd", "pagesFilter", "pageComparison", "pagesOver", "pagesUnder", 
        "pagesEqual", "pagesAtLeast", "pagesAtMost", "pagesOtherThan", "pagesBetween", 
        "orOver", "orUnder", "andBound", "addAuthorCmd", "updateAuthorCmd", 
        "removeAuthorCmd", "listAuthorsCmd", "findCmd", "keywords", "dashboardCmd", 
        "libraryCmd", "settingsCmd", "aboutCmd", "helpCmd", "accountCmd", 
        "loginCmd", "logoutCmd", "bookTitle", "authorName", "bookDetailParam", 
        "authorParam", "subtitleParam", "languageParam", "publicationYearParam", 
        "isbnParam", "summaryParam", "value",
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
            this.state = 87;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 23) {
                {
                {
                this.state = 84;
                this.match(ImperaBookDSLParser.NL);
                }
                }
                this.state = 89;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 90;
            this.command();
            this.state = 94;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 23) {
                {
                {
                this.state = 91;
                this.match(ImperaBookDSLParser.NL);
                }
                }
                this.state = 96;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 97;
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
            this.state = 116;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 99;
                this.addBookCmd();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 100;
                this.updateBookCmd();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 101;
                this.removeBookCmd();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 102;
                this.listBooksCmd();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 103;
                this.addAuthorCmd();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 104;
                this.updateAuthorCmd();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 105;
                this.removeAuthorCmd();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 106;
                this.listAuthorsCmd();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 107;
                this.dashboardCmd();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 108;
                this.libraryCmd();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 109;
                this.settingsCmd();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 110;
                this.aboutCmd();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 111;
                this.helpCmd();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 112;
                this.accountCmd();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 113;
                this.loginCmd();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 114;
                this.logoutCmd();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 115;
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
            this.state = 118;
            this.match(ImperaBookDSLParser.ADD);
            this.state = 119;
            this.match(ImperaBookDSLParser.BOOK);
            this.state = 120;
            this.bookTitle();
            this.state = 129;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 122;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    do {
                        {
                        {
                        this.state = 121;
                        this.match(ImperaBookDSLParser.NL);
                        }
                        }
                        this.state = 124;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    } while (_la === 23);
                    this.state = 126;
                    this.bookDetailParam();
                    }
                    }
                }
                this.state = 131;
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
            this.state = 132;
            this.match(ImperaBookDSLParser.UPDATE);
            this.state = 133;
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
            this.state = 135;
            this.match(ImperaBookDSLParser.REMOVE);
            this.state = 136;
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
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 138;
            this.match(ImperaBookDSLParser.LIST);
            this.state = 139;
            this.match(ImperaBookDSLParser.BOOKS);
            this.state = 141;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 19) {
                {
                this.state = 140;
                this.pagesFilter();
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
    public pagesFilter(): PagesFilterContext {
        let localContext = new PagesFilterContext(this.context, this.state);
        this.enterRule(localContext, 12, ImperaBookDSLParser.RULE_pagesFilter);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 143;
            this.match(ImperaBookDSLParser.WITH);
            this.state = 144;
            this.match(ImperaBookDSLParser.PAGES);
            this.state = 145;
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
        this.enterRule(localContext, 14, ImperaBookDSLParser.RULE_pageComparison);
        try {
            this.state = 154;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 147;
                this.pagesOver();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 148;
                this.pagesUnder();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 149;
                this.pagesEqual();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 150;
                this.pagesAtLeast();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 151;
                this.pagesAtMost();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 152;
                this.pagesOtherThan();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 153;
                this.pagesBetween();
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
    public pagesOver(): PagesOverContext {
        let localContext = new PagesOverContext(this.context, this.state);
        this.enterRule(localContext, 16, ImperaBookDSLParser.RULE_pagesOver);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 156;
            this.match(ImperaBookDSLParser.OVER);
            this.state = 157;
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
    public pagesUnder(): PagesUnderContext {
        let localContext = new PagesUnderContext(this.context, this.state);
        this.enterRule(localContext, 18, ImperaBookDSLParser.RULE_pagesUnder);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 159;
            this.match(ImperaBookDSLParser.UNDER);
            this.state = 160;
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
    public pagesEqual(): PagesEqualContext {
        let localContext = new PagesEqualContext(this.context, this.state);
        this.enterRule(localContext, 20, ImperaBookDSLParser.RULE_pagesEqual);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 162;
            this.match(ImperaBookDSLParser.EQUAL);
            this.state = 163;
            this.match(ImperaBookDSLParser.TO);
            this.state = 164;
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
    public pagesAtLeast(): PagesAtLeastContext {
        let localContext = new PagesAtLeastContext(this.context, this.state);
        this.enterRule(localContext, 22, ImperaBookDSLParser.RULE_pagesAtLeast);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 166;
            this.match(ImperaBookDSLParser.NUMBER);
            this.state = 167;
            this.orOver();
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
        this.enterRule(localContext, 24, ImperaBookDSLParser.RULE_pagesAtMost);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 169;
            this.match(ImperaBookDSLParser.NUMBER);
            this.state = 170;
            this.orUnder();
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
    public pagesOtherThan(): PagesOtherThanContext {
        let localContext = new PagesOtherThanContext(this.context, this.state);
        this.enterRule(localContext, 26, ImperaBookDSLParser.RULE_pagesOtherThan);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 172;
            this.match(ImperaBookDSLParser.OTHER);
            this.state = 173;
            this.match(ImperaBookDSLParser.THAN);
            this.state = 174;
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
    public pagesBetween(): PagesBetweenContext {
        let localContext = new PagesBetweenContext(this.context, this.state);
        this.enterRule(localContext, 28, ImperaBookDSLParser.RULE_pagesBetween);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 176;
            this.match(ImperaBookDSLParser.BETWEEN);
            this.state = 177;
            this.match(ImperaBookDSLParser.NUMBER);
            this.state = 178;
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
    public orOver(): OrOverContext {
        let localContext = new OrOverContext(this.context, this.state);
        this.enterRule(localContext, 30, ImperaBookDSLParser.RULE_orOver);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 180;
            this.match(ImperaBookDSLParser.OR);
            this.state = 181;
            this.match(ImperaBookDSLParser.OVER);
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
    public orUnder(): OrUnderContext {
        let localContext = new OrUnderContext(this.context, this.state);
        this.enterRule(localContext, 32, ImperaBookDSLParser.RULE_orUnder);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 183;
            this.match(ImperaBookDSLParser.OR);
            this.state = 184;
            this.match(ImperaBookDSLParser.UNDER);
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
        this.enterRule(localContext, 34, ImperaBookDSLParser.RULE_andBound);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 186;
            this.match(ImperaBookDSLParser.AND);
            this.state = 187;
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
        this.enterRule(localContext, 36, ImperaBookDSLParser.RULE_addAuthorCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 189;
            this.match(ImperaBookDSLParser.ADD);
            this.state = 190;
            this.match(ImperaBookDSLParser.AUTHOR);
            this.state = 191;
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
        this.enterRule(localContext, 38, ImperaBookDSLParser.RULE_updateAuthorCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 193;
            this.match(ImperaBookDSLParser.UPDATE);
            this.state = 194;
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
        this.enterRule(localContext, 40, ImperaBookDSLParser.RULE_removeAuthorCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 196;
            this.match(ImperaBookDSLParser.REMOVE);
            this.state = 197;
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
        this.enterRule(localContext, 42, ImperaBookDSLParser.RULE_listAuthorsCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 199;
            this.match(ImperaBookDSLParser.LIST);
            this.state = 200;
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
        this.enterRule(localContext, 44, ImperaBookDSLParser.RULE_findCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 202;
            this.match(ImperaBookDSLParser.FIND);
            this.state = 203;
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
        this.enterRule(localContext, 46, ImperaBookDSLParser.RULE_keywords);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 205;
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
        this.enterRule(localContext, 48, ImperaBookDSLParser.RULE_dashboardCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 207;
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
        this.enterRule(localContext, 50, ImperaBookDSLParser.RULE_libraryCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 209;
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
        this.enterRule(localContext, 52, ImperaBookDSLParser.RULE_settingsCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 211;
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
        this.enterRule(localContext, 54, ImperaBookDSLParser.RULE_aboutCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 213;
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
        this.enterRule(localContext, 56, ImperaBookDSLParser.RULE_helpCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 215;
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
        this.enterRule(localContext, 58, ImperaBookDSLParser.RULE_accountCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 217;
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
        this.enterRule(localContext, 60, ImperaBookDSLParser.RULE_loginCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 219;
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
        this.enterRule(localContext, 62, ImperaBookDSLParser.RULE_logoutCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 221;
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
        this.enterRule(localContext, 64, ImperaBookDSLParser.RULE_bookTitle);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 223;
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
        this.enterRule(localContext, 66, ImperaBookDSLParser.RULE_authorName);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 225;
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
        this.enterRule(localContext, 68, ImperaBookDSLParser.RULE_bookDetailParam);
        try {
            this.state = 233;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 7, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 227;
                this.authorParam();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 228;
                this.subtitleParam();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 229;
                this.languageParam();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 230;
                this.publicationYearParam();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 231;
                this.isbnParam();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 232;
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
        this.enterRule(localContext, 70, ImperaBookDSLParser.RULE_authorParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 235;
            this.match(ImperaBookDSLParser.BY);
            this.state = 236;
            this.match(ImperaBookDSLParser.AUTHOR);
            this.state = 237;
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
        this.enterRule(localContext, 72, ImperaBookDSLParser.RULE_subtitleParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 239;
            this.match(ImperaBookDSLParser.SUBTITLED);
            this.state = 240;
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
        this.enterRule(localContext, 74, ImperaBookDSLParser.RULE_languageParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 242;
            this.match(ImperaBookDSLParser.IN);
            this.state = 243;
            this.match(ImperaBookDSLParser.LANGUAGE);
            this.state = 244;
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
        this.enterRule(localContext, 76, ImperaBookDSLParser.RULE_publicationYearParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 246;
            this.match(ImperaBookDSLParser.PUBLISHED);
            this.state = 247;
            this.match(ImperaBookDSLParser.IN);
            this.state = 248;
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
        this.enterRule(localContext, 78, ImperaBookDSLParser.RULE_isbnParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 250;
            this.match(ImperaBookDSLParser.WITH);
            this.state = 251;
            this.match(ImperaBookDSLParser.ISBN);
            this.state = 252;
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
        this.enterRule(localContext, 80, ImperaBookDSLParser.RULE_summaryParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 254;
            this.match(ImperaBookDSLParser.WITH);
            this.state = 255;
            this.match(ImperaBookDSLParser.SUMMARY);
            this.state = 256;
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
        this.enterRule(localContext, 82, ImperaBookDSLParser.RULE_value);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 258;
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
        4,1,46,261,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,1,0,5,0,86,8,0,10,0,12,0,89,9,0,1,0,1,0,5,0,
        93,8,0,10,0,12,0,96,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,117,8,1,1,2,1,2,1,2,1,2,
        4,2,123,8,2,11,2,12,2,124,1,2,5,2,128,8,2,10,2,12,2,131,9,2,1,3,
        1,3,1,3,1,4,1,4,1,4,1,5,1,5,1,5,3,5,142,8,5,1,6,1,6,1,6,1,6,1,7,
        1,7,1,7,1,7,1,7,1,7,1,7,3,7,155,8,7,1,8,1,8,1,8,1,9,1,9,1,9,1,10,
        1,10,1,10,1,10,1,11,1,11,1,11,1,12,1,12,1,12,1,13,1,13,1,13,1,13,
        1,14,1,14,1,14,1,14,1,15,1,15,1,15,1,16,1,16,1,16,1,17,1,17,1,17,
        1,18,1,18,1,18,1,18,1,19,1,19,1,19,1,20,1,20,1,20,1,21,1,21,1,21,
        1,22,1,22,1,22,1,23,1,23,1,24,1,24,1,25,1,25,1,26,1,26,1,27,1,27,
        1,28,1,28,1,29,1,29,1,30,1,30,1,31,1,31,1,32,1,32,1,33,1,33,1,34,
        1,34,1,34,1,34,1,34,1,34,3,34,234,8,34,1,35,1,35,1,35,1,35,1,36,
        1,36,1,36,1,37,1,37,1,37,1,37,1,38,1,38,1,38,1,38,1,39,1,39,1,39,
        1,39,1,40,1,40,1,40,1,40,1,41,1,41,1,41,0,0,42,0,2,4,6,8,10,12,14,
        16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,
        60,62,64,66,68,70,72,74,76,78,80,82,0,0,250,0,87,1,0,0,0,2,116,1,
        0,0,0,4,118,1,0,0,0,6,132,1,0,0,0,8,135,1,0,0,0,10,138,1,0,0,0,12,
        143,1,0,0,0,14,154,1,0,0,0,16,156,1,0,0,0,18,159,1,0,0,0,20,162,
        1,0,0,0,22,166,1,0,0,0,24,169,1,0,0,0,26,172,1,0,0,0,28,176,1,0,
        0,0,30,180,1,0,0,0,32,183,1,0,0,0,34,186,1,0,0,0,36,189,1,0,0,0,
        38,193,1,0,0,0,40,196,1,0,0,0,42,199,1,0,0,0,44,202,1,0,0,0,46,205,
        1,0,0,0,48,207,1,0,0,0,50,209,1,0,0,0,52,211,1,0,0,0,54,213,1,0,
        0,0,56,215,1,0,0,0,58,217,1,0,0,0,60,219,1,0,0,0,62,221,1,0,0,0,
        64,223,1,0,0,0,66,225,1,0,0,0,68,233,1,0,0,0,70,235,1,0,0,0,72,239,
        1,0,0,0,74,242,1,0,0,0,76,246,1,0,0,0,78,250,1,0,0,0,80,254,1,0,
        0,0,82,258,1,0,0,0,84,86,5,23,0,0,85,84,1,0,0,0,86,89,1,0,0,0,87,
        85,1,0,0,0,87,88,1,0,0,0,88,90,1,0,0,0,89,87,1,0,0,0,90,94,3,2,1,
        0,91,93,5,23,0,0,92,91,1,0,0,0,93,96,1,0,0,0,94,92,1,0,0,0,94,95,
        1,0,0,0,95,97,1,0,0,0,96,94,1,0,0,0,97,98,5,0,0,1,98,1,1,0,0,0,99,
        117,3,4,2,0,100,117,3,6,3,0,101,117,3,8,4,0,102,117,3,10,5,0,103,
        117,3,36,18,0,104,117,3,38,19,0,105,117,3,40,20,0,106,117,3,42,21,
        0,107,117,3,48,24,0,108,117,3,50,25,0,109,117,3,52,26,0,110,117,
        3,54,27,0,111,117,3,56,28,0,112,117,3,58,29,0,113,117,3,60,30,0,
        114,117,3,62,31,0,115,117,3,44,22,0,116,99,1,0,0,0,116,100,1,0,0,
        0,116,101,1,0,0,0,116,102,1,0,0,0,116,103,1,0,0,0,116,104,1,0,0,
        0,116,105,1,0,0,0,116,106,1,0,0,0,116,107,1,0,0,0,116,108,1,0,0,
        0,116,109,1,0,0,0,116,110,1,0,0,0,116,111,1,0,0,0,116,112,1,0,0,
        0,116,113,1,0,0,0,116,114,1,0,0,0,116,115,1,0,0,0,117,3,1,0,0,0,
        118,119,5,1,0,0,119,120,5,6,0,0,120,129,3,64,32,0,121,123,5,23,0,
        0,122,121,1,0,0,0,123,124,1,0,0,0,124,122,1,0,0,0,124,125,1,0,0,
        0,125,126,1,0,0,0,126,128,3,68,34,0,127,122,1,0,0,0,128,131,1,0,
        0,0,129,127,1,0,0,0,129,130,1,0,0,0,130,5,1,0,0,0,131,129,1,0,0,
        0,132,133,5,3,0,0,133,134,5,6,0,0,134,7,1,0,0,0,135,136,5,4,0,0,
        136,137,5,6,0,0,137,9,1,0,0,0,138,139,5,5,0,0,139,141,5,7,0,0,140,
        142,3,12,6,0,141,140,1,0,0,0,141,142,1,0,0,0,142,11,1,0,0,0,143,
        144,5,19,0,0,144,145,5,29,0,0,145,146,3,14,7,0,146,13,1,0,0,0,147,
        155,3,16,8,0,148,155,3,18,9,0,149,155,3,20,10,0,150,155,3,22,11,
        0,151,155,3,24,12,0,152,155,3,26,13,0,153,155,3,28,14,0,154,147,
        1,0,0,0,154,148,1,0,0,0,154,149,1,0,0,0,154,150,1,0,0,0,154,151,
        1,0,0,0,154,152,1,0,0,0,154,153,1,0,0,0,155,15,1,0,0,0,156,157,5,
        34,0,0,157,158,5,43,0,0,158,17,1,0,0,0,159,160,5,35,0,0,160,161,
        5,43,0,0,161,19,1,0,0,0,162,163,5,36,0,0,163,164,5,37,0,0,164,165,
        5,43,0,0,165,21,1,0,0,0,166,167,5,43,0,0,167,168,3,30,15,0,168,23,
        1,0,0,0,169,170,5,43,0,0,170,171,3,32,16,0,171,25,1,0,0,0,172,173,
        5,39,0,0,173,174,5,40,0,0,174,175,5,43,0,0,175,27,1,0,0,0,176,177,
        5,41,0,0,177,178,5,43,0,0,178,179,3,34,17,0,179,29,1,0,0,0,180,181,
        5,38,0,0,181,182,5,34,0,0,182,31,1,0,0,0,183,184,5,38,0,0,184,185,
        5,35,0,0,185,33,1,0,0,0,186,187,5,42,0,0,187,188,5,43,0,0,188,35,
        1,0,0,0,189,190,5,1,0,0,190,191,5,8,0,0,191,192,3,66,33,0,192,37,
        1,0,0,0,193,194,5,3,0,0,194,195,5,8,0,0,195,39,1,0,0,0,196,197,5,
        4,0,0,197,198,5,8,0,0,198,41,1,0,0,0,199,200,5,5,0,0,200,201,5,9,
        0,0,201,43,1,0,0,0,202,203,5,2,0,0,203,204,3,46,23,0,204,45,1,0,
        0,0,205,206,5,45,0,0,206,47,1,0,0,0,207,208,5,10,0,0,208,49,1,0,
        0,0,209,210,5,11,0,0,210,51,1,0,0,0,211,212,5,12,0,0,212,53,1,0,
        0,0,213,214,5,13,0,0,214,55,1,0,0,0,215,216,5,14,0,0,216,57,1,0,
        0,0,217,218,5,15,0,0,218,59,1,0,0,0,219,220,5,16,0,0,220,61,1,0,
        0,0,221,222,5,17,0,0,222,63,1,0,0,0,223,224,5,45,0,0,224,65,1,0,
        0,0,225,226,5,45,0,0,226,67,1,0,0,0,227,234,3,70,35,0,228,234,3,
        72,36,0,229,234,3,74,37,0,230,234,3,76,38,0,231,234,3,78,39,0,232,
        234,3,80,40,0,233,227,1,0,0,0,233,228,1,0,0,0,233,229,1,0,0,0,233,
        230,1,0,0,0,233,231,1,0,0,0,233,232,1,0,0,0,234,69,1,0,0,0,235,236,
        5,18,0,0,236,237,5,8,0,0,237,238,3,82,41,0,238,71,1,0,0,0,239,240,
        5,22,0,0,240,241,3,82,41,0,241,73,1,0,0,0,242,243,5,20,0,0,243,244,
        5,31,0,0,244,245,3,82,41,0,245,75,1,0,0,0,246,247,5,21,0,0,247,248,
        5,20,0,0,248,249,3,82,41,0,249,77,1,0,0,0,250,251,5,19,0,0,251,252,
        5,27,0,0,252,253,3,82,41,0,253,79,1,0,0,0,254,255,5,19,0,0,255,256,
        5,28,0,0,256,257,3,82,41,0,257,81,1,0,0,0,258,259,5,45,0,0,259,83,
        1,0,0,0,8,87,94,116,124,129,141,154,233
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
    public pagesFilter(): PagesFilterContext | null {
        return this.getRuleContext(0, PagesFilterContext);
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


export class PagesFilterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public WITH(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.WITH, 0)!;
    }
    public PAGES(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.PAGES, 0)!;
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
    public pagesOver(): PagesOverContext | null {
        return this.getRuleContext(0, PagesOverContext);
    }
    public pagesUnder(): PagesUnderContext | null {
        return this.getRuleContext(0, PagesUnderContext);
    }
    public pagesEqual(): PagesEqualContext | null {
        return this.getRuleContext(0, PagesEqualContext);
    }
    public pagesAtLeast(): PagesAtLeastContext | null {
        return this.getRuleContext(0, PagesAtLeastContext);
    }
    public pagesAtMost(): PagesAtMostContext | null {
        return this.getRuleContext(0, PagesAtMostContext);
    }
    public pagesOtherThan(): PagesOtherThanContext | null {
        return this.getRuleContext(0, PagesOtherThanContext);
    }
    public pagesBetween(): PagesBetweenContext | null {
        return this.getRuleContext(0, PagesBetweenContext);
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


export class PagesOverContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public OVER(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.OVER, 0)!;
    }
    public NUMBER(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.NUMBER, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_pagesOver;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterPagesOver) {
             listener.enterPagesOver(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitPagesOver) {
             listener.exitPagesOver(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitPagesOver) {
            return visitor.visitPagesOver(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PagesUnderContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public UNDER(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.UNDER, 0)!;
    }
    public NUMBER(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.NUMBER, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_pagesUnder;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterPagesUnder) {
             listener.enterPagesUnder(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitPagesUnder) {
             listener.exitPagesUnder(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitPagesUnder) {
            return visitor.visitPagesUnder(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PagesEqualContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EQUAL(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.EQUAL, 0)!;
    }
    public TO(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.TO, 0)!;
    }
    public NUMBER(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.NUMBER, 0)!;
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


export class PagesAtLeastContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NUMBER(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.NUMBER, 0)!;
    }
    public orOver(): OrOverContext {
        return this.getRuleContext(0, OrOverContext)!;
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
    public NUMBER(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.NUMBER, 0)!;
    }
    public orUnder(): OrUnderContext {
        return this.getRuleContext(0, OrUnderContext)!;
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


export class PagesOtherThanContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public OTHER(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.OTHER, 0)!;
    }
    public THAN(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.THAN, 0)!;
    }
    public NUMBER(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.NUMBER, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_pagesOtherThan;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterPagesOtherThan) {
             listener.enterPagesOtherThan(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitPagesOtherThan) {
             listener.exitPagesOtherThan(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitPagesOtherThan) {
            return visitor.visitPagesOtherThan(this);
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
    public NUMBER(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.NUMBER, 0)!;
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


export class OrOverContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public OR(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.OR, 0)!;
    }
    public OVER(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.OVER, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_orOver;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterOrOver) {
             listener.enterOrOver(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitOrOver) {
             listener.exitOrOver(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitOrOver) {
            return visitor.visitOrOver(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class OrUnderContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public OR(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.OR, 0)!;
    }
    public UNDER(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.UNDER, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_orUnder;
    }
    public override enterRule(listener: ImperaBookDSLParserListener): void {
        if(listener.enterOrUnder) {
             listener.enterOrUnder(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLParserListener): void {
        if(listener.exitOrUnder) {
             listener.exitOrUnder(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLParserVisitor<Result>): Result | null {
        if (visitor.visitOrUnder) {
            return visitor.visitOrUnder(this);
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
    public NUMBER(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.NUMBER, 0)!;
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
