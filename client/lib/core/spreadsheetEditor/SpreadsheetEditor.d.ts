//***********************************************************************************************
//   Copyright (c) 1991-2025 Apryse Software Corp. ALL RIGHTS RESERVED.
//***********************************************************************************************
//***********************************************************************************************
//   Type definitions for SpreadsheetEditor.js
//   Updated: 3/25/2025 17:16
//   Version: 23.0.0.3
//   https://www.leadtools.com
//***********************************************************************************************

declare module lt.Document.SheetEditor {

   class LeadEventArgs {
      constructor();
      static empty: LeadEventArgs; // read-only
      static addToEvent(target: any, eventName: string, method: Function): void;
      static removeFromEvent(target: any, eventName: string, method: Function): void;
   }

   interface LeadEventHandler {
      (sender: any, e: LeadEventArgs): void;
   }

   class LeadEvent {
      add(value: LeadEventHandler): LeadEventHandler;
      remove(value: LeadEventHandler): void;
      static create(target: any, eventName: string): LeadEvent;
      invoke(sender: any, e: LeadEventArgs): void;
   }

   class LeadEventType extends LeadEvent {
      add(value: LeadEventHandler): LeadEventHandler;
      remove(value: LeadEventHandler): void;
   }
    

   enum CellRangeSortType {
      ascending = 0,
      descending = 1
   }

   class CellRangeSortOptions {
      get_sortType(): CellRangeSortType;
      set_sortType(value: CellRangeSortType): void;
      constructor();
      sortType: CellRangeSortType;
   }

   class Hyperlink {
      get_address(): string;
      get_tooltip(): string;
      get_type(): HyperlinkType;
      address: string; // read-only
      tooltip: string; // read-only
      type: HyperlinkType; // read-only
   }

   interface SheetEditorActiveSheetChangedEventHandler extends LeadEventHandler {
      (sender: any, e: SheetEditorActiveSheetChangedEventArgs): void;
   }

   class SheetEditorActiveSheetChangedEventType extends LeadEvent {
      add(value: SheetEditorActiveSheetChangedEventHandler): SheetEditorActiveSheetChangedEventHandler;
      remove(value: SheetEditorActiveSheetChangedEventHandler): void;
   }

   class SheetEditorActiveSheetChangedEventArgs extends LeadEventArgs {
      get_sheetIndex(): number;
      sheetIndex: number; // read-only
   }

   interface SheetEditorSelectionChangedEventHandler extends LeadEventHandler {
      (sender: any, e: SheetEditorSelectionChangedEventArgs): void;
   }

   class SheetEditorSelectionChangedEventType extends LeadEvent {
      add(value: SheetEditorSelectionChangedEventHandler): SheetEditorSelectionChangedEventHandler;
      remove(value: SheetEditorSelectionChangedEventHandler): void;
   }

   class SheetEditorSelectionChangedEventArgs extends LeadEventArgs {
      get_sheetIndex(): number;
      get_range(): CellRange;
      sheetIndex: number; // read-only
      range: CellRange; // read-only
   }

   enum SheetEditorItemPart {
      none = 0,
      cell = 1,
      cellColumnHeader = 2,
      cellRowHeader = 3,
      sheetName = 4,
      image = 5
   }

   interface SheetEditorInteractiveEventHandler extends LeadEventHandler {
      (sender: any, e: SheetEditorInteractiveEventArgs): void;
   }

   class SheetEditorInteractiveEventType extends LeadEvent {
      add(value: SheetEditorInteractiveEventHandler): SheetEditorInteractiveEventHandler;
      remove(value: SheetEditorInteractiveEventHandler): void;
   }

   class SheetEditorInteractiveEventArgs extends LeadEventArgs {
      get_originalEvent(): any;
      get_itemPart(): SheetEditorItemPart;
      get_sheetOrder(): number;
      get_cellRange(): CellRange;
      originalEvent: any; // read-only
      itemPart: SheetEditorItemPart; // read-only
      sheetOrder: number; // read-only
      cellRange: CellRange; // read-only
   }

