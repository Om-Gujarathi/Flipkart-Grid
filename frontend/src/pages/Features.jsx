import {
  Card,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssignmentIcon from "@mui/icons-material/Assignment";

function EarnCoinsPage() {
  return (
    <Container
      sx={{
        marginTop: "100px",
      }}
    >
      <Card>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            margin: "10px",
            marginLeft: "70px",
            marginTop: "30px",
          }}
        >
          How Can I Earn FlipCoins?
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
              primary="Review/Rate a Product after buying"
              secondary="Earn 5 Coins"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText
              primary="Find a hidden button on this website"
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
      </Card>
    </Container>
  );
}

export default EarnCoinsPage;
