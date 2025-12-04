// TableLayout.jsx
const TableLayout = ({ columns = [], data = [], renderRow, type }) => {


    return (
        <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full">
                {/* Header */}
                <thead className={`${type === "complaints" ? "bg-primary-light/40" : "bg-accent-light/40"}`}>
                    <tr className="border-b border-primary/50">
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="px-6 py-4 text-sm font-semibold text-nowrap"
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* Body */}
                <tbody className="divide-y divide-dark-light/10">
                    {data.map((item) => renderRow(item))}
                </tbody>
            </table>
        </div>
    );
}

export default TableLayout;