   class SheetEditorClipboard {
      canCopy(): boolean;
      copy(): void;
      canPaste(): boolean;
      paste(): void;
      cut(): void;
      isAsyncPasteAvailable(): any;
   }

   class SearchResult {
      get_sheetOrder(): number;
      get_row(): number;
      get_column(): number;
      sheetOrder: number; // read-only
      row: number; // read-only
      column: number; // read-only
   }

   class SearchResults {
      get_results(): SearchResult[];
      moveToIndex(index: number): SearchResult;
      moveToNext(): SearchResult;
      moveToPrevious(): SearchResult;
      replace(replaceContent: string): SearchResult;
      replaceAll(replaceContent: string): void;
      results: SearchResult[]; // read-only
   }

   class SheetEditorSearch {
      searchSheet(sheetOrder: number, content: string, matchCase: boolean): SearchResults;
      searchSheetRegExp(sheetOrder: number, regex: any): SearchResults;
      search(content: string, matchCase: boolean): SearchResults;
      searchRegex(regex: any): SearchResults;
   }

   class SheetEditorHistory {
      canUndo(): boolean;
      canRedo(): boolean;
      undo(): void;
      redo(): void;
   }

   class SheetEditorInteractiveService {
      get_isListening(): boolean;
      startListening(): void;
      stopListening(): void;
      get_tapOnDown(): boolean;
      set_tapOnDown(value: boolean): void;
      add_move(value: SheetEditorInteractiveEventHandler): void;
      remove_move(value: SheetEditorInteractiveEventHandler): void;
      onMove(e: SheetEditorInteractiveEventArgs): void;  // protected
      add_tap(value: SheetEditorInteractiveEventHandler): void;
      remove_tap(value: SheetEditorInteractiveEventHandler): void;
      onTap(e: SheetEditorInteractiveEventArgs): void;  // protected
      add_doubleTap(value: SheetEditorInteractiveEventHandler): void;
      remove_doubleTap(value: SheetEditorInteractiveEventHandler): void;
      onDoubleTap(e: SheetEditorInteractiveEventArgs): void;  // protected
      add_dragStarted(value: SheetEditorInteractiveEventHandler): void;
      remove_dragStarted(value: SheetEditorInteractiveEventHandler): void;
      onDragStarted(e: SheetEditorInteractiveEventArgs): void;  // protected
      add_dragDelta(value: SheetEditorInteractiveEventHandler): void;
      remove_dragDelta(value: SheetEditorInteractiveEventHandler): void;
      onDragDelta(e: SheetEditorInteractiveEventArgs): void;  // protected
      add_dragCompleted(value: SheetEditorInteractiveEventHandler): void;
      remove_dragCompleted(value: SheetEditorInteractiveEventHandler): void;
      onDragCompleted(e: SheetEditorInteractiveEventArgs): void;  // protected
      add_keyDown(value: SheetEditorInteractiveEventHandler): void;
      remove_keyDown(value: SheetEditorInteractiveEventHandler): void;
      onKeyDown(e: SheetEditorInteractiveEventArgs): void;  // protected
      add_keyUp(value: SheetEditorInteractiveEventHandler): void;
      remove_keyUp(value: SheetEditorInteractiveEventHandler): void;
      onKeyUp(e: SheetEditorInteractiveEventArgs): void;  // protected
      isListening: boolean; // read-only
      tapOnDown: boolean;
      move: SheetEditorInteractiveEventType; // read-only
      tap: SheetEditorInteractiveEventType; // read-only
      doubleTap: SheetEditorInteractiveEventType; // read-only
      dragStarted: SheetEditorInteractiveEventType; // read-only
      dragDelta: SheetEditorInteractiveEventType; // read-only
      dragCompleted: SheetEditorInteractiveEventType; // read-only
      keyDown: SheetEditorInteractiveEventType; // read-only
      keyUp: SheetEditorInteractiveEventType; // read-only
   }

