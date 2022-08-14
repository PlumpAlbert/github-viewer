import {useMemo} from "react";

import TableRow from "./TableRow";
import {RepoType} from "features/landing/store/slices/repos";

import styles from "./Table.module.css";

const Table: React.FC<TableProps> = ({className, data}) => {
  const rows = useMemo(() => {
    if (!data) return null;
    return data.map((repo, index) => (
      <TableRow
        key={repo.id}
        index={index + 1}
        classes={{root: styles["row"], cell: styles["cell"]}}
        {...repo}
      />
    ));
  }, [data]);

  return (
    <table className={className}>
      <thead>
        <tr className={styles["row"]}>
          <th className={`${styles["cell"]} font-medium`}>#</th>
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
  data: RepoType[];
};
