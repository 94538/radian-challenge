import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from "@apollo/client";
import { GET_LAUNCH_LIST } from "../apollo/queries";
import LaunchCard from "../components/LaunchCard";
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  loaderCenter: {
    display:'flex',
    justifyContent: 'center',
    margin: 30
  }
});

export default function LaunchList() {

  const classes = useStyles();

  //initialize query
  const { data, loading, error } = useQuery(GET_LAUNCH_LIST);
  //wait for query to fetch data
  if (loading) {
    return (
      <div className={classes.loaderCenter}>
        <CircularProgress />
      </div>
    )
  }

  //log error
  if (error) {
    console.error(error);
    return null;
  }

  //store data
  const launches = data.launchesPast;

  //render html
  return (
    <div className="launch-list-wrapper">
      <Grid container spacing={3}>
        {launches.map(launch => {
          return (
            <Grid item xs={12} sm={6} md={3}>
              <LaunchCard key={launch.id} launch={launch} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  )
}

