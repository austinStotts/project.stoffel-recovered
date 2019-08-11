import React from "react";
import Fail from "./fail.js";
import Pass from "./pass.js";
import { Table, Icon } from "semantic-ui-react";

const Scores = ({ results, args }) => {
  let finalResult = true;
  for (let key in results) {
    if (!results[key]) {
      finalResult = false;
    }
  }
  console.log(finalResult, " = status");
  return (
    <React.Fragment>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Test</Table.HeaderCell>
            <Table.HeaderCell>Pass/Fail</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {args.map(arg => (
            <Table.Row>
              <Table.Cell>{arg}</Table.Cell>
              <Table.Cell negative={!results[arg]} positive={results[arg]}>
                {results[arg] ? (
                  <span><Icon name="checkmark" /> Pass</span>
                ) : (
                  <span><Icon name="close" /> Fail</span>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {finalResult ? <Pass /> : <Fail />}
    </React.Fragment>
  );
};

export default Scores;
