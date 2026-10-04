
import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


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
 * This interface defines a complete listener for a parse tree produced by
 * `ImperaBookDSLParser`.
 */
export class ImperaBookDSLParserListener implements ParseTreeListener {
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
     * Enter a parse tree produced by `ImperaBookDSLParser.updateBookCmd`.
     * @param ctx the parse tree
     */
    enterUpdateBookCmd?: (ctx: UpdateBookCmdContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.updateBookCmd`.
     * @param ctx the parse tree
     */
    exitUpdateBookCmd?: (ctx: UpdateBookCmdContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.removeBookCmd`.
     * @param ctx the parse tree
     */
    enterRemoveBookCmd?: (ctx: RemoveBookCmdContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.removeBookCmd`.
     * @param ctx the parse tree
     */
    exitRemoveBookCmd?: (ctx: RemoveBookCmdContext) => void;
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
     * Enter a parse tree produced by `ImperaBookDSLParser.pagesFilter`.
     * @param ctx the parse tree
     */
    enterPagesFilter?: (ctx: PagesFilterContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.pagesFilter`.
     * @param ctx the parse tree
     */
    exitPagesFilter?: (ctx: PagesFilterContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.pageComparison`.
     * @param ctx the parse tree
     */
    enterPageComparison?: (ctx: PageComparisonContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.pageComparison`.
     * @param ctx the parse tree
     */
    exitPageComparison?: (ctx: PageComparisonContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.pagesMoreThan`.
     * @param ctx the parse tree
     */
    enterPagesMoreThan?: (ctx: PagesMoreThanContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.pagesMoreThan`.
     * @param ctx the parse tree
     */
    exitPagesMoreThan?: (ctx: PagesMoreThanContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.pagesLessThan`.
     * @param ctx the parse tree
     */
    enterPagesLessThan?: (ctx: PagesLessThanContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.pagesLessThan`.
     * @param ctx the parse tree
     */
    exitPagesLessThan?: (ctx: PagesLessThanContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.pagesAtLeast`.
     * @param ctx the parse tree
     */
    enterPagesAtLeast?: (ctx: PagesAtLeastContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.pagesAtLeast`.
     * @param ctx the parse tree
     */
    exitPagesAtLeast?: (ctx: PagesAtLeastContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.pagesAtMost`.
     * @param ctx the parse tree
     */
    enterPagesAtMost?: (ctx: PagesAtMostContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.pagesAtMost`.
     * @param ctx the parse tree
     */
    exitPagesAtMost?: (ctx: PagesAtMostContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.pagesBetween`.
     * @param ctx the parse tree
     */
    enterPagesBetween?: (ctx: PagesBetweenContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.pagesBetween`.
     * @param ctx the parse tree
     */
    exitPagesBetween?: (ctx: PagesBetweenContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.pagesNot`.
     * @param ctx the parse tree
     */
    enterPagesNot?: (ctx: PagesNotContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.pagesNot`.
     * @param ctx the parse tree
     */
    exitPagesNot?: (ctx: PagesNotContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.pagesEqual`.
     * @param ctx the parse tree
     */
    enterPagesEqual?: (ctx: PagesEqualContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.pagesEqual`.
     * @param ctx the parse tree
     */
    exitPagesEqual?: (ctx: PagesEqualContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.andBound`.
     * @param ctx the parse tree
     */
    enterAndBound?: (ctx: AndBoundContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.andBound`.
     * @param ctx the parse tree
     */
    exitAndBound?: (ctx: AndBoundContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.pageCount`.
     * @param ctx the parse tree
     */
    enterPageCount?: (ctx: PageCountContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.pageCount`.
     * @param ctx the parse tree
     */
    exitPageCount?: (ctx: PageCountContext) => void;
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
     * Enter a parse tree produced by `ImperaBookDSLParser.updateAuthorCmd`.
     * @param ctx the parse tree
     */
    enterUpdateAuthorCmd?: (ctx: UpdateAuthorCmdContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.updateAuthorCmd`.
     * @param ctx the parse tree
     */
    exitUpdateAuthorCmd?: (ctx: UpdateAuthorCmdContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.removeAuthorCmd`.
     * @param ctx the parse tree
     */
    enterRemoveAuthorCmd?: (ctx: RemoveAuthorCmdContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.removeAuthorCmd`.
     * @param ctx the parse tree
     */
    exitRemoveAuthorCmd?: (ctx: RemoveAuthorCmdContext) => void;
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
     * Enter a parse tree produced by `ImperaBookDSLParser.findCmd`.
     * @param ctx the parse tree
     */
    enterFindCmd?: (ctx: FindCmdContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.findCmd`.
     * @param ctx the parse tree
     */
    exitFindCmd?: (ctx: FindCmdContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.keywords`.
     * @param ctx the parse tree
     */
    enterKeywords?: (ctx: KeywordsContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.keywords`.
     * @param ctx the parse tree
     */
    exitKeywords?: (ctx: KeywordsContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.dashboardCmd`.
     * @param ctx the parse tree
     */
    enterDashboardCmd?: (ctx: DashboardCmdContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.dashboardCmd`.
     * @param ctx the parse tree
     */
    exitDashboardCmd?: (ctx: DashboardCmdContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.libraryCmd`.
     * @param ctx the parse tree
     */
    enterLibraryCmd?: (ctx: LibraryCmdContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.libraryCmd`.
     * @param ctx the parse tree
     */
    exitLibraryCmd?: (ctx: LibraryCmdContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.settingsCmd`.
     * @param ctx the parse tree
     */
    enterSettingsCmd?: (ctx: SettingsCmdContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.settingsCmd`.
     * @param ctx the parse tree
     */
    exitSettingsCmd?: (ctx: SettingsCmdContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.aboutCmd`.
     * @param ctx the parse tree
     */
    enterAboutCmd?: (ctx: AboutCmdContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.aboutCmd`.
     * @param ctx the parse tree
     */
    exitAboutCmd?: (ctx: AboutCmdContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.helpCmd`.
     * @param ctx the parse tree
     */
    enterHelpCmd?: (ctx: HelpCmdContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.helpCmd`.
     * @param ctx the parse tree
     */
    exitHelpCmd?: (ctx: HelpCmdContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.accountCmd`.
     * @param ctx the parse tree
     */
    enterAccountCmd?: (ctx: AccountCmdContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.accountCmd`.
     * @param ctx the parse tree
     */
    exitAccountCmd?: (ctx: AccountCmdContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.loginCmd`.
     * @param ctx the parse tree
     */
    enterLoginCmd?: (ctx: LoginCmdContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.loginCmd`.
     * @param ctx the parse tree
     */
    exitLoginCmd?: (ctx: LoginCmdContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.logoutCmd`.
     * @param ctx the parse tree
     */
    enterLogoutCmd?: (ctx: LogoutCmdContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.logoutCmd`.
     * @param ctx the parse tree
     */
    exitLogoutCmd?: (ctx: LogoutCmdContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.bookTitle`.
     * @param ctx the parse tree
     */
    enterBookTitle?: (ctx: BookTitleContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.bookTitle`.
     * @param ctx the parse tree
     */
    exitBookTitle?: (ctx: BookTitleContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.authorName`.
     * @param ctx the parse tree
     */
    enterAuthorName?: (ctx: AuthorNameContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.authorName`.
     * @param ctx the parse tree
     */
    exitAuthorName?: (ctx: AuthorNameContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.bookDetailParam`.
     * @param ctx the parse tree
     */
    enterBookDetailParam?: (ctx: BookDetailParamContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.bookDetailParam`.
     * @param ctx the parse tree
     */
    exitBookDetailParam?: (ctx: BookDetailParamContext) => void;
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
     * Enter a parse tree produced by `ImperaBookDSLParser.subtitleParam`.
     * @param ctx the parse tree
     */
    enterSubtitleParam?: (ctx: SubtitleParamContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.subtitleParam`.
     * @param ctx the parse tree
     */
    exitSubtitleParam?: (ctx: SubtitleParamContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.languageParam`.
     * @param ctx the parse tree
     */
    enterLanguageParam?: (ctx: LanguageParamContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.languageParam`.
     * @param ctx the parse tree
     */
    exitLanguageParam?: (ctx: LanguageParamContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.publicationYearParam`.
     * @param ctx the parse tree
     */
    enterPublicationYearParam?: (ctx: PublicationYearParamContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.publicationYearParam`.
     * @param ctx the parse tree
     */
    exitPublicationYearParam?: (ctx: PublicationYearParamContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.isbnParam`.
     * @param ctx the parse tree
     */
    enterIsbnParam?: (ctx: IsbnParamContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.isbnParam`.
     * @param ctx the parse tree
     */
    exitIsbnParam?: (ctx: IsbnParamContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.summaryParam`.
     * @param ctx the parse tree
     */
    enterSummaryParam?: (ctx: SummaryParamContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.summaryParam`.
     * @param ctx the parse tree
     */
    exitSummaryParam?: (ctx: SummaryParamContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.value`.
     * @param ctx the parse tree
     */
    enterValue?: (ctx: ValueContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.value`.
     * @param ctx the parse tree
     */
    exitValue?: (ctx: ValueContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

