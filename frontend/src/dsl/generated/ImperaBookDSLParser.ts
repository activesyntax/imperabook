
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { ImperaBookDSLListener } from "./ImperaBookDSLListener.js";
import { ImperaBookDSLVisitor } from "./ImperaBookDSLVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class ImperaBookDSLParser extends antlr.Parser {
    public static readonly ADD = 1;
    public static readonly UPDATE = 2;
    public static readonly REMOVE = 3;
    public static readonly SHOW = 4;
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
    public static readonly TITLE = 20;
    public static readonly SUBTITLED = 21;
    public static readonly IN = 22;
    public static readonly LANGUAGE = 23;
    public static readonly PUBLISHED = 24;
    public static readonly ISBN = 25;
    public static readonly SUMMARY = 26;
    public static readonly STRING = 27;
    public static readonly NUMBER = 28;
    public static readonly WS = 29;
    public static readonly RULE_entry = 0;
    public static readonly RULE_command = 1;
    public static readonly RULE_addBookCmd = 2;
    public static readonly RULE_updateBookCmd = 3;
    public static readonly RULE_removeBookCmd = 4;
    public static readonly RULE_showBookCmd = 5;
    public static readonly RULE_listBooksCmd = 6;
    public static readonly RULE_addAuthorCmd = 7;
    public static readonly RULE_updateAuthorCmd = 8;
    public static readonly RULE_removeAuthorCmd = 9;
    public static readonly RULE_listAuthorsCmd = 10;
    public static readonly RULE_dashboardCmd = 11;
    public static readonly RULE_libraryCmd = 12;
    public static readonly RULE_settingsCmd = 13;
    public static readonly RULE_aboutCmd = 14;
    public static readonly RULE_helpCmd = 15;
    public static readonly RULE_accountCmd = 16;
    public static readonly RULE_loginCmd = 17;
    public static readonly RULE_logoutCmd = 18;
    public static readonly RULE_authorParam = 19;
    public static readonly RULE_titleParam = 20;
    public static readonly RULE_bookDetailParam = 21;
    public static readonly RULE_subtitleParam = 22;
    public static readonly RULE_languageParam = 23;
    public static readonly RULE_publicationYearParam = 24;
    public static readonly RULE_isbnParam = 25;
    public static readonly RULE_summaryParam = 26;

    public static readonly literalNames = [
        null, "'add'", "'update'", "'remove'", "'show'", "'list'", "'book'", 
        "'books'", "'author'", "'authors'", "'dashboard'", "'library'", 
        "'settings'", "'about'", "'help'", "'account'", "'login'", "'logout'", 
        "'by'", "'with'", "'title'", "'subtitled'", "'in'", "'language'", 
        "'published'", "'isbn'", "'summary'"
    ];

    public static readonly symbolicNames = [
        null, "ADD", "UPDATE", "REMOVE", "SHOW", "LIST", "BOOK", "BOOKS", 
        "AUTHOR", "AUTHORS", "DASHBOARD", "LIBRARY", "SETTINGS", "ABOUT", 
        "HELP", "ACCOUNT", "LOGIN", "LOGOUT", "BY", "WITH", "TITLE", "SUBTITLED", 
        "IN", "LANGUAGE", "PUBLISHED", "ISBN", "SUMMARY", "STRING", "NUMBER", 
        "WS"
    ];
    public static readonly ruleNames = [
        "entry", "command", "addBookCmd", "updateBookCmd", "removeBookCmd", 
        "showBookCmd", "listBooksCmd", "addAuthorCmd", "updateAuthorCmd", 
        "removeAuthorCmd", "listAuthorsCmd", "dashboardCmd", "libraryCmd", 
        "settingsCmd", "aboutCmd", "helpCmd", "accountCmd", "loginCmd", 
        "logoutCmd", "authorParam", "titleParam", "bookDetailParam", "subtitleParam", 
        "languageParam", "publicationYearParam", "isbnParam", "summaryParam",
    ];

    public get grammarFileName(): string { return "ImperaBookDSL.g4"; }
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
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 54;
            this.command();
            this.state = 55;
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
            this.state = 74;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 57;
                this.addBookCmd();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 58;
                this.updateBookCmd();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 59;
                this.removeBookCmd();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 60;
                this.showBookCmd();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 61;
                this.listBooksCmd();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 62;
                this.addAuthorCmd();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 63;
                this.updateAuthorCmd();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 64;
                this.removeAuthorCmd();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 65;
                this.listAuthorsCmd();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 66;
                this.dashboardCmd();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 67;
                this.libraryCmd();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 68;
                this.settingsCmd();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 69;
                this.aboutCmd();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 70;
                this.helpCmd();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 71;
                this.accountCmd();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 72;
                this.loginCmd();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 73;
                this.logoutCmd();
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
            this.state = 76;
            this.match(ImperaBookDSLParser.ADD);
            this.state = 77;
            this.match(ImperaBookDSLParser.BOOK);
            this.state = 81;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 78;
                    this.bookDetailParam();
                    }
                    }
                }
                this.state = 83;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            }
            this.state = 102;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ImperaBookDSLParser.BY:
                {
                this.state = 84;
                this.authorParam();
                this.state = 88;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 2, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 85;
                        this.bookDetailParam();
                        }
                        }
                    }
                    this.state = 90;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 2, this.context);
                }
                this.state = 91;
                this.titleParam();
                }
                break;
            case ImperaBookDSLParser.WITH:
                {
                this.state = 93;
                this.titleParam();
                this.state = 97;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 23592960) !== 0)) {
                    {
                    {
                    this.state = 94;
                    this.bookDetailParam();
                    }
                    }
                    this.state = 99;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 100;
                this.authorParam();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 107;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 23592960) !== 0)) {
                {
                {
                this.state = 104;
                this.bookDetailParam();
                }
                }
                this.state = 109;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
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
            this.state = 110;
            this.match(ImperaBookDSLParser.UPDATE);
            this.state = 111;
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
            this.state = 113;
            this.match(ImperaBookDSLParser.REMOVE);
            this.state = 114;
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
    public showBookCmd(): ShowBookCmdContext {
        let localContext = new ShowBookCmdContext(this.context, this.state);
        this.enterRule(localContext, 10, ImperaBookDSLParser.RULE_showBookCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 116;
            this.match(ImperaBookDSLParser.SHOW);
            this.state = 117;
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
        this.enterRule(localContext, 12, ImperaBookDSLParser.RULE_listBooksCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 119;
            this.match(ImperaBookDSLParser.LIST);
            this.state = 120;
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
    public addAuthorCmd(): AddAuthorCmdContext {
        let localContext = new AddAuthorCmdContext(this.context, this.state);
        this.enterRule(localContext, 14, ImperaBookDSLParser.RULE_addAuthorCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 122;
            this.match(ImperaBookDSLParser.ADD);
            this.state = 123;
            this.match(ImperaBookDSLParser.AUTHOR);
            this.state = 124;
            this.match(ImperaBookDSLParser.STRING);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 16, ImperaBookDSLParser.RULE_updateAuthorCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 126;
            this.match(ImperaBookDSLParser.UPDATE);
            this.state = 127;
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
        this.enterRule(localContext, 18, ImperaBookDSLParser.RULE_removeAuthorCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 129;
            this.match(ImperaBookDSLParser.REMOVE);
            this.state = 130;
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
        this.enterRule(localContext, 20, ImperaBookDSLParser.RULE_listAuthorsCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 132;
            this.match(ImperaBookDSLParser.LIST);
            this.state = 133;
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
    public dashboardCmd(): DashboardCmdContext {
        let localContext = new DashboardCmdContext(this.context, this.state);
        this.enterRule(localContext, 22, ImperaBookDSLParser.RULE_dashboardCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 135;
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
        this.enterRule(localContext, 24, ImperaBookDSLParser.RULE_libraryCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 137;
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
        this.enterRule(localContext, 26, ImperaBookDSLParser.RULE_settingsCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 139;
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
        this.enterRule(localContext, 28, ImperaBookDSLParser.RULE_aboutCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 141;
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
        this.enterRule(localContext, 30, ImperaBookDSLParser.RULE_helpCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 143;
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
        this.enterRule(localContext, 32, ImperaBookDSLParser.RULE_accountCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 145;
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
        this.enterRule(localContext, 34, ImperaBookDSLParser.RULE_loginCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 147;
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
        this.enterRule(localContext, 36, ImperaBookDSLParser.RULE_logoutCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 149;
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
    public authorParam(): AuthorParamContext {
        let localContext = new AuthorParamContext(this.context, this.state);
        this.enterRule(localContext, 38, ImperaBookDSLParser.RULE_authorParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 151;
            this.match(ImperaBookDSLParser.BY);
            this.state = 152;
            this.match(ImperaBookDSLParser.AUTHOR);
            this.state = 153;
            this.match(ImperaBookDSLParser.STRING);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public titleParam(): TitleParamContext {
        let localContext = new TitleParamContext(this.context, this.state);
        this.enterRule(localContext, 40, ImperaBookDSLParser.RULE_titleParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 155;
            this.match(ImperaBookDSLParser.WITH);
            this.state = 156;
            this.match(ImperaBookDSLParser.TITLE);
            this.state = 157;
            this.match(ImperaBookDSLParser.STRING);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 42, ImperaBookDSLParser.RULE_bookDetailParam);
        try {
            this.state = 164;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 159;
                this.subtitleParam();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 160;
                this.languageParam();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 161;
                this.publicationYearParam();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 162;
                this.isbnParam();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 163;
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
    public subtitleParam(): SubtitleParamContext {
        let localContext = new SubtitleParamContext(this.context, this.state);
        this.enterRule(localContext, 44, ImperaBookDSLParser.RULE_subtitleParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 166;
            this.match(ImperaBookDSLParser.SUBTITLED);
            this.state = 167;
            this.match(ImperaBookDSLParser.STRING);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 46, ImperaBookDSLParser.RULE_languageParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 169;
            this.match(ImperaBookDSLParser.IN);
            this.state = 170;
            this.match(ImperaBookDSLParser.LANGUAGE);
            this.state = 171;
            this.match(ImperaBookDSLParser.STRING);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 48, ImperaBookDSLParser.RULE_publicationYearParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 173;
            this.match(ImperaBookDSLParser.PUBLISHED);
            this.state = 174;
            this.match(ImperaBookDSLParser.IN);
            this.state = 175;
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
    public isbnParam(): IsbnParamContext {
        let localContext = new IsbnParamContext(this.context, this.state);
        this.enterRule(localContext, 50, ImperaBookDSLParser.RULE_isbnParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 177;
            this.match(ImperaBookDSLParser.WITH);
            this.state = 178;
            this.match(ImperaBookDSLParser.ISBN);
            this.state = 179;
            this.match(ImperaBookDSLParser.STRING);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 52, ImperaBookDSLParser.RULE_summaryParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 181;
            this.match(ImperaBookDSLParser.WITH);
            this.state = 182;
            this.match(ImperaBookDSLParser.SUMMARY);
            this.state = 183;
            this.match(ImperaBookDSLParser.STRING);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        4,1,29,186,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,3,1,75,8,1,1,2,1,2,1,2,5,2,80,8,2,10,2,12,2,83,9,
        2,1,2,1,2,5,2,87,8,2,10,2,12,2,90,9,2,1,2,1,2,1,2,1,2,5,2,96,8,2,
        10,2,12,2,99,9,2,1,2,1,2,3,2,103,8,2,1,2,5,2,106,8,2,10,2,12,2,109,
        9,2,1,3,1,3,1,3,1,4,1,4,1,4,1,5,1,5,1,5,1,6,1,6,1,6,1,7,1,7,1,7,
        1,7,1,8,1,8,1,8,1,9,1,9,1,9,1,10,1,10,1,10,1,11,1,11,1,12,1,12,1,
        13,1,13,1,14,1,14,1,15,1,15,1,16,1,16,1,17,1,17,1,18,1,18,1,19,1,
        19,1,19,1,19,1,20,1,20,1,20,1,20,1,21,1,21,1,21,1,21,1,21,3,21,165,
        8,21,1,22,1,22,1,22,1,23,1,23,1,23,1,23,1,24,1,24,1,24,1,24,1,25,
        1,25,1,25,1,25,1,26,1,26,1,26,1,26,1,26,0,0,27,0,2,4,6,8,10,12,14,
        16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,0,0,183,
        0,54,1,0,0,0,2,74,1,0,0,0,4,76,1,0,0,0,6,110,1,0,0,0,8,113,1,0,0,
        0,10,116,1,0,0,0,12,119,1,0,0,0,14,122,1,0,0,0,16,126,1,0,0,0,18,
        129,1,0,0,0,20,132,1,0,0,0,22,135,1,0,0,0,24,137,1,0,0,0,26,139,
        1,0,0,0,28,141,1,0,0,0,30,143,1,0,0,0,32,145,1,0,0,0,34,147,1,0,
        0,0,36,149,1,0,0,0,38,151,1,0,0,0,40,155,1,0,0,0,42,164,1,0,0,0,
        44,166,1,0,0,0,46,169,1,0,0,0,48,173,1,0,0,0,50,177,1,0,0,0,52,181,
        1,0,0,0,54,55,3,2,1,0,55,56,5,0,0,1,56,1,1,0,0,0,57,75,3,4,2,0,58,
        75,3,6,3,0,59,75,3,8,4,0,60,75,3,10,5,0,61,75,3,12,6,0,62,75,3,14,
        7,0,63,75,3,16,8,0,64,75,3,18,9,0,65,75,3,20,10,0,66,75,3,22,11,
        0,67,75,3,24,12,0,68,75,3,26,13,0,69,75,3,28,14,0,70,75,3,30,15,
        0,71,75,3,32,16,0,72,75,3,34,17,0,73,75,3,36,18,0,74,57,1,0,0,0,
        74,58,1,0,0,0,74,59,1,0,0,0,74,60,1,0,0,0,74,61,1,0,0,0,74,62,1,
        0,0,0,74,63,1,0,0,0,74,64,1,0,0,0,74,65,1,0,0,0,74,66,1,0,0,0,74,
        67,1,0,0,0,74,68,1,0,0,0,74,69,1,0,0,0,74,70,1,0,0,0,74,71,1,0,0,
        0,74,72,1,0,0,0,74,73,1,0,0,0,75,3,1,0,0,0,76,77,5,1,0,0,77,81,5,
        6,0,0,78,80,3,42,21,0,79,78,1,0,0,0,80,83,1,0,0,0,81,79,1,0,0,0,
        81,82,1,0,0,0,82,102,1,0,0,0,83,81,1,0,0,0,84,88,3,38,19,0,85,87,
        3,42,21,0,86,85,1,0,0,0,87,90,1,0,0,0,88,86,1,0,0,0,88,89,1,0,0,
        0,89,91,1,0,0,0,90,88,1,0,0,0,91,92,3,40,20,0,92,103,1,0,0,0,93,
        97,3,40,20,0,94,96,3,42,21,0,95,94,1,0,0,0,96,99,1,0,0,0,97,95,1,
        0,0,0,97,98,1,0,0,0,98,100,1,0,0,0,99,97,1,0,0,0,100,101,3,38,19,
        0,101,103,1,0,0,0,102,84,1,0,0,0,102,93,1,0,0,0,103,107,1,0,0,0,
        104,106,3,42,21,0,105,104,1,0,0,0,106,109,1,0,0,0,107,105,1,0,0,
        0,107,108,1,0,0,0,108,5,1,0,0,0,109,107,1,0,0,0,110,111,5,2,0,0,
        111,112,5,6,0,0,112,7,1,0,0,0,113,114,5,3,0,0,114,115,5,6,0,0,115,
        9,1,0,0,0,116,117,5,4,0,0,117,118,5,6,0,0,118,11,1,0,0,0,119,120,
        5,5,0,0,120,121,5,7,0,0,121,13,1,0,0,0,122,123,5,1,0,0,123,124,5,
        8,0,0,124,125,5,27,0,0,125,15,1,0,0,0,126,127,5,2,0,0,127,128,5,
        8,0,0,128,17,1,0,0,0,129,130,5,3,0,0,130,131,5,8,0,0,131,19,1,0,
        0,0,132,133,5,5,0,0,133,134,5,9,0,0,134,21,1,0,0,0,135,136,5,10,
        0,0,136,23,1,0,0,0,137,138,5,11,0,0,138,25,1,0,0,0,139,140,5,12,
        0,0,140,27,1,0,0,0,141,142,5,13,0,0,142,29,1,0,0,0,143,144,5,14,
        0,0,144,31,1,0,0,0,145,146,5,15,0,0,146,33,1,0,0,0,147,148,5,16,
        0,0,148,35,1,0,0,0,149,150,5,17,0,0,150,37,1,0,0,0,151,152,5,18,
        0,0,152,153,5,8,0,0,153,154,5,27,0,0,154,39,1,0,0,0,155,156,5,19,
        0,0,156,157,5,20,0,0,157,158,5,27,0,0,158,41,1,0,0,0,159,165,3,44,
        22,0,160,165,3,46,23,0,161,165,3,48,24,0,162,165,3,50,25,0,163,165,
        3,52,26,0,164,159,1,0,0,0,164,160,1,0,0,0,164,161,1,0,0,0,164,162,
        1,0,0,0,164,163,1,0,0,0,165,43,1,0,0,0,166,167,5,21,0,0,167,168,
        5,27,0,0,168,45,1,0,0,0,169,170,5,22,0,0,170,171,5,23,0,0,171,172,
        5,27,0,0,172,47,1,0,0,0,173,174,5,24,0,0,174,175,5,22,0,0,175,176,
        5,28,0,0,176,49,1,0,0,0,177,178,5,19,0,0,178,179,5,25,0,0,179,180,
        5,27,0,0,180,51,1,0,0,0,181,182,5,19,0,0,182,183,5,26,0,0,183,184,
        5,27,0,0,184,53,1,0,0,0,7,74,81,88,97,102,107,164
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
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_entry;
    }
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterEntry) {
             listener.enterEntry(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitEntry) {
             listener.exitEntry(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
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
    public showBookCmd(): ShowBookCmdContext | null {
        return this.getRuleContext(0, ShowBookCmdContext);
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
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_command;
    }
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterCommand) {
             listener.enterCommand(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitCommand) {
             listener.exitCommand(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
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
    public authorParam(): AuthorParamContext | null {
        return this.getRuleContext(0, AuthorParamContext);
    }
    public titleParam(): TitleParamContext | null {
        return this.getRuleContext(0, TitleParamContext);
    }
    public bookDetailParam(): BookDetailParamContext[];
    public bookDetailParam(i: number): BookDetailParamContext | null;
    public bookDetailParam(i?: number): BookDetailParamContext[] | BookDetailParamContext | null {
        if (i === undefined) {
            return this.getRuleContexts(BookDetailParamContext);
        }

        return this.getRuleContext(i, BookDetailParamContext);
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_addBookCmd;
    }
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterAddBookCmd) {
             listener.enterAddBookCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitAddBookCmd) {
             listener.exitAddBookCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
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
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterUpdateBookCmd) {
             listener.enterUpdateBookCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitUpdateBookCmd) {
             listener.exitUpdateBookCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
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
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterRemoveBookCmd) {
             listener.enterRemoveBookCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitRemoveBookCmd) {
             listener.exitRemoveBookCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
        if (visitor.visitRemoveBookCmd) {
            return visitor.visitRemoveBookCmd(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ShowBookCmdContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SHOW(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.SHOW, 0)!;
    }
    public BOOK(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.BOOK, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_showBookCmd;
    }
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterShowBookCmd) {
             listener.enterShowBookCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitShowBookCmd) {
             listener.exitShowBookCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
        if (visitor.visitShowBookCmd) {
            return visitor.visitShowBookCmd(this);
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
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_listBooksCmd;
    }
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterListBooksCmd) {
             listener.enterListBooksCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitListBooksCmd) {
             listener.exitListBooksCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
        if (visitor.visitListBooksCmd) {
            return visitor.visitListBooksCmd(this);
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
    public STRING(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.STRING, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_addAuthorCmd;
    }
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterAddAuthorCmd) {
             listener.enterAddAuthorCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitAddAuthorCmd) {
             listener.exitAddAuthorCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
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
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterUpdateAuthorCmd) {
             listener.enterUpdateAuthorCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitUpdateAuthorCmd) {
             listener.exitUpdateAuthorCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
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
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterRemoveAuthorCmd) {
             listener.enterRemoveAuthorCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitRemoveAuthorCmd) {
             listener.exitRemoveAuthorCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
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
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterListAuthorsCmd) {
             listener.enterListAuthorsCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitListAuthorsCmd) {
             listener.exitListAuthorsCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
        if (visitor.visitListAuthorsCmd) {
            return visitor.visitListAuthorsCmd(this);
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
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterDashboardCmd) {
             listener.enterDashboardCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitDashboardCmd) {
             listener.exitDashboardCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
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
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterLibraryCmd) {
             listener.enterLibraryCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitLibraryCmd) {
             listener.exitLibraryCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
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
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterSettingsCmd) {
             listener.enterSettingsCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitSettingsCmd) {
             listener.exitSettingsCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
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
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterAboutCmd) {
             listener.enterAboutCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitAboutCmd) {
             listener.exitAboutCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
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
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterHelpCmd) {
             listener.enterHelpCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitHelpCmd) {
             listener.exitHelpCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
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
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterAccountCmd) {
             listener.enterAccountCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitAccountCmd) {
             listener.exitAccountCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
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
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterLoginCmd) {
             listener.enterLoginCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitLoginCmd) {
             listener.exitLoginCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
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
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterLogoutCmd) {
             listener.enterLogoutCmd(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitLogoutCmd) {
             listener.exitLogoutCmd(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
        if (visitor.visitLogoutCmd) {
            return visitor.visitLogoutCmd(this);
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
    public STRING(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.STRING, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_authorParam;
    }
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterAuthorParam) {
             listener.enterAuthorParam(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitAuthorParam) {
             listener.exitAuthorParam(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
        if (visitor.visitAuthorParam) {
            return visitor.visitAuthorParam(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TitleParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public WITH(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.WITH, 0)!;
    }
    public TITLE(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.TITLE, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.STRING, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_titleParam;
    }
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterTitleParam) {
             listener.enterTitleParam(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitTitleParam) {
             listener.exitTitleParam(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
        if (visitor.visitTitleParam) {
            return visitor.visitTitleParam(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BookDetailParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
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
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterBookDetailParam) {
             listener.enterBookDetailParam(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitBookDetailParam) {
             listener.exitBookDetailParam(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
        if (visitor.visitBookDetailParam) {
            return visitor.visitBookDetailParam(this);
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
    public STRING(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.STRING, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_subtitleParam;
    }
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterSubtitleParam) {
             listener.enterSubtitleParam(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitSubtitleParam) {
             listener.exitSubtitleParam(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
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
    public STRING(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.STRING, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_languageParam;
    }
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterLanguageParam) {
             listener.enterLanguageParam(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitLanguageParam) {
             listener.exitLanguageParam(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
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
    public NUMBER(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.NUMBER, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_publicationYearParam;
    }
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterPublicationYearParam) {
             listener.enterPublicationYearParam(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitPublicationYearParam) {
             listener.exitPublicationYearParam(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
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
    public STRING(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.STRING, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_isbnParam;
    }
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterIsbnParam) {
             listener.enterIsbnParam(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitIsbnParam) {
             listener.exitIsbnParam(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
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
    public STRING(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.STRING, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_summaryParam;
    }
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterSummaryParam) {
             listener.enterSummaryParam(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitSummaryParam) {
             listener.exitSummaryParam(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
        if (visitor.visitSummaryParam) {
            return visitor.visitSummaryParam(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
