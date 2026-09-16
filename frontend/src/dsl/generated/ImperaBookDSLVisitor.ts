
import { AbstractParseTreeVisitor } from "antlr4ng";


import { EntryContext } from "./ImperaBookDSLParser.js";
import { CommandContext } from "./ImperaBookDSLParser.js";
import { AddBookCmdContext } from "./ImperaBookDSLParser.js";
import { AddAuthorCmdContext } from "./ImperaBookDSLParser.js";
import { ListBooksCmdContext } from "./ImperaBookDSLParser.js";
import { ListAuthorsCmdContext } from "./ImperaBookDSLParser.js";
import { AuthorParamContext } from "./ImperaBookDSLParser.js";
import { TitleParamContext } from "./ImperaBookDSLParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ImperaBookDSLParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class ImperaBookDSLVisitor<Result> extends AbstractParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.entry`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitEntry?: (ctx: EntryContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.command`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCommand?: (ctx: CommandContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.addBookCmd`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAddBookCmd?: (ctx: AddBookCmdContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.addAuthorCmd`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAddAuthorCmd?: (ctx: AddAuthorCmdContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.listBooksCmd`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitListBooksCmd?: (ctx: ListBooksCmdContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.listAuthorsCmd`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitListAuthorsCmd?: (ctx: ListAuthorsCmdContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.authorParam`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAuthorParam?: (ctx: AuthorParamContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.titleParam`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTitleParam?: (ctx: TitleParamContext) => Result;
}

