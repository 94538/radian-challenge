import { useQuery } from "@apollo/client";
import { GET_LAUNCH_DETAIL } from "../apollo/queries";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
    titleWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    loaderWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderCenter: {
        margin: '0 auto',
    },
    media: {
        height: 300,
    },
    noPadding: {
        padding: 0
    },
    title: {
        textDecoration: 'none'
    },
    backButton: {
        marginBottom:30,
        marginTop:30
    }
});

const LaunchDetail = ({ query }) => {
    const classes = useStyles();

    //get launch id
    const id = query.id;

    // run query
    const { data, loading, error } = useQuery(GET_LAUNCH_DETAIL, {
        variables: { id },
    });

    // wait for query response
    if (loading) {
        return (
            <div className={classes.loaderWrapper}>
                <CircularProgress className={classes.loaderCenter} />
            </div>
        )
    }

    //check error
    if (error) {
        console.error(error);
        return null;
    }

    //store query response
    const launch = data.launch;

    //render html
    return (
        <Container maxWidth="sm">
            <div className={classes.backButton}>
                <Button variant="contained" size="small" color="primary" href="/">
                    Back
                </Button>
            </div>
            <Card>
                {launch.links.mission_patch ? (
                    <CardMedia
                        className={classes.media}
                        image={launch.links.mission_patch}
                        title={launch.mission_name}
                    />
                ) : (
                    <CardMedia
                        className={classes.media}
                        image="https://via.placeholder.com/350x200"
                        title="no image"
                    />
                )}
                <CardContent>
                    <div className={classes.titleWrapper}>
                        <div>
                            {launch.mission_name ? (
                                <Typography gutterBottom variant="h6" component="h5" >
                                    {launch.mission_name}
                                </Typography>

                            ) : (
                                <Typography gutterBottom variant="h6" component="h5">
                                    No Title Available
                                </Typography>
                            )}
                        </div>
                        <Button variant="contained" size="small" color="primary" href={launch.links.video_link} target="_blank">
                            Video
                        </Button>
                    </div>
                    {launch.details ? (
                        <Typography variant="body2" color="textSecondary" component="p">
                            {launch.details}
                        </Typography>
                    ) : (
                        <Typography variant="body2" color="textSecondary" component="p">
                            No Description Available
                        </Typography>
                    )}
                    <List>
                        <ListItem className={classes.noPadding}>
                            <ListItemText
                                primary="Launch Site"
                                secondary={launch.launch_site.site_name_long}
                            />
                        </ListItem>
                        <ListItem className={classes.noPadding}>
                            <ListItemText
                                primary="Rocket Name"
                                secondary={launch.rocket.rocket_name}
                            />
                        </ListItem>
                        <ListItem className={classes.noPadding}>
                            <ListItemText
                                primary="Launch Date"
                                secondary={launch.launch_date_local}
                            />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </Container>
    )
}

//initial props
LaunchDetail.getInitialProps = async ({ query }) => {
    return { query }
}

export default LaunchDetail
