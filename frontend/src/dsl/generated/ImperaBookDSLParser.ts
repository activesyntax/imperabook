
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
    public static readonly LIST = 4;
    public static readonly BOOK = 5;
    public static readonly BOOKS = 6;
    public static readonly AUTHOR = 7;
    public static readonly AUTHORS = 8;
    public static readonly DASHBOARD = 9;
    public static readonly LIBRARY = 10;
    public static readonly SETTINGS = 11;
    public static readonly ABOUT = 12;
    public static readonly HELP = 13;
    public static readonly ACCOUNT = 14;
    public static readonly LOGIN = 15;
    public static readonly LOGOUT = 16;
    public static readonly BY = 17;
    public static readonly WITH = 18;
    public static readonly TITLE = 19;
    public static readonly SUBTITLED = 20;
    public static readonly IN = 21;
    public static readonly LANGUAGE = 22;
    public static readonly PUBLISHED = 23;
    public static readonly ISBN = 24;
    public static readonly SUMMARY = 25;
    public static readonly STRING = 26;
    public static readonly NUMBER = 27;
    public static readonly WS = 28;
    public static readonly RULE_entry = 0;
    public static readonly RULE_command = 1;
    public static readonly RULE_addBookCmd = 2;
    public static readonly RULE_updateBookCmd = 3;
    public static readonly RULE_removeBookCmd = 4;
    public static readonly RULE_listBooksCmd = 5;
    public static readonly RULE_addAuthorCmd = 6;
    public static readonly RULE_updateAuthorCmd = 7;
    public static readonly RULE_removeAuthorCmd = 8;
    public static readonly RULE_listAuthorsCmd = 9;
    public static readonly RULE_dashboardCmd = 10;
    public static readonly RULE_libraryCmd = 11;
    public static readonly RULE_settingsCmd = 12;
    public static readonly RULE_aboutCmd = 13;
    public static readonly RULE_helpCmd = 14;
    public static readonly RULE_accountCmd = 15;
    public static readonly RULE_loginCmd = 16;
    public static readonly RULE_logoutCmd = 17;
    public static readonly RULE_authorName = 18;
    public static readonly RULE_authorParam = 19;
    public static readonly RULE_titleParam = 20;
    public static readonly RULE_bookDetailParam = 21;
    public static readonly RULE_subtitleParam = 22;
    public static readonly RULE_languageParam = 23;
    public static readonly RULE_publicationYearParam = 24;
    public static readonly RULE_isbnParam = 25;
    public static readonly RULE_summaryParam = 26;

    public static readonly literalNames = [
        null, "'add'", "'update'", "'remove'", "'list'", "'book'", "'books'", 
        "'author'", "'authors'", "'dashboard'", "'library'", "'settings'", 
        "'about'", "'help'", "'account'", "'login'", "'logout'", "'by'", 
        "'with'", "'title'", "'subtitled'", "'in'", "'language'", "'published'", 
        "'isbn'", "'summary'"
    ];

    public static readonly symbolicNames = [
        null, "ADD", "UPDATE", "REMOVE", "LIST", "BOOK", "BOOKS", "AUTHOR", 
        "AUTHORS", "DASHBOARD", "LIBRARY", "SETTINGS", "ABOUT", "HELP", 
        "ACCOUNT", "LOGIN", "LOGOUT", "BY", "WITH", "TITLE", "SUBTITLED", 
        "IN", "LANGUAGE", "PUBLISHED", "ISBN", "SUMMARY", "STRING", "NUMBER", 
        "WS"
    ];
    public static readonly ruleNames = [
        "entry", "command", "addBookCmd", "updateBookCmd", "removeBookCmd", 
        "listBooksCmd", "addAuthorCmd", "updateAuthorCmd", "removeAuthorCmd", 
        "listAuthorsCmd", "dashboardCmd", "libraryCmd", "settingsCmd", "aboutCmd", 
        "helpCmd", "accountCmd", "loginCmd", "logoutCmd", "authorName", 
        "authorParam", "titleParam", "bookDetailParam", "subtitleParam", 
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
            this.state = 73;
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
                this.listBooksCmd();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 61;
                this.addAuthorCmd();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 62;
                this.updateAuthorCmd();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 63;
                this.removeAuthorCmd();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 64;
                this.listAuthorsCmd();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 65;
                this.dashboardCmd();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 66;
                this.libraryCmd();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 67;
                this.settingsCmd();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 68;
                this.aboutCmd();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 69;
                this.helpCmd();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 70;
                this.accountCmd();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 71;
                this.loginCmd();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 72;
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
            this.state = 75;
            this.match(ImperaBookDSLParser.ADD);
            this.state = 76;
            this.match(ImperaBookDSLParser.BOOK);
            this.state = 80;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 77;
                    this.bookDetailParam();
                    }
                    }
                }
                this.state = 82;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            }
            this.state = 83;
            this.titleParam();
            this.state = 87;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 11927552) !== 0)) {
                {
                {
                this.state = 84;
                this.bookDetailParam();
                }
                }
                this.state = 89;
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
            this.state = 90;
            this.match(ImperaBookDSLParser.UPDATE);
            this.state = 91;
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
            this.state = 93;
            this.match(ImperaBookDSLParser.REMOVE);
            this.state = 94;
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
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 96;
            this.match(ImperaBookDSLParser.LIST);
            this.state = 97;
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
        this.enterRule(localContext, 12, ImperaBookDSLParser.RULE_addAuthorCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 99;
            this.match(ImperaBookDSLParser.ADD);
            this.state = 100;
            this.match(ImperaBookDSLParser.AUTHOR);
            this.state = 101;
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
        this.enterRule(localContext, 14, ImperaBookDSLParser.RULE_updateAuthorCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 103;
            this.match(ImperaBookDSLParser.UPDATE);
            this.state = 104;
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
        this.enterRule(localContext, 16, ImperaBookDSLParser.RULE_removeAuthorCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 106;
            this.match(ImperaBookDSLParser.REMOVE);
            this.state = 107;
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
        this.enterRule(localContext, 18, ImperaBookDSLParser.RULE_listAuthorsCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 109;
            this.match(ImperaBookDSLParser.LIST);
            this.state = 110;
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
        this.enterRule(localContext, 20, ImperaBookDSLParser.RULE_dashboardCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 112;
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
        this.enterRule(localContext, 22, ImperaBookDSLParser.RULE_libraryCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 114;
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
        this.enterRule(localContext, 24, ImperaBookDSLParser.RULE_settingsCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 116;
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
        this.enterRule(localContext, 26, ImperaBookDSLParser.RULE_aboutCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 118;
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
        this.enterRule(localContext, 28, ImperaBookDSLParser.RULE_helpCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 120;
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
        this.enterRule(localContext, 30, ImperaBookDSLParser.RULE_accountCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 122;
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
        this.enterRule(localContext, 32, ImperaBookDSLParser.RULE_loginCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 124;
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
        this.enterRule(localContext, 34, ImperaBookDSLParser.RULE_logoutCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 126;
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
    public authorName(): AuthorNameContext {
        let localContext = new AuthorNameContext(this.context, this.state);
        this.enterRule(localContext, 36, ImperaBookDSLParser.RULE_authorName);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 128;
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
    public authorParam(): AuthorParamContext {
        let localContext = new AuthorParamContext(this.context, this.state);
        this.enterRule(localContext, 38, ImperaBookDSLParser.RULE_authorParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 130;
            this.match(ImperaBookDSLParser.BY);
            this.state = 131;
            this.match(ImperaBookDSLParser.AUTHOR);
            this.state = 132;
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
            this.state = 134;
            this.match(ImperaBookDSLParser.WITH);
            this.state = 135;
            this.match(ImperaBookDSLParser.TITLE);
            this.state = 136;
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
            this.state = 144;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 138;
                this.authorParam();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 139;
                this.subtitleParam();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 140;
                this.languageParam();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 141;
                this.publicationYearParam();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 142;
                this.isbnParam();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 143;
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
            this.state = 146;
            this.match(ImperaBookDSLParser.SUBTITLED);
            this.state = 147;
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
            this.state = 149;
            this.match(ImperaBookDSLParser.IN);
            this.state = 150;
            this.match(ImperaBookDSLParser.LANGUAGE);
            this.state = 151;
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
            this.state = 153;
            this.match(ImperaBookDSLParser.PUBLISHED);
            this.state = 154;
            this.match(ImperaBookDSLParser.IN);
            this.state = 155;
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
            this.state = 157;
            this.match(ImperaBookDSLParser.WITH);
            this.state = 158;
            this.match(ImperaBookDSLParser.ISBN);
            this.state = 159;
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
            this.state = 161;
            this.match(ImperaBookDSLParser.WITH);
            this.state = 162;
            this.match(ImperaBookDSLParser.SUMMARY);
            this.state = 163;
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
        4,1,28,166,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,3,1,74,8,1,1,2,1,2,1,2,5,2,79,8,2,10,2,12,2,82,9,2,1,
        2,1,2,5,2,86,8,2,10,2,12,2,89,9,2,1,3,1,3,1,3,1,4,1,4,1,4,1,5,1,
        5,1,5,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,8,1,8,1,8,1,9,1,9,1,9,1,10,1,
        10,1,11,1,11,1,12,1,12,1,13,1,13,1,14,1,14,1,15,1,15,1,16,1,16,1,
        17,1,17,1,18,1,18,1,19,1,19,1,19,1,19,1,20,1,20,1,20,1,20,1,21,1,
        21,1,21,1,21,1,21,1,21,3,21,145,8,21,1,22,1,22,1,22,1,23,1,23,1,
        23,1,23,1,24,1,24,1,24,1,24,1,25,1,25,1,25,1,25,1,26,1,26,1,26,1,
        26,1,26,0,0,27,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,
        36,38,40,42,44,46,48,50,52,0,0,160,0,54,1,0,0,0,2,73,1,0,0,0,4,75,
        1,0,0,0,6,90,1,0,0,0,8,93,1,0,0,0,10,96,1,0,0,0,12,99,1,0,0,0,14,
        103,1,0,0,0,16,106,1,0,0,0,18,109,1,0,0,0,20,112,1,0,0,0,22,114,
        1,0,0,0,24,116,1,0,0,0,26,118,1,0,0,0,28,120,1,0,0,0,30,122,1,0,
        0,0,32,124,1,0,0,0,34,126,1,0,0,0,36,128,1,0,0,0,38,130,1,0,0,0,
        40,134,1,0,0,0,42,144,1,0,0,0,44,146,1,0,0,0,46,149,1,0,0,0,48,153,
        1,0,0,0,50,157,1,0,0,0,52,161,1,0,0,0,54,55,3,2,1,0,55,56,5,0,0,
        1,56,1,1,0,0,0,57,74,3,4,2,0,58,74,3,6,3,0,59,74,3,8,4,0,60,74,3,
        10,5,0,61,74,3,12,6,0,62,74,3,14,7,0,63,74,3,16,8,0,64,74,3,18,9,
        0,65,74,3,20,10,0,66,74,3,22,11,0,67,74,3,24,12,0,68,74,3,26,13,
        0,69,74,3,28,14,0,70,74,3,30,15,0,71,74,3,32,16,0,72,74,3,34,17,
        0,73,57,1,0,0,0,73,58,1,0,0,0,73,59,1,0,0,0,73,60,1,0,0,0,73,61,
        1,0,0,0,73,62,1,0,0,0,73,63,1,0,0,0,73,64,1,0,0,0,73,65,1,0,0,0,
        73,66,1,0,0,0,73,67,1,0,0,0,73,68,1,0,0,0,73,69,1,0,0,0,73,70,1,
        0,0,0,73,71,1,0,0,0,73,72,1,0,0,0,74,3,1,0,0,0,75,76,5,1,0,0,76,
        80,5,5,0,0,77,79,3,42,21,0,78,77,1,0,0,0,79,82,1,0,0,0,80,78,1,0,
        0,0,80,81,1,0,0,0,81,83,1,0,0,0,82,80,1,0,0,0,83,87,3,40,20,0,84,
        86,3,42,21,0,85,84,1,0,0,0,86,89,1,0,0,0,87,85,1,0,0,0,87,88,1,0,
        0,0,88,5,1,0,0,0,89,87,1,0,0,0,90,91,5,2,0,0,91,92,5,5,0,0,92,7,
        1,0,0,0,93,94,5,3,0,0,94,95,5,5,0,0,95,9,1,0,0,0,96,97,5,4,0,0,97,
        98,5,6,0,0,98,11,1,0,0,0,99,100,5,1,0,0,100,101,5,7,0,0,101,102,
        3,36,18,0,102,13,1,0,0,0,103,104,5,2,0,0,104,105,5,7,0,0,105,15,
        1,0,0,0,106,107,5,3,0,0,107,108,5,7,0,0,108,17,1,0,0,0,109,110,5,
        4,0,0,110,111,5,8,0,0,111,19,1,0,0,0,112,113,5,9,0,0,113,21,1,0,
        0,0,114,115,5,10,0,0,115,23,1,0,0,0,116,117,5,11,0,0,117,25,1,0,
        0,0,118,119,5,12,0,0,119,27,1,0,0,0,120,121,5,13,0,0,121,29,1,0,
        0,0,122,123,5,14,0,0,123,31,1,0,0,0,124,125,5,15,0,0,125,33,1,0,
        0,0,126,127,5,16,0,0,127,35,1,0,0,0,128,129,5,26,0,0,129,37,1,0,
        0,0,130,131,5,17,0,0,131,132,5,7,0,0,132,133,5,26,0,0,133,39,1,0,
        0,0,134,135,5,18,0,0,135,136,5,19,0,0,136,137,5,26,0,0,137,41,1,
        0,0,0,138,145,3,38,19,0,139,145,3,44,22,0,140,145,3,46,23,0,141,
        145,3,48,24,0,142,145,3,50,25,0,143,145,3,52,26,0,144,138,1,0,0,
        0,144,139,1,0,0,0,144,140,1,0,0,0,144,141,1,0,0,0,144,142,1,0,0,
        0,144,143,1,0,0,0,145,43,1,0,0,0,146,147,5,20,0,0,147,148,5,26,0,
        0,148,45,1,0,0,0,149,150,5,21,0,0,150,151,5,22,0,0,151,152,5,26,
        0,0,152,47,1,0,0,0,153,154,5,23,0,0,154,155,5,21,0,0,155,156,5,27,
        0,0,156,49,1,0,0,0,157,158,5,18,0,0,158,159,5,24,0,0,159,160,5,26,
        0,0,160,51,1,0,0,0,161,162,5,18,0,0,162,163,5,25,0,0,163,164,5,26,
        0,0,164,53,1,0,0,0,4,73,80,87,144
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
    public titleParam(): TitleParamContext {
        return this.getRuleContext(0, TitleParamContext)!;
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
    public authorName(): AuthorNameContext {
        return this.getRuleContext(0, AuthorNameContext)!;
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


export class AuthorNameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(ImperaBookDSLParser.STRING, 0)!;
    }
    public override get ruleIndex(): number {
        return ImperaBookDSLParser.RULE_authorName;
    }
    public override enterRule(listener: ImperaBookDSLListener): void {
        if(listener.enterAuthorName) {
             listener.enterAuthorName(this);
        }
    }
    public override exitRule(listener: ImperaBookDSLListener): void {
        if(listener.exitAuthorName) {
             listener.exitAuthorName(this);
        }
    }
    public override accept<Result>(visitor: ImperaBookDSLVisitor<Result>): Result | null {
        if (visitor.visitAuthorName) {
            return visitor.visitAuthorName(this);
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
