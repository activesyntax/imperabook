
import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { EntryContext } from "./ImperaBookDSLParser.js";
import { CommandContext } from "./ImperaBookDSLParser.js";
import { AddBookCmdContext } from "./ImperaBookDSLParser.js";
import { AddAuthorCmdContext } from "./ImperaBookDSLParser.js";
import { ListBooksCmdContext } from "./ImperaBookDSLParser.js";
import { ListAuthorsCmdContext } from "./ImperaBookDSLParser.js";
import { AuthorParamContext } from "./ImperaBookDSLParser.js";
import { TitleParamContext } from "./ImperaBookDSLParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `ImperaBookDSLParser`.
 */
export class ImperaBookDSLListener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.entry`.
     * @param ctx the parse tree
     */
    enterEntry?: (ctx: EntryContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.entry`.
     * @param ctx the parse tree
     */
    exitEntry?: (ctx: EntryContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.command`.
     * @param ctx the parse tree
     */
    enterCommand?: (ctx: CommandContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.command`.
     * @param ctx the parse tree
     */
    exitCommand?: (ctx: CommandContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.addBookCmd`.
     * @param ctx the parse tree
     */
    enterAddBookCmd?: (ctx: AddBookCmdContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.addBookCmd`.
     * @param ctx the parse tree
     */
    exitAddBookCmd?: (ctx: AddBookCmdContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.addAuthorCmd`.
     * @param ctx the parse tree
     */
    enterAddAuthorCmd?: (ctx: AddAuthorCmdContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.addAuthorCmd`.
     * @param ctx the parse tree
     */
    exitAddAuthorCmd?: (ctx: AddAuthorCmdContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.listBooksCmd`.
     * @param ctx the parse tree
     */
    enterListBooksCmd?: (ctx: ListBooksCmdContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.listBooksCmd`.
     * @param ctx the parse tree
     */
    exitListBooksCmd?: (ctx: ListBooksCmdContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.listAuthorsCmd`.
     * @param ctx the parse tree
     */
    enterListAuthorsCmd?: (ctx: ListAuthorsCmdContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.listAuthorsCmd`.
     * @param ctx the parse tree
     */
    exitListAuthorsCmd?: (ctx: ListAuthorsCmdContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.authorParam`.
     * @param ctx the parse tree
     */
    enterAuthorParam?: (ctx: AuthorParamContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.authorParam`.
     * @param ctx the parse tree
     */
    exitAuthorParam?: (ctx: AuthorParamContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.titleParam`.
     * @param ctx the parse tree
     */
    enterTitleParam?: (ctx: TitleParamContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.titleParam`.
     * @param ctx the parse tree
     */
    exitTitleParam?: (ctx: TitleParamContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

