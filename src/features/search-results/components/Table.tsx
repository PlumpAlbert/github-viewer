import {useMemo} from "react";

import {RepoType} from "features/landing/store/slices/repos";

import TableRow from "./TableRow";

import styles from "./Table.module.css";

const Table: React.FC<TableProps> = props => {
  const rows = useMemo(
    () =>
      props.data.map(repo => (
        <TableRow
          classes={{root: styles["row"], cell: styles["cell"]}}
          {...repo}
        />
      )),
    [props.data]
  );
  return (
    <table>
      <thead>
        <tr className={styles["row"]}>
          <th className={`${styles["cell"]} font-medium`}>Name</th>
          <th className={`${styles["cell"]} font-medium`}>Description</th>
          <th className={`${styles["cell"]} font-medium`}>Language</th>
          <th className={`${styles["cell"]} font-medium`}>Stars</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Table;

type TableProps = {
  data: RepoType[];
};
