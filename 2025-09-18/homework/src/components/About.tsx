import {
  Typography,
  Box,
  Card,
  CardContent,
  Stack,
  Chip,
  Divider
} from '@mui/material'
import '../styles/About.css'

function About() {
  return (
    <Box className="about-container">
      <Typography variant="h3" component="h1" gutterBottom className="about-title">
        About Us
      </Typography>

      <Card className="about-card">
        <CardContent>
          <Typography variant="h5" component="h2" className="about-section-title">
            Our Team
          </Typography>

          <Typography variant="body1" className="about-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </Typography>

          <Typography variant="body1" className="about-text">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </CardContent>
      </Card>

      <Card className="about-card">
        <CardContent>
          <Typography variant="h5" component="h2" className="about-section-title">
            Technologies
          </Typography>

          <Stack className="about-chips">
            <Chip label="React" color="primary" />
            <Chip label="TypeScript" color="primary" />
            <Chip label="Material-UI" color="secondary" />
            <Chip label="React Router" color="primary" />
            <Chip label="Vite" color="secondary" />
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" className="about-section-title">
            Mission
          </Typography>

          <Typography variant="body1" className="about-text">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </Typography>

          <Divider className="about-divider" />

          <Typography variant="body2" className="about-footer-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias unde, quod consequuntur dolores repudiandae minus sed tempore nostrum, ea sint molestias nobis dolorem modi necessitatibus nam nesciunt temporibus soluta sapiente!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default About