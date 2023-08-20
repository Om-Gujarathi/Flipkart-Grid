import { Container, List, ListItem, ListItemIcon, ListItemText, Paper, Typography, makeStyles } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssignmentIcon from "@mui/icons-material/Assignment";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(3),
  },
}));

function EarnCoinsPage() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Earn FlipCoins
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Buy a Product" secondary="Earn 20 Coins" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText
              primary="Review a Product after buying"
              secondary="Earn 5 Coins"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText
              primary="Find a hidden button on my website"
              secondary="Earn 1 Coin"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Refer a Friend" secondary="Earn 30 Coins" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText
              primary="Complete a Survey"
              secondary="Earn 10 Coins"
            />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
}

export default EarnCoinsPage;
