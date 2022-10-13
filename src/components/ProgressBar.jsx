import ProgressBar from 'react-bootstrap/ProgressBar';

function WithLabelExample({ num }) {

  const now = num;
  return <ProgressBar variant="warning" now={now} label={`${now}%`} />;

}

export default WithLabelExample;