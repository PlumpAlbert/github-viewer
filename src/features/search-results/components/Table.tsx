import {useMemo} from "react";

import TableRow from "./TableRow";
import {RepoState} from "features/landing/store/slices/repos";

import styles from "./Table.module.css";

const Table: React.FC<TableProps> = ({data}) => {
  const rows = useMemo(() => {
    if (!data) return null;
    return Object.keys(data).map(id => (
      <TableRow
        classes={{root: styles["row"], cell: styles["cell"]}}
        {...data[id]}
      />
    ));
  }, [data]);

  return (
    <table>
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
  data: RepoState["repos"]["value"];
};