   class SheetEditorCreateOptions {
      get_showFormulaBar(): boolean;
      set_showFormulaBar(value: boolean): void;
      get_showSheetBar(): boolean;
      set_showSheetBar(value: boolean): void;
      get_showStatisticBar(): boolean;
      set_showStatisticBar(value: boolean): void;
      get_parentDiv(): HTMLElement;
      set_parentDiv(value: HTMLElement): void;
      get_cssUrl(): string;
      set_cssUrl(value: string): void;
      get_parentWebComponent(): HTMLElement;
      set_parentWebComponent(value: HTMLElement): void;
      add_ready(value: LeadEventHandler): void;
      remove_ready(value: LeadEventHandler): void;
      constructor(parentDiv: HTMLElement);
      showFormulaBar: boolean;
      showSheetBar: boolean;
      showStatisticBar: boolean;
      parentDiv: HTMLElement;
      cssUrl: string;
      parentWebComponent: HTMLElement;
      ready: LeadEventType; // read-only
   }

   class SheetEditorFactory {
      static createSheetEditor(createOptions: SheetEditorCreateOptions): SheetEditor;
      static createSheetEditorWebComponent(createOptions: SheetEditorCreateOptions): SheetEditor;
   }

   class SheetEditor {
      get_interactiveService(): SheetEditorInteractiveService;
      get_history(): SheetEditorHistory;
      get_search(): SheetEditorSearch;
      get_clipboard(): SheetEditorClipboard;
      beginUpdate(): void;
      endUpdate(): void;
      invalidate(): void;
      enterEditMode(): void;
      exitEditMode(): void;
      dispose(): void;
      setWorkbookJsonData(json: string): void;
      getWorkbookJsonData(): string;
      selectRange(range: CellRange): void;
      get_zoomRatio(): number;
      set_zoomRatio(value: number): void;
      get_editingEnabled(): boolean;
      set_editingEnabled(value: boolean): void;
      add_activeSheetChanged(value: SheetEditorActiveSheetChangedEventHandler): void;
      remove_activeSheetChanged(value: SheetEditorActiveSheetChangedEventHandler): void;
      onActiveSheetChanged(e: SheetEditorActiveSheetChangedEventArgs): void;  // protected
      add_selectionChanged(value: SheetEditorSelectionChangedEventHandler): void;
      remove_selectionChanged(value: SheetEditorSelectionChangedEventHandler): void;
      onSelectionChanged(e: SheetEditorSelectionChangedEventArgs): void;  // protected
      getWorkbook(): LEADWorkbook;
      interactiveService: SheetEditorInteractiveService; // read-only
      history: SheetEditorHistory; // read-only
      search: SheetEditorSearch; // read-only
      clipboard: SheetEditorClipboard; // read-only
      zoomRatio: number;
      editingEnabled: boolean;
      activeSheetChanged: SheetEditorActiveSheetChangedEventType; // read-only
      selectionChanged: SheetEditorSelectionChangedEventType; // read-only
   }

   class Cell {
      get_isMerged(): boolean;
      get_columnIndex(): number;
      get_rowIndex(): number;
      get_cellFormula(): string;
      get_stringCellValue(): string;
      get_dateCellValue(): number;
      get_numericCellValue(): number;
      get_boolCellValue(): boolean;
      get_cellType(): CellType;
      getDisplayStringValue(): string;
      setCellFormula(formula: string): void;
      setCellBooleanValue(value: boolean): void;
      setCellNumericValue(value: number): void;
      setCellStringValue(value: string): void;
      setCellDateValue(date: number): void;
      getStyle(): CellStyle;
      setStyle(cellStyle: CellStyle): void;
      get_hyperlink(): Hyperlink;
      set_hyperlink(value: Hyperlink): void;
      isMerged: boolean; // read-only
      columnIndex: number; // read-only
      rowIndex: number; // read-only
      cellFormula: string; // read-only
      stringCellValue: string; // read-only
      dateCellValue: number; // read-only
      numericCellValue: number; // read-only
      boolCellValue: boolean; // read-only
      cellType: CellType; // read-only
      hyperlink: Hyperlink;
   }

