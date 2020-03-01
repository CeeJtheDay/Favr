import VirtualizedList from '../components/List/index';

const Profile = ({ }) => {

    
    return (
        <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
                <VirtualizedList></VirtualizedList>
            </Grid>

        </Grid>
    )
}