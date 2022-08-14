import {useMemo} from "react";

import TableRow from "./TableRow";
import {RepoState} from "features/landing/store/slices/repos";

import styles from "./Table.module.css";

const Table: React.FC<TableProps> = ({className, data, rowsCount, page}) => {
  const rows = useMemo(() => {
    if (!data) return null;
    const repoIds = Object.keys(data);
    const totalPages = Math.ceil(repoIds.length / rowsCount);
    const startIndex = (page - 1) * rowsCount;
    const endIndex = repoIds.length - (totalPages - page) * rowsCount;
    return repoIds
      .slice(startIndex, endIndex)
      .map(id => (
        <TableRow
          key={id}
          classes={{root: styles["row"], cell: styles["cell"]}}
          {...data[id]}
        />
      ));
  }, [data]);

  return (
    <table className={className}>
      <thead>
        <tr className={styles["row"]}>
          <th className={`${styles["cell"]} font-medium`}>Name</th>
          <th className={`${styles["cell"]} font-medium`}>Description</th>
          <th className={`${styles["cell"]} font-medium`}>Language</th>
          <th className={`${styles["cell"]} font-medium text-right`}>Stars</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Table;

type TableProps = {
  className?: string;
  data: RepoState["repos"]["value"];
  rowsCount: number;
  page: number;
};