   class CellBorder {
      get_borderStyle(): BorderStyle;
      get_color(): string;
      constructor(borderStyle: BorderStyle, borderColor: string);
      borderStyle: BorderStyle; // read-only
      color: string; // read-only
   }

   class CellStyle {
      equals(obj: any): boolean;
      get_wrapText(): TextWrap;
      set_wrapText(value: TextWrap): void;
      get_font(): Font;
      set_font(value: Font): void;
      get_backgroundColor(): string;
      set_backgroundColor(value: string): void;
      get_horizontalAlignment(): HorizontalAlignment;
      set_horizontalAlignment(value: HorizontalAlignment): void;
      get_verticalAlignment(): VerticalAlignment;
      set_verticalAlignment(value: VerticalAlignment): void;
      getCellBorder(borderType: BorderType): CellBorder;
      setCellBorder(borderType: BorderType, border: CellBorder): void;
      setDataFormatString(format: string): void;
      getDataFormatString(): string;
      wrapText: TextWrap;
      font: Font;
      backgroundColor: string;
      horizontalAlignment: HorizontalAlignment;
      verticalAlignment: VerticalAlignment;
   }

   enum HorizontalAlignment {
      general = 0,
      left = 1,
      center = 2,
      right = 3
   }

   enum VerticalAlignment {
      none = 0,
      top = 1,
      center = 2,
      bottom = 3
   }

   enum CellType {
      unknown = 0,
      blank = 1,
      numeric = 2,
      string = 3,
      formula = 4,
      bool = 5,
      date = 6
   }

   enum FontStyle {
      regular = 0,
      bold = 1,
      italic = 2,
      underline = 4,
      strikeout = 8
   }

   enum BorderStyle {
      none = 0,
      thin = 1,
      hair = 2,
      dotted = 3,
      dashed = 4,
      dashDot = 5,
      dashDotDot = 6,
      doubleLines = 7,
      medium = 8,
      mediumDashed = 9,
      mediumDashDot = 10,
      mediumDashDotDot = 11,
      slantedDashDot = 12,
      thick = 13
   }

   enum BorderType {
      left = 0,
      top = 1,
      right = 2,
      bottom = 3
   }

   enum TextWrap {
      auto = 0,
      overflow = 1,
      wrap = 2,
      clip = 3
   }

   enum RangeBorderType {
      none = 0,
      top = 1,
      bottom = 2,
      left = 3,
      right = 4,
      all = 5,
      outside = 6,
      inside = 7,
      horizontal = 8,
      vertical = 9
   }

   enum HyperlinkType {
      unknown = 0,
      internal = 1,
      external = 2
   }

   class Font {
      equals(obj: any): boolean;
      get_name(): string;
      get_sizeInPoints(): number;
      get_bold(): boolean;
      get_italic(): boolean;
      get_strikeout(): boolean;
      get_underline(): boolean;
      get_fontStyle(): FontStyle;
      get_color(): string;
      name: string; // read-only
      sizeInPoints: number; // read-only
      bold: boolean; // read-only
      italic: boolean; // read-only
      strikeout: boolean; // read-only
      underline: boolean; // read-only
      fontStyle: FontStyle; // read-only
      color: string; // read-only
   }

   class MergedCellRegions {
      get_count(): number;
      getRegionAt(index: number): CellRange;
      intersectsWithCellRange(range: CellRange): boolean;
      removeRegionAt(index: number): void;
      removeRegion(range: CellRange): void;
      addRegion(range: CellRange): number;
      count: number; // read-only
   }

   class CellRange {
      get_firstRow(): number;
      get_lastRow(): number;
      get_firstColumn(): number;
      get_lastColumn(): number;
      equals(obj: any): boolean;
      constructor(firstRow: number, lastRow: number, firstColumn: number, lastColumn: number);
      firstRow: number; // read-only
      lastRow: number; // read-only
      firstColumn: number; // read-only
      lastColumn: number; // read-only
   }

