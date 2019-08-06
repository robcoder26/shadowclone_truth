import React from "react";
import PropTypes from "prop-types";
import { Query, Mutation } from "react-apollo";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";

import { CandidateListItem } from "../../components";
import { CandidateQuery, UserVoteMutation } from "../../queries/candidate";

import "./Prevote.style.scss";

function PreVote({ history }) {
  const itemTemplate = (candidate, layout) => {
    if (!candidate) {
      return null;
    }

    if (layout === "list") {
      return (
        <Mutation mutation={UserVoteMutation}>
          {createUserVote => (
            <CandidateListItem
              data={candidate}
              updateVote={e => {
                if (e.value) {
                  createUserVote({
                    variables: {
                      candidateId: candidate.id,
                      voteType: e.target.name
                    }
                  });
                }
              }}
            />
          )}
        </Mutation>
      );
    }
  };

  const handleNext = () => {
    history.push("/result");
  };

  return (
    <div className="p-col-12 p-sm-12 p-md-6 page prevote">
      <div className="p-grid p-justify-between p-align-center">
        <div className="p-col-8">
          <h1>Prevoting</h1>
        </div>
        <div className="p-col-4 p-fluid">
          <Button label="Next" onClick={handleNext} />
        </div>
      </div>
      <Query query={CandidateQuery} fetchPolicy="network-only">
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error : {error}</p>;
          return (
            <DataView
              value={data.candidates}
              layout="list"
              itemTemplate={itemTemplate}
              rows={20}
            />
          );
        }}
      </Query>
    </div>
  );
}

PreVote.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};
export default PreVote;
