import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  CardContent,
  Grid,
  TextField,
  Button
} from '@mui/material'
import {
  Star
} from '@mui/icons-material'
import '../styles/Profile.css'

function Profile() {
  const interests = [
    'Programmeerimine',
    'Muusika',
    'Reisimine',
  ]

  return (
    <Box className="profile-container">
      <Typography variant="h3" component="h1" className="profile-title">
        Henry
      </Typography>

      <Grid container className="profile-grid">
        <Grid size={{ xs: 12, md: 6 }}>
          <Card className="profile-card">
            <CardContent>
              <Typography variant="h5" component="h2" className="section-title">
                Huvid ja hobid
              </Typography>

              <List className="interests-list">
                {interests.map((interest, index) => (
                  <ListItem key={index} className="interest-item">
                    <ListItemIcon>
                      <Star color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary={interest} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card className="profile-card">
            <CardContent>
              <Typography variant="h5" component="h2" className="section-title">
                Kontakt
              </Typography>

              <Box component="form" className="contact-form">
                <Box className="form-group">
                  <Typography variant="body1" component="label" className="form-label">
                    E-mail:
                  </Typography>
                  <TextField
                    type="email"
                    name="email"
                    fullWidth
                    variant="outlined"
                    size="small"
                    className="form-input"
                  />
                </Box>

                <Box className="form-group">
                  <Typography variant="body1" component="label" className="form-label">
                    Sõnum:
                  </Typography>
                  <TextField
                    name="message"
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    className="form-input"
                  />
                </Box>

                <Button
                  type="button"
                  variant="contained"
                  color="success"
                  className="cta-button"
                >
                  Võta ühendust
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Profile