   class Row {
      get_firstCellIndex(): number;
      get_lastCellIndex(): number;
      createCell(columnIndex: number): Cell;
      getCellAt(index: number): Cell;
      firstCellIndex: number; // read-only
      lastCellIndex: number; // read-only
   }

   class LEADWorkbook {
      createHyperlink(address: string, tooltip: string): Hyperlink;
      get_sheetCount(): number;
      get_activeSheetIndex(): number;
      set_activeSheetIndex(value: number): void;
      getSheetAt(index: number): Sheet;
      getSheet(sheetName: string): Sheet;
      createSheet(sheetName: string): Sheet;
      removeSheet(sheetName: string): void;
      removeSheetAt(index: number): void;
      isSheetHidden(sheetName: string): boolean;
      setSheetHidden(sheetName: string, hidden: boolean): void;
      createFont(fontName: string, size: number, fontStyle: FontStyle, color: string): Font;
      createCellStyle(): CellStyle;
      sheetCount: number; // read-only
      activeSheetIndex: number;
   }

   class Sheet {
      get_images(): SheetImages;
      get_mergedRegions(): MergedCellRegions;
      get_name(): string;
      set_name(value: string): void;
      get_defaultColumnWidth(): number;
      set_defaultColumnWidth(value: number): void;
      get_defaultRowHeight(): number;
      set_defaultRowHeight(value: number): void;
      get_firstRowIndex(): number;
      get_lastRowIndex(): number;
      get_rowsCount(): number;
      get_columnsCount(): number;
      createRow(rowIndex: number): Row;
      removeRows(rowIndex: number, count: number): void;
      createRows(rowIndex: number, count: number): void;
      createColumns(columnIndex: number, count: number): void;
      removeColumns(columnIndex: number, count: number): void;
      getRowAt(rowIndex: number): Row;
      getColumnWidthInPixel(columnIndex: number): number;
      setColumnWidthInPixel(columnIndex: number, width: number): void;
      getRowHeightInPixel(rowIndex: number): number;
      setRowHeightInPixel(rowIndex: number, height: number): void;
      isRowHidden(rowIndex: number): boolean;
      setRowHidden(rowIndex: number, hidden: boolean): void;
      isColumnHidden(columnIndex: number): boolean;
      setColumnHidden(columnIndex: number, hidden: boolean): void;
      sortCellRange(range: CellRange, sortOptions: CellRangeSortOptions): void;
      setCellRangeBorder(range: CellRange, borderType: RangeBorderType, border: CellBorder): void;
      images: SheetImages; // read-only
      mergedRegions: MergedCellRegions; // read-only
      name: string;
      defaultColumnWidth: number;
      defaultRowHeight: number;
      firstRowIndex: number; // read-only
      lastRowIndex: number; // read-only
      rowsCount: number; // read-only
      columnsCount: number; // read-only
   }

   class SheetImage {
      getImage(): string;
      get_displayBounds(): LeadRectD;
      displayBounds: LeadRectD; // read-only
   }

   class SheetImages {
      addImage(source: string, displayBounds: LeadRectD): void;
      get_count(): number;
      getImageAt(index: number): SheetImage;
      count: number; // read-only
   }

   class LeadRectD {
      static get_empty(): LeadRectD;
      get_isEmpty(): boolean;
      static create(x: number, y: number, width: number, height: number): LeadRectD;
      static fromLTRB(left: number, top: number, right: number, bottom: number): LeadRectD;
      clone(): LeadRectD;
      get_width(): number;
      set_width(value: number): void;
      get_height(): number;
      set_height(value: number): void;
      get_left(): number;
      get_top(): number;
      get_right(): number;
      get_bottom(): number;
      constructor();
      static empty: LeadRectD; // read-only
      isEmpty: boolean; // read-only
      width: number;
      height: number;
      left: number; // read-only
      top: number; // read-only
      right: number; // read-only
      bottom: number; // read-only
   }
}
