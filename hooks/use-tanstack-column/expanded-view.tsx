const ExpandedView = (expandedColumns: ColumnType[]) => (row: Product) =>
  expandedColumns.map((col, i) =>
    //@ts-ignore
    row[col.name] && row[col.name] !== "-" ? (
      <div key={i} className="expanded-view">
        <span>{col.label}:</span>
        {/* @ts-ignore */}
        <span>{row[col.name]}</span>
      </div>
    ) : null
  );

export default ExpandedView;
