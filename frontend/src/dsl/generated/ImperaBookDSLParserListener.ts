
import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { EntryContext } from "./ImperaBookDSLParser.js";
import { CommandContext } from "./ImperaBookDSLParser.js";
import { AddBookCmdContext } from "./ImperaBookDSLParser.js";
import { UpdateBookCmdContext } from "./ImperaBookDSLParser.js";
import { RemoveBookCmdContext } from "./ImperaBookDSLParser.js";
import { ListBooksCmdContext } from "./ImperaBookDSLParser.js";
import { ListFilterContext } from "./ImperaBookDSLParser.js";
import { MissingFilterContext } from "./ImperaBookDSLParser.js";
import { MissingPropertyContext } from "./ImperaBookDSLParser.js";
import { MissingAuthorContext } from "./ImperaBookDSLParser.js";
import { MissingPagesContext } from "./ImperaBookDSLParser.js";
import { MissingYearContext } from "./ImperaBookDSLParser.js";
import { MissingLanguageContext } from "./ImperaBookDSLParser.js";
import { MissingIsbnContext } from "./ImperaBookDSLParser.js";
import { MissingCoverContext } from "./ImperaBookDSLParser.js";
import { PublishedFilterContext } from "./ImperaBookDSLParser.js";
import { YearComparisonContext } from "./ImperaBookDSLParser.js";
import { YearInContext } from "./ImperaBookDSLParser.js";
import { YearBeforeContext } from "./ImperaBookDSLParser.js";
import { YearAfterContext } from "./ImperaBookDSLParser.js";
import { YearBetweenContext } from "./ImperaBookDSLParser.js";
import { YearAndContext } from "./ImperaBookDSLParser.js";
import { YearContext } from "./ImperaBookDSLParser.js";
import { AuthorFilterContext } from "./ImperaBookDSLParser.js";
import { WriterNameContext } from "./ImperaBookDSLParser.js";
import { WhoseFilterContext } from "./ImperaBookDSLParser.js";
import { LanguageFilterContext } from "./ImperaBookDSLParser.js";
import { LanguageNotContext } from "./ImperaBookDSLParser.js";
import { LanguageNameContext } from "./ImperaBookDSLParser.js";
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
import { AuthorDetailParamContext } from "./ImperaBookDSLParser.js";
import { BornParamContext } from "./ImperaBookDSLParser.js";
import { DiedParamContext } from "./ImperaBookDSLParser.js";
import { DiedYearContext } from "./ImperaBookDSLParser.js";
import { LivingParamContext } from "./ImperaBookDSLParser.js";
import { UpdateAuthorCmdContext } from "./ImperaBookDSLParser.js";
import { RemoveAuthorCmdContext } from "./ImperaBookDSLParser.js";
import { ListAuthorsCmdContext } from "./ImperaBookDSLParser.js";
import { AuthorListFilterContext } from "./ImperaBookDSLParser.js";
import { BornFilterContext } from "./ImperaBookDSLParser.js";
import { LivingFilterContext } from "./ImperaBookDSLParser.js";
import { AuthorsWithoutBooksContext } from "./ImperaBookDSLParser.js";
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
     * Enter a parse tree produced by `ImperaBookDSLParser.listFilter`.
     * @param ctx the parse tree
     */
    enterListFilter?: (ctx: ListFilterContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.listFilter`.
     * @param ctx the parse tree
     */
    exitListFilter?: (ctx: ListFilterContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.missingFilter`.
     * @param ctx the parse tree
     */
    enterMissingFilter?: (ctx: MissingFilterContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.missingFilter`.
     * @param ctx the parse tree
     */
    exitMissingFilter?: (ctx: MissingFilterContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.missingProperty`.
     * @param ctx the parse tree
     */
    enterMissingProperty?: (ctx: MissingPropertyContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.missingProperty`.
     * @param ctx the parse tree
     */
    exitMissingProperty?: (ctx: MissingPropertyContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.missingAuthor`.
     * @param ctx the parse tree
     */
    enterMissingAuthor?: (ctx: MissingAuthorContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.missingAuthor`.
     * @param ctx the parse tree
     */
    exitMissingAuthor?: (ctx: MissingAuthorContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.missingPages`.
     * @param ctx the parse tree
     */
    enterMissingPages?: (ctx: MissingPagesContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.missingPages`.
     * @param ctx the parse tree
     */
    exitMissingPages?: (ctx: MissingPagesContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.missingYear`.
     * @param ctx the parse tree
     */
    enterMissingYear?: (ctx: MissingYearContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.missingYear`.
     * @param ctx the parse tree
     */
    exitMissingYear?: (ctx: MissingYearContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.missingLanguage`.
     * @param ctx the parse tree
     */
    enterMissingLanguage?: (ctx: MissingLanguageContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.missingLanguage`.
     * @param ctx the parse tree
     */
    exitMissingLanguage?: (ctx: MissingLanguageContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.missingIsbn`.
     * @param ctx the parse tree
     */
    enterMissingIsbn?: (ctx: MissingIsbnContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.missingIsbn`.
     * @param ctx the parse tree
     */
    exitMissingIsbn?: (ctx: MissingIsbnContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.missingCover`.
     * @param ctx the parse tree
     */
    enterMissingCover?: (ctx: MissingCoverContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.missingCover`.
     * @param ctx the parse tree
     */
    exitMissingCover?: (ctx: MissingCoverContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.publishedFilter`.
     * @param ctx the parse tree
     */
    enterPublishedFilter?: (ctx: PublishedFilterContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.publishedFilter`.
     * @param ctx the parse tree
     */
    exitPublishedFilter?: (ctx: PublishedFilterContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.yearComparison`.
     * @param ctx the parse tree
     */
    enterYearComparison?: (ctx: YearComparisonContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.yearComparison`.
     * @param ctx the parse tree
     */
    exitYearComparison?: (ctx: YearComparisonContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.yearIn`.
     * @param ctx the parse tree
     */
    enterYearIn?: (ctx: YearInContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.yearIn`.
     * @param ctx the parse tree
     */
    exitYearIn?: (ctx: YearInContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.yearBefore`.
     * @param ctx the parse tree
     */
    enterYearBefore?: (ctx: YearBeforeContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.yearBefore`.
     * @param ctx the parse tree
     */
    exitYearBefore?: (ctx: YearBeforeContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.yearAfter`.
     * @param ctx the parse tree
     */
    enterYearAfter?: (ctx: YearAfterContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.yearAfter`.
     * @param ctx the parse tree
     */
    exitYearAfter?: (ctx: YearAfterContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.yearBetween`.
     * @param ctx the parse tree
     */
    enterYearBetween?: (ctx: YearBetweenContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.yearBetween`.
     * @param ctx the parse tree
     */
    exitYearBetween?: (ctx: YearBetweenContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.yearAnd`.
     * @param ctx the parse tree
     */
    enterYearAnd?: (ctx: YearAndContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.yearAnd`.
     * @param ctx the parse tree
     */
    exitYearAnd?: (ctx: YearAndContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.year`.
     * @param ctx the parse tree
     */
    enterYear?: (ctx: YearContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.year`.
     * @param ctx the parse tree
     */
    exitYear?: (ctx: YearContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.authorFilter`.
     * @param ctx the parse tree
     */
    enterAuthorFilter?: (ctx: AuthorFilterContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.authorFilter`.
     * @param ctx the parse tree
     */
    exitAuthorFilter?: (ctx: AuthorFilterContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.writerName`.
     * @param ctx the parse tree
     */
    enterWriterName?: (ctx: WriterNameContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.writerName`.
     * @param ctx the parse tree
     */
    exitWriterName?: (ctx: WriterNameContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.whoseFilter`.
     * @param ctx the parse tree
     */
    enterWhoseFilter?: (ctx: WhoseFilterContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.whoseFilter`.
     * @param ctx the parse tree
     */
    exitWhoseFilter?: (ctx: WhoseFilterContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.languageFilter`.
     * @param ctx the parse tree
     */
    enterLanguageFilter?: (ctx: LanguageFilterContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.languageFilter`.
     * @param ctx the parse tree
     */
    exitLanguageFilter?: (ctx: LanguageFilterContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.languageNot`.
     * @param ctx the parse tree
     */
    enterLanguageNot?: (ctx: LanguageNotContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.languageNot`.
     * @param ctx the parse tree
     */
    exitLanguageNot?: (ctx: LanguageNotContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.languageName`.
     * @param ctx the parse tree
     */
    enterLanguageName?: (ctx: LanguageNameContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.languageName`.
     * @param ctx the parse tree
     */
    exitLanguageName?: (ctx: LanguageNameContext) => void;
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
     * Enter a parse tree produced by `ImperaBookDSLParser.authorDetailParam`.
     * @param ctx the parse tree
     */
    enterAuthorDetailParam?: (ctx: AuthorDetailParamContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.authorDetailParam`.
     * @param ctx the parse tree
     */
    exitAuthorDetailParam?: (ctx: AuthorDetailParamContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.bornParam`.
     * @param ctx the parse tree
     */
    enterBornParam?: (ctx: BornParamContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.bornParam`.
     * @param ctx the parse tree
     */
    exitBornParam?: (ctx: BornParamContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.diedParam`.
     * @param ctx the parse tree
     */
    enterDiedParam?: (ctx: DiedParamContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.diedParam`.
     * @param ctx the parse tree
     */
    exitDiedParam?: (ctx: DiedParamContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.diedYear`.
     * @param ctx the parse tree
     */
    enterDiedYear?: (ctx: DiedYearContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.diedYear`.
     * @param ctx the parse tree
     */
    exitDiedYear?: (ctx: DiedYearContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.livingParam`.
     * @param ctx the parse tree
     */
    enterLivingParam?: (ctx: LivingParamContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.livingParam`.
     * @param ctx the parse tree
     */
    exitLivingParam?: (ctx: LivingParamContext) => void;
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
     * Enter a parse tree produced by `ImperaBookDSLParser.authorListFilter`.
     * @param ctx the parse tree
     */
    enterAuthorListFilter?: (ctx: AuthorListFilterContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.authorListFilter`.
     * @param ctx the parse tree
     */
    exitAuthorListFilter?: (ctx: AuthorListFilterContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.bornFilter`.
     * @param ctx the parse tree
     */
    enterBornFilter?: (ctx: BornFilterContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.bornFilter`.
     * @param ctx the parse tree
     */
    exitBornFilter?: (ctx: BornFilterContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.livingFilter`.
     * @param ctx the parse tree
     */
    enterLivingFilter?: (ctx: LivingFilterContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.livingFilter`.
     * @param ctx the parse tree
     */
    exitLivingFilter?: (ctx: LivingFilterContext) => void;
    /**
     * Enter a parse tree produced by `ImperaBookDSLParser.authorsWithoutBooks`.
     * @param ctx the parse tree
     */
    enterAuthorsWithoutBooks?: (ctx: AuthorsWithoutBooksContext) => void;
    /**
     * Exit a parse tree produced by `ImperaBookDSLParser.authorsWithoutBooks`.
     * @param ctx the parse tree
     */
    exitAuthorsWithoutBooks?: (ctx: AuthorsWithoutBooksContext) => void;
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

