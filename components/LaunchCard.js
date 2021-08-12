import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 150,
    },
    title: {
        textDecoration: 'none'
    }
});

const LaunchCard = ({ launch }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            {launch.links.mission_patch_small ? (
                <CardMedia
                    className={classes.media}
                    image={launch.links.mission_patch_small}
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
                {launch.mission_name ? (
                    <Typography gutterBottom variant="h6" component="h5" >
                        <Link href={launch.id} className={classes.title}>
                        {launch.mission_name}
                        </Link>
                    </Typography>
                    
                ) : (
                    <Typography gutterBottom variant="h6" component="h5">
                        No Title Available
                    </Typography>
                )}

                {launch.details ? (
                    <Typography noWrap variant="body2" color="textSecondary" component="p">
                        {launch.details}
                    </Typography>
                ) : (
                    <Typography variant="body2" color="textSecondary" component="p">
                        No Description Available
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                <Button variant="contained" size="small" color="primary" href={launch.links.video_link} target="_blank">
                    Video
                </Button>
                <Button variant="contained" size="small" color="secondary" href={launch.id}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    )
}

export default LaunchCard
