
import { AbstractParseTreeVisitor } from "antlr4ng";


import { EntryContext } from "./ImperaBookDSLParser.js";
import { CommandContext } from "./ImperaBookDSLParser.js";
import { AddBookCmdContext } from "./ImperaBookDSLParser.js";
import { UpdateBookCmdContext } from "./ImperaBookDSLParser.js";
import { RemoveBookCmdContext } from "./ImperaBookDSLParser.js";
import { ListBooksCmdContext } from "./ImperaBookDSLParser.js";
import { PagesFilterContext } from "./ImperaBookDSLParser.js";
import { PageComparisonContext } from "./ImperaBookDSLParser.js";
import { PagesMoreThanContext } from "./ImperaBookDSLParser.js";
import { PagesLessThanContext } from "./ImperaBookDSLParser.js";
import { PagesAtLeastContext } from "./ImperaBookDSLParser.js";
import { PagesAtMostContext } from "./ImperaBookDSLParser.js";
import { PagesBetweenContext } from "./ImperaBookDSLParser.js";
import { PagesNotContext } from "./ImperaBookDSLParser.js";
import { PagesEqualContext } from "./ImperaBookDSLParser.js";
import { AndBoundContext } from "./ImperaBookDSLParser.js";
import { PageCountContext } from "./ImperaBookDSLParser.js";
import { AddAuthorCmdContext } from "./ImperaBookDSLParser.js";
import { UpdateAuthorCmdContext } from "./ImperaBookDSLParser.js";
import { RemoveAuthorCmdContext } from "./ImperaBookDSLParser.js";
import { ListAuthorsCmdContext } from "./ImperaBookDSLParser.js";
import { FindCmdContext } from "./ImperaBookDSLParser.js";
import { KeywordsContext } from "./ImperaBookDSLParser.js";
import { DashboardCmdContext } from "./ImperaBookDSLParser.js";
import { LibraryCmdContext } from "./ImperaBookDSLParser.js";
import { SettingsCmdContext } from "./ImperaBookDSLParser.js";
import { AboutCmdContext } from "./ImperaBookDSLParser.js";
import { HelpCmdContext } from "./ImperaBookDSLParser.js";
import { AccountCmdContext } from "./ImperaBookDSLParser.js";
import { LoginCmdContext } from "./ImperaBookDSLParser.js";
import { LogoutCmdContext } from "./ImperaBookDSLParser.js";
import { BookTitleContext } from "./ImperaBookDSLParser.js";
import { AuthorNameContext } from "./ImperaBookDSLParser.js";
import { BookDetailParamContext } from "./ImperaBookDSLParser.js";
import { AuthorParamContext } from "./ImperaBookDSLParser.js";
import { SubtitleParamContext } from "./ImperaBookDSLParser.js";
import { LanguageParamContext } from "./ImperaBookDSLParser.js";
import { PublicationYearParamContext } from "./ImperaBookDSLParser.js";
import { IsbnParamContext } from "./ImperaBookDSLParser.js";
import { SummaryParamContext } from "./ImperaBookDSLParser.js";
import { ValueContext } from "./ImperaBookDSLParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ImperaBookDSLParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class ImperaBookDSLParserVisitor<Result> extends AbstractParseTreeVisitor<Result> {
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
     * Visit a parse tree produced by `ImperaBookDSLParser.updateBookCmd`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUpdateBookCmd?: (ctx: UpdateBookCmdContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.removeBookCmd`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRemoveBookCmd?: (ctx: RemoveBookCmdContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.listBooksCmd`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitListBooksCmd?: (ctx: ListBooksCmdContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.pagesFilter`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPagesFilter?: (ctx: PagesFilterContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.pageComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPageComparison?: (ctx: PageComparisonContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.pagesMoreThan`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPagesMoreThan?: (ctx: PagesMoreThanContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.pagesLessThan`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPagesLessThan?: (ctx: PagesLessThanContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.pagesAtLeast`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPagesAtLeast?: (ctx: PagesAtLeastContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.pagesAtMost`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPagesAtMost?: (ctx: PagesAtMostContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.pagesBetween`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPagesBetween?: (ctx: PagesBetweenContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.pagesNot`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPagesNot?: (ctx: PagesNotContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.pagesEqual`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPagesEqual?: (ctx: PagesEqualContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.andBound`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAndBound?: (ctx: AndBoundContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.pageCount`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPageCount?: (ctx: PageCountContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.addAuthorCmd`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAddAuthorCmd?: (ctx: AddAuthorCmdContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.updateAuthorCmd`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUpdateAuthorCmd?: (ctx: UpdateAuthorCmdContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.removeAuthorCmd`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRemoveAuthorCmd?: (ctx: RemoveAuthorCmdContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.listAuthorsCmd`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitListAuthorsCmd?: (ctx: ListAuthorsCmdContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.findCmd`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFindCmd?: (ctx: FindCmdContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.keywords`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitKeywords?: (ctx: KeywordsContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.dashboardCmd`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDashboardCmd?: (ctx: DashboardCmdContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.libraryCmd`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLibraryCmd?: (ctx: LibraryCmdContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.settingsCmd`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSettingsCmd?: (ctx: SettingsCmdContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.aboutCmd`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAboutCmd?: (ctx: AboutCmdContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.helpCmd`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitHelpCmd?: (ctx: HelpCmdContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.accountCmd`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAccountCmd?: (ctx: AccountCmdContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.loginCmd`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLoginCmd?: (ctx: LoginCmdContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.logoutCmd`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLogoutCmd?: (ctx: LogoutCmdContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.bookTitle`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBookTitle?: (ctx: BookTitleContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.authorName`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAuthorName?: (ctx: AuthorNameContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.bookDetailParam`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBookDetailParam?: (ctx: BookDetailParamContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.authorParam`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAuthorParam?: (ctx: AuthorParamContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.subtitleParam`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSubtitleParam?: (ctx: SubtitleParamContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.languageParam`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLanguageParam?: (ctx: LanguageParamContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.publicationYearParam`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPublicationYearParam?: (ctx: PublicationYearParamContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.isbnParam`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIsbnParam?: (ctx: IsbnParamContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.summaryParam`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSummaryParam?: (ctx: SummaryParamContext) => Result;
    /**
     * Visit a parse tree produced by `ImperaBookDSLParser.value`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitValue?: (ctx: ValueContext) => Result;
}

