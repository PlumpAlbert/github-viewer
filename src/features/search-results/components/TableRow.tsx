import {RepoType} from "features/landing/store/slices/repos";
import {useMemo} from "react";

const TableRow: React.FC<RepoType & TableRowProps> = props => {
  const className = useMemo(() => {
    let result = "";
    if (props.className) result += " " + props.className;
    if (props.classes?.root) result += " " + props.classes.root;
    return result.trim();
  }, [props.className, props.classes?.root]);

  return (
    <tr className={className}>
      <td className={props.classes?.cell}>
        <a
          className="visited:text-indigo-600 dark:visited:text-indigo-400"
          href={props.html_url}
        >
          {props.name}
        </a>
      </td>
      <td className={props.classes?.cell}>{props.description}</td>
      <td className={props.classes?.cell}>{props.language}</td>
      <td className={`${props.classes?.cell} text-right`}>
        {props.stargazers_count}
      </td>
    </tr>
  );
};

export default TableRow;

type TableRowProps = {
  className?: string;
  classes?: {
    root?: string;
    cell?: string;
  };
};
