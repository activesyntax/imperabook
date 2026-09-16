
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { ImperaBookDSLListener } from "./ImperaBookDSLListener.js";
import { ImperaBookDSLVisitor } from "./ImperaBookDSLVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class ImperaBookDSLParser extends antlr.Parser {
    public static readonly ADD = 1;
    public static readonly LIST = 2;
    public static readonly BOOK = 3;
    public static readonly BOOKS = 4;
    public static readonly AUTHOR = 5;
    public static readonly AUTHORS = 6;
    public static readonly BY = 7;
    public static readonly WITH = 8;
    public static readonly TITLE = 9;
    public static readonly STRING = 10;
    public static readonly WS = 11;
    public static readonly RULE_entry = 0;
    public static readonly RULE_command = 1;
    public static readonly RULE_addBookCmd = 2;
    public static readonly RULE_addAuthorCmd = 3;
    public static readonly RULE_listBooksCmd = 4;
    public static readonly RULE_listAuthorsCmd = 5;
    public static readonly RULE_authorParam = 6;
    public static readonly RULE_titleParam = 7;

    public static readonly literalNames = [
        null, "'add'", "'list'", "'book'", "'books'", "'author'", "'authors'", 
        "'by'", "'with'", "'title'"
    ];

    public static readonly symbolicNames = [
        null, "ADD", "LIST", "BOOK", "BOOKS", "AUTHOR", "AUTHORS", "BY", 
        "WITH", "TITLE", "STRING", "WS"
    ];
    public static readonly ruleNames = [
        "entry", "command", "addBookCmd", "addAuthorCmd", "listBooksCmd", 
        "listAuthorsCmd", "authorParam", "titleParam",
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
            this.state = 16;
            this.command();
            this.state = 17;
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
            this.state = 23;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 19;
                this.addBookCmd();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 20;
                this.addAuthorCmd();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 21;
                this.listBooksCmd();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 22;
                this.listAuthorsCmd();
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
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 25;
            this.match(ImperaBookDSLParser.ADD);
            this.state = 26;
            this.match(ImperaBookDSLParser.BOOK);
            this.state = 33;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ImperaBookDSLParser.BY:
                {
                this.state = 27;
                this.authorParam();
                this.state = 28;
                this.titleParam();
                }
                break;
            case ImperaBookDSLParser.WITH:
                {
                this.state = 30;
                this.titleParam();
                this.state = 31;
                this.authorParam();
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
    public addAuthorCmd(): AddAuthorCmdContext {
        let localContext = new AddAuthorCmdContext(this.context, this.state);
        this.enterRule(localContext, 6, ImperaBookDSLParser.RULE_addAuthorCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 35;
            this.match(ImperaBookDSLParser.ADD);
            this.state = 36;
            this.match(ImperaBookDSLParser.AUTHOR);
            this.state = 37;
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
    public listBooksCmd(): ListBooksCmdContext {
        let localContext = new ListBooksCmdContext(this.context, this.state);
        this.enterRule(localContext, 8, ImperaBookDSLParser.RULE_listBooksCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 39;
            this.match(ImperaBookDSLParser.LIST);
            this.state = 40;
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
    public listAuthorsCmd(): ListAuthorsCmdContext {
        let localContext = new ListAuthorsCmdContext(this.context, this.state);
        this.enterRule(localContext, 10, ImperaBookDSLParser.RULE_listAuthorsCmd);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 42;
            this.match(ImperaBookDSLParser.LIST);
            this.state = 43;
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
    public authorParam(): AuthorParamContext {
        let localContext = new AuthorParamContext(this.context, this.state);
        this.enterRule(localContext, 12, ImperaBookDSLParser.RULE_authorParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 45;
            this.match(ImperaBookDSLParser.BY);
            this.state = 46;
            this.match(ImperaBookDSLParser.AUTHOR);
            this.state = 47;
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
        this.enterRule(localContext, 14, ImperaBookDSLParser.RULE_titleParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 49;
            this.match(ImperaBookDSLParser.WITH);
            this.state = 50;
            this.match(ImperaBookDSLParser.TITLE);
            this.state = 51;
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
        4,1,11,54,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,1,0,1,0,1,0,1,1,1,1,1,1,1,1,3,1,24,8,1,1,2,1,2,1,2,1,2,
        1,2,1,2,1,2,1,2,3,2,34,8,2,1,3,1,3,1,3,1,3,1,4,1,4,1,4,1,5,1,5,1,
        5,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,0,0,8,0,2,4,6,8,10,12,14,0,
        0,49,0,16,1,0,0,0,2,23,1,0,0,0,4,25,1,0,0,0,6,35,1,0,0,0,8,39,1,
        0,0,0,10,42,1,0,0,0,12,45,1,0,0,0,14,49,1,0,0,0,16,17,3,2,1,0,17,
        18,5,0,0,1,18,1,1,0,0,0,19,24,3,4,2,0,20,24,3,6,3,0,21,24,3,8,4,
        0,22,24,3,10,5,0,23,19,1,0,0,0,23,20,1,0,0,0,23,21,1,0,0,0,23,22,
        1,0,0,0,24,3,1,0,0,0,25,26,5,1,0,0,26,33,5,3,0,0,27,28,3,12,6,0,
        28,29,3,14,7,0,29,34,1,0,0,0,30,31,3,14,7,0,31,32,3,12,6,0,32,34,
        1,0,0,0,33,27,1,0,0,0,33,30,1,0,0,0,34,5,1,0,0,0,35,36,5,1,0,0,36,
        37,5,5,0,0,37,38,5,10,0,0,38,7,1,0,0,0,39,40,5,2,0,0,40,41,5,4,0,
        0,41,9,1,0,0,0,42,43,5,2,0,0,43,44,5,6,0,0,44,11,1,0,0,0,45,46,5,
        7,0,0,46,47,5,5,0,0,47,48,5,10,0,0,48,13,1,0,0,0,49,50,5,8,0,0,50,
        51,5,9,0,0,51,52,5,10,0,0,52,15,1,0,0,0,2,23,33
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
    public addAuthorCmd(): AddAuthorCmdContext | null {
        return this.getRuleContext(0, AddAuthorCmdContext);
    }
    public listBooksCmd(): ListBooksCmdContext | null {
        return this.getRuleContext(0, ListBooksCmdContext);
    }
    public listAuthorsCmd(): ListAuthorsCmdContext | null {
        return this.getRuleContext(0, ListAuthorsCmdContext);
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
